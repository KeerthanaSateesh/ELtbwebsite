import React, { useState } from 'react';
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlinePhotograph,
  HiOutlineCheck,
  HiOutlineBan
} from 'react-icons/hi';
import Button from '../../components/common/Button';

// Initial local sample data covering both Mexican Grill & Mexican Breakfast
const INITIAL_PREVIEW_ITEMS = [
  // Tacos & Burritos
  {
    id: 1,
    name: "Lemon Pepper Chicken",
    menuType: "tacos-burritos",
    category: "Mains (Non-Veg)",
    type: "non-veg",
    price: "299",
    active: true,
    image: "",
    description: "Citrus-marinated flame-seared chicken breast."
  },
  {
    id: 2,
    name: "Chipotle Chicken",
    menuType: "tacos-burritos",
    category: "Mains (Non-Veg)",
    type: "non-veg",
    price: "299",
    active: true,
    image: "",
    description: "Spicy chipotle glazed grilled chicken."
  },
  {
    id: 3,
    name: "Lamb Shredded",
    menuType: "tacos-burritos",
    category: "Mains (Non-Veg)",
    type: "non-veg",
    price: "379",
    active: true,
    image: "",
    description: "Slow-cooked tender shredded lamb."
  },
  {
    id: 4,
    name: "Lemon Pepper Paneer",
    menuType: "tacos-burritos",
    category: "Mains (Veg)",
    type: "veg",
    price: "299",
    active: true,
    image: "",
    description: "Grilled marinated paneer cubes."
  },
  {
    id: 5,
    name: "Roasted Cauliflower",
    menuType: "tacos-burritos",
    category: "Mains (Veg)",
    type: "veg",
    price: "219",
    active: true,
    image: "",
    description: "Crisp spiced florets roasted to perfection."
  },
  {
    id: 6,
    name: "Birria Quesadilla",
    menuType: "tacos-burritos",
    category: "Pro Options",
    type: "non-veg",
    price: "349",
    active: true,
    image: "",
    description: "Toasted tortilla with molten cheese and shredded birria."
  },
  {
    id: 7,
    name: "Guacamole & Chips",
    menuType: "tacos-burritos",
    category: "Sides",
    type: "veg",
    price: "199",
    active: true,
    image: "",
    description: "Fresh Haas avocado dip with tortilla chips."
  },

  // Breakfast / Tiffins (Mexican)
  {
    id: 8,
    name: "Chorizo & Egg Tacos (2 pcs)",
    menuType: "tiffins",
    category: "Breakfast Tacos",
    type: "non-veg",
    price: "180",
    active: true,
    image: "",
    description: "Two soft tacos with fluffy eggs, spiced chorizo, and salsa verde."
  },
  {
    id: 9,
    name: "Bacon & Guacamole Tacos",
    menuType: "tiffins",
    category: "Breakfast Tacos",
    type: "non-veg",
    price: "195",
    active: true,
    image: "",
    description: "Scrambled eggs, smoked bacon, guacamole, and cotija cheese."
  },
  {
    id: 10,
    name: "El Grande Breakfast Burrito",
    menuType: "tiffins",
    category: "Breakfast Burritos",
    type: "non-veg",
    price: "240",
    active: true,
    image: "",
    description: "Eggs, tater tots, melted cheese, and chipotle crema."
  },
  {
    id: 11,
    name: "Sunrise Breakfast Bowl",
    menuType: "tiffins",
    category: "Breakfast Bowls",
    type: "veg",
    price: "260",
    active: true,
    image: "",
    description: "Breakfast potatoes, sunny eggs, black beans, and avocado."
  },
  {
    id: 12,
    name: "Authentic Huevos Rancheros",
    menuType: "tiffins",
    category: "Huevos & Eggs",
    type: "veg",
    price: "220",
    active: true,
    image: "",
    description: "Sunny eggs over corn tortillas with fire-roasted salsa."
  },
  {
    id: 13,
    name: "Chilaquiles Verdes con Huevo",
    menuType: "tiffins",
    category: "Chilaquiles",
    type: "veg",
    price: "240",
    active: true,
    image: "",
    description: "Crisp tortilla chips in salsa verde with fried eggs and crema."
  },
  {
    id: 14,
    name: "El Patrón Breakfast Platter",
    menuType: "tiffins",
    category: "Breakfast Combos",
    type: "non-veg",
    price: "320",
    active: true,
    image: "",
    description: "Sunny eggs, chorizo hash, refried beans, chips, and tortillas."
  }
];

const CATEGORIES_BY_TYPE = {
  "tacos-burritos": [
    "Bases",
    "Mains (Non-Veg)",
    "Mains (Veg)",
    "Toppings",
    "Add-Ons",
    "Pro Options",
    "Sides"
  ],
  "tiffins": [
    "Breakfast Tacos",
    "Breakfast Burritos",
    "Breakfast Bowls",
    "Huevos & Eggs",
    "Chilaquiles",
    "Breakfast Quesadillas",
    "Breakfast Combos"
  ]
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
    image: '',
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
      image: '',
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
      image: item.image || '',
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

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: fakeUrl }));
    }
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Please fill in the item name and price.');
      return;
    }

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      setItems([newItem, ...items]);
    }
    setIsModalOpen(false);
  };

  // Filtered items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMenuType = selectedMenuTypeFilter === 'all' || item.menuType === selectedMenuTypeFilter;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesMenuType && matchesCategory;
  });

  const availableFilterCategories = selectedMenuTypeFilter === 'all'
    ? [...new Set([...CATEGORIES_BY_TYPE['tacos-burritos'], ...CATEGORIES_BY_TYPE['tiffins']])]
    : CATEGORIES_BY_TYPE[selectedMenuTypeFilter] || [];

  return (
    <div className="admin-menu-view">
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#1B2E24', margin: '0 0 0.25rem 0' }}>Menu Management</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Catalog manager for All-Day Tacos &amp; Burritos and Mexican Breakfast
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAddModal}>
          <HiOutlinePlus />
          <span> ADD ITEM</span>
        </Button>
      </div>

      {/* Menu Type Switcher Pills */}
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
          <span>🍳 Breakfast</span>
          <span>({items.filter(i => i.menuType === 'tiffins').length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search dishes by name..."
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

      {/* Horizontally Scrollable Responsive Table */}
      <div className="card table-container" style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', borderRadius: 'var(--radius-lg)', boxShadow: '0 2px 8px rgba(43, 24, 16, 0.04)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '940px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8F5EE', borderBottom: '2px solid #D8D2C4' }}>
              <th style={{ width: '33%', minWidth: '270px', padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Item Name</th>
              <th style={{ width: '18%', minWidth: '175px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Menu Type</th>
              <th style={{ width: '14%', minWidth: '130px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Category</th>
              <th style={{ width: '10%', minWidth: '85px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Price</th>
              <th style={{ width: '11%', minWidth: '110px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Status</th>
              <th style={{ width: '14%', minWidth: '160px', padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No menu items found matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #EAE5D9',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FDFBF7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ padding: '0.95rem 1.25rem', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '6px', backgroundColor: '#FAF4E8', border: '1px solid #EADBCE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span style={{ fontSize: '1.25rem' }}>{item.menuType === 'tiffins' ? '🍳' : '🌮'}</span>
                        )}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span
                            style={{
                              color: item.type === 'veg' ? '#2E7D32' : '#C62828',
                              fontSize: '0.72rem',
                              lineHeight: 1
                            }}
                            title={item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            {item.type === 'veg' ? '●' : '▲'}
                          </span>
                          <span style={{ fontWeight: '700', color: '#1B2E24', fontSize: '0.93rem' }}>{item.name}</span>
                        </div>
                        {item.description && (
                          <div style={{ fontSize: '0.78rem', color: '#7D6B61', fontWeight: '400', maxWidth: '300px', whiteSpace: 'normal', marginTop: '3px', lineHeight: '1.35' }}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.95rem 1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      backgroundColor: item.menuType === 'tiffins' ? 'var(--color-secondary-light)' : 'var(--color-primary-subtle)',
                      color: item.menuType === 'tiffins' ? 'var(--color-secondary)' : 'var(--color-primary)',
                      border: `1px solid ${item.menuType === 'tiffins' ? 'rgba(27,67,50,0.2)' : 'rgba(217,72,15,0.2)'}`
                    }}>
                      {item.menuType === 'tiffins' ? '🍳 Breakfast' : '🌮 Tacos & Burritos'}
                    </span>
                  </td>
                  <td style={{ padding: '0.95rem 1rem', color: '#5A4E46', fontSize: '0.88rem', fontWeight: '600', verticalAlign: 'middle' }}>
                    {item.category}
                  </td>
                  <td style={{ padding: '0.95rem 1rem', fontWeight: '800', color: 'var(--color-primary)', fontSize: '0.98rem', verticalAlign: 'middle' }}>
                    ₹{item.price}
                  </td>
                  <td style={{ padding: '0.95rem 1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      backgroundColor: item.active ? '#E8F5E9' : '#F5F5F5',
                      color: item.active ? '#1B5E20' : '#757575',
                      border: `1px solid ${item.active ? '#C8E6C9' : '#E0E0E0'}`
                    }}>
                      <span style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: item.active ? '#2E7D32' : '#9E9E9E'
                      }} />
                      <span>{item.active ? 'Active' : 'Disabled'}</span>
                    </span>
                  </td>
                  <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right', verticalAlign: 'middle' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', justifyContent: 'flex-end' }}>
                      {/* Enable/Disable Button */}
                      <button
                        type="button"
                        title={item.active ? "Disable Item" : "Enable Item"}
                        aria-label={item.active ? "Disable this menu item" : "Enable this menu item"}
                        onClick={() => toggleItemActive(item.id)}
                        style={{
                          backgroundColor: item.active ? '#FAF4E8' : '#E8F5E9',
                          border: `1px solid ${item.active ? '#D8D2C4' : '#A5D6A7'}`,
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.38rem 0.7rem',
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          color: item.active ? '#5A4E46' : '#1B5E20',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {item.active ? 'Disable' : 'Enable'}
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        title="Edit Item"
                        aria-label={`Edit ${item.name}`}
                        onClick={() => handleOpenEditModal(item)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D8D2C4',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.38rem 0.55rem',
                          cursor: 'pointer',
                          color: '#1B2E24',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.95rem',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <HiOutlinePencil />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        title="Delete Item"
                        aria-label={`Delete ${item.name}`}
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #FFCDD2',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.38rem 0.55rem',
                          cursor: 'pointer',
                          color: '#C62828',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.95rem',
                          transition: 'all 0.15s ease'
                        }}
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

      {/* ADD / EDIT MENU ITEM MODAL */}
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
            maxWidth: '540px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '2rem 2.5rem',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EAE5D9', paddingBottom: '0.85rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: '#1B2E24', margin: 0 }}>
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

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Menu Type Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Menu Type *
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
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
                    🍳 Breakfast
                  </button>
                </div>
              </div>

              {/* Category Dropdown (Adapts to Menu Type) */}
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
                  placeholder={formData.menuType === 'tiffins' ? "e.g. Chorizo & Egg Taco" : "e.g. Chipotle Chicken Taco"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Price & Dietary Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 240"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                    Dietary Classification
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

              {/* Upload Image / Choose Image */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.85rem' }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', marginBottom: '0.45rem' }}>
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Ingredients, seasonings, toppings..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
                />
              </div>

              {/* Active Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="menuActiveCheckbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label htmlFor="menuActiveCheckbox" style={{ fontSize: '0.88rem', color: '#1B2E24', fontWeight: '600' }}>
                  Item is Active (Visible on Live Customer Menu)
                </label>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #EAE5D9' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid #D8D2C4', background: '#FFFFFF', cursor: 'pointer', fontWeight: '600', color: '#5A4E46' }}
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="md">
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
