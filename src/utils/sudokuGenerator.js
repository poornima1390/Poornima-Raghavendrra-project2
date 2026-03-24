// Generate empty board
export const generateEmptyBoard = (size = 9) => {
  return Array(size).fill().map(() => Array(size).fill(null));
};

// Check if a number placement is valid
export const isValidPlacement = (board, row, col, num, size) => {
  // Add null/undefined checks
  if (!board || !board[row]) return false;
  if (num === null || num === 0 || num === '') return true;
  
  // Check row
  for (let x = 0; x < size; x++) {
    if (board[row][x] === num && x !== col) return false;
  }
  
  // Check column
  for (let x = 0; x < size; x++) {
    if (board[x] && board[x][col] === num && x !== row) return false;
  }
  
  // Determine subgrid dimensions
  const subgridRows = size === 9 ? 3 : 2;
  const subgridCols = size === 9 ? 3 : 3;
  
  const startRow = Math.floor(row / subgridRows) * subgridRows;
  const startCol = Math.floor(col / subgridCols) * subgridCols;
  
  for (let i = 0; i < subgridRows; i++) {
    for (let j = 0; j < subgridCols; j++) {
      const checkRow = startRow + i;
      const checkCol = startCol + j;
      if (board[checkRow] && board[checkRow][checkCol] === num && 
          (checkRow !== row || checkCol !== col)) {
        return false;
      }
    }
  }
  
  return true;
};

// Check if entire board is complete and valid
export const isBoardComplete = (board, size) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const value = board[i][j];
      if (value === null || value === 0 || value === '') return false;
      if (!isValidPlacement(board, i, j, value, size)) return false;
    }
  }
  return true;
};

// Generate a complete solved Sudoku board (backtracking)
const solveSudoku = (board, size) => {
  const subgridRows = size === 9 ? 3 : 2;
  const subgridCols = size === 9 ? 3 : 3;
  
  const findEmpty = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === null || board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  };
  
  const isValid = (num, row, col) => {
    // Check row
    for (let x = 0; x < size; x++) {
      if (board[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < size; x++) {
      if (board[x][col] === num) return false;
    }
    
    // Check subgrid
    const startRow = Math.floor(row / subgridRows) * subgridRows;
    const startCol = Math.floor(col / subgridCols) * subgridCols;
    
    for (let i = 0; i < subgridRows; i++) {
      for (let j = 0; j < subgridCols; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    
    return true;
  };
  
  const solve = () => {
    const empty = findEmpty();
    if (!empty) return true;
    
    const [row, col] = empty;
    const numbers = [...Array(size).keys()].map(i => i + 1);
    
    // Shuffle numbers for randomness
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    for (let num of numbers) {
      if (isValid(num, row, col)) {
        board[row][col] = num;
        if (solve()) return true;
        board[row][col] = null;
      }
    }
    
    return false;
  };
  
  solve();
  return board;
};

// Generate a puzzle by removing cells from a solved board
const removeCells = (board, cellsToRemove, size) => {
  const puzzle = board.map(row => [...row]);
  let removed = 0;
  
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      removed++;
    }
  }
  
  return puzzle;
};

// Generate normal puzzle (9x9, 28-30 filled cells)
export const generateNormalPuzzle = () => {
  const size = 9;
  const emptyBoard = generateEmptyBoard(size);
  const solvedBoard = solveSudoku(emptyBoard, size);
  const cellsToFill = Math.floor(Math.random() * 3) + 28; // 28-30 cells
  const cellsToRemove = (size * size) - cellsToFill;
  return removeCells(solvedBoard, cellsToRemove, size);
};

// Generate easy puzzle (6x6, half board filled = 18 cells)
export const generateEasyPuzzle = () => {
  const size = 6;
  const emptyBoard = generateEmptyBoard(size);
  const solvedBoard = solveSudoku(emptyBoard, size);
  const cellsToFill = 18; // Half of 36
  const cellsToRemove = (size * size) - cellsToFill;
  return removeCells(solvedBoard, cellsToRemove, size);
};

// Deep copy a board
export const copyBoard = (board) => {
  return board.map(row => [...row]);
};