import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';
import StatusBar from './StatusBar';

function Portfolio(): React.ReactNode {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/sounds/brawl-stars-loading-sound.mp3');
    
    // Play the sound when component mounts
    const playSound = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };
    
    playSound();
    
    // Show content after a short delay
    const timer = setTimeout(() => {
      setShowContent(true);
      setShowOverlay(false);
    }, 200);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleBack = async () => {
    // Start exit animation
    setIsExiting(true);
    
    // Wait for the fade-out animation to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navigate back after animation completes
    navigate('/');
  };

  return (
    <div className={`portfolio-container ${showOverlay ? 'show-overlay' : ''} ${isExiting ? 'exiting' : ''}`}>
      <StatusBar visible={showContent} />
      <div className="top-left-container">
        <button 
          className={`back-button ${showContent ? 'visible' : ''}`}
          onClick={handleBack}
          aria-label="Back to home"
        >
          <span className="back-chevron">‹</span>
        </button>
        <div className={`name-text ${showContent ? 'visible' : ''}`}>
          EVELYN HANNAH Z.S. WONG
        </div>
      </div>
      <div className="top-right-container">
        <div className={`top-right-parallelogram ${showContent ? 'visible' : ''}`}>
          <img 
            src="/images/headshot.jpg" 
            alt="Evelyn Wong" 
            className="headshot"
          />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
