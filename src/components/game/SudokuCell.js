import React from 'react';
import { useSudoku } from '../../context/SudokuContext';
import { ACTIONS } from '../../context/SudokuContext';
import { isCellInvalid } from '../../utils/validators';

const SudokuCell = ({ row, col, value, isPrefilled, size }) => {
  const { state, dispatch } = useSudoku();
  const { selectedCell, board } = state;

  // Add safety check for board
  if (!board || !board[row]) {
    return <div className="grid-cell-input loading-cell"></div>;
  }
  
  const isSelected = selectedCell?.row === row && selectedCell?.col === col;
  const isInvalid = isCellInvalid(board, row, col, size);
  
  const handleClick = () => {
    if (!isPrefilled && !state.gameWon) {
      dispatch({ type: ACTIONS.SELECT_CELL, payload: { row, col } });
    }
  };
  
  const handleChange = (e) => {
    if (isPrefilled || state.gameWon) return;
    
    let newValue = e.target.value;
    
    if (newValue === '') {
      dispatch({ type: ACTIONS.UPDATE_CELL, payload: { row, col, value: null } });
      return;
    }
    
    const numValue = parseInt(newValue);
    const maxValue = size === 9 ? 9 : 6;
    
    if (!isNaN(numValue) && numValue >= 1 && numValue <= maxValue) {
      dispatch({ type: ACTIONS.UPDATE_CELL, payload: { row, col, value: numValue } });
    }
  };
  
  const displayValue = value === null || value === 0 ? '' : value;
  
  return (
    <input
      type="text"
      className={`grid-cell-input ${isSelected ? 'selected' : ''} ${isInvalid ? 'invalid' : ''}`}
      value={displayValue}
      onClick={handleClick}
      onChange={handleChange}
      disabled={isPrefilled || state.gameWon}
      maxLength={1}
    />
  );
};

export default SudokuCell;