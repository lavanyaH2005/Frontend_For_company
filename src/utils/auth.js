const USER_KEY    = 'sp_user';
const SESSION_KEY = 'sp_session';

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Saves a new registered user to localStorage. */
export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Marks the user as logged in for the current browser session. */
export function saveSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function validatePassword(password) {
  const hasUpper  = /[A-Z]/.test(password);
  const hasLower  = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?`~]/.test(password);

  return {
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    ok: hasUpper && hasLower && hasNumber && hasSymbol,
  };
}
