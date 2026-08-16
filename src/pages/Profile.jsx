import React from 'react'

export default function Profile() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Account</span>
          <h1>Profile</h1>
        </div>
        <button className="secondary-button small-button">Edit profile</button>
      </div>

      <div className="profile-layout">
        <div className="panel profile-card">
          <div className="avatar">AA</div>
          <h2>Aderajew</h2>
          <p>Operations Director</p>
          <div className="profile-meta">
            <span>Email</span>
            <strong>aderajew@smart-erp.et</strong>
          </div>
          <div className="profile-meta">
            <span>Location</span>
            <strong>Addis Ababa, Ethiopia</strong>
          </div>
        </div>

        <div className="panel details-panel">
          <div className="panel-header">
            <h3>Account overview</h3>
          </div>
          <div className="details-grid">
            <div>
              <span>Department</span>
              <strong>Operations</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>Director</strong>
            </div>
            <div>
              <span>Team size</span>
              <strong>18 members</strong>
            </div>
            <div>
              <span>Security</span>
              <strong>2FA enabled</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
