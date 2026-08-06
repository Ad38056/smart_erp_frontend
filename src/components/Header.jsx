import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{background:'#f5f5f5', padding:'12px 16px'}}>
      <nav style={{maxWidth:1100, margin:'0 auto', display:'flex', gap:12}}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login" style={{marginLeft:'auto'}}>Login</Link>
      </nav>
    </header>
  )
}
