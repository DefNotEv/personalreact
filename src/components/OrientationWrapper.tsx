import React, { useState, useEffect } from 'react';
import './OrientationWrapper.css';

const OrientationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false);

  const checkOrientation = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    // Initial check
    checkOrientation();

    // Add event listener for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
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

  return <>{children}</>;
};

export default OrientationWrapper;
