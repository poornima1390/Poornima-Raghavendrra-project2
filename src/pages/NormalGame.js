import React, { useEffect } from 'react';
import { useSudoku, ACTIONS } from '../context/SudokuContext';
import SudokuGrid from '../components/game/SudokuGrid';
import Timer from '../components/game/Timer';
import GameControls from '../components/game/GameControls';
import '../styles/SudokuGrid.css';

const NormalGame = () => {
  const { state, dispatch, currentGame } = useSudoku();
  
  // Switch to normal game mode when component mounts
  useEffect(() => {
    if (state.currentDifficulty !== 'normal') {
      console.log('Switching to normal game mode');
      dispatch({ type: ACTIONS.SWITCH_GAME, payload: 'normal' });
    }
  }, [dispatch, state.currentDifficulty]);
  
  // Show loading state
  if (!currentGame?.board) {
    return <div className="loading">Loading puzzle...</div>;
  }
  
  // Verify this is a 9x9 board (normal mode)
  if (currentGame.board.length !== 9) {
    console.log('Board size mismatch, reloading...');
    return <div className="loading">Loading 9x9 puzzle...</div>;
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
        <GameControls />
      </div>
      
      <div className="game-container">
        <SudokuGrid 
          board={currentGame.board} 
          initialBoard={currentGame.initialBoard} 
          size={9}
        />
      </div>
      
      {currentGame.gameWon && (
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