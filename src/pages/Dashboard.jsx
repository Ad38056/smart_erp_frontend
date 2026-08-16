import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '../lib/api';
import { getToken } from '../lib/auth';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState('product');

  const quickActions = [
    { key: 'product', label: 'Add Product', subtitle: 'Create a new item in catalog' },
    { key: 'customer', label: 'Add Customer', subtitle: 'Register a new client' },
    { key: 'order', label: 'Create Order', subtitle: 'Launch a sales order' },
  ];

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    async function loadData() {
      const res = await fetchDashboard();
      if (res.ok) {
        setStats(res.data);
      }
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <div className="page-section">Loading dashboard...</div>;

  const overview = stats?.overview || {};
  const lowStock = stats?.lowStockProducts || [];
  const recentOrders = stats?.recentOrders || [];

  const summaryCards = [
    { label: 'Total revenue', value: `Br ${Number(overview.revenue || 0).toLocaleString()}`, change: '+12.4%', tone: 'positive' },
    { label: 'Orders', value: Number(overview.totalOrders || 0).toLocaleString(), change: '+8.1%', tone: 'positive' },
    { label: 'Customers', value: Number(overview.totalCustomers || 0).toLocaleString(), change: '+4.8%', tone: 'positive' },
    { label: 'Products', value: Number(overview.totalProducts || 0).toLocaleString(), change: '94.2%', tone: 'positive' },
  ];

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Operations</span>
          <h1>Executive dashboard</h1>
        </div>
      </div>

      <div className="stats-grid">
        {summaryCards.map((card) => (
          <div key={card.label} className="stat-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <em className={card.tone}>{card.change}</em>
          </div>
        ))}
      </div>

      <div className="quick-actions panel">
        <div className="panel-header">
          <h3>Quick Actions</h3>
          <span>Fast create</span>
        </div>

        <div className="quick-action-list">
          {quickActions.map((action) => (
            <button
              key={action.key}
              type="button"
              className={`quick-action-button ${activeAction === action.key ? 'active' : ''}`}
              onClick={() => setActiveAction(action.key)}
            >
              <span>{action.label}</span>
              <small>{action.subtitle}</small>
            </button>
          ))}
        </div>

        <div className="quick-action-panel">
          {activeAction === 'product' && (
            <div>
              <h4>Add Product</h4>
              <p>Use this to create a new inventory item with price, category, and stock.</p>
            </div>
          )}
          {activeAction === 'customer' && (
            <div>
              <h4>Add Customer</h4>
              <p>Use this to register a client and capture contact details.</p>
            </div>
          )}
          {activeAction === 'order' && (
            <div>
              <h4>Create Order</h4>
              <p>Use this to launch a new sales order with customer and item details.</p>
            </div>
          )}
        </div>
      </div>

      <div className="content-grid dashboard-grid">
        <div className="panel panel-large">
          <div className="panel-header">
            <h3>Low stock alert</h3>
            <span>Inventory</span>
          </div>
          <div className="progress-list">
            {lowStock.length ? lowStock.map((product) => (
              <div key={product.id}>
                <label>{product.name}</label>
                <div className="progress-track"><span style={{ width: `${Math.min(product.stock * 10, 100)}%` }} /></div>
                <small>{product.stock} left</small>
              </div>
            )) : <p>No low stock items</p>}
          </div>
        </div>

        <div className="panel panel-side">
          <div className="panel-header">
            <h3>Recent orders</h3>
            <span>Latest</span>
          </div>
          <div className="progress-list">
            {recentOrders.length ? recentOrders.map((order) => (
              <div key={order.id}>
                <label>#{order.id} - {order.customer?.name || 'Customer'}</label>
                <div className="progress-track"><span style={{ width: '70%' }} /></div>
                <small>{order.status}</small>
              </div>
            )) : <p>No recent orders</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
