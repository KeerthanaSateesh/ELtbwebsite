import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Brand Column */}
        <div className="footer-col footer-brand">
          <Link to="/" className="brand-logo" aria-label="EL Tacos and Burritos Home">
            <div className="brand-badge">
              <span className="brand-icon">🌮</span>
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-name">EL TACOS</span>
              <span className="brand-subtext">&amp; BURRITOS</span>
            </div>
          </Link>
          <p className="footer-bio">
            Bold Mexican Flavors. Made Your Way. From slow-simmered birria to sizzling grilled chicken, fresh salsas, and handcrafted tortillas.
          </p>
          <div className="footer-socials">
            <a href="#social" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#social" className="social-icon" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#social" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#social" className="social-icon" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Interactive Menu</Link>
            </li>
            <li>
              <Link to="/about">Our Story</Link>
            </li>
            <li>
              <Link to="/contact">Contact &amp; Location</Link>
            </li>
          </ul>
        </div>

        {/* Customer Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Portal</h4>
          <ul className="footer-links">
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Create Account</Link>
            </li>
            <li>
              <Link to="/cart">My Cart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/admin/login" className="admin-discrete-link">Admin Portal</Link>
            </li>
          </ul>
        </div>

        {/* Hours & Contact Placeholders Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Visit Us</h4>
          <ul className="footer-contact-list">
            <li>
              <HiOutlineLocationMarker className="contact-icon" />
              <span>Restaurant location details coming soon</span>
            </li>
            <li>
              <HiOutlineClock className="contact-icon" />
              <span>Mon – Sun: Hours updating soon</span>
            </li>
            <li>
              <HiOutlinePhone className="contact-icon" />
              <span>Contact line updating soon</span>
            </li>
            <li>
              <HiOutlineMail className="contact-icon" />
              <span>contact@eltacosandburritos.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Subfooter / Copyright */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} EL Tacos and Burritos. All rights reserved.
          </p>
          <div className="footer-legal">
            <span className="footer-pill">Mexican Gourmet Kitchen</span>
            <span className="footer-pill">Fresh Daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
