import React, { useState } from 'react';
import { HouseIcon,EyeIcon,EyeSlashIcon } from '../components/Icons';
import { saveUser, validatePassword } from '../utils/auth';
import '../styles/global.css';

function RegisterPage({ onGoLogin }) {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Show / Hide Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation
  const pw = validatePassword(form.password);

  // Update fields
  function updateField(field) {
    return (e) => {
      setForm(prev => ({
        ...prev,
        [field]: e.target.value
      }));

      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    };
  }

  // Validation
  function validate() {

    const e = {};

    if (!form.name.trim()) {
      e.name = 'Full name is required.';
    }

    if (!form.email.trim()) {
      e.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }

    if (!form.password) {
      e.password = 'Password is required.';
    } else if (!pw.ok) {
      e.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
    }

    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match.';
    }

    return e;
  }

  // Submit
  function handleSubmit(e) {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save User
    saveUser({
      name: form.name.trim(),
      email: form.email.toLowerCase().trim(),
      password: form.password,
    });

    setSuccess(true);

    setTimeout(() => {
      onGoLogin();
    }, 1800);
  }

  return (

    <div className="auth-bg">

      <div
        className="auth-card"
        style={{ maxWidth: 520 }}
      >

        {/* Header */}
        <div className="auth-logo">

          <div className="auth-logo-icon">
            <HouseIcon
              size={22}
              color="white"
            />
          </div>

          <h2>Create Account</h2>

          <div className="gold-divider" />

          <p>Join Sowmiya Properties today</p>

        </div>

        {/* Success */}
        {success && (
          <div
            className="alert-success-sp"
            role="status"
          >
            Account created! Redirecting to login…
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {/* Name */}
          <div className="mb-3">

            <label
              className="form-label"
              htmlFor="reg-name"
            >
              Full Name
            </label>

            <input
              id="reg-name"
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Your full name"
              value={form.name}
              onChange={updateField('name')}
              autoFocus
            />

            {errors.name && (
              <div className="invalid-feedback">
                {errors.name}
              </div>
            )}

          </div>

          {/* Email */}
          <div className="mb-3">

            <label
              className="form-label"
              htmlFor="reg-email"
            >
              Email Address
            </label>

            <input
              id="reg-email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="your@email.com"
              value={form.email}
              onChange={updateField('email')}
            />

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}

          </div>

          {/* Password */}
          <div className="mb-3">

            <label
              className="form-label"
              htmlFor="reg-password"
            >
              Password
            </label>

            <div className="position-relative">

              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Create a strong password"
                value={form.password}
                onChange={updateField('password')}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: '18px'
                }}
              >
                {showPassword
  ? <EyeSlashIcon size={18} />
  : <EyeIcon size={18} />
}
              </span>

            </div>

            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}

            {/* Password Requirements */}
            {form.password && (

              <div
                className="pw-badges"
                aria-label="Password requirements"
              >

                <span className={`pw-badge ${pw.hasUpper ? 'pass' : 'fail'}`}>
                  {pw.hasUpper ? '✓' : '○'} A-Z
                </span>

                <span className={`pw-badge ${pw.hasLower ? 'pass' : 'fail'}`}>
                  {pw.hasLower ? '✓' : '○'} a-z
                </span>

                <span className={`pw-badge ${pw.hasNumber ? 'pass' : 'fail'}`}>
                  {pw.hasNumber ? '✓' : '○'} 0-9
                </span>

                <span className={`pw-badge ${pw.hasSymbol ? 'pass' : 'fail'}`}>
                  {pw.hasSymbol ? '✓' : '○'} !@#$%^&*
                </span>

              </div>
            )}

          </div>

          {/* Confirm Password */}
          <div className="mb-4">

            <label
              className="form-label"
              htmlFor="reg-confirm-password"
            >
              Confirm Password
            </label>

            <div className="position-relative">

              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                className={`form-control ${
                  form.confirmPassword &&
                  form.password !== form.confirmPassword
                    ? 'is-invalid'
                    : ''
                }`}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={updateField('confirmPassword')}
              />

              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: '18px'
                }}
              >
                {showConfirmPassword
  ? <EyeSlashIcon size={18} />
  : <EyeIcon size={18} />
}
              </span>

            </div>

            {/* Show Error Only If Passwords Don't Match */}
            {form.confirmPassword &&
              form.password !== form.confirmPassword && (
                <div className="invalid-feedback d-block">
                  Passwords do not match.
                </div>
              )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-gold-sp"
            disabled={success}
          >
            Register
          </button>

        </form>

        {/* Login Switch */}
        <div className="auth-switch">

          Already have an account?&nbsp;

          <button onClick={onGoLogin}>
            Sign in
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;