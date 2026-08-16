import React from 'react'
import { Link } from 'react-router-dom'

const overviewStats = [
  { label: 'Revenue', value: '$148.6K', trend: '+12.4%' },
  { label: 'Orders', value: '2,480', trend: '+8.1%' },
  { label: 'Inventory', value: '94.2%', trend: '+2.7%' },
  { label: 'Satisfaction', value: '96%', trend: '+5.3%' },
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Business intelligence built for growth</span>
          <h1>Run your entire operation from one smart platform.</h1>
          <p>
            Smart ERP gives your team the visibility and automation needed to manage
            inventory, customers, suppliers, orders, and performance in real time.
          </p>

          <div className="cta-row">
            <Link to="/login" className="primary-button">
              Access dashboard
            </Link>
            <Link to="/register" className="secondary-button">
              Create account
            </Link>
          </div>

          <div className="mini-metrics">
            {overviewStats.map((stat) => (
              <div key={stat.label} className="mini-stat-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <em>{stat.trend}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
            alt="Business professionals collaborating in an office"
          />

          <div className="floating-card floating-card-top">
            <span>Quarterly growth</span>
            <strong>+24.8%</strong>
          </div>

          <div className="floating-card floating-card-bottom">
            <span>Global operations</span>
            <strong>82% target</strong>
          </div>
        </div>
      </section>
    </div>
  )
}
