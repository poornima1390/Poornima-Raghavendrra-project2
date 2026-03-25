import React from 'react';
import { useSudoku, ACTIONS } from '../../context/SudokuContext';
import { isCellInvalid } from '../../utils/validators';

const SudokuCell = ({ row, col, value, isPrefilled, size }) => {
  const { state, dispatch, currentGame } = useSudoku();
  
  const isSelected = currentGame?.selectedCell?.row === row && 
                     currentGame?.selectedCell?.col === col;
  
  
  const isInvalid = !isPrefilled && value && currentGame?.board && 
                    isCellInvalid(currentGame.board, row, col, size);
  
  const handleClick = () => {
    if (!isPrefilled && !currentGame?.gameWon) {
      dispatch({ type: ACTIONS.SELECT_CELL, payload: { row, col } });
    }
  };
  
  const handleChange = (e) => {
    if (isPrefilled || currentGame?.gameWon) return;
    
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
  
  const displayValue = value === null || value === 0 || value === '' ? '' : value;
  
  return (
    <input
      type="text"
      className={`grid-cell-input ${isSelected ? 'selected' : ''} ${isInvalid ? 'invalid' : ''}`}
      value={displayValue}
      onClick={handleClick}
      onChange={handleChange}
      disabled={isPrefilled || currentGame?.gameWon}
      maxLength={1}
      data-row={row}
      data-col={col}
    />
  );
};

export default SudokuCell;