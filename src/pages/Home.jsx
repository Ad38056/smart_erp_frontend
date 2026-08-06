import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <img src="assets/logo.png" className="logo" alt="Smart ERP Logo" />
        <h1>Smart ERP System</h1>
        <p>
          Manage your business operations easily with smart inventory, customers,
          suppliers and orders management.
        </p>
        <div className="buttons">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/login" className="btn secondary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
