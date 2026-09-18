/**
 * EL Tacos and Burritos — API Service Scaffolding
 * Centralized HTTP abstraction layer for future backend integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Standard fetch wrapper with JSON handling and auth header injection
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('etb_auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Authentication endpoints
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    getCurrentUser: () => request('/auth/me'),
    sendRegistrationOtp: (phoneNumber) =>
      request('/auth/register/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      }),
    verifyRegistrationOtp: (phoneNumber, otp) =>
      request('/auth/register/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, otp }),
      }),
  },

  // Menu endpoints
  menu: {
    getItems: () => request('/menu/items'),
    getItemById: (id) => request(`/menu/items/${id}`),
    createItem: (item) => request('/menu/items', { method: 'POST', body: JSON.stringify(item) }),
    updateItem: (id, item) => request(`/menu/items/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
    deleteItem: (id) => request(`/menu/items/${id}`, { method: 'DELETE' }),
  },

  // Orders endpoints
  orders: {
    createOrder: (orderData) => request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
    getOrderById: (id) => request(`/orders/${id}`),
    getUserOrders: () => request('/orders/user'),
  },
};

export const sendRegistrationOtp = (phoneNumber) => api.auth.sendRegistrationOtp(phoneNumber);
export const verifyRegistrationOtp = (phoneNumber, otp) => api.auth.verifyRegistrationOtp(phoneNumber, otp);
export const registerCustomer = (userData) => api.auth.register(userData);
export const loginCustomer = (identifier, password) => api.auth.login({ identifier, password });

export default api;
