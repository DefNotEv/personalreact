import React from 'react';
import './StatusBar.css';

interface StatusBarProps {
  visible?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ visible = false }) => {
  return <div className={`status-bar ${visible ? 'visible' : ''}`} />;
};

export default StatusBar;
