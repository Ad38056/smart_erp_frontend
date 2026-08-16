import React from 'react'

const orderRows = [
  { id: '#SO-1024', customer: 'Addis Mart', total: 'Br 2,400', status: 'Processing' },
  { id: '#SO-1029', customer: 'Aynalem Foods', total: 'Br 1,120', status: 'Shipped' },
  { id: '#SO-1032', customer: 'Ethio Supply', total: 'Br 3,760', status: 'Completed' },
  { id: '#SO-1041', customer: 'Bole Retail Group', total: 'Br 860', status: 'Pending' },
]

export default function Orders() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Sales</span>
          <h1>Orders</h1>
        </div>
        <button className="secondary-button small-button">Filter</button>
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
            {orderRows.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
