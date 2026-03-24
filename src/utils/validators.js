import { isValidPlacement, isBoardComplete } from './sudokuGenerator';

// Check if a specific cell is invalid
export const isCellInvalid = (board, row, col, size) => {
  // Add null/undefined checks
  if (!board || !board[row] || board[row][col] === null || board[row][col] === 0 || board[row][col] === '') {
    return false;
  }
  return !isValidPlacement(board, row, col, board[row][col], size);
};

// Get all invalid cells on the board
export const getInvalidCells = (board, size) => {
  // Add null/undefined check
  if (!board) return [];
  
  const invalidCells = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (isCellInvalid(board, i, j, size)) {
        invalidCells.push([i, j]);
      }
    }
  }
  return invalidCells;
};

// Check if the board is complete and valid
export const checkWin = (board, size) => {
  // Add null/undefined check
  if (!board) return false;
  return isBoardComplete(board, size);
};