import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import Button from '../components/common/Button';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 3 will connect to centralized AuthContext
    alert('Authentication flow will connect in Phase 3.');
  };

  return (
    <div className="login-page">
      <div className="container" style={{ padding: '4.5rem var(--container-padding)' }}>
        <div className="card" style={{ maxWidth: '460px', margin: '0 auto', padding: '3rem 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag" style={{ marginBottom: '0.75rem' }}>Customer Portal</span>
            <h1 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Sign in to manage your favorites and order history.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Email or Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 555-0199"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlineMail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

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
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlineLockClosed style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" style={{ width: '100%', marginTop: '0.5rem' }}>
              Sign In
            </Button>

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
