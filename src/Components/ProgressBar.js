// ProgressBar.js
import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; // Import the CSS file

const ProgressBar = () => {
  const initialProgress = parseInt(localStorage.getItem('progress'), 10) || 0;

  const [progress, setProgress] = useState(initialProgress);
  const [status, setStatus] = useState('Loading');
  const [intervalId, setIntervalId] = useState(null);
  const [isInProgress, setIsInProgress] = useState(false);

  const incrementProgress = () => {
    setProgress((prevProgress) => {
      const newProgress = prevProgress < 100 ? prevProgress + 10 : prevProgress;
      if (newProgress === 100) {
        setStatus('Complete');
        clearInterval(intervalId);
      }
      localStorage.setItem('progress', newProgress.toString());
      return newProgress;
    });
  };

  const startProgress = () => {
    if (progress === 100) {
      resetProgress();
    } else {
      const id = setInterval(() => {
        incrementProgress();
      }, 500);
      setIntervalId(id);
      setStatus('Loading');
      setIsInProgress(true);
    }
  };

  const stopProgress = () => {
    if (isInProgress) {
      clearInterval(intervalId);
      setStatus('Paused');
      setIsInProgress(false);
      console.log('Stopped Progress');
    }
  };

  const resetProgress = () => {
    clearInterval(intervalId);
    setProgress(0);
    setStatus('Initial Point');
    setIsInProgress(false);
    localStorage.setItem('progress', '0');
    console.log('Reset Progress');
  };

  useEffect(() => {
    return () => localStorage.removeItem('progress');
  }, []);

  return (
    <div className="container">
      <div className="progressBarContainer">
        <div className="progressBar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
      <p>{status}</p>

      <div className="buttonContainer">
        <button onClick={startProgress} disabled={isInProgress || progress === 100}>
          Start
        </button>
        <button onClick={stopProgress} disabled={!isInProgress  || progress === 100}>
          Stop
        </button>
        <button onClick={resetProgress} disabled={progress === 0 || status === 'Initial Point'}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;