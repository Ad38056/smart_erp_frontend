import React from 'react'

const customerRows = [
  { name: 'Addis Mart', segment: 'Retail', status: 'Active', value: 'Br 14,200' },
  { name: 'Aynalem Foods', segment: 'Wholesale', status: 'Priority', value: 'Br 8,460' },
  { name: 'Ethio Supply', segment: 'Enterprise', status: 'Active', value: 'Br 19,800' },
  { name: 'Bole Retail Group', segment: 'SMB', status: 'At risk', value: 'Br 5,140' },
]

export default function Customers() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CRM</span>
          <h1>Customer directory</h1>
        </div>
        <button className="primary-button small-button">+ Add customer</button>
      </div>

      <div className="panel table-panel">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Segment</th>
              <th>Status</th>
              <th>Annual value</th>
            </tr>
          </thead>
          <tbody>
            {customerRows.map((customer) => (
              <tr key={customer.name}>
                <td>{customer.name}</td>
                <td>{customer.segment}</td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {customer.status}
                  </span>
                </td>
                <td>{customer.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
