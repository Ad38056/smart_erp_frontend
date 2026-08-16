import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../lib/api';
import { getToken } from '../lib/auth';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    async function loadCustomers() {
      const res = await fetchCustomers();
      if (res.ok) setCustomers(res.data || []);
    }

    loadCustomers();
  }, []);

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CRM</span>
          <h1>Customer directory</h1>
        </div>
      </div>

      <div className="panel table-panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email || '—'}</td>
                <td>{customer.phone || '—'}</td>
                <td>{customer.address || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
