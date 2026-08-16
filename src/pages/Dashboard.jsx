import React from 'react'

const summaryCards = [
  { label: 'Total revenue', value: 'Br 148.6K', change: '+12.4%', tone: 'positive' },
  { label: 'Orders this month', value: '2,480', change: '+8.1%', tone: 'positive' },
  { label: 'Pending approvals', value: '34', change: '-4.2%', tone: 'neutral' },
  { label: 'Inventory health', value: '94.2%', change: '+2.7%', tone: 'positive' },
]

const activityRows = [
  { name: 'Addis Mart', type: 'New order', date: 'Today, 09:30', amount: 'Br 2,400' },
  { name: 'Aynalem Foods', type: 'Invoice paid', date: 'Today, 11:15', amount: 'Br 1,120' },
  { name: 'Ethio Supply', type: 'Stock replenished', date: 'Today, 14:00', amount: '380 units' },
  { name: 'Bole Retail Group', type: 'Return processed', date: 'Today, 16:40', amount: 'Br 860' },
]

const featureTiles = [
  { title: 'Finance', value: 'Br 42.8K', text: 'cash flow up 13%' },
  { title: 'Inventory', value: '1,284', text: 'items monitored' },
  { title: 'Support', value: '96%', text: 'satisfaction' },
]

export default function Dashboard() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Operations</span>
          <h1>Executive dashboard</h1>
        </div>
        <div className="topbar-actions">
          <button className="secondary-button small-button">Export report</button>
          <button className="primary-button small-button">Register new user</button>
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

      <div className="feature-row">
        {featureTiles.map((tile) => (
          <div key={tile.title} className="feature-tile">
            <span>{tile.title}</span>
            <strong>{tile.value}</strong>
            <small>{tile.text}</small>
          </div>
        ))}
      </div>

      <div className="content-grid dashboard-grid">
        <div className="panel panel-large">
          <div className="panel-header">
            <h3>Revenue overview</h3>
            <span>Last 6 months</span>
          </div>
          <div className="line-chart" aria-label="Revenue chart">
            <span style={{ height: '42%' }} />
            <span style={{ height: '50%' }} />
            <span style={{ height: '46%' }} />
            <span style={{ height: '72%' }} />
            <span style={{ height: '68%' }} />
            <span style={{ height: '92%' }} />
          </div>
        </div>

        <div className="panel panel-side">
          <div className="panel-header">
            <h3>Team performance</h3>
            <span>Today</span>
          </div>
          <div className="progress-list">
            <div>
              <label>Sales</label>
              <div className="progress-track"><span style={{ width: '84%' }} /></div>
            </div>
            <div>
              <label>Operations</label>
              <div className="progress-track"><span style={{ width: '71%' }} /></div>
            </div>
            <div>
              <label>Support</label>
              <div className="progress-track"><span style={{ width: '91%' }} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel table-panel">
        <div className="panel-header">
          <h3>Recent activity</h3>
          <span>Updated 5 min ago</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {activityRows.map((row) => (
              <tr key={`${row.name}-${row.type}`}>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
