import React from 'react'

const products = [
  { name: 'Ethiopian Coffee Beans', stock: 184, price: 'Br 420', status: 'In stock' },
  { name: 'Bole Water Filter', stock: 86, price: 'Br 130', status: 'Low stock' },
  { name: 'Addis Office Chair', stock: 250, price: 'Br 95', status: 'In stock' },
  { name: 'Premium Cooking Oil', stock: 34, price: 'Br 55', status: 'Low stock' },
]

export default function Products() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Catalog</span>
          <h1>Products</h1>
        </div>
        <button className="primary-button small-button">+ New product</button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.name} className="product-card">
            <div className="product-thumb" aria-hidden="true">◫</div>
            <div className="product-topline">
              <h3>{product.name}</h3>
              <span className={`status-badge ${product.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {product.status}
              </span>
            </div>
            <p>{product.stock} units available</p>
            <div className="product-footer">
              <strong>{product.price}</strong>
              <button className="secondary-button small-button">Manage</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
