import React, { useState, useEffect } from 'react';
import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage     from './pages/HomePage';
import { getSession, saveSession, clearUser } from './utils/auth';

function App() {
  const [page,    setPage]    = useState('home');
  const [session, setSession] = useState(null);   // currently logged-in user

  useEffect(() => {
    const existingSession = getSession();
    if (existingSession) {
      setSession(existingSession);
      setPage('home');
    }
  }, []);

  function handleLogin(user) {
    saveSession(user);
    setSession(user);
    setPage('home');
  }


  function handleLogout() {
    clearUser();          // removes localStorage + sessionStorage entries
    setSession(null);
    setPage('home');
  }

  const goLogin    = () => setPage('login');
  const goRegister = () => setPage('register');
  const goHome     = () => setPage('home');

  // ── Render ──────────────────────────────────────────────────────────────

  if (page === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoRegister={goRegister}
      />
    );
  }

  if (page === 'register') {
    return (
      <RegisterPage
        onGoLogin={goLogin}
      />
    );
  }

  // Default: Home page (handles both logged-in and logged-out states)
  return (
    <HomePage
      user={session}
      onLogout={handleLogout}
      onLoginClick={goLogin}
    />
  );
}

export default App;
