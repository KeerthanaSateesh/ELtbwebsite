/**
 * EL Tacos and Burritos — Admin Notification Context
 * 
 * Provides centralized real-time notification state across all Admin views:
 * - Unread badge tracking
 * - Bell wiggle animation trigger
 * - Sound playback integration
 * - Future Socket.IO newOrder event handler
 * 
 * Active exclusively within the Admin module.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { playNotificationSound } from '../services/notificationSound';
import { socketService } from '../services/socket';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  // Empty initial state — no fake notifications or mock data
  const [notifications, setNotifications] = useState([]);
  const [isBellAnimating, setIsBellAnimating] = useState(false);

  // Trigger bell wiggle animation briefly
  const triggerBellAnimation = useCallback(() => {
    setIsBellAnimating(true);
    const timer = setTimeout(() => {
      setIsBellAnimating(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Add a notification to the list.
   * Plays the chime sound and animates the bell.
   */
  const addNotification = useCallback((notificationData) => {
    const newId = notificationData.id || `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newNotification = {
      orderId: notificationData.orderId || null,
      title: notificationData.title || 'New Order Received',
      message: notificationData.message || 'A new order has arrived in the kitchen queue.',
      amount: notificationData.amount || null,
      timestamp: notificationData.timestamp || new Date().toISOString(),
      ...notificationData,
      id: newId,
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Animate bell & play audio alert
    triggerBellAnimation();
    playNotificationSound();
  }, [triggerBellAnimation]);

  /**
   * Mark an individual notification as read
   */
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  /**
   * Clear all notifications
   */
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Listen for future real-time newOrder events from Socket.IO
   * If VITE_SOCKET_URL is configured, this subscribes to real backend events.
   * If unconfigured, socketService remains dormant without fake polling.
   */
  useEffect(() => {
    const unsubscribe = socketService.onNewOrder((orderPayload) => {
      if (!orderPayload) return;

      const orderNumber = orderPayload.orderId || orderPayload.id || 'New';
      const customer = orderPayload.customerName ? ` from ${orderPayload.customerName}` : '';
      const amountValue = orderPayload.totalAmount || orderPayload.amount;
      const formattedAmount = amountValue ? `₹${amountValue}` : null;

      addNotification({
        orderId: orderPayload.orderId || orderPayload.id,
        title: `New Order #${orderNumber}`,
        message: `New order received${customer}`,
        amount: formattedAmount,
        timestamp: orderPayload.createdAt || new Date().toISOString(),
      });
    });

    return () => {
      unsubscribe();
    };
  }, [addNotification]);

  // Derived unread count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      isBellAnimating,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
    }),
    [notifications, unreadCount, isBellAnimating, addNotification, markAsRead, markAllAsRead, clearNotifications]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * Hook to consume Notification context within Admin views
 */
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export default NotificationContext;
