import React from 'react';
import '../styles/Auth.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Login submitted (mock)');
  };

  return (
    <div className="auth-page">
      <header className="auth-page-header">
        <h1 className="auth-page-title">Welcome Back</h1>
        <p className="auth-page-subtitle">Log in to continue your Sudoku journey</p>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <h2>Login</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                <i className="fas fa-user"></i>
                Username
              </label>
              <input
                type="text"
                id="username"
                className="auth-input"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="auth-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="auth-btn">
              <i className="fas fa-sign-in-alt"></i>
              Log In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <a href="/register">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;