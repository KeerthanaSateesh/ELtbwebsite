/**
 * EL Tacos and Burritos — Socket.IO Real-time Service Layer
 * 
 * Prepares the frontend architecture for future Node.js + Socket.IO integration.
 * The service remains in a safe, dormant state if no VITE_SOCKET_URL is set,
 * preventing unexpected connections, fake events, or network errors.
 */

import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || null;

class SocketService {
  constructor() {
    this.socket = null;
  }

  /**
   * Connect to the Socket.IO server if a real URL is provided via VITE_SOCKET_URL.
   * If VITE_SOCKET_URL is empty or undefined, it remains safely dormant.
   * 
   * @param {Object} [customOptions={}] - Optional socket configuration overrides
   * @returns {Object|null} Socket instance or null if unconfigured
   */
  connect(customOptions = {}) {
    if (!SOCKET_URL) {
      // Backend URL not configured yet. Remain dormant.
      return null;
    }

    if (this.socket && this.socket.connected) {
      return this.socket;
    }

    try {
      const token = localStorage.getItem('etb_admin_token') || localStorage.getItem('etb_auth_token');

      this.socket = io(SOCKET_URL, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        auth: token ? { token } : undefined,
        transports: ['websocket', 'polling'],
        ...customOptions,
      });

      this.socket.on('connect', () => {
        console.info('[SocketService] Connected to real-time server:', this.socket.id);
      });

      this.socket.on('disconnect', (reason) => {
        console.warn('[SocketService] Disconnected:', reason);
      });

      this.socket.on('connect_error', (error) => {
        console.warn('[SocketService] Connection error:', error.message);
      });

      return this.socket;
    } catch (err) {
      console.warn('[SocketService] Failed to initialize socket:', err);
      return null;
    }
  }

  /**
   * Disconnect cleanly from the Socket.IO server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Subscribe to new order real-time events.
   * Ready for backend contract payload:
   * {
   *   orderId,
   *   customerName,
   *   totalAmount,
   *   createdAt,
   *   items,
   *   ...
   * }
   * 
   * @param {Function} callback - Invoked when new order arrives
   * @param {string} [eventName='newOrder'] - Event name specified by backend contract
   * @returns {Function} Unsubscribe function
   */
  onNewOrder(callback, eventName = 'newOrder') {
    if (!this.socket) {
      this.connect();
    }

    if (!this.socket) {
      // Unconfigured URL — return safe no-op unsubscribe
      return () => {};
    }

    const handler = (payload) => {
      if (typeof callback === 'function') {
        callback(payload);
      }
    };

    this.socket.on(eventName, handler);

    return () => {
      if (this.socket) {
        this.socket.off(eventName, handler);
      }
    };
  }

  /**
   * Generic event subscription helper for future backend events
   * (e.g. orderStatusUpdated, kitchenAlert, etc.)
   */
  on(event, handler) {
    if (!this.socket) {
      this.connect();
    }
    if (this.socket) {
      this.socket.on(event, handler);
    }
    return () => {
      if (this.socket) {
        this.socket.off(event, handler);
      }
    };
  }

  /**
   * Emit an event to the backend
   */
  emit(event, data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    }
  }

  /**
   * Returns whether currently connected to a real-time server
   */
  isConnected() {
    return !!(this.socket && this.socket.connected);
  }
}

export const socketService = new SocketService();
export default socketService;
