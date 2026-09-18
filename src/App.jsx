import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import CustomerLayout from './components/common/CustomerLayout';
import AdminLayout from './components/admin/AdminLayout';

// Customer Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenuManagement from './pages/admin/AdminMenuManagement';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPurchaseHistory from './pages/admin/AdminPurchaseHistory';
import AdminReports from './pages/admin/AdminReports';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Customer Facing Routes (Rendered inside public CustomerLayout with Header & Footer) */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Admin Protected Management Portal (ONE Layout + ONE Persistent Sidebar + 5 Sections) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenuManagement />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="purchase-history" element={<AdminPurchaseHistory />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* 404 Fallback Route */}
        <Route path="*" element={<CustomerLayout />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
