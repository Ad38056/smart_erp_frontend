import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../lib/api'
import { saveToken, saveUser } from '../lib/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    const res = await loginUser(email, password)
    setLoading(false)

    if (!res.ok) {
      setMessage(res.error || 'Server connection error')
      return
    }

    const data = res.data || {}
    if (data.token) {
      saveToken(data.token)
      saveUser(data.user || {})
      navigate('/dashboard')
    } else {
      setMessage(data.message || 'Invalid credentials')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Welcome back</span>
          <h1>Sign in to your ERP workspace</h1>
          <p>
            Centralize operations, track growth, and make faster business decisions.
          </p>
          <ul>
            <li>Real-time reporting</li>
            <li>Secure team access</li>
            <li>Smart workflow automation</li>
          </ul>
        </div>

        <form className="auth-form" id="loginForm" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Login</h2>
            <p>Use your company credentials</p>
          </div>

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className="remember-row">
            <label className="checkbox-wrap">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <p className="login-switch">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

          {message && <p className="error-message">{message}</p>}
        </form>
      </div>
    </div>
  )
}
