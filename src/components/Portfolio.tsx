import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
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
      
      {/* Bottom Bar */}
      <footer className="bottom-bar">
        <div className="bottom-bar-content">
          {/* Empty content as requested */}
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
