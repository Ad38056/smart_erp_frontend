import React, { useEffect, useState } from 'react';
import { fetchDashboard } from '../lib/api';
import { getToken } from '../lib/auth';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
