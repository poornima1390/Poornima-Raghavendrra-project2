import React from 'react';
import '../styles/HighScores.css';

const HighScores = () => {
  const scores = [
    { rank: 1, username: 'MasterKenji', puzzles: 2847, time: '3:42', accuracy: '99.8%', streak: '365 days' },
    { rank: 2, username: 'SudokuLegend', puzzles: 2356, time: '4:15', accuracy: '98.5%', streak: '342 days' },
    { rank: 3, username: 'NumberNinja', puzzles: 2156, time: '4:38', accuracy: '97.9%', streak: '298 days' },
    // Add all scores from Assignment 1
  ];

  return (
    <div className="highscores-page">
      <header className="page-header">
        <h1 className="page-title">Hall of Fame</h1>
        <p className="page-subtitle">Top Sudoku solvers from around the world</p>
      </header>

      <div className="leaderboard-section">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Puzzles Solved</th>
              <th>Best Time</th>
              <th>Accuracy</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(score => (
              <tr key={score.rank}>
                <td>
                  <div className="rank-column">
                    <span className={`rank-badge rank-${score.rank}`}>{score.rank}</span>
                  </div>
                </td>
                <td>
                  <div className="player-info">
                    <div className="player-avatar">{score.username.charAt(0)}</div>
                    <span className="player-name">{score.username}</span>
                  </div>
                </td>
                <td>{score.puzzles}</td>
                <td>{score.time}</td>
                <td>{score.accuracy}</td>
                <td>{score.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighScores;