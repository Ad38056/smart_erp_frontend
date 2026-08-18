async function pullUsers() {
  const list = document.getElementById('userList');
  list.innerHTML = '<p>Loading users...</p>';

  const token = getToken && getToken();
  try {
    const res = await fetch('/api/users', {
      headers: token ? { 'Authorization': 'Bearer ' + token } : {}
    });

    if (!res.ok) {
      // fallback: if endpoint not available, try localStorage
      throw new Error('API error ' + res.status);
    }

    const data = await res.json();
    renderUsers(data);
  } catch (err) {
    // Fallback: try reading from localStorage 'user' or show helpful message
    const local = localStorage.getItem('users');
    if (local) {
      try {
        renderUsers(JSON.parse(local));
        return;
      } catch (e) {}
    }

    list.innerHTML = '<p class="muted">Could not fetch users from API. Ensure backend is running or store a users list in localStorage under "users". Error: ' + (err.message || err) + '</p>';
  }
}

function renderUsers(users) {
  const list = document.getElementById('userList');
  if (!Array.isArray(users) || users.length === 0) {
    list.innerHTML = '<p class="muted">No users found</p>';
    return;
  }

  const rows = users.map(u => `
    <div class="user-row">
      <img src="${u.avatar || 'assets/logo.png'}" alt="avatar">
      <div class="user-meta">
        <strong>${escapeHtml(u.name || u.fullName || u.username || 'User')}</strong>
        <small>${u.email || ''}</small>
        <div class="user-role">${u.role || ''}</div>
      </div>
    </div>
  `).join('');

  list.innerHTML = rows;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (s)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]);
}

// Wire button
const btn = document.getElementById('btnPullUsers');
if (btn) btn.addEventListener('click', pullUsers);

// On load, populate profile fields from localStorage user
if (typeof loadUserProfile === 'function') {
  // loadUserProfile already sets name/email/role
} else {
  (function(){
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (u) {
      const nameEl = document.getElementById('name'); if (nameEl) nameEl.textContent = u.name || u.username || 'User';
      const emailEl = document.getElementById('email'); if (emailEl) emailEl.textContent = u.email || '';
      const roleEl = document.getElementById('role'); if (roleEl) roleEl.textContent = u.role ? 'Role: ' + u.role : '';
      const avatar = document.getElementById('avatar'); if (avatar && u.avatar) avatar.src = u.avatar;
    }
  })();
}
