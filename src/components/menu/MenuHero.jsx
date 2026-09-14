import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import heroImage from '../../assets/images/hero/etb_commercial_hero.jpg';

export default function MenuHero() {
  return (
    <section className="menu-hero-section">
      <div className="container menu-hero-container">
        <div className="menu-hero-content">
          <div className="menu-hero-tag">
            <HiOutlineSparkles className="hero-tag-icon" />
            <span>OUR MENU</span>
          </div>
          <h1 className="menu-hero-title">
            Build Your <span className="text-highlight">Perfect Bite.</span>
          </h1>
          <p className="menu-hero-subtitle">
            Choose your base, pick your main, add your favorite toppings and make it yours.
          </p>
          <div className="menu-hero-badges">
            <span className="hero-pill">Handcrafted Fresh</span>
            <span className="hero-pill">Authentic Mexican Flavors</span>
            <span className="hero-pill">Customized Your Way</span>
          </div>
        </div>

        <div className="menu-hero-visual">
          <div className="menu-hero-image-wrapper">
            <img
              src={heroImage}
              alt="EL Tacos and Burritos authentic kitchen menu items"
              className="menu-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
