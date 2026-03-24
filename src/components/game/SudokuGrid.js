import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuGrid = ({ board, initialBoard, size }) => {

  if (!board || !initialBoard || !board.length) {
    return <div className="loading">Loading puzzle...</div>;
  }
  
  const getCellClass = (row, col) => {
    const classes = [];
    
    // Add subgrid border classes for 9x9
    if (size === 9) {
      if ((row + 1) % 3 === 0 && row !== 8) classes.push('border-bottom-thick');
      if ((col + 1) % 3 === 0 && col !== 8) classes.push('border-right-thick');
    } else {
      // For 6x6
      if ((row + 1) % 2 === 0 && row !== 5) classes.push('border-bottom-thick');
      if ((col + 1) % 3 === 0 && col !== 5) classes.push('border-right-thick');
    }
    
    return classes.join(' ');
  };
  
  return (
    <div className={`sudoku-grid ${size === 9 ? 'hard-grid' : 'easy-grid'}`}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={getCellClass(rowIndex, colIndex)}>
              <SudokuCell
                row={rowIndex}
                col={colIndex}
                value={cell}
                isPrefilled={initialBoard[rowIndex][colIndex] !== null}
                size={size}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;