import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../lib/api";
import { saveToken, saveUser } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const res = await loginUser(email, password);
    setLoading(false);

    if (!res.ok) {
      const statusMsg = res.status ? `HTTP ${res.status}` : null;
      setMessage(res.error || statusMsg || "Server connection error");
      return;
    }

    const data = res.data || {};
    if (data.token) {
      saveToken(data.token);
      saveUser(data.user || {});
      navigate("/dashboard");
    } else {
      setMessage(data.message || "Invalid credentials");
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "24px auto" }}>
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </div>
      </form>
      {message && (
        <p id="message" style={{ color: "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
