import React, { useEffect, useState } from 'react';
import { fetchSuppliers } from '../lib/api';
import { getToken } from '../lib/auth';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    async function loadSuppliers() {
      const res = await fetchSuppliers();
      if (res.ok) setSuppliers(res.data || []);
    }

    loadSuppliers();
  }, []);

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Procurement</span>
          <h1>Suppliers</h1>
        </div>
      </div>

      <div className="supplier-grid">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="panel supplier-card">
            <div className="supplier-header">
              <h3>{supplier.name}</h3>
            </div>
            <p>{supplier.company || 'No company'}</p>
            <p>{supplier.email || 'No email'}</p>
            <p>{supplier.phone || 'No phone'}</p>
            <p>{supplier.address || 'No address'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
