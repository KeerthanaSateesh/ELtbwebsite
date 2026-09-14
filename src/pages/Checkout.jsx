import React from 'react';
import { HiOutlineShieldCheck, HiArrowLeft } from 'react-icons/hi';
import Button from '../components/common/Button';

export default function Checkout() {
  return (
    <div className="checkout-page">
      <div className="container" style={{ padding: '4rem var(--container-padding)' }}>
        <div className="section-header">
          <span className="section-tag">Order Details</span>
          <h1 className="section-title">Checkout &amp; Pickup</h1>
          <p className="section-subtitle">
            Complete your order details for kitchen preparation.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '640px', margin: '0 auto', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem auto' }}>
            <HiOutlineShieldCheck />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>Checkout Ready</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
            The checkout flow with order summary, pickup timings, and kitchen instructions will activate upon selecting items.
          </p>
          <Button to="/menu" variant="primary">
            Start Your Order
          </Button>
        </div>
      </div>
    </div>
  );
}
