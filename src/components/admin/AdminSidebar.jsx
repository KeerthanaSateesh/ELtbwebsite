import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineTruck,
  HiOutlineChartSquareBar,
  HiOutlineExternalLink,
  HiOutlineLogout,
  HiOutlineX
} from 'react-icons/hi';

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('etb_auth_token');
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin',
      label: 'Dashboard',
      icon: <HiOutlineViewGrid className="admin-nav-icon" />,
      end: true
    },
    {
      to: '/admin/menu',
      label: 'Menu',
      icon: <HiOutlineBookOpen className="admin-nav-icon" />
    },
    {
      to: '/admin/orders',
      label: 'Orders',
      icon: <HiOutlineClipboardList className="admin-nav-icon" />
    },
    {
      to: '/admin/purchase-history',
      label: 'Purchase History',
      icon: <HiOutlineTruck className="admin-nav-icon" />
    },
    {
      to: '/admin/reports',
      label: 'Reports',
      icon: <HiOutlineChartSquareBar className="admin-nav-icon" />
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-sidebar-brand" onClick={onClose}>
            <div className="admin-brand-icon">🌮</div>
            <div className="admin-brand-text">
              <span className="admin-brand-title">EL TACOS</span>
              <span className="admin-brand-subtitle">Management Console</span>
            </div>
          </Link>
          <button
            type="button"
            className="admin-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close admin navigation menu"
          >
            <HiOutlineX />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="admin-sidebar-nav" aria-label="Admin Navigation">
          <div className="admin-nav-label">MAIN NAVIGATION</div>
          <ul className="admin-nav-list">
            {navItems.map((item) => (
              <li key={item.to} className="admin-nav-item">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `admin-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  {item.icon}
                  <span className="admin-nav-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Utility Bar */}
        <div className="admin-sidebar-footer">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-footer-btn view-site-btn"
            title="Open customer website in new tab"
          >
            <HiOutlineExternalLink className="admin-footer-icon" />
            <span>Customer Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="admin-footer-btn logout-btn"
            title="Log out of admin session"
          >
            <HiOutlineLogout className="admin-footer-icon" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
