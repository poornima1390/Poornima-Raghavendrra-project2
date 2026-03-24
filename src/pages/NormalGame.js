import React, { useEffect } from 'react';
import { useSudoku } from '../context/SudokuContext';
import { ACTIONS } from '../context/SudokuContext';
import SudokuGrid from '../components/game/SudokuGrid';
import Timer from '../components/game/Timer';
import GameControls from '../components/game/GameControls';
import '../styles/SudokuGrid.css';

const NormalGame = () => {
  const { state, dispatch } = useSudoku();
  
  useEffect(() => {
    // Set difficulty to normal when page loads
    dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: 'normal' });
  }, [dispatch]);
  
  if (!state.board) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="game-page normal-game">
      <header className="game-page-header">
        <h1 className="game-page-title">Normal Sudoku</h1>
        <p className="game-page-subtitle">9x9 Grid - Challenge yourself</p>
      </header>
      
      <div className="game-controls">
        <Timer />
        <div className="difficulty-badge-game hard">
          <i className="fas fa-fire"></i>
          <span>Normal Mode • 9x9</span>
        </div>
        <GameControls difficulty="normal" />
      </div>
      
      <div className="game-container">
        <SudokuGrid 
          board={state.board} 
          initialBoard={state.initialBoard} 
          size={9}
        />
      </div>
      
      {state.gameWon && (
        <div className="congratulations-message">
          <i className="fas fa-trophy"></i>
          <h2>Congratulations!</h2>
          <p>You've completed the puzzle!</p>
        </div>
      )}
      
      <div className="game-instructions">
        <p>
          <i className="fas fa-info-circle"></i>
          Gray cells are pre-filled. Click any empty cell and use keyboard (1-9) to fill.
          Numbers that violate Sudoku rules will be highlighted in red.
          
        </p>
      </div>
    </div>
  );
};

export default NormalGame;