import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setMessage("Please complete all fields.");
      return;
    }

    setLoading(true);
    const res = await registerUser(form.name, form.email, form.password);
    setLoading(false);

    if (!res.ok) {
      setMessage(res.error || res.data?.message || "Registration failed");
      return;
    }

    setMessage("Registration successful. Redirecting to login...");
    setTimeout(() => navigate("/login"), 900);
  }

  return (
    <div style={{ maxWidth: 480, margin: "24px auto" }}>
      <h1>Create account</h1>
      <form id="registerForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </div>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {message && (
        <p
          id="message"
          style={{ color: message.includes("successful") ? "green" : "red" }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
