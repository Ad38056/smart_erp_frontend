import React from 'react'

const suppliers = [
  { name: 'Ethiopian Industry Hub', category: 'Manufacturing', onTime: '98%', status: 'Verified' },
  { name: 'Abyssinia Packaging', category: 'Packaging', onTime: '92%', status: 'Review' },
  { name: 'Addis Trade Supply', category: 'Office Goods', onTime: '96%', status: 'Verified' },
  { name: 'Nile Logistics', category: 'Shipping', onTime: '89%', status: 'Watchlist' },
]

export default function Suppliers() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Procurement</span>
          <h1>Suppliers</h1>
        </div>
        <button className="primary-button small-button">+ Add supplier</button>
      </div>

      <div className="supplier-grid">
        {suppliers.map((supplier) => (
          <div key={supplier.name} className="panel supplier-card">
            <div className="supplier-header">
              <h3>{supplier.name}</h3>
              <span className={`status-badge ${supplier.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {supplier.status}
              </span>
            </div>
            <p>{supplier.category}</p>
            <div className="supplier-stats">
              <span>On-time delivery</span>
              <strong>{supplier.onTime}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
