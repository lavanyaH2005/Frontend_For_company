# Sowmiya Properties — React + Bootstrap App

A fully client-side real-estate frontend with Login, Register and Home pages.
No backend — all user data is stored in `localStorage`.

---

## Project Structure

```
sowmiya-properties/
├── index.html                   ← Vite entry point (Bootstrap + Google Fonts CDN)
├── vite.config.js               ← Vite + React plugin config
├── package.json
└── src/
    ├── main.jsx                 ← ReactDOM root render
    ├── App.jsx                  ← Page router & auth state owner
    ├── utils/
    │   └── auth.js              ← localStorage helpers & password validator
    ├── components/
    │   ├── Navbar.jsx           ← Sticky top navbar (Login / Logout toggle)
    │   └── Icons.jsx            ← Shared inline SVG icon components
    ├── pages/
    │   ├── LoginPage.jsx        ← Name + Email login form
    │   ├── RegisterPage.jsx     ← Registration form with live password badges
    │   └── HomePage.jsx         ← Landing page with properties, stats, contact
    └── styles/
        ├── global.css           ← CSS variables, auth card, shared form styles
        ├── Navbar.css           ← Navbar-specific styles
        └── HomePage.css         ← Home page section styles
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## User Flow

```
Home Page (logged out — Login button visible)
    ↓ click Login
Login Page  ─── wrong credentials ──→  Error + "Register →" link
    │                                          ↓
    │                                   Register Page
    │                                   (name, email, password, confirm email)
    │                                          ↓ submit
    │                                   ← back to Login Page
    ↓ correct credentials
Home Page (logged in — Logout button visible, Welcome banner shown)
    ↓ click Logout
Home Page (logged out — ALL data wiped, must re-register)
```

---

## Password Rules (Register Page)

The password must contain **all four** of:
- **A–Z** — at least one uppercase letter
- **a–z** — at least one lowercase letter
- **0–9** — at least one digit
- **#!@** — at least one symbol (`!@#$%^&*` etc.)

Live green/grey badges show which rules are satisfied as the user types.

---

## Logout Behaviour

Clicking **Logout** calls `clearUser()` which removes:
- `sp_user` from `localStorage` (the registered user record)
- `sp_session` from `sessionStorage` (the active login session)

After logout, the user **cannot log in again** without re-registering.

---

## Customisation Tips

| What to change | Where |
|---|---|
| Brand colours | `src/styles/global.css` — edit CSS variables in `:root` |
| Property listings | `src/pages/HomePage.jsx` — edit the `PROPERTIES` array |
| Contact details | `src/pages/HomePage.jsx` — edit the `CONTACT_ITEMS` array |
| Stats bar numbers | `src/pages/HomePage.jsx` — edit the `STATS` array |
| Password rules | `src/utils/auth.js` — edit `validatePassword()` |
