import React from 'react';
import TiffinCardVisual from './TiffinCardVisual';

/**
 * TiffinItemCard Component
 * 
 * Modular card representation of a single South Indian Tiffin item.
 * Architecture:
 *   tiffinMenuData (Data)
 *       ↓
 *   TiffinItemCard (Component)
 *       ↓
 *   TiffinCardVisual (Visual presentation: 2D image now, 3D later)
 */
export default function TiffinItemCard({ item, onAdd }) {
  return (
    <div className="tiffin-item-card card">
      {/* Visual Presentation (modular for future 3D replacement) */}
      <TiffinCardVisual item={item} />

      {/* Card Information Body */}
      <div className="tiffin-card-body">
        <div className="tiffin-card-header">
          <div className="tiffin-name-line">
            <div className="tiffin-veg-indicator" title="100% Vegetarian">
              <span className="tiffin-veg-dot">●</span>
            </div>
            <h3 className="tiffin-item-name">{item.name}</h3>
          </div>
          <div className="tiffin-price-badge">
            <span className="tiffin-currency">₹</span>
            <span className="tiffin-amount">{item.price}</span>
          </div>
        </div>

        <p className="tiffin-item-desc">{item.description}</p>

        <div className="tiffin-card-footer">
          <span className="tiffin-category-tag">{item.category}</span>
          <button
            type="button"
            className="tiffin-order-btn"
            onClick={() => onAdd && onAdd(item)}
            aria-label={`Add ${item.name} to order`}
          >
            Add to Order +
          </button>
        </div>
      </div>
    </div>
  );
}
