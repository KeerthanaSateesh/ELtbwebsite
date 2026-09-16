import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineSparkles, HiOutlineFire, HiOutlineHeart } from 'react-icons/hi';
import Button from '../components/common/Button';

import HomeMenuTypeSelector from '../components/home/MenuTypeSelector';
import MenuTypeToggle from '../components/home/MenuTypeToggle';

// Local project images
import heroImage from '../assets/images/hero/etb_commercial_hero.jpg';
import birriaTacosImage from '../assets/images/food/etb_birria_tacos.jpg';
import quesadillaImage from '../assets/images/food/etb_quesadilla_close.jpg';
import tacoImage from '../assets/images/food/tacos.jpg';
import bowlImage from '../assets/images/food/burrito-bowl.jpg';
import guacImage from '../assets/images/food/guacamole.jpg';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Top Menu Selection Toggle */}
      <MenuTypeToggle />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-tag">
              <HiOutlineSparkles className="hero-tag-icon" />
              <span>Gourmet Mexican Kitchen</span>
            </div>

            <h1 className="hero-title">
              Bold Mexican Flavors. <br />
              <span className="text-highlight">Made Your Way.</span>
            </h1>

            <p className="hero-description">
              Experience the vibrant spirit of modern Mexican dining. Handcrafted tacos, oversized burritos, fresh rice bowls, and slow-simmered birria crafted daily from genuine fire-roasted ingredients.
            </p>

            <div className="hero-actions">
              <Button to="/menu" variant="primary" size="lg">
                <span>ORDER NOW</span>
                <HiArrowRight />
              </Button>
              <Button to="/menu" variant="outline" size="lg">
                EXPLORE MENU
              </Button>
            </div>

            <div className="hero-perks">
              <div className="perk-item">
                <span className="perk-dot"></span>
                <span>Fresh Housemade Salsas</span>
              </div>
              <div className="perk-item">
                <span className="perk-dot"></span>
                <span>Slow-Cooked Proteins</span>
              </div>
              <div className="perk-item">
                <span className="perk-dot"></span>
                <span>100% Customized By You</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src={heroImage}
                alt="EL Tacos and Burritos signature commercial showcase with Birria Ramen, crispy Birria Tacos, and toasted Quesadilla rising from the authentic menu"
                className="hero-image"
              />
              <div className="hero-badge-floating">
                <span className="badge-tag">AUTHENTIC MENU</span>
                <span className="badge-title">Pro Options Come Alive</span>
                <span className="badge-sub">Slow-simmered &amp; fire-toasted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Are You Craving Dual Menu Selector */}
      <HomeMenuTypeSelector />

      {/* Featured Pro Options Section */}
      <section className="section pro-showcase-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Direct From Our Menu</span>
            <h2 className="section-title">Signature Pro Options</h2>
            <p className="section-subtitle">
              Straight from the iconic right column of our kitchen menu — slow-simmered birria specialties and artisan grilled quesadillas.
            </p>
          </div>

          <div className="pro-showcase-grid">
            {/* Card 1: Birria Tacos */}
            <div className="pro-card card">
              <div className="pro-image-wrapper">
                <img
                  src={birriaTacosImage}
                  alt="Crispy Birria Tacos on checkered paper with rich dipping consommé and fresh lime"
                  className="pro-image"
                />
                <span className="card-badge">Our Pro Option</span>
              </div>
              <div className="pro-card-body">
                <div className="pro-card-header">
                  <h3 className="card-title">Crispy Birria Tacos</h3>
                  <span className="pro-price">349 / 449</span>
                </div>
                <p className="card-text">
                  Folded golden-crisp tortillas loaded with tender slow-simmered shredded meat, diced onions, and fresh cilantro. Served with rich, spiced dipping consommé and lime.
                </p>
                <div className="card-footer">
                  <span className="price-tag">Chicken Shredded / Lamb Shredded</span>
                  <Link to="/menu" className="card-action-link">
                    Order Pro Option &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Quesadilla */}
            <div className="pro-card card">
              <div className="pro-image-wrapper">
                <img
                  src={quesadillaImage}
                  alt="Toasted artisan quesadilla wedge with melted cheese pull and seasoned savory filling"
                  className="pro-image"
                />
                <span className="card-badge">Chef Favorite</span>
              </div>
              <div className="pro-card-body">
                <div className="pro-card-header">
                  <h3 className="card-title">Artisan Toasted Quesadillas</h3>
                  <span className="pro-price">From 199</span>
                </div>
                <p className="card-text">
                  Fire-toasted flour tortillas with authentic golden char marks, packed with molten cheese stretch and your choice of Birria, chicken, lamb, mushroom, or cauliflower.
                </p>
                <div className="card-footer">
                  <span className="price-tag">Veg &amp; Non-Veg Options</span>
                  <Link to="/menu" className="card-action-link">
                    Order Pro Option &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Preview Section - Bases */}
      <section className="section section-alt bases-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag secondary">Our Culinary Foundation</span>
            <h2 className="section-title">Build Your Signature Meal</h2>
            <p className="section-subtitle">
              Pick your base, choose your favorite grilled or roasted protein, and layer fresh garden toppings and artisan salsas.
            </p>
          </div>

          <div className="bases-grid">
            <div className="base-card card">
              <div className="card-image-wrapper">
                <img src={tacoImage} alt="Handcrafted tacos" className="card-image" />
                <span className="card-badge">Classic</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">Street Tacos</h3>
                <p className="card-text">
                  Warm, soft, or crispy tortillas loaded with cilantro, onions, cheese, and your choice of protein.
                </p>
                <div className="card-footer">
                  <span className="price-tag">From our kitchen</span>
                  <Link to="/menu" className="card-action-link">
                    Select Base &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="base-card card">
              <div className="card-image-wrapper">
                <img src={bowlImage} alt="Loaded burrito bowl" className="card-image" />
                <span className="card-badge">Most Popular</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">Burrito Bowls</h3>
                <p className="card-text">
                  Zesty cilantro lime rice, seasoned beans, slow-simmered meats, roasted corn, and Monterey jack.
                </p>
                <div className="card-footer">
                  <span className="price-tag">From our kitchen</span>
                  <Link to="/menu" className="card-action-link">
                    Select Base &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="base-card card">
              <div className="card-image-wrapper">
                <img src={guacImage} alt="Fresh guacamole and chips" className="card-image" />
                <span className="card-badge">Signature</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">Artisan Sides</h3>
                <p className="card-text">
                  Creamy Haas avocado guacamole, crispy seasoned tortilla chips, and fire-roasted salsa verde.
                </p>
                <div className="card-footer">
                  <span className="price-tag">From our kitchen</span>
                  <Link to="/menu" className="card-action-link">
                    Select Base &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Teaser */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag secondary">The ETB Promise</span>
            <h2 className="section-title">Fresh, Honest &amp; Uncompromising</h2>
            <p className="section-subtitle">
              Every dish is crafted with pride using high-heat searing, time-tested marinades, and fresh produce.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-circle">
                <HiOutlineFire className="value-icon" />
              </div>
              <h4>Flame-Seared Proteins</h4>
              <p>Chipotle chicken, lemon pepper marinades, and shredded lamb cooked to tender perfection.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">
                <HiOutlineSparkles className="value-icon" />
              </div>
              <h4>Garden Fresh Salsas</h4>
              <p>Crisp cilantro, charred jalapeños, sweet corn, and ripe tomatoes diced every single morning.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">
                <HiOutlineHeart className="value-icon" />
              </div>
              <h4>Crafted Your Way</h4>
              <p>Full freedom to personalize bases, proteins, toppings, and signature dressings to your exact taste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Teaser */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-content">
              <span className="cta-tag">Ready to Crave?</span>
              <h2 className="cta-title">Taste the Bold Flavors of EL Tacos and Burritos</h2>
              <p className="cta-description">
                Browse our menu, customize your feast, and enjoy genuine Mexican culinary delight.
              </p>
              <div className="cta-buttons">
                <Button to="/menu" variant="primary" size="lg">
                  ORDER NOW
                </Button>
                <Button to="/about" variant="outline" size="lg">
                  LEARN OUR STORY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
