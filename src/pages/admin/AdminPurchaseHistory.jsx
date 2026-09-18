import React, { useState, useEffect } from 'react';
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineCalendar,
  HiOutlineTruck
} from 'react-icons/hi';
import Button from '../../components/common/Button';

// Initial seed grocery/raw material purchase data
const DEFAULT_PURCHASES = [
  { id: 1, date: '2026-09-17', itemName: 'Tomatoes', quantity: '5 kg', price: 200, category: 'Produce' },
  { id: 2, date: '2026-09-17', itemName: 'Rice', quantity: '10 kg', price: 650, category: 'Dry Goods' },
  { id: 3, date: '2026-09-17', itemName: 'Cooking Oil', quantity: '5 L', price: 800, category: 'Oils & Essentials' },
  { id: 4, date: '2026-09-18', itemName: 'Chicken', quantity: '8 kg', price: 2400, category: 'Meat & Poultry' },
  { id: 5, date: '2026-09-18', itemName: 'Oaxaca Cheese', quantity: '4 kg', price: 1600, category: 'Dairy' },
  { id: 6, date: '2026-09-18', itemName: 'Flour Tortillas', quantity: '20 packets', price: 800, category: 'Bakery' },
  { id: 7, date: '2026-09-18', itemName: 'Hass Avocados', quantity: '15 pcs', price: 900, category: 'Produce' }
];

export default function AdminPurchaseHistory() {
  const [purchases, setPurchases] = useState(() => {
    try {
      const saved = localStorage.getItem('etb_admin_purchases');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading purchases from localStorage', e);
    }
    return DEFAULT_PURCHASES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Add Purchase Modal
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    itemName: '',
    quantity: '',
    price: ''
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('etb_admin_purchases', JSON.stringify(purchases));
    } catch (e) {
      console.error('Error saving purchases to localStorage', e);
    }
  }, [purchases]);

  const handleOpenModal = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      itemName: '',
      quantity: '',
      price: ''
    });
    setIsModalOpen(true);
  };

  const handleAddPurchase = (e) => {
    e.preventDefault();
    if (!formData.itemName.trim() || !formData.quantity.trim() || !formData.price) {
      alert('Please fill in all purchase fields.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: formData.date,
      itemName: formData.itemName.trim(),
      quantity: formData.quantity.trim(),
      price: Number(formData.price)
    };

    setPurchases([newEntry, ...purchases]);
    setIsModalOpen(false);
  };

  const handleDeletePurchase = (id, name) => {
    if (window.confirm(`Delete purchase record for "${name}"?`)) {
      setPurchases(purchases.filter(p => p.id !== id));
    }
  };

  // Filtered entries
  const filteredPurchases = purchases.filter(p => {
    const matchesSearch = p.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || p.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  // Total expenditure calculated from displayed entries
  const totalExpenditure = filteredPurchases.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="admin-purchases-view">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#1B2E24', margin: '0 0 0.25rem 0' }}>Purchase History</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Daily restaurant grocery, ingredients, and raw material procurement records
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenModal}>
          <HiOutlinePlus />
          <span> ADD PURCHASE</span>
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Total Procurement Spend
          </span>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-primary)', marginTop: '0.35rem' }}>
            ₹{totalExpenditure.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>For displayed records</span>
        </div>

        <div className="card" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Recorded Entries
          </span>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-secondary)', marginTop: '0.35rem' }}>
            {filteredPurchases.length}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#7D6B61' }}>Raw material items</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search grocery item (e.g. Tomatoes, Chicken, Oil)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
            />
            <HiOutlineSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#7D6B61' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1B2E24', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <HiOutlineCalendar />
              <span>Date:</span>
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.88rem' }}
            />
            {dateFilter && (
              <button
                type="button"
                onClick={() => setDateFilter('')}
                style={{ padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', background: '#FFFFFF', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Responsive Table */}
      <div className="card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5EFE3', borderBottom: '1px solid #D8D2C4' }}>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Date</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Item Name</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Quantity</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Price</th>
              <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No raw material purchases recorded matching the criteria.
                </td>
              </tr>
            ) : (
              filteredPurchases.map((purchase) => (
                <tr key={purchase.id} style={{ borderBottom: '1px solid #EAE5D9' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: '600', color: '#1B2E24', whiteSpace: 'nowrap' }}>
                    {formatDateDisplay(purchase.date)}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '700', color: '#1B2E24' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-secondary)' }}>●</span>
                      <span>{purchase.itemName}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#5A4E46', fontWeight: '600' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#FAF4E8', border: '1px solid #EADBCE' }}>
                      {purchase.quantity}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-primary)', fontSize: '1.05rem' }}>
                    ₹{Number(purchase.price).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <button
                      type="button"
                      title="Delete Record"
                      onClick={() => handleDeletePurchase(purchase.id, purchase.itemName)}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #D8D2C4',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.35rem 0.5rem',
                        cursor: 'pointer',
                        color: '#C62828'
                      }}
                    >
                      <HiOutlineTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD PURCHASE MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(27, 24, 20, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{
            backgroundColor: '#FFFFFF',
            maxWidth: '480px',
            width: '100%',
            padding: '2rem 2.25rem',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EAE5D9', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--color-secondary)', textTransform: 'uppercase' }}>Procurement Record</span>
                <h3 style={{ margin: 0, color: '#1B2E24', fontSize: '1.35rem' }}>Record Raw Material Purchase</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.35rem', color: '#7D6B61' }}
              >
                <HiOutlineX />
              </button>
            </div>

            <form onSubmit={handleAddPurchase} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Date Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Purchase Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Item Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tomatoes, Chicken, Cooking Oil, Paneer"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Quantity (allowing string units like 5 kg, 10 kg, 2 L, 20 packets) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Quantity * (e.g. 5 kg, 10 kg, 2 L, 20 packets)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 kg, 2 L, 10 packets"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Price */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 800"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #EAE5D9' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid #D8D2C4', background: '#FFFFFF', cursor: 'pointer', fontWeight: '600', color: '#5A4E46' }}
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="md">
                  Add Purchase
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
