import React, { useState, useEffect } from 'react';
import './OrientationWrapper.css';

const OrientationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isViewportTooNarrow, setIsViewportTooNarrow] = useState(false);

  const checkViewport = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const isPortrait = window.innerHeight > window.innerWidth;
    // Check if viewport is between 1:1 and 39:25 ratio
    const isNarrowViewport = aspectRatio > 1 && aspectRatio < (39/25);
    
    setIsViewportTooNarrow(isNarrowViewport);
    setIsPortrait(isPortrait);
  };

  useEffect(() => {
    // Initial check
    checkViewport();

    // Add event listener for viewport changes
    window.addEventListener('resize', checkViewport);
    window.addEventListener('orientationchange', checkViewport);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
    };
  }, []);

  if (isPortrait) {
    return (
      <div className="orientation-message">
        <div className="message-box">
          <h2>Please rotate your device</h2>
          <p>This website is best viewed in landscape mode</p>
        </div>
      </div>
    );
  }
  
  if (isViewportTooNarrow) {
    return (
      <div className="orientation-message">
        <div className="message-box">
          <h2>Please rotate your device</h2>
          <p>This website is best viewed in landscape mode</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default OrientationWrapper;
