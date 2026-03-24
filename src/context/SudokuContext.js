import React, { createContext, useReducer, useContext } from 'react';
import { generateNormalPuzzle, generateEasyPuzzle, copyBoard } from '../utils/sudokuGenerator';
import { checkWin } from '../utils/validators';

// Initial state
const initialState = {
  board: null,
  initialBoard: null,
  selectedCell: null,
  gameWon: false,
  timer: 0,
  gameStarted: false,
  size: 9, // 9 for normal, 6 for easy
  difficulty: 'normal', // 'normal' or 'easy'
};

// Action types
export const ACTIONS = {
  UPDATE_CELL: 'UPDATE_CELL',
  RESET_GAME: 'RESET_GAME',
  NEW_GAME: 'NEW_GAME',
  SELECT_CELL: 'SELECT_CELL',
  SET_GAME_WON: 'SET_GAME_WON',
  UPDATE_TIMER: 'UPDATE_TIMER',
  START_GAME: 'START_GAME',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  SET_BOARD: 'SET_BOARD',
};

// Reducer function
const sudokuReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CELL: {
      const { row, col, value } = action.payload;
      const newBoard = copyBoard(state.board);
      newBoard[row][col] = value === '' || value === null ? null : parseInt(value);
      
      const won = checkWin(newBoard, state.size);
      
      return {
        ...state,
        board: newBoard,
        gameWon: won,
      };
    }
    
    case ACTIONS.RESET_GAME: {
      const resetBoard = copyBoard(state.initialBoard);
      return {
        ...state,
        board: resetBoard,
        gameWon: false,
        selectedCell: null,
      };
    }
    
    case ACTIONS.NEW_GAME: {
      let newBoard;
      if (state.difficulty === 'easy') {
        newBoard = generateEasyPuzzle();
      } else {
        newBoard = generateNormalPuzzle();
      }
      
      return {
        ...state,
        board: copyBoard(newBoard),
        initialBoard: copyBoard(newBoard),
        gameWon: false,
        selectedCell: null,
        timer: 0,
        gameStarted: true,
      };
    }
    
    case ACTIONS.SELECT_CELL: {
      const { row, col } = action.payload;
      const cell = state.board[row][col];
      const isPrefilled = state.initialBoard[row][col] !== null;
      
      // Don't allow selection of prefilled cells
      if (isPrefilled) {
        return { ...state, selectedCell: null };
      }
      
      return {
        ...state,
        selectedCell: { row, col, value: cell },
      };
    }
    
    case ACTIONS.SET_GAME_WON: {
      return {
        ...state,
        gameWon: action.payload,
      };
    }
    
    case ACTIONS.UPDATE_TIMER: {
      return {
        ...state,
        timer: action.payload,
      };
    }
    
    case ACTIONS.START_GAME: {
      return {
        ...state,
        gameStarted: true,
      };
    }
    
    case ACTIONS.SET_DIFFICULTY: {
      let newBoard;
      const size = action.payload === 'easy' ? 6 : 9;
      
      if (action.payload === 'easy') {
        newBoard = generateEasyPuzzle();
      } else {
        newBoard = generateNormalPuzzle();
      }
      
      return {
        ...state,
        difficulty: action.payload,
        size: size,
        board: copyBoard(newBoard),
        initialBoard: copyBoard(newBoard),
        gameWon: false,
        selectedCell: null,
        timer: 0,
        gameStarted: true,
      };
    }
    
    case ACTIONS.SET_BOARD: {
      return {
        ...state,
        board: action.payload.board,
        initialBoard: action.payload.initialBoard,
        size: action.payload.size,
        difficulty: action.payload.difficulty,
      };
    }
    
    default:
      return state;
  }
};

// Create Context
const SudokuContext = createContext();

// Provider component
export const SudokuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sudokuReducer, initialState);
  
  // Initialize with a normal puzzle when the app loads
  React.useEffect(() => {
    if (!state.board) {
      const normalPuzzle = generateNormalPuzzle();
      dispatch({
        type: ACTIONS.SET_BOARD,
        payload: {
          board: copyBoard(normalPuzzle),
          initialBoard: copyBoard(normalPuzzle),
          size: 9,
          difficulty: 'normal',
        },
      });
    }
  }, []);
  
  return (
    <SudokuContext.Provider value={{ state, dispatch }}>
      {children}
    </SudokuContext.Provider>
  );
};

// Custom hook for using context
export const useSudoku = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error('useSudoku must be used within SudokuProvider');
  }
  return context;
};