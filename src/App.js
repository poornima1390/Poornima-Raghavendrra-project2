import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SudokuProvider } from './context/SudokuContext';
import './App.css';

// Import pages
import Home from './pages/Home';
import GameSelection from './pages/GameSelection';
import NormalGame from './pages/NormalGame';
import EasyGame from './pages/EasyGame';
import Rules from './pages/Rules';
import HighScores from './pages/HighScores';
import Login from './pages/Login';
import Register from './pages/Register';

// Import components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <SudokuProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<GameSelection />} />
              <Route path="/games/normal" element={<NormalGame />} />
              <Route path="/games/easy" element={<EasyGame />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/scores" element={<HighScores />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SudokuProvider>
  );
}

export default App;