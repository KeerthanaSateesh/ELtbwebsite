import React, { useState } from 'react';
import {
  HiOutlineSearch,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineX,
  HiOutlineRefresh
} from 'react-icons/hi';

const INITIAL_ORDERS = [
  {
    id: 'ETB-1081',
    customerName: 'Aarav Mehta',
    phone: '+91 98201 44521',
    menuType: 'tiffins',
    items: [
      { name: 'Chorizo & Egg Breakfast Tacos (2 pcs)', quantity: 2, price: 180 },
      { name: 'Sunrise Mexican Breakfast Bowl', quantity: 1, price: 260 }
    ],
    total: 620,
    status: 'pending',
    orderTime: '08:15 AM',
    date: '2026-09-17',
    notes: 'Extra salsa verde on the side please.'
  },
  {
    id: 'ETB-1082',
    customerName: 'Priya Sharma',
    phone: '+91 98112 33490',
    menuType: 'tiffins',
    items: [
      { name: 'El Grande Breakfast Burrito', quantity: 2, price: 240 },
      { name: 'Toasted Breakfast Quesadilla', quantity: 1, price: 230 }
    ],
    total: 710,
    status: 'in-kitchen',
    orderTime: '08:42 AM',
    date: '2026-09-17',
    notes: 'No jalapeños in the quesadilla.'
  },
  {
    id: 'ETB-1083',
    customerName: 'Vikram Malhotra',
    phone: '+91 99203 77812',
    menuType: 'tacos-burritos',
    items: [
      { name: 'Crispy Birria Tacos (3 pcs)', quantity: 1, price: 349 },
      { name: 'Guacamole & Chips', quantity: 1, price: 199 }
    ],
    total: 548,
    status: 'ready',
    orderTime: '12:30 PM',
    date: '2026-09-17',
    notes: 'Pickup at 1:00 PM counter.'
  },
  {
    id: 'ETB-1084',
    customerName: 'Ananya Deshmukh',
    phone: '+91 97654 11209',
    menuType: 'tacos-burritos',
    items: [
      { name: 'Chipotle Chicken Burrito Bowl', quantity: 2, price: 299 },
      { name: 'Birria Quesadilla', quantity: 1, price: 349 }
    ],
    total: 947,
    status: 'completed',
    orderTime: '01:15 PM',
    date: '2026-09-17',
    notes: 'Cut into 4 pieces.'
  },
  {
    id: 'ETB-1085',
    customerName: 'Rohan Gupta',
    phone: '+91 98330 99401',
    menuType: 'tacos-burritos',
    items: [
      { name: 'Lemon Pepper Chicken Tacos', quantity: 1, price: 299 }
    ],
    total: 299,
    status: 'cancelled',
    orderTime: '01:45 PM',
    date: '2026-09-17',
    notes: 'Cancelled by customer phone call.'
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', bg: '#FEF3C7', color: '#92400E', border: '#FDE68A', dot: '#D97706' };
      case 'in-kitchen':
        return { label: 'In Kitchen', bg: '#EEF2FF', color: '#3730A3', border: '#C7D2FE', dot: '#4F46E5' };
      case 'ready':
        return { label: 'Ready', bg: '#E8F3EE', color: 'var(--color-secondary)', border: '#A3D9C9', dot: 'var(--color-secondary)' };
      case 'completed':
        return { label: 'Completed', bg: '#E8F5E9', color: '#15803D', border: '#C8E6C9', dot: '#2E7D32' };
      case 'cancelled':
        return { label: 'Cancelled', bg: '#FEE2E2', color: '#B91C1C', border: '#FECACA', dot: '#DC2626' };
      default:
        return {
          label: status ? status.charAt(0).toUpperCase() + status.slice(1) : '',
          bg: '#F3F4F6',
          color: '#4B5563',
          border: '#E5E7EB',
          dot: '#9CA3AF'
        };
    }
  };

  return (
    <div className="admin-orders-view">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', color: '#1B2E24', margin: '0 0 0.25rem 0' }}>Kitchen Orders Management</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Live customer orders stream, tickets, and fulfillment control
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOrders([...orders])}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #D8D2C4',
            backgroundColor: '#FFFFFF',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer',
            color: '#1B2E24'
          }}
        >
          <HiOutlineRefresh />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: `All Orders (${orders.length})` },
          { key: 'pending', label: `Pending (${orders.filter(o => o.status === 'pending').length})` },
          { key: 'in-kitchen', label: `In Kitchen (${orders.filter(o => o.status === 'in-kitchen').length})` },
          { key: 'ready', label: `Ready (${orders.filter(o => o.status === 'ready').length})` },
          { key: 'completed', label: `Completed (${orders.filter(o => o.status === 'completed').length})` }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            style={{
              padding: '0.5rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: statusFilter === tab.key ? 'var(--color-secondary)' : '#D8D2C4',
              backgroundColor: statusFilter === tab.key ? 'var(--color-secondary)' : '#FFFFFF',
              color: statusFilter === tab.key ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: '700',
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #D8D2C4', transform: 'none' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or Phone..."
            aria-label="Search by Order ID, Customer, or Phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #D8D2C4', backgroundColor: '#FAFAF8', fontSize: '0.9rem' }}
          />
          <HiOutlineSearch style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#7D6B61' }} />
        </div>
      </div>

      {/* Horizontally Scrollable Orders Table */}
      <div
        className="card orders-table-container"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #D8D2C4',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 2px 8px rgba(43, 24, 16, 0.04)',
          overflowX: 'auto',
          transform: 'none',
          transition: 'none'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'none'; }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '940px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8F5EE', borderBottom: '2px solid #D8D2C4' }}>
              <th style={{ width: '13%', minWidth: '110px', padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Order ID</th>
              <th style={{ width: '19%', minWidth: '160px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Customer</th>
              <th style={{ width: '28%', minWidth: '220px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Dishes Ordered</th>
              <th style={{ width: '10%', minWidth: '90px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Total</th>
              <th style={{ width: '10%', minWidth: '95px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Time</th>
              <th style={{ width: '10%', minWidth: '125px', padding: '1rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em' }}>Status</th>
              <th style={{ width: '10%', minWidth: '140px', padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#1B2E24', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                  No orders found matching the filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const badge = getStatusBadge(order.status);
                return (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: '1px solid #EAE5D9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FDFBF7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <td style={{ padding: '0.95rem 1.25rem', fontWeight: '800', color: 'var(--color-primary)', fontSize: '0.92rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      {order.id}
                    </td>
                    <td style={{ padding: '0.95rem 1rem', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: '700', color: '#1B2E24', fontSize: '0.92rem', lineHeight: '1.2' }}>{order.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#7D6B61', marginTop: '3px' }}>{order.phone}</div>
                    </td>
                    <td style={{ padding: '0.95rem 1rem', verticalAlign: 'middle', maxWidth: '300px' }}>
                      <div style={{ fontSize: '0.88rem', color: '#1B2E24', fontWeight: '500', lineHeight: '1.4' }}>
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                      <div style={{ marginTop: '4px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: order.menuType === 'tiffins' ? 'var(--color-secondary-light)' : 'var(--color-primary-subtle)',
                          color: order.menuType === 'tiffins' ? 'var(--color-secondary)' : 'var(--color-primary)',
                          border: `1px solid ${order.menuType === 'tiffins' ? 'rgba(27,67,50,0.2)' : 'rgba(217,72,15,0.2)'}`
                        }}>
                          {order.menuType === 'tiffins' ? '🍳 Breakfast' : '🌮 Tacos & Burritos'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '0.95rem 1rem', fontWeight: '800', color: '#1B2E24', fontSize: '0.98rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      ₹{order.total}
                    </td>
                    <td style={{ padding: '0.95rem 1rem', color: '#5A4E46', fontSize: '0.88rem', fontWeight: '500', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      {order.orderTime}
                    </td>
                    <td style={{ padding: '0.95rem 1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                        backgroundColor: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: badge.dot,
                          flexShrink: 0
                        }} />
                        <span>{badge.label}</span>
                      </span>
                    </td>
                    <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <select
                          value={order.status}
                          aria-label={`Update status for order ${order.id}`}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{
                            padding: '0.38rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid #D8D2C4',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            backgroundColor: '#FAFAF8',
                            color: '#1B2E24',
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-kitchen">In Kitchen</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <button
                          type="button"
                          title="View Ticket Details"
                          aria-label={`View ticket details for order ${order.id}`}
                          onClick={() => setSelectedOrder(order)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D8D2C4',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.38rem 0.55rem',
                            cursor: 'pointer',
                            color: '#1B2E24',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.95rem',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FAF4E8'; e.currentTarget.style.borderColor = '#C5BDB0'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#D8D2C4'; }}
                        >
                          <HiOutlineEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(27, 24, 20, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{
            backgroundColor: '#FFFFFF',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #EAE5D9', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--color-primary)', textTransform: 'uppercase' }}>Ticket Details</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.2rem' }}>
                  <h3 style={{ margin: 0, color: '#1B2E24', fontSize: '1.35rem' }}>Order {selectedOrder.id}</h3>
                  {(() => {
                    const modalBadge = getStatusBadge(selectedOrder.status);
                    return (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                        backgroundColor: modalBadge.bg,
                        color: modalBadge.color,
                        border: `1px solid ${modalBadge.border}`
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: modalBadge.dot,
                          flexShrink: 0
                        }} />
                        <span>{modalBadge.label}</span>
                      </span>
                    );
                  })()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.35rem', color: '#7D6B61' }}
              >
                <HiOutlineX />
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem', padding: '0.85rem', backgroundColor: '#FAF8F4', borderRadius: 'var(--radius-md)', border: '1px solid #EAE5D9' }}>
              <div style={{ fontWeight: '700', color: '#1B2E24' }}>Customer: {selectedOrder.customerName}</div>
              <div style={{ fontSize: '0.85rem', color: '#7D6B61' }}>Phone: {selectedOrder.phone}</div>
              <div style={{ fontSize: '0.85rem', color: '#7D6B61' }}>Time: {selectedOrder.orderTime} ({selectedOrder.date})</div>
              {selectedOrder.notes && (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginTop: '0.35rem', fontWeight: '600' }}>
                  Note: {selectedOrder.notes}
                </div>
              )}
            </div>

            <h4 style={{ fontSize: '0.95rem', color: '#1B2E24', marginBottom: '0.65rem' }}>Items Ordered:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #EAE5D9', paddingBottom: '0.45rem', fontSize: '0.9rem' }}>
                  <span>{it.quantity}x {it.name}</span>
                  <span style={{ fontWeight: '700' }}>₹{it.price * it.quantity}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                <span>Total Amount</span>
                <span>₹{selectedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{ padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid #D8D2C4', background: '#FFFFFF', cursor: 'pointer', fontWeight: '700', color: '#1B2E24' }}
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
