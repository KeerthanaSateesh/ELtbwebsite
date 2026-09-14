import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import Button from '../components/common/Button';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Phase 3 will connect to centralized AuthContext
    alert('Registration flow will connect in Phase 3.');
  };

  return (
    <div className="register-page">
      <div className="container" style={{ padding: '4.5rem var(--container-padding)' }}>
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag" style={{ marginBottom: '0.75rem' }}>Join the Flavor Club</span>
            <h1 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Create an Account</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Enjoy faster checkout, saved customized bowls, and exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Carlos Mendoza"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlineUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlinePhone style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlineMail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlineLockClosed style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
                />
                <HiOutlineLockClosed style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '1.2rem' }} />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" style={{ width: '100%', marginTop: '0.5rem' }}>
              Create Account
            </Button>

            <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Already registered?{' '}
              <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
