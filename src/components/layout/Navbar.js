import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <i className="fas fa-th"></i>
          <span>Sudoku</span>
        </Link>
        
        <ul className="nav-menu">
          <li className={`nav-item ${isActive('/')}`}>
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/games')}`}>
            <Link to="/games" className="nav-link">
              <i className="fas fa-gamepad"></i>
              <span>Game Selection</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/games/normal')}`}>
            <Link to="/games/normal" className="nav-link">
              <i className="fas fa-fire"></i>
              <span>Normal Game</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/games/easy')}`}>
            <Link to="/games/easy" className="nav-link">
              <i className="fas fa-seedling"></i>
              <span>Easy Game</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/rules')}`}>
            <Link to="/rules" className="nav-link">
              <i className="fas fa-book"></i>
              <span>Rules</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/scores')}`}>
            <Link to="/scores" className="nav-link">
              <i className="fas fa-trophy"></i>
              <span>High Scores</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/login')}`}>
            <Link to="/login" className="nav-link">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          </li>
          <li className={`nav-item ${isActive('/register')}`}>
            <Link to="/register" className="nav-link">
              <i className="fas fa-user-plus"></i>
              <span>Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;