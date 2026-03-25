import React, { useEffect } from 'react';
import { useSudoku, ACTIONS } from '../context/SudokuContext';
import SudokuGrid from '../components/game/SudokuGrid';
import Timer from '../components/game/Timer';
import GameControls from '../components/game/GameControls';
import '../styles/SudokuGrid.css';

const EasyGame = () => {
  const { state, dispatch, currentGame } = useSudoku();
  
  // Switch to easy game mode when component mounts
  useEffect(() => {
    if (state.currentDifficulty !== 'easy') {
      console.log('Switching to easy game mode');
      dispatch({ type: ACTIONS.SWITCH_GAME, payload: 'easy' });
    }
  }, [dispatch, state.currentDifficulty]);
  
  // Show loading state
  if (!currentGame?.board) {
    return <div className="loading">Loading puzzle...</div>;
  }
  
  // Verify this is a 6x6 board (easy mode)
  if (currentGame.board.length !== 6) {
    console.log('Board size mismatch, reloading...');
    return <div className="loading">Loading 6x6 puzzle...</div>;
  }
  
  return (
    <div className="game-page easy-game">
      <header className="game-page-header">
        <h1 className="game-page-title">Easy Sudoku</h1>
        <p className="game-page-subtitle">6x6 Grid - Perfect for beginners</p>
      </header>
      
      <div className="game-controls">
        <Timer />
        <div className="difficulty-badge-game easy">
          <i className="fas fa-seedling"></i>
          <span>Easy Mode • 6x6</span>
        </div>
        <GameControls />
      </div>
      
      <div className="game-container">
        <SudokuGrid 
          board={currentGame.board} 
          initialBoard={currentGame.initialBoard} 
          size={6}
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
          Gray cells are pre-filled. Click any empty cell and use keyboard (1-6) to fill.
          Numbers that violate Sudoku rules will be highlighted in red.
          
        </p>
      </div>
    </div>
  );
};

export default EasyGame;