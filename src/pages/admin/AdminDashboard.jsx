import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineChartSquareBar, HiOutlineArrowLeft } from 'react-icons/hi';
import Button from '../../components/common/Button';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-page" style={{ padding: '3.5rem 0', backgroundColor: '#F6F3EC', minHeight: 'calc(100vh - var(--header-height) - 250px)' }}>
      <div className="container">
        {/* Admin Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #D8D2C4', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-secondary)', letterSpacing: '0.08em' }}>Management Console</span>
            <h1 style={{ fontSize: '2rem', color: '#1B2E24' }}>Admin Control Center</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button to="/admin/menu" variant="secondary" size="sm">
              <HiOutlineBookOpen />
              <span>Menu Items</span>
            </Button>
            <Button to="/" variant="outline" size="sm">
              <HiOutlineArrowLeft />
              <span>Customer Site</span>
            </Button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Menu Catalog</span>
              <HiOutlineBookOpen style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
            </div>
            <h3 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Active Menu</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
              Configured for upcoming Phase 5 management.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/admin/menu" style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                Open Menu Manager &rarr;
              </Link>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Kitchen Queue</span>
              <HiOutlineClipboardList style={{ fontSize: '1.5rem', color: 'var(--color-secondary)' }} />
            </div>
            <h3 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Orders Stream</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
              Live customer order tickets and dispatch.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Sales Health</span>
              <HiOutlineChartSquareBar style={{ fontSize: '1.5rem', color: '#B57C1E' }} />
            </div>
            <h3 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>Kitchen Metrics</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
              Revenue and top popular Mexican bases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
