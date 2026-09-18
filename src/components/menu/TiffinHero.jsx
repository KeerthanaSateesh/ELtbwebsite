import React from 'react';
import { HiOutlineSparkles, HiOutlineClock } from 'react-icons/hi';
import breakfastHeroImage from '../../assets/images/food/huevos_rancheros.jpg';

export default function TiffinHero() {
  return (
    <section className="menu-hero-section tiffin-hero-section">
      <div className="container menu-hero-container">
        <div className="menu-hero-content">
          <div className="menu-hero-tag tiffin-tag">
            <HiOutlineSparkles className="hero-tag-icon" />
            <span>MEXICAN BREAKFAST &amp; MORNING SPECIALTIES</span>
          </div>

          <h1 className="menu-hero-title">
            Sunny, Sizzling &amp; <br />
            <span className="text-highlight">Crafted Fresh.</span>
          </h1>

          <p className="menu-hero-subtitle">
            Authentic Mexican morning recipes crafted with farm-fresh eggs, fire-roasted salsas, seasoned black beans, smashed avocado, and warm toasted tortillas.
          </p>

          <div className="menu-hero-badges">
            <span className="hero-pill tiffin-pill">
              <HiOutlineClock style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              7–11 AM &bull; 7–11 PM
            </span>
            <span className="hero-pill tiffin-pill">Fire-Roasted Salsas</span>
            <span className="hero-pill tiffin-pill">Fresh Smashed Avocado</span>
          </div>
        </div>

        <div className="menu-hero-visual">
          <div className="menu-hero-image-wrapper">
            <img
              src={breakfastHeroImage}
              alt="Authentic Mexican Huevos Rancheros with fire-roasted salsa, eggs, and black beans"
              className="menu-hero-image"
            />
            <div className="hero-badge-floating tiffin-floating-badge">
              <span className="badge-tag">MEXICAN MORNINGS</span>
              <span className="badge-title">Fresh Skillet &amp; Griddle</span>
              <span className="badge-sub">Morning &bull; Evening Hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
