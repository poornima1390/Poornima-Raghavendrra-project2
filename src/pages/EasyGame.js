import React, { useEffect } from 'react';
import { useSudoku } from '../context/SudokuContext';
import { ACTIONS } from '../context/SudokuContext';
import SudokuGrid from '../components/game/SudokuGrid';
import Timer from '../components/game/Timer';
import GameControls from '../components/game/GameControls';
import '../styles/SudokuGrid.css';

const EasyGame = () => {
  const { state, dispatch } = useSudoku();
  
  useEffect(() => {
    // Set difficulty to easy when page loads
    dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: 'easy' });
  }, [dispatch]);
  
  if (!state.board) {
    return <div className="loading">Loading...</div>;
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
        <GameControls difficulty="easy" />
      </div>
      
      <div className="game-container">
        <SudokuGrid 
          board={state.board} 
          initialBoard={state.initialBoard} 
          size={6}
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
          Gray cells are pre-filled. Click any empty cell and use keyboard (1-6) to fill.
          Numbers that violate Sudoku rules will be highlighted in red.
          
        </p>
      </div>
    </div>
  );
};

export default EasyGame;