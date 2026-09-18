import React, { useState } from 'react';
import { TIFFIN_CATEGORIES, TIFFIN_ITEMS } from '../../data/tiffinMenuData';
import TiffinItemCard from './TiffinItemCard';

export default function TiffinMenu() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = TIFFIN_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="tiffin-menu-container">
      {/* Category Pills Bar */}
      <div className="tiffin-categories-bar">
        <div className="tiffin-categories-track">
          {TIFFIN_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`tiffin-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Breakfast Intro Header */}
      <div className="section-header tiffin-section-header">
        <span className="section-tag secondary">Fresh From The Skillet &amp; Griddle</span>
        <h2 className="section-title">Mexican Breakfast &amp; Morning Specialties</h2>
        <p className="section-subtitle">
          Every item is prepared fresh to order with warm tortillas, farm-fresh eggs, seasoned black beans, melted cheeses, and fire-roasted salsas.
        </p>
      </div>

      {/* Breakfast Items Responsive Grid */}
      <div className="tiffin-items-grid">
        {filteredItems.map((item) => (
          <TiffinItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
