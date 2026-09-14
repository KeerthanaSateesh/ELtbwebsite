import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import Button from '../../components/common/Button';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // In Phase 5 this will check credentials with admin role in AuthContext
    navigate('/admin');
  };

  return (
    <div className="admin-login-page" style={{ minHeight: 'calc(100vh - var(--header-height) - 300px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', backgroundColor: '#F4F1EA' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '3rem 2.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D6D1C4', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1rem' }}>
            <HiOutlineShieldCheck />
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#1B2E24', marginBottom: '0.4rem' }}>ETB Admin Portal</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Authorized restaurant management &amp; kitchen controls
          </p>
        </div>

        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem', color: '#1B2E24' }}>
              Admin Identifier
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="admin@eltacos.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #D6D1C4', backgroundColor: '#FDFCFA' }}
              />
              <HiOutlineUser style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#7D6B61', fontSize: '1.1rem' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem', color: '#1B2E24' }}>
              Security Key / Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #D6D1C4', backgroundColor: '#FDFCFA' }}
              />
              <HiOutlineLockClosed style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#7D6B61', fontSize: '1.1rem' }} />
            </div>
          </div>

          <Button type="submit" variant="secondary" size="md" style={{ width: '100%', marginTop: '0.5rem' }}>
            Access Dashboard
          </Button>

          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
              &larr; Return to Customer Website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
