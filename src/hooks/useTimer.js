import { useState, useEffect, useRef } from 'react';
import { useSudoku } from '../context/SudokuContext';
import { ACTIONS } from '../context/SudokuContext';

export const useTimer = () => {
  const { state, dispatch } = useSudoku();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(state.timer);
  }, [state.timer]);

  useEffect(() => {
    if (state.gameStarted && !state.gameWon) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          dispatch({ type: ACTIONS.UPDATE_TIMER, payload: newSeconds });
          return newSeconds;
        });
      }, 1000);
    } else if (state.gameWon || !state.gameStarted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.gameStarted, state.gameWon, dispatch]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setSeconds(0);
    dispatch({ type: ACTIONS.UPDATE_TIMER, payload: 0 });
  };

  return { seconds, formatTime, resetTimer };
};