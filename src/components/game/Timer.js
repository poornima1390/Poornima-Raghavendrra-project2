import React from 'react';
import { useTimer } from '../../hooks/useTimer';

const Timer = () => {
  const { formatTime } = useTimer();

  return (
    <div className="timer-container">
      <i className="far fa-clock"></i>
      <span id="timer">{formatTime()}</span>
      <span className="timer-label">elapsed</span>
    </div>
  );
};

export default Timer;