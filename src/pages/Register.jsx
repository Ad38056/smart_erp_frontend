import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    role: 'Operations Manager',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    await new Promise((resolve) => setTimeout(resolve, 500))

    setLoading(false)
    setMessage('Registration successful. Redirecting to dashboard...')

    setTimeout(() => {
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Join Smart ERP</span>
          <h1>Create your business account</h1>
          <p>
            Set up your workspace and start managing sales, inventory, customers,
            and operations from one secure platform.
          </p>
          <ul>
            <li>Launch your ERP workspace in minutes</li>
            <li>Invite your team and assign roles</li>
            <li>Track performance in real time</li>
          </ul>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Register</h2>
            <p>Set up a new account</p>
          </div>

          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="company">Company name</label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Your company"
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option>Operations Manager</option>
            <option>Finance Lead</option>
            <option>Sales Manager</option>
            <option>Inventory Specialist</option>
            <option>Executive</option>
          </select>

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
          />

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          <p className="login-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
    </div>
  )
}
