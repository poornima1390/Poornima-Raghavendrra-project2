import React from 'react';
import '../styles/Auth.css';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Non-functional - just for mock
    console.log('Register submitted (mock)');
  };

  return (
    <div className="auth-page">
      <header className="auth-page-header">
        <h1 className="auth-page-title">Join Sudoku Community</h1>
        <p className="auth-page-subtitle">Create an account and start solving puzzles</p>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h2>Create Account</h2>
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
                placeholder="Choose a username"
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
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">
                <i className="fas fa-lock"></i>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                className="auth-input"
                placeholder="Re-enter password"
              />
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a>
              </label>
            </div>

            <button type="submit" className="auth-btn">
              <i className="fas fa-user-plus"></i>
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <a href="/login">Log in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;