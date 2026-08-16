import React, { useEffect, useState } from 'react';
import { getToken } from '../lib/auth';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(savedUser);
  }, []);

  if (!user) return <div className="page-section">Loading profile...</div>;

  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Account</span>
          <h1>Profile</h1>
        </div>
      </div>

      <div className="profile-layout">
        <div className="panel profile-card">
          <div className="avatar">{(user.name || 'U').slice(0, 2).toUpperCase()}</div>
          <h2>{user.name || 'User'}</h2>
          <p>{user.role || 'User'}</p>
          <div className="profile-meta">
            <span>Email</span>
            <strong>{user.email || '—'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
