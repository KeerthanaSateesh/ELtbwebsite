import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineExternalLink } from 'react-icons/hi';
import AdminSidebar from './AdminSidebar';
import AdminNotificationBell from './AdminNotificationBell';
import { NotificationProvider } from '../../context/NotificationContext';
import './AdminLayout.css';

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard Overview';
    if (pathname.startsWith('/admin/menu')) return 'Menu Catalog Management';
    if (pathname.startsWith('/admin/orders')) return 'Kitchen Orders Stream';
    if (pathname.startsWith('/admin/purchase-history')) return 'Daily Purchase History';
    if (pathname.startsWith('/admin/reports')) return 'Business & Expense Reports';
    return 'Admin Management';
  };

  return (
    <NotificationProvider>
      <div className="admin-root-layout">
        {/* Persistent Left Sidebar */}
        <AdminSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Right Content Shell */}
        <div className="admin-main-shell">
          {/* Admin Topbar */}
          <header className="admin-topbar">
            <div className="admin-topbar-left">
              <button
                type="button"
                className="admin-mobile-toggle"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open admin sidebar navigation"
              >
                <HiOutlineMenu />
              </button>
              <div className="admin-breadcrumb">
                <span className="admin-breadcrumb-root">Admin</span>
                <span className="admin-breadcrumb-sep">/</span>
                <h1 className="admin-topbar-title">{getPageTitle(location.pathname)}</h1>
              </div>
            </div>

            <div className="admin-topbar-right">
              <div className="admin-status-indicator" title="Kitchen Operations Active">
                <span className="admin-status-dot"></span>
                <span className="admin-status-text">Kitchen Live</span>
              </div>

              {/* Real-time Admin Notification Bell */}
              <AdminNotificationBell />

              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="admin-site-shortcut"
                title="View live customer website"
              >
                <HiOutlineExternalLink />
                <span>Live Site</span>
              </Link>

              <div className="admin-user-pill">
                <div className="admin-avatar">A</div>
                <div className="admin-user-info">
                  <span className="admin-user-name">ETB Admin</span>
                  <span className="admin-user-role">Manager</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dynamic Nested Content Area */}
          <main className="admin-content-area">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}

