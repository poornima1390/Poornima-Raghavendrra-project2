import React from 'react';
import { useSudoku } from '../../context/SudokuContext';
import { ACTIONS } from '../../context/SudokuContext';
import { useTimer } from '../../hooks/useTimer';

const GameControls = ({ difficulty }) => {
  const { dispatch } = useSudoku();
  const { resetTimer } = useTimer();

  const handleNewGame = () => {
    dispatch({ type: ACTIONS.NEW_GAME });
    resetTimer();
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  return (
    <div className="game-actions">
      <button onClick={handleNewGame} className="game-action-btn">
        <i className="fas fa-plus-circle"></i>
        New Game
      </button>
      <button onClick={handleReset} className="game-action-btn">
        <i className="fas fa-redo-alt"></i>
        Reset
      </button>
    </div>
  );
};

export default GameControls;