import React, { useState } from 'react';
import { MENU_DATA } from '../../data/menuData';

export default function MainSection() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="section-main" className="menu-section main-section">
      <div className="section-header">
        <span className="section-tag">Step 2</span>
        <h2 className="section-title">Choose Your Main</h2>
        <p className="section-subtitle">
          Select your slow-simmered protein or fire-roasted vegetarian main. Available in Mini and Regular sizes.
        </p>

        {/* Tab switch for All / Non-Veg / Veg */}
        <div className="main-filter-tabs">
          <button
            type="button"
            className={`filter-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Mains
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${activeTab === 'non-veg' ? 'active' : ''}`}
            onClick={() => setActiveTab('non-veg')}
          >
            <span className="diet-dot non-veg-dot"></span>
            Non-Veg
          </button>
          <button
            type="button"
            className={`filter-tab-btn ${activeTab === 'veg' ? 'active' : ''}`}
            onClick={() => setActiveTab('veg')}
          >
            <span className="diet-dot veg-dot"></span>
            Veg
          </button>
        </div>
      </div>

      {/* NON-VEG SECTION */}
      {(activeTab === 'all' || activeTab === 'non-veg') && (
        <div className="mains-group">
          <div className="mains-group-header">
            <div className="group-title-wrapper">
              <span className="diet-indicator non-veg">
                <span className="diet-symbol">▲</span>
              </span>
              <h3 className="mains-group-title">NON-VEG MAINS</h3>
            </div>
            <div className="mains-col-labels">
              <span className="size-label">MINI</span>
              <span className="size-label">REGULAR</span>
            </div>
          </div>

          <div className="mains-grid">
            {MENU_DATA.mains.nonVeg.map((item) => (
              <div key={item.id} className="main-item-card card">
                <div className="main-item-info">
                  <div className="main-item-name-row">
                    <span className="diet-indicator non-veg-small">
                      <span className="diet-symbol">▲</span>
                    </span>
                    <h4 className="main-item-name">{item.name}</h4>
                    {item.popular && <span className="item-tag-pill">Popular</span>}
                    {item.premium && <span className="item-tag-pill premium-pill">Premium</span>}
                  </div>
                  {item.note && <span className="main-item-note">({item.note})</span>}
                </div>

                <div className="main-item-pricing">
                  <div className="price-box">
                    <span className="price-size-label">Mini</span>
                    <span className="price-val">
                      {item.miniPrice !== null ? `₹${item.miniPrice}` : '—'}
                    </span>
                  </div>
                  <div className="price-box-divider">/</div>
                  <div className="price-box">
                    <span className="price-size-label">Regular</span>
                    <span className="price-val primary-val">
                      {item.regularPrice ? `₹${item.regularPrice}` : '—'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VEG SECTION */}
      {(activeTab === 'all' || activeTab === 'veg') && (
        <div className="mains-group">
          <div className="mains-group-header">
            <div className="group-title-wrapper">
              <span className="diet-indicator veg">
                <span className="diet-symbol">●</span>
              </span>
              <h3 className="mains-group-title">VEG MAINS</h3>
            </div>
            <div className="mains-col-labels">
              <span className="size-label">MINI</span>
              <span className="size-label">REGULAR</span>
            </div>
          </div>

          <div className="mains-grid">
            {MENU_DATA.mains.veg.map((item) => (
              <div key={item.id} className="main-item-card card">
                <div className="main-item-info">
                  <div className="main-item-name-row">
                    <span className="diet-indicator veg-small">
                      <span className="diet-symbol">●</span>
                    </span>
                    <h4 className="main-item-name">{item.name}</h4>
                    {item.popular && <span className="item-tag-pill veg-pill">Popular</span>}
                  </div>
                </div>

                <div className="main-item-pricing">
                  <div className="price-box">
                    <span className="price-size-label">Mini</span>
                    <span className="price-val">₹{item.miniPrice}</span>
                  </div>
                  <div className="price-box-divider">/</div>
                  <div className="price-box">
                    <span className="price-size-label">Regular</span>
                    <span className="price-val primary-val">₹{item.regularPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
