import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GameSelection.css';

const GameSelection = () => {
  const games = [
    { id: 1, name: 'Morning Sudoku', author: 'Sarah Johnson', difficulty: 'easy', path: '/games/easy' },
    { id: 2, name: 'Afternoon Puzzle', author: 'Michael Chen', difficulty: 'normal', path: '/games/normal' },
    { id: 3, name: 'Evening Challenge', author: 'Emma Rodriguez', difficulty: 'normal', path: '/games/normal' },
    { id: 4, name: 'Weekend Warrior', author: 'David Kim', difficulty: 'easy', path: '/games/easy' },
    { id: 5, name: 'Expert\'s Choice', author: 'Jessica Park', difficulty: 'normal', path: '/games/normal' },
  ];

  return (
    <div className="selection-page">
      <header className="page-header">
        <h1 className="page-title">Game Selection</h1>
        <p className="page-subtitle">Choose a puzzle to solve</p>
      </header>

      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <div className={`difficulty-badge ${game.difficulty}`}>
              {game.difficulty === 'easy' ? 'Easy' : 'Normal'}
            </div>
            <h2 className="game-title">
              <Link to={game.path} className="game-link">
                {game.name}
              </Link>
            </h2>
            <div className="game-author">
              <i className="fas fa-user"></i>
              <span>by {game.author}</span>
            </div>
            <div className="game-card-footer">
              <Link to={game.path} className="btn-play">
                Play <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;