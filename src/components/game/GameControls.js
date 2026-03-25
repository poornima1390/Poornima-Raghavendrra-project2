import React from 'react';
import { useSudoku, ACTIONS } from '../../context/SudokuContext';
import HintButton from './HintButton';

const GameControls = () => {
  const { dispatch } = useSudoku();

  const handleNewGame = () => {
    dispatch({ type: ACTIONS.NEW_GAME });
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
      <HintButton />
    </div>
  );
};

export default GameControls;