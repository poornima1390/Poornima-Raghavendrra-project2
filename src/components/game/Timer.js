import React, { useEffect, useRef } from 'react';
import { useSudoku, ACTIONS } from '../../context/SudokuContext';

const Timer = () => {
  const { state, dispatch, currentGame } = useSudoku();
  const intervalRef = useRef(null);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start timer only if game is not won and board exists
    if (currentGame?.board && !currentGame.gameWon) {
      intervalRef.current = setInterval(() => {
        dispatch({ 
          type: ACTIONS.UPDATE_TIMER, 
          payload: currentGame.timer + 1 
        });
      }, 1000);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentGame?.board, currentGame?.gameWon, currentGame?.timer, dispatch]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <i className="far fa-clock"></i>
      <span>{formatTime(currentGame?.timer || 0)}</span>
      <span className="timer-label">elapsed</span>
    </div>
  );
};

export default Timer;