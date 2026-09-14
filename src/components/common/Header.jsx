import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX, HiOutlineUser } from 'react-icons/hi';
import Button from './Button';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Subtle shadow/background enhancement on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="EL Tacos and Burritos Home">
          <div className="brand-badge">
            <span className="brand-icon">🌮</span>
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-name">EL TACOS</span>
            <span className="brand-subtext">&amp; BURRITOS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Menu
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          <Link to="/login" className="action-btn auth-link" title="Customer Login">
            <HiOutlineUser className="action-icon" />
            <span className="auth-text">Sign In</span>
          </Link>

          <Link to="/cart" className="action-btn cart-btn" title="View Cart">
            <HiOutlineShoppingBag className="action-icon" />
            <span className="cart-badge">0</span>
          </Link>

          <div className="desktop-cta">
            <Button to="/menu" variant="primary" size="sm">
              Order Now
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <nav className="mobile-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Menu
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
            <div className="mobile-nav-divider"></div>
            <Link to="/login" className="mobile-nav-link">
              Sign In / Account
            </Link>
            <Link to="/register" className="mobile-nav-link">
              Create an Account
            </Link>
          </nav>

          <div className="mobile-drawer-cta">
            <Button to="/menu" variant="primary" size="md" className="w-full">
              Order Now
            </Button>
          </div>
        </div>
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
