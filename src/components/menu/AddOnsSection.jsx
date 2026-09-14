import React from 'react';
import { MENU_DATA } from '../../data/menuData';

export default function AddOnsSection() {
  return (
    <section id="section-addons" className="menu-section addons-section">
      <div className="section-header">
        <span className="section-tag">Step 4</span>
        <h2 className="section-title">Choose Your Add-Ons</h2>
        <p className="section-subtitle">
          Add extra protein, our signature Haas guacamole, or flavorful housecrafted drizzles to take your dish further.
        </p>
      </div>

      <div className="addons-grid">
        {MENU_DATA.addons.map((addon) => (
          <div key={addon.id} className="addon-card card">
            <div className="addon-info">
              <div className="addon-title-row">
                <span className={`diet-indicator ${addon.veg ? 'veg-small' : 'non-veg-small'}`}>
                  <span className="diet-symbol">{addon.veg ? '●' : '▲'}</span>
                </span>
                <h4 className="addon-name">{addon.name}</h4>
                {addon.signature && <span className="item-tag-pill signature-pill">Signature</span>}
              </div>
            </div>
            <div className="addon-price-tag">
              <span className="addon-price-currency">₹</span>
              <span className="addon-price-amount">{addon.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
