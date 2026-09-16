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

      {/* Tiffins Intro Header */}
      <div className="section-header tiffin-section-header">
        <span className="section-tag secondary">Fresh From The Griddle &amp; Steamer</span>
        <h2 className="section-title">South Indian Breakfast &amp; Tiffins</h2>
        <p className="section-subtitle">
          Every item is prepared fresh to order with authentic stone-ground chutneys, piping hot drumstick sambar, and pure cow ghee.
        </p>
      </div>

      {/* Tiffin Items Responsive Grid */}
      <div className="tiffin-items-grid">
        {filteredItems.map((item) => (
          <TiffinItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
