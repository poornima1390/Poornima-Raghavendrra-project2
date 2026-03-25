import React, { createContext, useReducer, useContext, useEffect, useRef } from 'react';
import { generateNormalPuzzle, generateEasyPuzzle, copyBoard } from '../utils/sudokuGenerator';
import { checkWin } from '../utils/validators';

// Local storage keys for each difficulty
const STORAGE_KEYS = {
  normal: 'sudoku_game_state_normal',
  easy: 'sudoku_game_state_easy',
};

// Initial state for each difficulty
const getInitialState = (difficulty) => ({
  board: null,
  initialBoard: null,
  selectedCell: null,
  gameWon: false,
  timer: 0,
  gameStarted: false,
  size: difficulty === 'easy' ? 6 : 9,
  difficulty: difficulty,
});

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
  SWITCH_GAME: 'SWITCH_GAME',
  LOAD_SAVED_GAME: 'LOAD_SAVED_GAME',
  CLEAR_SAVED_GAME: 'CLEAR_SAVED_GAME',
};

// Get storage key for difficulty
const getStorageKey = (difficulty) => {
  return difficulty === 'easy' ? STORAGE_KEYS.easy : STORAGE_KEYS.normal;
};

// Save state to localStorage for specific difficulty
const saveToLocalStorage = (state) => {
  try {
    if (!state.board) return;
    
    const gameState = {
      board: state.board,
      initialBoard: state.initialBoard,
      timer: state.timer,
      gameWon: state.gameWon,
      gameStarted: state.gameStarted,
      size: state.size,
      difficulty: state.difficulty,
      lastUpdated: new Date().toISOString(),
    };
    const key = getStorageKey(state.difficulty);
    localStorage.setItem(key, JSON.stringify(gameState));
    console.log(`Saved ${state.difficulty} game to localStorage - timer:`, state.timer);
  } catch (error) {
    console.error('Failed to save game to localStorage:', error);
  }
};

// Load state from localStorage for specific difficulty
export const loadFromLocalStorage = (difficulty) => {
  try {
    const key = getStorageKey(difficulty);
    const saved = localStorage.getItem(key);
    console.log(`Loading ${difficulty} game from localStorage:`, saved ? 'found' : 'not found');
    
    if (saved) {
      const gameState = JSON.parse(saved);
      if (gameState.board && gameState.board.length > 0) {
        console.log(` Loaded ${difficulty} game with timer:`, gameState.timer);
        return gameState;
      }
    }
  } catch (error) {
    console.error('Failed to load game from localStorage:', error);
  }
  return null;
};

// Clear localStorage for specific difficulty
const clearLocalStorage = (difficulty) => {
  try {
    const key = getStorageKey(difficulty);
    localStorage.removeItem(key);
    console.log(` Cleared localStorage for ${difficulty} game`);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};

// Main state that holds both game states
const mainInitialState = {
  currentDifficulty: 'normal',
  normal: getInitialState('normal'),
  easy: getInitialState('easy'),
};

// Reducer function
const sudokuReducer = (state, action) => {
  let currentGame = state[state.currentDifficulty];
  let newGameState;
  
  switch (action.type) {
    case ACTIONS.SWITCH_GAME: {
      const newDifficulty = action.payload;
      console.log(` Switching from ${state.currentDifficulty} to ${newDifficulty}`);
      return {
        ...state,
        currentDifficulty: newDifficulty,
      };
    }
    
    case ACTIONS.UPDATE_CELL: {
      const { row, col, value } = action.payload;
      if (!currentGame.board) return state;
      
      const newBoard = copyBoard(currentGame.board);
      newBoard[row][col] = value === '' || value === null ? null : parseInt(value);
      
      const won = checkWin(newBoard, currentGame.size);
      
      newGameState = {
        ...currentGame,
        board: newBoard,
        gameWon: won,
      };
      
      // Save to localStorage after update
      if (!won) {
        saveToLocalStorage(newGameState);
      } else {
        clearLocalStorage(currentGame.difficulty);
      }
      
      return {
        ...state,
        [state.currentDifficulty]: newGameState,
      };
    }
    
    case ACTIONS.RESET_GAME: {
      if (!currentGame.initialBoard) return state;
      const resetBoard = copyBoard(currentGame.initialBoard);
      
      newGameState = {
        ...currentGame,
        board: resetBoard,
        gameWon: false,
        selectedCell: null,
        timer: 0,
      };
      
      saveToLocalStorage(newGameState);
      
      return {
        ...state,
        [state.currentDifficulty]: newGameState,
      };
    }
    
    case ACTIONS.NEW_GAME: {
      let newBoard;
      if (currentGame.difficulty === 'easy') {
        newBoard = generateEasyPuzzle();
      } else {
        newBoard = generateNormalPuzzle();
      }
      
      newGameState = {
        ...currentGame,
        board: copyBoard(newBoard),
        initialBoard: copyBoard(newBoard),
        gameWon: false,
        selectedCell: null,
        timer: 0,
        gameStarted: true,
      };
      
      clearLocalStorage(currentGame.difficulty);
      saveToLocalStorage(newGameState);
      
      return {
        ...state,
        [state.currentDifficulty]: newGameState,
      };
    }
    
    case ACTIONS.SELECT_CELL: {
      const { row, col } = action.payload;
      if (!currentGame.board || !currentGame.initialBoard) return state;
      
      const isPrefilled = currentGame.initialBoard[row] && currentGame.initialBoard[row][col] !== null;
      
      if (isPrefilled) {
        return {
          ...state,
          [state.currentDifficulty]: { ...currentGame, selectedCell: null },
        };
      }
      
      return {
        ...state,
        [state.currentDifficulty]: {
          ...currentGame,
          selectedCell: { row, col, value: currentGame.board[row][col] },
        },
      };
    }
    
    case ACTIONS.SET_GAME_WON: {
      newGameState = {
        ...currentGame,
        gameWon: action.payload,
      };
      if (action.payload) {
        clearLocalStorage(currentGame.difficulty);
      }
      
      return {
        ...state,
        [state.currentDifficulty]: newGameState,
      };
    }
    
    case ACTIONS.UPDATE_TIMER: {
      newGameState = {
        ...currentGame,
        timer: action.payload,
      };
      
      // Save timer state every 5 seconds
      if (currentGame.board && !currentGame.gameWon && action.payload % 5 === 0) {
        saveToLocalStorage(newGameState);
      }
      
      return {
        ...state,
        [state.currentDifficulty]: newGameState,
      };
    }
    
    case ACTIONS.START_GAME: {
      newGameState = {
        ...currentGame,
        gameStarted: true,
      };
      saveToLocalStorage(newGameState);
      
      return {
        ...state,
        [state.currentDifficulty]: newGameState,
      };
    }
    
    case ACTIONS.SET_BOARD: {
      const { difficulty, board, initialBoard, size, timer, gameWon } = action.payload;
      
      newGameState = {
        difficulty,
        size,
        board,
        initialBoard,
        timer: timer || 0,
        gameWon: gameWon || false,
        gameStarted: true,
        selectedCell: null,
      };
      
      return {
        ...state,
        [difficulty]: newGameState,
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
  const [state, dispatch] = useReducer(sudokuReducer, mainInitialState);
  const isInitialized = useRef({ normal: false, easy: false });

  // Load saved games on initial mount
  useEffect(() => {
    console.log('🔄 SudokuProvider mounted');
    
    // Load normal game
    if (!isInitialized.current.normal) {
      const savedNormal = loadFromLocalStorage('normal');
      if (savedNormal && savedNormal.board) {
        console.log(' Loading saved normal game');
        dispatch({
          type: ACTIONS.SET_BOARD,
          payload: {
            difficulty: 'normal',
            board: savedNormal.board,
            initialBoard: savedNormal.initialBoard,
            size: 9,
            timer: savedNormal.timer,
            gameWon: savedNormal.gameWon,
          }
        });
      } else if (!state.normal.board) {
        console.log(' Generating new normal puzzle');
        const normalPuzzle = generateNormalPuzzle();
        dispatch({
          type: ACTIONS.SET_BOARD,
          payload: {
            difficulty: 'normal',
            board: copyBoard(normalPuzzle),
            initialBoard: copyBoard(normalPuzzle),
            size: 9,
            timer: 0,
            gameWon: false,
          }
        });
      }
      isInitialized.current.normal = true;
    }
    
    // Load easy game
    if (!isInitialized.current.easy) {
      const savedEasy = loadFromLocalStorage('easy');
      if (savedEasy && savedEasy.board) {
        console.log(' Loading saved easy game');
        dispatch({
          type: ACTIONS.SET_BOARD,
          payload: {
            difficulty: 'easy',
            board: savedEasy.board,
            initialBoard: savedEasy.initialBoard,
            size: 6,
            timer: savedEasy.timer,
            gameWon: savedEasy.gameWon,
          }
        });
      } else if (!state.easy.board) {
        console.log(' Generating new easy puzzle');
        const easyPuzzle = generateEasyPuzzle();
        dispatch({
          type: ACTIONS.SET_BOARD,
          payload: {
            difficulty: 'easy',
            board: copyBoard(easyPuzzle),
            initialBoard: copyBoard(easyPuzzle),
            size: 6,
            timer: 0,
            gameWon: false,
          }
        });
      }
      isInitialized.current.easy = true;
    }
  }, []);

  // Get current game state
  const currentGame = state[state.currentDifficulty];
  
  //  Log state changes
  useEffect(() => {
    if (currentGame?.board) {
      console.log(` Current ${state.currentDifficulty} game:`, {
        difficulty: currentGame.difficulty,
        timer: currentGame.timer,
        gameWon: currentGame.gameWon,
        boardSize: currentGame.board.length,
      });
    }
  }, [state.currentDifficulty, currentGame]);

  return (
    <SudokuContext.Provider value={{ state, dispatch, currentGame: currentGame }}>
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