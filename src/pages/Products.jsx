import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';
import { getToken } from '../lib/auth';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    async function loadProducts() {
      const res = await fetchProducts();
      if (res.ok) setProducts(res.data || []);
    }

    loadProducts();
  }, []);

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Catalog</span>
          <h1>Products</h1>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-thumb" aria-hidden="true">◫</div>
            <div className="product-topline">
              <h3>{product.name}</h3>
              <span className={`status-badge ${product.stock > 0 ? 'in-stock' : 'low-stock'}`}>
                {product.stock > 0 ? 'In stock' : 'Low stock'}
              </span>
            </div>
            <p>{product.stock} units available</p>
            <p>{product.category || 'Uncategorized'}</p>
            <div className="product-footer">
              <strong>Br {Number(product.price || 0).toLocaleString()}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
