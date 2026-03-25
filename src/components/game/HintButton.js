import React, { useState } from 'react';
import { useSudoku, ACTIONS } from '../../context/SudokuContext';
import { isValidPlacement } from '../../utils/sudokuGenerator';

const HintButton = () => {
  const { state, dispatch, currentGame } = useSudoku();
  const [highlightedCell, setHighlightedCell] = useState(null);

  const findHint = () => {
    if (!currentGame?.board || currentGame?.gameWon) return null;
    
    const { board, size, initialBoard } = currentGame;
    
    // First pass: find cells with only one valid number
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // Skip pre-filled cells
        if (initialBoard[row] && initialBoard[row][col] !== null) continue;
        
        const currentValue = board[row][col];
        if (currentValue !== null && currentValue !== 0 && currentValue !== '') continue;
        
        // Find all valid numbers for this empty cell
        const validNumbers = [];
        for (let num = 1; num <= size; num++) {
          if (isValidPlacement(board, row, col, num, size)) {
            validNumbers.push(num);
          }
        }
        
        // If only one valid number, this is a perfect hint
        if (validNumbers.length === 1) {
          return { row, col, value: validNumbers[0] };
        }
      }
    }
    
    // Second pass: find cell with fewest possibilities
    let bestCell = null;
    let minPossibilities = size + 1;
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (initialBoard[row] && initialBoard[row][col] !== null) continue;
        
        const currentValue = board[row][col];
        if (currentValue !== null && currentValue !== 0 && currentValue !== '') continue;
        
        const validNumbers = [];
        for (let num = 1; num <= size; num++) {
          if (isValidPlacement(board, row, col, num, size)) {
            validNumbers.push(num);
          }
        }
        
        if (validNumbers.length > 0 && validNumbers.length < minPossibilities) {
          minPossibilities = validNumbers.length;
          bestCell = { row, col, value: validNumbers[0] };
        }
      }
    }
    
    return bestCell;
  };

  const handleHint = () => {
    const hint = findHint();
    
    if (!hint) {
      alert('No hints available! The puzzle might be complete or stuck.');
      return;
    }
    
    // Highlight the hint cell
    setHighlightedCell({ row: hint.row, col: hint.col });
    
    // Find the cell element and add highlight class
    const cellElement = document.querySelector(`.grid-cell-input[data-row="${hint.row}"][data-col="${hint.col}"]`);
    if (cellElement) {
      cellElement.classList.add('hint-highlight');
      
      // Scroll to the cell
      cellElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Remove highlight after 2 seconds
      setTimeout(() => {
        cellElement.classList.remove('hint-highlight');
        setHighlightedCell(null);
      }, 2000);
    }
  };

  return (
    <button onClick={handleHint} className="game-action-btn hint-btn" disabled={currentGame?.gameWon}>
      <i className="fas fa-lightbulb"></i>
      Hint
    </button>
  );
};

export default HintButton;