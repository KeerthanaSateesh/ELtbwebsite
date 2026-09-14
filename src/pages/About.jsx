import React from 'react';
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineFire } from 'react-icons/hi';
import Button from '../components/common/Button';
import tacoImage from '../assets/images/food/tacos.jpg';

export default function About() {
  return (
    <div className="about-page">
      <div className="container" style={{ padding: '4rem var(--container-padding)' }}>
        <div className="section-header">
          <span className="section-tag">Our Culinary Heritage</span>
          <h1 className="section-title">The Story Behind EL Tacos and Burritos</h1>
          <p className="section-subtitle">
            Founded with a passion for bold, unadulterated Mexican street food flavors elevated to a gourmet dining experience.
          </p>
        </div>

        <div className="card" style={{ padding: '3rem', maxWidth: '960px', margin: '0 auto 3rem auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span className="section-tag secondary" style={{ marginBottom: '1rem' }}>Handcrafted with Fire &amp; Love</span>
              <h2 style={{ marginBottom: '1rem' }}>Crafting Every Bite With Purpose</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                At EL Tacos and Burritos, we believe that extraordinary Mexican food begins with honest preparation. Our meats are marinated overnight in signature citrus and dry-rub chili blends, our salsas are hand-chopped every morning, and our tortillas are grilled warm on demand.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Whether you crave our tender slow-simmered birria, zesty chipotle grilled chicken, or crisp vegetarian roasted cauliflower, every meal is uniquely yours.
              </p>
              <Button to="/menu" variant="primary">
                Explore the Menu
              </Button>
            </div>
            <div>
              <img
                src={tacoImage}
                alt="Signature street tacos"
                style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%', maxHeight: '380px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
