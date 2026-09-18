import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBell } from 'react-icons/hi';
import { useNotification } from '../../context/NotificationContext';
import './AdminNotificationBell.css';

/**
 * Format timestamp to a human-readable relative time string
 */
function formatRelativeTime(timestamp) {
  if (!timestamp) return 'Just now';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return 'Just now';

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 45) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function AdminNotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    isBellAnimating,
    markAsRead,
    markAllAsRead,
  } = useNotification();

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setIsOpen(false);
    navigate('/admin/orders');
  };

  const handleViewAllOrders = () => {
    setIsOpen(false);
    navigate('/admin/orders');
  };

  // Badge count display (1-99 or 99+)
  const badgeLabel = unreadCount > 99 ? '99+' : unreadCount;

  return (
    <div className="admin-notification-container" ref={containerRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        className={`admin-bell-btn ${isOpen ? 'active' : ''} ${isBellAnimating ? 'admin-bell-animating' : ''}`}
        onClick={handleToggle}
        title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
        aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
        aria-expanded={isOpen}
      >
        <HiOutlineBell />

        {/* Unread Badge (Hidden when zero unread) */}
        {unreadCount > 0 && (
          <span className="admin-bell-badge" aria-hidden="true">
            {badgeLabel}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="admin-notification-panel" role="region" aria-label="Notifications panel">
          {/* Header */}
          <div className="admin-notification-header">
            <div className="admin-notification-title-group">
              <h3 className="admin-notification-title">Notifications</h3>
              {unreadCount > 0 && (
                <span className="admin-notification-unread-pill">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                className="admin-notification-read-all-btn"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List or Empty State */}
          {notifications.length === 0 ? (
            <div className="admin-notification-empty">
              <HiOutlineBell className="admin-notification-empty-icon" />
              <p className="admin-notification-empty-title">No new notifications</p>
              <p className="admin-notification-empty-subtext">
                Real-time kitchen orders will appear here
              </p>
            </div>
          ) : (
            <ul className="admin-notification-list">
              {notifications.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`admin-notification-item ${item.read ? 'read' : 'unread'}`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <span
                      className={`admin-notification-dot ${item.read ? 'read' : 'unread'}`}
                      aria-hidden="true"
                    />
                    <div className="admin-notification-content">
                      <div className="admin-notification-item-header">
                        <span className="admin-notification-item-title">
                          {item.title}
                        </span>
                        <span className="admin-notification-item-time">
                          {formatRelativeTime(item.timestamp)}
                        </span>
                      </div>

                      {item.message && (
                        <p className="admin-notification-item-msg">
                          {item.message}
                        </p>
                      )}

                      {item.amount && (
                        <div className="admin-notification-item-footer">
                          <span className="admin-notification-item-amount">
                            {item.amount}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Footer */}
          <div className="admin-notification-footer">
            <button
              type="button"
              className="admin-notification-read-all-btn admin-notification-view-all"
              onClick={handleViewAllOrders}
            >
              View all orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
