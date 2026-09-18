import React, { useState, useMemo } from 'react';
import {
  HiOutlineCalendar,
  HiOutlineCurrencyRupee,
  HiOutlineClipboardCheck,
  HiOutlineTruck,
  HiOutlineTrendingUp,
  HiOutlineInformationCircle,
  HiOutlineFilter
} from 'react-icons/hi';

// Baseline fallback data if not in localStorage
const DEFAULT_PURCHASES = [
  { id: 1, date: '2026-09-17', itemName: 'Tomatoes', quantity: '5 kg', price: 200 },
  { id: 2, date: '2026-09-17', itemName: 'Rice', quantity: '10 kg', price: 650 },
  { id: 3, date: '2026-09-17', itemName: 'Cooking Oil', quantity: '5 L', price: 800 },
  { id: 4, date: '2026-09-18', itemName: 'Chicken', quantity: '8 kg', price: 2400 },
  { id: 5, date: '2026-09-18', itemName: 'Oaxaca Cheese', quantity: '4 kg', price: 1600 },
  { id: 6, date: '2026-09-18', itemName: 'Flour Tortillas', quantity: '20 packets', price: 800 },
  { id: 7, date: '2026-09-18', itemName: 'Hass Avocados', quantity: '15 pcs', price: 900 }
];

const DEFAULT_ORDERS = [
  { id: 'ETB-1081', total: 620, status: 'completed', date: '2026-09-17' },
  { id: 'ETB-1082', total: 710, status: 'completed', date: '2026-09-17' },
  { id: 'ETB-1083', total: 548, status: 'completed', date: '2026-09-17' },
  { id: 'ETB-1084', total: 947, status: 'completed', date: '2026-09-17' },
  { id: 'ETB-1085', total: 299, status: 'cancelled', date: '2026-09-17' }
];

export default function AdminReports() {
  // Date filter state
  const todayStr = '2026-09-17';
  const [fromDate, setFromDate] = useState('2026-09-17');
  const [toDate, setToDate] = useState('2026-09-18');
  const [activeQuickFilter, setActiveQuickFilter] = useState('custom');

  // Load real purchase data from localStorage
  const rawPurchases = useMemo(() => {
    try {
      const saved = localStorage.getItem('etb_admin_purchases');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PURCHASES;
  }, []);

  // Filter purchases by date range
  const filteredPurchases = useMemo(() => {
    return rawPurchases.filter(p => {
      if (!p.date) return false;
      const d = p.date;
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
      return true;
    });
  }, [rawPurchases, fromDate, toDate]);

  // Filter orders by date range (excluding cancelled orders)
  const filteredOrders = useMemo(() => {
    return DEFAULT_ORDERS.filter(o => {
      if (!o.date) return false;
      const d = o.date;
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
      return o.status !== 'cancelled';
    });
  }, [fromDate, toDate]);

  // Quick filter presets
  const applyQuickFilter = (type) => {
    setActiveQuickFilter(type);
    if (type === 'today') {
      setFromDate('2026-09-17');
      setToDate('2026-09-17');
    } else if (type === 'week') {
      setFromDate('2026-09-14');
      setToDate('2026-09-20');
    } else if (type === 'month') {
      setFromDate('2026-09-01');
      setToDate('2026-09-30');
    } else if (type === 'all') {
      setFromDate('');
      setToDate('');
    }
  };

  // Calculations
  const totalOrders = filteredOrders.length;
  const totalSales = filteredOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const averageOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  const totalPurchases = filteredPurchases.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const purchaseEntriesCount = filteredPurchases.length;

  const netDifference = totalSales - totalPurchases;

  return (
    <div className="admin-reports-view">
      {/* Top Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', color: '#1B2E24', margin: '0 0 0.25rem 0' }}>Restaurant Management Reports</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Daily sales summary, raw material procurement expenses, and gross financial overview
        </p>
      </div>

      {/* Date Range & Quick Filters Bar */}
      <div className="card" style={{ padding: '1.5rem 1.75rem', marginBottom: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Quick Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1B2E24', marginRight: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <HiOutlineFilter />
                <span>Quick Filters:</span>
              </span>
              <button
                type="button"
                onClick={() => applyQuickFilter('today')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #D8D2C4',
                  backgroundColor: activeQuickFilter === 'today' ? 'var(--color-secondary)' : '#FAFAF8',
                  color: activeQuickFilter === 'today' ? '#FFFFFF' : 'var(--color-text)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => applyQuickFilter('week')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #D8D2C4',
                  backgroundColor: activeQuickFilter === 'week' ? 'var(--color-secondary)' : '#FAFAF8',
                  color: activeQuickFilter === 'week' ? '#FFFFFF' : 'var(--color-text)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                This Week
              </button>
              <button
                type="button"
                onClick={() => applyQuickFilter('month')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #D8D2C4',
                  backgroundColor: activeQuickFilter === 'month' ? 'var(--color-secondary)' : '#FAFAF8',
                  color: activeQuickFilter === 'month' ? '#FFFFFF' : 'var(--color-text)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                This Month
              </button>
              <button
                type="button"
                onClick={() => applyQuickFilter('all')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #D8D2C4',
                  backgroundColor: activeQuickFilter === 'all' ? 'var(--color-secondary)' : '#FAFAF8',
                  color: activeQuickFilter === 'all' ? '#FFFFFF' : 'var(--color-text)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                All Records
              </button>
            </div>
          </div>

          {/* Date Picker Range Inputs */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid #F0ECE1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1B2E24' }}>From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => { setFromDate(e.target.value); setActiveQuickFilter('custom'); }}
                style={{ padding: '0.55rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.88rem' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1B2E24' }}>To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => { setToDate(e.target.value); setActiveQuickFilter('custom'); }}
                style={{ padding: '0.55rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.88rem' }}
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveQuickFilter('applied')}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.86rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: SALES SUMMARY */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <HiOutlineClipboardCheck style={{ fontSize: '1.35rem', color: 'var(--color-primary)' }} />
          <h2 style={{ fontSize: '1.35rem', color: '#1B2E24', margin: 0 }}>Sales Summary</h2>
        </div>

        {totalOrders === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', color: 'var(--color-text-muted)' }}>
            <HiOutlineInformationCircle style={{ fontSize: '2rem', color: '#B45309', marginBottom: '0.5rem' }} />
            <div>No sales report data recorded for the selected date range.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem 1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Total Orders Fulfilled
              </span>
              <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-primary)', marginTop: '0.35rem' }}>
                {totalOrders}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>Completed kitchen tickets</span>
            </div>

            <div className="card" style={{ padding: '1.5rem 1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Total Sales Revenue
              </span>
              <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-primary)', marginTop: '0.35rem' }}>
                ₹{totalSales.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>Gross customer revenue</span>
            </div>

            <div className="card" style={{ padding: '1.5rem 1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Average Order Value (AOV)
              </span>
              <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#1B2E24', marginTop: '0.35rem' }}>
                ₹{averageOrderValue.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>Per customer transaction</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: PURCHASE SUMMARY */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <HiOutlineTruck style={{ fontSize: '1.35rem', color: 'var(--color-secondary)' }} />
          <h2 style={{ fontSize: '1.35rem', color: '#1B2E24', margin: 0 }}>Purchase Summary (Raw Materials)</h2>
        </div>

        {purchaseEntriesCount === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', color: 'var(--color-text-muted)' }}>
            <HiOutlineInformationCircle style={{ fontSize: '2rem', color: '#B45309', marginBottom: '0.5rem' }} />
            <div>No grocery/raw material purchases recorded for the selected date range.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem 1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Total Purchases Expenditure
              </span>
              <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#B45309', marginTop: '0.35rem' }}>
                ₹{totalPurchases.toLocaleString('en-IN')}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>Raw food ingredients &amp; supplies</span>
            </div>

            <div className="card" style={{ padding: '1.5rem 1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Number of Purchase Entries
              </span>
              <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-secondary)', marginTop: '0.35rem' }}>
                {purchaseEntriesCount}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>Procurement transactions</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: EXPENSE / SALES OVERVIEW */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <HiOutlineTrendingUp style={{ fontSize: '1.35rem', color: '#1B2E24' }} />
          <h2 style={{ fontSize: '1.35rem', color: '#1B2E24', margin: 0 }}>Expense / Sales Overview</h2>
        </div>

        {totalOrders === 0 && purchaseEntriesCount === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', color: 'var(--color-text-muted)' }}>
            No report data available yet.
          </div>
        ) : (
          <div className="card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', padding: '1.75rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Total Customer Sales
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', marginTop: '0.35rem' }}>
                  ₹{totalSales.toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Raw Material Purchases
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#B45309', marginTop: '0.35rem' }}>
                  ₹{totalPurchases.toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Net Difference (Gross Margin)
                </span>
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: netDifference >= 0 ? '#15803D' : '#B91C1C',
                  marginTop: '0.35rem'
                }}>
                  {netDifference >= 0 ? '+' : ''}₹{netDifference.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
