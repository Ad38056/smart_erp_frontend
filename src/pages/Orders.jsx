import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../lib/api';
import { getToken } from '../lib/auth';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    async function loadOrders() {
      const res = await fetchOrders();
      if (res.ok) setOrders(res.data || []);
    }

    loadOrders();
  }, []);

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Sales</span>
          <h1>Orders</h1>
        </div>
      </div>

      <div className="panel table-panel">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer?.name || 'Customer'}</td>
                <td>Br {Number(order.total || 0).toLocaleString()}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
