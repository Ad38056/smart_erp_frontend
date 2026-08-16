import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../lib/api'
import { saveToken, saveUser } from '../lib/auth'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
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

    const res = await registerUser(form.name, form.email, form.password)
    setLoading(false)

    if (!res.ok) {
      setMessage(res.error || 'Registration failed')
      return
    }

    const data = res.data || {}
    if (data.user) {
      saveUser(data.user)
    }

    const loginRes = await loginUser(form.email, form.password)
    if (!loginRes.ok || !loginRes.data?.token) {
      setMessage('Registration successful. Please log in manually.')
      return
    }

    saveToken(loginRes.data.token)
    saveUser(loginRes.data.user || data.user || {})
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
