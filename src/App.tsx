import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Portfolio from './components/Portfolio'

function Clock(): React.ReactNode {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const intervalId = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  return <div className="phone-time">{currentTime}</div>
}

function PhoneFrame(): React.ReactNode {
  const [showApp, setShowApp] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const handleAppClick = () => {
    if (!showApp) {
      // When opening the app, fade out the entire screen
      document.body.style.overflow = 'hidden';
      setFadeOut(true);
      setTimeout(() => {
        setShowApp(true);
        setFadeOut(false);
      }, 300);
    } else {
      // When closing the app, fade out the app view
      setFadeOut(true);
      setTimeout(() => {
        setShowApp(false);
        setFadeOut(false);
        document.body.style.overflow = '';
      }, 300);
    }
  };

  return (
    <>
      <div className="phone">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <Clock />
          <div className="app-container">
            <div className="app-button-container">
              <div 
                className="app-button" 
                onClick={handleAppClick}
                ref={appRef}
              >
                <img src="/images/app.png" alt="App" className="app-icon" />
              </div>
              <div className="app-label">click!</div>
            </div>
          </div>
        </div>
        <div className="phone-home-button"></div>
      </div>
      
      {showApp && (
        <div className={`loading-screen ${fadeOut ? 'fade-out' : 'fade-in'}`}>
          <div className="app-fullscreen">
            <LoadingScreen onClose={handleAppClick} />
          </div>
        </div>
      )}
    </>
  )
}

interface LoadingScreenProps {
  onClose?: () => void;
}

function LoadingScreen({ onClose }: LoadingScreenProps): React.ReactNode {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showBlueBackground, setShowBlueBackground] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [textFadeOut, setTextFadeOut] = useState(false);
  const [navigated, setNavigated] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/sounds/supercell-intro-sound.mp3');
    
    // Play the sound
    const playSound = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };
    
    playSound();
    
    // Set timer for fading out text
    const textFadeTimer = setTimeout(() => {
      setTextFadeOut(true);
      
      // Set timer for showing blue background after text fades out
      const blueBgTimer = setTimeout(() => {
        setShowBlueBackground(true);
        
        // Navigate to portfolio after a short delay
        const navTimer = setTimeout(() => {
          if (!navigated) {
            setNavigated(true);
            navigate('/portfolio');
          }
        }, 500);
        
        return () => clearTimeout(navTimer);
      }, 150); // Blue background appears 150ms after text starts fading
      
      return () => clearTimeout(blueBgTimer);
    }, 1700); // Start fading text after 1.7 seconds
    
    // Cleanup function
    return () => {
      clearTimeout(textFadeTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [navigate, navigated]);

  const handleClose = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      } else {
        navigate('/');
      }
    }, 500); // Match this with the CSS transition duration
  }, [onClose, navigate]);

  return (
    <div className={`loading-screen ${showBlueBackground ? 'blue-background-visible' : ''} ${fadeOut ? 'fade-out' : ''}`}>
      <div className={`name-container ${textFadeOut ? 'fade-out' : ''}`}>
        <h1>EVELYN</h1>
        <h1>HANNAH</h1>
        <h1>Z.S. WONG</h1>
      </div>
      
      <div className={`blue-background ${showBlueBackground ? 'visible' : ''}`}>
        {/* Add any content here if needed */}
      </div>
    </div>
  );
}

function App(): React.ReactNode {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PhoneFrame />} />
        <Route path="/loading-screen" element={<LoadingScreen />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  )
}

export default App
