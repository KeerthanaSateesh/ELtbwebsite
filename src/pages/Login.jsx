import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import Button from '../components/common/Button';
import { loginCustomer } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success message passed from registration or redirect
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your username or phone number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await loginCustomer(identifier.trim(), password);

      // Store token / user if provided by backend
      if (response?.token) {
        localStorage.setItem('etb_auth_token', response.token);
      }
      if (response?.user) {
        localStorage.setItem('etb_customer_user', JSON.stringify(response.user));
      }

      // Navigate to homepage or target
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(
        err.message ||
          'Login failed: Backend service (POST /api/auth/login) returned an error or is not reachable.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container" style={{ padding: '4.5rem var(--container-padding)' }}>
        <div className="card" style={{ maxWidth: '460px', margin: '0 auto', padding: '3rem 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag" style={{ marginBottom: '0.75rem' }}>Customer Portal</span>
            <h1 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Sign in to manage your favorites and order history.
            </p>
          </div>

          {/* Flash Success Message (e.g. from registration) */}
          {successMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#E8F5E9',
                border: '1px solid #C8E6C9',
                color: '#1B5E20',
                fontSize: '0.88rem',
                marginBottom: '1.25rem',
              }}
            >
              <HiOutlineCheckCircle style={{ fontSize: '1.35rem', flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Inline Error Message */}
          {errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FEE2E2',
                border: '1px solid #FECACA',
                color: '#B91C1C',
                fontSize: '0.88rem',
                marginBottom: '1.25rem',
              }}
            >
              <HiOutlineExclamationCircle style={{ fontSize: '1.25rem', flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Unified Identifier Field: Username or Phone Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Username or Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. carlos_m or +91 98765 43210"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  autoCapitalize="none"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.92rem',
                  }}
                />
                <HiOutlineUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>
                  Password
                </label>
                <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '600' }}>
                  Forgot?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.92rem',
                  }}
                />
                <HiOutlineLockClosed style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" size="md" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem' }}>
              {isSubmitting ? 'Signing in...' : 'LOGIN'}
            </Button>

            {/* Switch to Create Account */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Don't have an account yet?{' '}
              <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
