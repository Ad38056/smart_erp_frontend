import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-search">
          <span>⌕</span>
          <input type="text" placeholder="Search reports, orders, customers..." />
        </div>

        <div className="topbar-actions">
          <button className="ghost-button" type="button">Alerts</button>
          <button className="primary-button small-button" type="button">New report</button>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}
