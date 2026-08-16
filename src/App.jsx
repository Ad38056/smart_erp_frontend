import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Suppliers from './pages/Suppliers'
import Profile from './pages/Profile'
import Header from './components/Header'

const sidebarLinks = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'Customers', to: '/customers' },
  { label: 'Products', to: '/products' },
  { label: 'Orders', to: '/orders' },
  { label: 'Suppliers', to: '/suppliers' },
  { label: 'Profile', to: '/profile' },
]

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar-shell">
        <div className="brand-block">
          <div className="brand-mark">S</div>
          <div>
            <span className="brand-label">Smart ERP</span>
            <small>Business Suite</small>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <span className="dot" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="mini-identity">
            <div className="avatar-mini">AA</div>
            <div>
              <strong>Aderajew</strong>
              <span>Addis Ababa</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="main-panel">
        <Header />
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
