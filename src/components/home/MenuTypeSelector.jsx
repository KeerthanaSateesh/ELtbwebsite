import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineClock, HiOutlineSparkles } from 'react-icons/hi';
import { getTiffinAvailabilityStatus } from '../../utils/menuAvailability';

export default function HomeMenuTypeSelector() {
  const tiffinStatus = getTiffinAvailabilityStatus();

  return (
    <section className="section dual-menu-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Two Culinary Worlds</span>
          <h2 className="section-title">What are you craving?</h2>
          <p className="section-subtitle">
            From piping hot stone-ground South Indian tiffins to fire-seared Mexican street food, enjoy two authentic dining experiences under one roof.
          </p>
        </div>

        <div className="dual-menu-grid">
          {/* CARD 1: TIFFINS */}
          <div className="dual-menu-card tiffins-card card">
            <div className="dual-card-top">
              <div className="dual-card-icon-wrap tiffin-icon-wrap">
                <span className="dual-card-icon">🫓</span>
              </div>
              <span className={`dual-status-badge ${tiffinStatus.badgeType}`}>
                {tiffinStatus.isAvailable ? "● Available Now" : "7–11 AM • 7–11 PM"}
              </span>
            </div>

            <div className="dual-card-content">
              <span className="dual-cuisine-tag">South Indian Breakfast &amp; Evening</span>
              <h3 className="dual-card-title">TIFFINS</h3>
              <p className="dual-card-desc">
                Traditional South Indian breakfast crafted from slow-fermented batters and fresh stone-ground chutneys.
              </p>

              <div className="dual-items-pill-row">
                <span className="food-chip">Idly</span>
                <span className="food-chip">Dosa</span>
                <span className="food-chip">Poori</span>
                <span className="food-chip">Vada</span>
                <span className="food-chip">Pongal</span>
                <span className="food-chip">Upma</span>
              </div>

              <div className="dual-timing-box">
                <HiOutlineClock className="timing-icon" />
                <div className="timing-text">
                  <span className="timing-label">Operating Windows:</span>
                  <span className="timing-val">7:00 AM – 11:00 AM &bull; 7:00 PM – 11:00 PM</span>
                </div>
              </div>
            </div>

            <div className="dual-card-action">
              <Link to="/menu?type=tiffins" className="btn btn-secondary w-full">
                <span>Explore Tiffins</span>
                <HiArrowRight />
              </Link>
            </div>
          </div>

          {/* CARD 2: TACOS & BURRITOS */}
          <div className="dual-menu-card tacos-card card">
            <div className="dual-card-top">
              <div className="dual-card-icon-wrap tacos-icon-wrap">
                <span className="dual-card-icon">🌮</span>
              </div>
              <span className="dual-status-badge all-day">
                ● Available All Day
              </span>
            </div>

            <div className="dual-card-content">
              <span className="dual-cuisine-tag">Gourmet Mexican Grill</span>
              <h3 className="dual-card-title">TACOS &amp; BURRITOS</h3>
              <p className="dual-card-desc">
                Handcrafted street tacos, oversized burritos, fresh rice bowls, and slow-simmered birria specialties.
              </p>

              <div className="dual-items-pill-row">
                <span className="food-chip">Tacos</span>
                <span className="food-chip">Burritos</span>
                <span className="food-chip">Bowls</span>
                <span className="food-chip">Salads</span>
                <span className="food-chip">Birria</span>
                <span className="food-chip">Quesadillas</span>
              </div>

              <div className="dual-timing-box">
                <HiOutlineSparkles className="timing-icon" />
                <div className="timing-text">
                  <span className="timing-label">Daily Service:</span>
                  <span className="timing-val">Available all day long</span>
                </div>
              </div>
            </div>

            <div className="dual-card-action">
              <Link to="/menu?type=tacos-burritos" className="btn btn-primary w-full">
                <span>Explore Menu</span>
                <HiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
