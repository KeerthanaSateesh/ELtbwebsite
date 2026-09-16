import React from 'react';
import { HiOutlineSparkles, HiOutlineClock } from 'react-icons/hi';
import dosaHeroImage from '../../assets/images/food/dosa.jpg';

export default function TiffinHero() {
  return (
    <section className="menu-hero-section tiffin-hero-section">
      <div className="container menu-hero-container">
        <div className="menu-hero-content">
          <div className="menu-hero-tag tiffin-tag">
            <HiOutlineSparkles className="hero-tag-icon" />
            <span>TRADITIONAL SOUTH INDIAN TIFFINS</span>
          </div>

          <h1 className="menu-hero-title">
            Crispy, Golden &amp; <br />
            <span className="text-highlight">Steaming Hot.</span>
          </h1>

          <p className="menu-hero-subtitle">
            Authentic South Indian heritage recipes crafted with slow-fermented baters, stone-ground coconut chutneys, aromatic sambar, and generous dollops of pure desi ghee.
          </p>

          <div className="menu-hero-badges">
            <span className="hero-pill tiffin-pill">
              <HiOutlineClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              7–11 AM &bull; 7–11 PM
            </span>
            <span className="hero-pill tiffin-pill">Stone-Ground Chutneys</span>
            <span className="hero-pill tiffin-pill">100% Pure Desi Ghee</span>
          </div>
        </div>

        <div className="menu-hero-visual">
          <div className="menu-hero-image-wrapper">
            <img
              src={dosaHeroImage}
              alt="Crispy golden Masala Dosa served with authentic chutneys and sambar on banana leaf"
              className="menu-hero-image"
            />
            <div className="hero-badge-floating tiffin-floating-badge">
              <span className="badge-tag">HERITAGE KITCHEN</span>
              <span className="badge-title">Fresh Griddle &amp; Steam</span>
              <span className="badge-sub">Morning &bull; Evening Hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
