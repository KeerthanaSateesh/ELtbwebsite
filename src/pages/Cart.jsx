import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiArrowLeft } from 'react-icons/hi';
import Button from '../components/common/Button';

export default function Cart() {
  return (
    <div className="cart-page">
      <div className="container" style={{ padding: '4rem var(--container-padding)' }}>
        <div className="section-header">
          <span className="section-tag">Your Feast</span>
          <h1 className="section-title">Your Order Cart</h1>
          <p className="section-subtitle">
            Review your customized Mexican culinary selections before checkout.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '640px', margin: '0 auto', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.5rem auto' }}>
            <HiOutlineShoppingBag />
          </div>
          <h3 style={{ marginBottom: '0.75rem' }}>Your Cart is Currently Empty</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Explore our handcrafted tacos, burritos, and signature birria dishes to build your meal.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Button to="/menu" variant="primary">
              Browse Menu
            </Button>
            <Button to="/" variant="outline">
              <HiArrowLeft />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
