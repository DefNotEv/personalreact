import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

function Portfolio(): React.ReactNode {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Add any initialization code here
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="portfolio-container">
      <div className="status-bar" />
      <button 
        className="back-button"
        onClick={handleBack}
        aria-label="Back to home"
      >
        <span className="back-chevron">‹</span>
      </button>
    </div>
  );
}

export default Portfolio;
