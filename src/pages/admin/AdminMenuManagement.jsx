import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiArrowLeft } from 'react-icons/hi';
import Button from '../../components/common/Button';

// Initial preview items aligned with our authentic menu reference
const INITIAL_PREVIEW_ITEMS = [
  { id: 1, name: "Lemon Pepper Chicken", category: "Mains (Non-Veg)", type: "non-veg", price: "12.99", active: true },
  { id: 2, name: "Chipotle Chicken", category: "Mains (Non-Veg)", type: "non-veg", price: "12.99", active: true },
  { id: 3, name: "Lamb Shredded", category: "Mains (Non-Veg)", type: "non-veg", price: "14.49", active: true },
  { id: 4, name: "Lemon Pepper Paneer", category: "Mains (Veg)", type: "veg", price: "11.99", active: true },
  { id: 5, name: "Roasted Cauliflower", category: "Mains (Veg)", type: "veg", price: "10.99", active: true },
  { id: 6, name: "Birria Quesadilla", category: "Pro Options", type: "non-veg", price: "13.99", active: true },
  { id: 7, name: "Guacamole & Chips", category: "Sides", type: "veg", price: "5.49", active: true },
];

export default function AdminMenuManagement() {
  const [items, setItems] = useState(INITIAL_PREVIEW_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItemActive = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-menu-page" style={{ padding: '3rem 0', backgroundColor: '#F6F3EC', minHeight: 'calc(100vh - var(--header-height) - 250px)' }}>
      <div className="container">
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Link to="/admin" style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', fontWeight: '700' }}>
                &larr; Admin Dashboard
              </Link>
            </div>
            <h1 style={{ fontSize: '1.85rem', color: '#1B2E24' }}>Menu Catalog Management</h1>
          </div>
          <Button variant="secondary" size="md" onClick={() => alert('Add Menu Item form will be fully connected in Phase 5.')}>
            <HiOutlinePlus />
            <span>Add Menu Item</span>
          </Button>
        </div>

        {/* Filters and search */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
              />
              <HiOutlineSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#7D6B61' }} />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1B2E24' }}>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
              >
                <option value="all">All Categories</option>
                <option value="Mains (Non-Veg)">Mains (Non-Veg)</option>
                <option value="Mains (Veg)">Mains (Veg)</option>
                <option value="Pro Options">Pro Options</option>
                <option value="Sides">Sides</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table layout */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F5EFE3', borderBottom: '1px solid #D8D2C4' }}>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Item Name</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Category</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Type</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Price</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #EAE5D9' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: '600', color: '#1B2E24' }}>{item.name}</td>
                  <td style={{ padding: '1rem', color: '#6E594F', fontSize: '0.9rem' }}>{item.category}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      backgroundColor: item.type === 'veg' ? '#E8F5E9' : '#FFEBEE',
                      color: item.type === 'veg' ? '#2E7D32' : '#C62828',
                    }}>
                      {item.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--color-primary)' }}>${item.price}</td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => toggleItemActive(item.id)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: item.active ? '#E8F3EE' : '#F5F5F5',
                        color: item.active ? 'var(--color-secondary)' : '#9E9E9E',
                      }}
                    >
                      {item.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        title="Edit Item"
                        onClick={() => alert(`Edit item: ${item.name}`)}
                        style={{ background: 'none', border: '1px solid #D8D2C4', borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#1B2E24' }}
                      >
                        <HiOutlinePencil />
                      </button>
                      <button
                        title="Delete Item"
                        onClick={() => alert(`Delete item: ${item.name}`)}
                        style={{ background: 'none', border: '1px solid #D8D2C4', borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#C62828' }}
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
