import React, { useState } from 'react';
import { HouseIcon } from '../components/Icons';
import { getUser, saveSession } from '../utils/auth';
import '../styles/global.css';

/**
 * Login Page
 *
 * Checks the user's name + email against the stored registered user.
 * On success  → calls onLogin(user)
 * On failure  → shows an error with a "Register →" shortcut button
 *
 * Props:
 *   onLogin      — callback(user): called when credentials match
 *   onGoRegister — callback: navigate to the Register page
 */
function LoginPage({ onLogin, onGoRegister }) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Small delay for UX feedback
    setTimeout(() => {
      const storedUser = getUser();

      // Case 1: No registered user at all
      if (!storedUser) {
        setError('No account found. Please register first.');
        setLoading(false);
        return;
      }

      // Case 2: Credentials match → login success
      const nameMatch  = storedUser.name.toLowerCase().trim()  === name.toLowerCase().trim();
      const emailMatch = storedUser.email.toLowerCase().trim() === email.toLowerCase().trim();

      if (nameMatch && emailMatch) {
        saveSession(storedUser);
        onLogin(storedUser);
      } else {
        // Case 3: Credentials don't match
        setError('Name or email does not match your registered account.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <HouseIcon size={22} color="white" />
          </div>
          <h2>Welcome Back</h2>
          <div className="gold-divider" />
          <p>Sign in to Sowmiya Properties</p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="alert-error" role="alert">
            <span>{error}</span>
            <button onClick={onGoRegister}>Register →</button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-name">
              Full Name
            </label>
            <input
              id="login-name"
              type="text"
              className="form-control"
              placeholder="Enter your registered name"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary-sp"
            disabled={loading || !name.trim() || !email.trim()}
          >
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="auth-switch">
          Don't have an account?&nbsp;
          <button onClick={onGoRegister}>Create one here</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
