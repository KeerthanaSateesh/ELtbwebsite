import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineTruck,
  HiOutlineChartSquareBar,
  HiOutlinePlus,
  HiArrowRight,
  HiOutlineClock
} from 'react-icons/hi';
import Button from '../../components/common/Button';

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="admin-dashboard-view">
      {/* Header Greeting Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-secondary)', letterSpacing: '0.08em' }}>
            Operations Overview
          </span>
          <h1 style={{ fontSize: '2rem', color: '#1B2E24', margin: '0.25rem 0' }}>Restaurant Command Center</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            {currentDate} &bull; Service is active across Breakfast &amp; Main Grill
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button to="/admin/menu" variant="secondary" size="sm">
            <HiOutlineBookOpen />
            <span>Manage Menu</span>
          </Button>
          <Button to="/admin/purchase-history" variant="outline" size="sm">
            <HiOutlinePlus />
            <span>Record Purchase</span>
          </Button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Card 1: Menu Management */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Menu Catalog
            </span>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem' }}>
              <HiOutlineBookOpen />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', color: '#1B2E24', marginBottom: '0.35rem' }}>Dual Menus</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', margin: 0, flex: 1 }}>
            Mexican Breakfast and All-Day Tacos &amp; Burritos active.
          </p>
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F0ECE1' }}>
            <Link to="/admin/menu" style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>View &amp; Edit Dishes</span>
              <HiArrowRight />
            </Link>
          </div>
        </div>

        {/* Card 2: Kitchen Orders */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Orders Queue
            </span>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem' }}>
              <HiOutlineClipboardList />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', color: '#1B2E24', marginBottom: '0.35rem' }}>Kitchen Stream</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', margin: 0, flex: 1 }}>
            Incoming tickets, preparation statuses, and dispatch.
          </p>
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F0ECE1' }}>
            <Link to="/admin/orders" style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Open Orders Queue</span>
              <HiArrowRight />
            </Link>
          </div>
        </div>

        {/* Card 3: Grocery & Raw Materials */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Purchases
            </span>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem' }}>
              <HiOutlineTruck />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', color: '#1B2E24', marginBottom: '0.35rem' }}>Raw Materials</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', margin: 0, flex: 1 }}>
            Daily supplies: chicken, produce, tortillas, cheese, and oil.
          </p>
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F0ECE1' }}>
            <Link to="/admin/purchase-history" style={{ color: '#B45309', fontWeight: '700', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Purchase History</span>
              <HiArrowRight />
            </Link>
          </div>
        </div>

        {/* Card 4: Reports & Analytics */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Analytics
            </span>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: '#E0E7FF', color: '#3730A3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem' }}>
              <HiOutlineChartSquareBar />
            </div>
          </div>
          <h3 style={{ fontSize: '1.75rem', color: '#1B2E24', marginBottom: '0.35rem' }}>Financial Reports</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.86rem', margin: 0, flex: 1 }}>
            Sales summary, purchase expense totals, and net breakdown.
          </p>
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #F0ECE1' }}>
            <Link to="/admin/reports" style={{ color: '#3730A3', fontWeight: '700', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>Generate Reports</span>
              <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Launchpad & Operating Status */}
      <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#1B2E24', marginBottom: '0.5rem' }}>Restaurant Service Schedule</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Real-time service hours configured in the customer website:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: '#FAF8F4', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🌮</span>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#1B2E24' }}>Tacos &amp; Burritos Main Grill</h4>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                ● All Day Service (Continuous)
              </span>
            </div>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: '#FAF8F4', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🍳</span>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#1B2E24' }}>Mexican Breakfast &amp; Tiffins</h4>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-secondary)' }}>
                ● 7:00 AM – 11:00 AM &bull; 7:00 PM – 11:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
