import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import './Portfolio.css';
import StatusBar from './StatusBar';

function Portfolio(): React.ReactNode {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(-1);
  const totalSlides = 3; // Number of about images (1-3)
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Function to go to a specific slide
  const goToNextSlide = useCallback(() => {
    setPreviousSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [currentSlide, totalSlides]);
  
  // Initialize the auto-slide timer
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextSlide();
    }, 3000); // Changed from 5000ms to 3000ms for 3-second intervals
    
    return () => clearTimeout(timer);
  }, [currentSlide, goToNextSlide]);
  

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
    }
    // Try to play immediately
    playSound();
    
    // Also set up a user interaction listener for autoplay policies
    const handleUserInteraction = () => {
      playSound();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    // Show content after a short delay
    const timer = setTimeout(() => {
      setShowContent(true);
      setShowOverlay(false);
    }, 200);

    // Initial slide setup
    goToNextSlide();

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
          EVELYN WONG
        </div>
      </div>
      <div className="short-parallelograms">
        <a 
          href="https://www.linkedin.com/in/evelynhwong" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`top-right-short-parallelogram ${showContent ? 'visible' : ''}`}
          aria-label="LinkedIn"
        >
          <div className="social-icon linkedin">
            <FaLinkedinIn />
          </div>
          <span className="website-name">LinkedIn</span>
        </a>
        <a 
          href="https://www.instagram.com/wong.zs" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`top-right-short-parallelogram ${showContent ? 'visible' : ''}`}
          aria-label="Instagram"
        >
          <div className="social-icon instagram">
            <RiInstagramFill />
          </div>
          <span className="website-name">Insta</span>
        </a>
        <a 
          href="https://github.com/defnotev" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`top-right-short-parallelogram ${showContent ? 'visible' : ''}`}
          aria-label="GitHub"
        >
          <div className="social-icon github">
            <FaGithub />
          </div>
          <span className="website-name">GitHub</span>
        </a>
        <a 
          href="https://twitter.com/evelynhannah_" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`top-right-short-parallelogram ${showContent ? 'visible' : ''}`}
          aria-label="X (Twitter)"
        >
          <div className="social-icon x">
            <FaXTwitter />
          </div>
          <span className="website-name">X</span>
        </a>
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
      
      {/* Horizontal Scrollable Section */}
      <div className={`scrollable-section ${showContent ? 'visible' : ''}`}>
        <div className="scrollable-content">
          {/* First Parallelogram with 2x2 Grid and Carousel */}
          <div className="scrollable-parallelogram">
            <div className="parallelogram-content">
              {/* Left side - Grid */}
              <div className="grid-side">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="grid-item">
                    <h4>Project {item}</h4>
                    <p>Description {item}</p>
                  </div>
                ))}
              </div>
              
              {/* Right side - Carousel */}
              <div className="carousel-side">
                <div className="carousel-container">
                  {/* Carousel slides */}
                  {[1, 2, 3].map((num, index) => (
                    <div 
                      key={num} 
                      className={`carousel-slide ${
                        index === currentSlide ? 'active' : 
                        index === previousSlide ? 'previous' : ''
                      }`}
                    >
                      <img 
                        src={`/images/about${num}.png`} 
                        alt={`About ${num}`}
                        className="carousel-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Other Parallelograms */}
          {[2, 3, 4, 5].map((item) => (
            <div key={item} className="scrollable-parallelogram">
              <div className="parallelogram-content">
                <h3>Project {item}</h3>
                <p>Description for project {item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <footer className={`bottom-bar ${showContent ? 'visible' : ''}`}>
        <div className="bottom-bar-content">
          {/* Bottom bar content (empty for now) */}
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
