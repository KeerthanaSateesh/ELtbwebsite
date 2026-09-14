import React, { useState } from 'react';
import { MENU_DATA } from '../../data/menuData';

// Icons/emoji for the 4 bases
const BASE_ICONS = {
  'base-taco': '🌮',
  'base-burrito': '🌯',
  'base-rice-bowl': '🥣',
  'base-salad': '🥗'
};

export default function BaseSection() {
  const [selectedBase, setSelectedBase] = useState('base-taco');

  return (
    <section id="section-base" className="menu-section base-section">
      <div className="section-header">
        <span className="section-tag">Step 1</span>
        <h2 className="section-title">Choose Your Base</h2>
        <p className="section-subtitle">
          Select the foundation for your Mexican meal. Every base is crafted fresh to order.
        </p>
      </div>

      <div className="bases-grid">
        {MENU_DATA.bases.map((base) => {
          const isSelected = selectedBase === base.id;
          return (
            <div
              key={base.id}
              className={`base-card-selectable ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedBase(base.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedBase(base.id)}
              aria-pressed={isSelected}
            >
              <div className="base-card-top">
                <span className="base-icon-display">{BASE_ICONS[base.id]}</span>
                <span className="base-badge">{base.badge}</span>
              </div>
              <h3 className="base-name">{base.name}</h3>
              <p className="base-desc">{base.description}</p>
              <div className="base-select-indicator">
                {isSelected ? '✓ Selected Base' : 'Select Base'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
