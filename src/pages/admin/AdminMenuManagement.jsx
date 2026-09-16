import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiArrowLeft, HiOutlineX } from 'react-icons/hi';
import Button from '../../components/common/Button';

const INITIAL_PREVIEW_ITEMS = [
  // Tacos & Burritos
  { id: 1, name: "Lemon Pepper Chicken", menuType: "tacos-burritos", category: "Mains (Non-Veg)", type: "non-veg", price: "299", active: true, description: "Citrus-marinated flame-seared chicken breast." },
  { id: 2, name: "Chipotle Chicken", menuType: "tacos-burritos", category: "Mains (Non-Veg)", type: "non-veg", price: "299", active: true, description: "Spicy chipotle glazed grilled chicken." },
  { id: 3, name: "Lamb Shredded", menuType: "tacos-burritos", category: "Mains (Non-Veg)", type: "non-veg", price: "379", active: true, description: "Slow-cooked tender shredded lamb." },
  { id: 4, name: "Lemon Pepper Paneer", menuType: "tacos-burritos", category: "Mains (Veg)", type: "veg", price: "299", active: true, description: "Grilled marinated paneer cubes." },
  { id: 5, name: "Roasted Cauliflower", menuType: "tacos-burritos", category: "Mains (Veg)", type: "veg", price: "219", active: true, description: "Crisp spiced florets roasted to perfection." },
  { id: 6, name: "Birria Quesadilla", menuType: "tacos-burritos", category: "Pro Options", type: "non-veg", price: "349", active: true, description: "Toasted tortilla with molten cheese and shredded birria." },
  { id: 7, name: "Guacamole & Chips", menuType: "tacos-burritos", category: "Sides", type: "veg", price: "199", active: true, description: "Fresh Haas avocado dip with tortilla chips." },
  
  // Tiffins
  { id: 8, name: "Masala Dosa", menuType: "tiffins", category: "Dosa", type: "veg", price: "95", active: true, description: "Crispy fermented crepe filled with spiced potato masala." },
  { id: 9, name: "Plain Idly (2 pcs)", menuType: "tiffins", category: "Idly", type: "veg", price: "50", active: true, description: "Fluffy steamed rice and lentil cakes with sambar & chutneys." },
  { id: 10, name: "Ghee Podi Idly", menuType: "tiffins", category: "Idly", type: "veg", price: "80", active: true, description: "Mini idlies tossed in spicy podi gunpowder and cow ghee." },
  { id: 11, name: "Medu Vada (2 pcs)", menuType: "tiffins", category: "Vada", type: "veg", price: "60", active: true, description: "Crisp savory lentil doughnuts served with chutneys." },
  { id: 12, name: "Poori Masala", menuType: "tiffins", category: "Poori", type: "veg", price: "80", active: true, description: "Puffed golden pooris with flavorful potato bhaji." },
  { id: 13, name: "Ven Pongal", menuType: "tiffins", category: "Pongal", type: "veg", price: "80", active: true, description: "Rice and moong dal comfort dish with cashews and ghee." },
  { id: 14, name: "South Indian Mini Tiffin", menuType: "tiffins", category: "Combos", type: "veg", price: "150", active: true, description: "Idly, Vada, Mini Masala Dosa, and Kesari combo." }
];

const CATEGORIES_BY_TYPE = {
  "tacos-burritos": ["Bases", "Mains (Non-Veg)", "Mains (Veg)", "Toppings", "Add-Ons", "Pro Options", "Sides"],
  "tiffins": ["Idly", "Dosa", "Poori", "Vada", "Pongal", "Upma", "Combos"]
};

export default function AdminMenuManagement() {
  const [items, setItems] = useState(INITIAL_PREVIEW_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMenuTypeFilter, setSelectedMenuTypeFilter] = useState('all'); // 'all', 'tiffins', 'tacos-burritos'
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    menuType: 'tacos-burritos',
    category: 'Mains (Non-Veg)',
    type: 'non-veg',
    price: '',
    description: '',
    active: true
  });

  const toggleItemActive = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const handleDeleteItem = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    const defaultType = selectedMenuTypeFilter === 'tiffins' ? 'tiffins' : 'tacos-burritos';
    const defaultCategory = CATEGORIES_BY_TYPE[defaultType][0];
    setEditingItem(null);
    setFormData({
      name: '',
      menuType: defaultType,
      category: defaultCategory,
      type: defaultType === 'tiffins' ? 'veg' : 'non-veg',
      price: '',
      description: '',
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      menuType: item.menuType,
      category: item.category,
      type: item.type,
      price: item.price,
      description: item.description || '',
      active: item.active
    });
    setIsModalOpen(true);
  };

  const handleMenuTypeChangeInModal = (newType) => {
    setFormData({
      ...formData,
      menuType: newType,
      category: CATEGORIES_BY_TYPE[newType][0],
      type: newType === 'tiffins' ? 'veg' : formData.type
    });
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Please fill in the item name and price.');
      return;
    }

    if (editingItem) {
      // Update existing item
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData
      };
      setItems([newItem, ...items]);
    }
    setIsModalOpen(false);
  };

  // Filtered items based on search, menuType filter, and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMenuType = selectedMenuTypeFilter === 'all' || item.menuType === selectedMenuTypeFilter;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesMenuType && matchesCategory;
  });

  // Current category options for the top filter bar
  const availableFilterCategories = selectedMenuTypeFilter === 'all'
    ? [...new Set([...CATEGORIES_BY_TYPE['tacos-burritos'], ...CATEGORIES_BY_TYPE['tiffins']])]
    : CATEGORIES_BY_TYPE[selectedMenuTypeFilter] || [];

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
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Manage both Tiffins (Breakfast) and Tacos &amp; Burritos dishes.
            </p>
          </div>
          <Button variant="secondary" size="md" onClick={handleOpenAddModal}>
            <HiOutlinePlus />
            <span>Add Menu Item</span>
          </Button>
        </div>

        {/* Menu Type Selector Tabs (All / Tiffins / Tacos & Burritos) */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => { setSelectedMenuTypeFilter('all'); setSelectedCategory('all'); }}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: selectedMenuTypeFilter === 'all' ? 'var(--color-text)' : '#D8D2C4',
              backgroundColor: selectedMenuTypeFilter === 'all' ? 'var(--color-text)' : '#FFFFFF',
              color: selectedMenuTypeFilter === 'all' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            All Menus ({items.length})
          </button>
          <button
            type="button"
            onClick={() => { setSelectedMenuTypeFilter('tiffins'); setSelectedCategory('all'); }}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: selectedMenuTypeFilter === 'tiffins' ? 'var(--color-secondary)' : '#D8D2C4',
              backgroundColor: selectedMenuTypeFilter === 'tiffins' ? 'var(--color-secondary)' : '#FFFFFF',
              color: selectedMenuTypeFilter === 'tiffins' ? '#FFFFFF' : 'var(--color-secondary)',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>🫓 Tiffins</span>
            <span>({items.filter(i => i.menuType === 'tiffins').length})</span>
          </button>
          <button
            type="button"
            onClick={() => { setSelectedMenuTypeFilter('tacos-burritos'); setSelectedCategory('all'); }}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: selectedMenuTypeFilter === 'tacos-burritos' ? 'var(--color-primary)' : '#D8D2C4',
              backgroundColor: selectedMenuTypeFilter === 'tacos-burritos' ? 'var(--color-primary)' : '#FFFFFF',
              color: selectedMenuTypeFilter === 'tacos-burritos' ? '#FFFFFF' : 'var(--color-primary)',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>🌮 Tacos &amp; Burritos</span>
            <span>({items.filter(i => i.menuType === 'tacos-burritos').length})</span>
          </button>
        </div>

        {/* Filters and search */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search by dish name..."
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
                {availableFilterCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table layout with horizontal-scroll container for responsiveness */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F5EFE3', borderBottom: '1px solid #D8D2C4' }}>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Item Name</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Menu Type</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Category</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Diet</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Price</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No menu items found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #EAE5D9' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: '600', color: '#1B2E24' }}>
                      <div>{item.name}</div>
                      {item.description && (
                        <div style={{ fontSize: '0.78rem', color: '#8C776D', fontWeight: '400', maxWidth: '320px', whiteSpace: 'normal' }}>
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.7rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        backgroundColor: item.menuType === 'tiffins' ? 'var(--color-secondary-light)' : 'var(--color-primary-subtle)',
                        color: item.menuType === 'tiffins' ? 'var(--color-secondary)' : 'var(--color-primary)',
                        border: `1px solid ${item.menuType === 'tiffins' ? 'rgba(27,67,50,0.2)' : 'rgba(217,72,15,0.2)'}`
                      }}>
                        {item.menuType === 'tiffins' ? '🫓 Tiffins' : '🌮 Tacos & Burritos'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#6E594F', fontSize: '0.9rem', fontWeight: '500' }}>
                      {item.category}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        backgroundColor: item.type === 'veg' ? '#E8F5E9' : '#FFEBEE',
                        color: item.type === 'veg' ? '#2E7D32' : '#C62828',
                      }}>
                        {item.type === 'veg' ? 'VEG ●' : 'NON-VEG ▲'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-primary)', fontSize: '1rem' }}>
                      ₹{item.price}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        type="button"
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
                          type="button"
                          title="Edit Item"
                          onClick={() => handleOpenEditModal(item)}
                          style={{ background: 'none', border: '1px solid #D8D2C4', borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#1B2E24' }}
                        >
                          <HiOutlinePencil />
                        </button>
                        <button
                          type="button"
                          title="Delete Item"
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          style={{ background: 'none', border: '1px solid #D8D2C4', borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#C62828' }}
                        >
                          <HiOutlineTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MENU ITEM MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(27, 24, 20, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{
            backgroundColor: '#FFFFFF',
            maxWidth: '540px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem 2.5rem',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EAE5D9', paddingBottom: '0.85rem' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#1B2E24', margin: 0 }}>
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7D6B61', fontSize: '1.35rem' }}
              >
                <HiOutlineX />
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Menu Type Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Menu Type *
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => handleMenuTypeChangeInModal('tiffins')}
                    style={{
                      flex: 1,
                      padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid',
                      borderColor: formData.menuType === 'tiffins' ? 'var(--color-secondary)' : '#D8D2C4',
                      backgroundColor: formData.menuType === 'tiffins' ? 'var(--color-secondary-light)' : '#FAFAF8',
                      color: formData.menuType === 'tiffins' ? 'var(--color-secondary)' : '#5A4E46',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    🫓 Tiffins
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMenuTypeChangeInModal('tacos-burritos')}
                    style={{
                      flex: 1,
                      padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid',
                      borderColor: formData.menuType === 'tacos-burritos' ? 'var(--color-primary)' : '#D8D2C4',
                      backgroundColor: formData.menuType === 'tacos-burritos' ? 'var(--color-primary-subtle)' : '#FAFAF8',
                      color: formData.menuType === 'tacos-burritos' ? 'var(--color-primary)' : '#5A4E46',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    🌮 Tacos &amp; Burritos
                  </button>
                </div>
              </div>

              {/* Category Dropdown (Adaptive) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                >
                  {CATEGORIES_BY_TYPE[formData.menuType].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Item Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={formData.menuType === 'tiffins' ? "e.g. Ghee Roast Dosa" : "e.g. Chipotle Chicken Taco"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Price & Diet Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 120"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                    Dietary Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                  >
                    <option value="veg">Vegetarian (●)</option>
                    <option value="non-veg">Non-Vegetarian (▲)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Ingredients, preparation, accompaniments..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Active Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="modalActiveCheckbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label htmlFor="modalActiveCheckbox" style={{ fontSize: '0.88rem', color: '#1B2E24', fontWeight: '600' }}>
                  Item is Active (Visible on Customer Menu)
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #EAE5D9' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid #D8D2C4', background: '#FFFFFF', cursor: 'pointer', fontWeight: '600', color: '#5A4E46' }}
                >
                  Cancel
                </button>
                <Button type="submit" variant="secondary" size="md">
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
