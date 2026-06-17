/* ── Sidebar toggle (mobile) ── */
function openSidebar() {
  document.querySelector('.sidebar').classList.add('open');
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

function requireAuth() {
  if (!sessionStorage.getItem('gc_auth')) {
    window.location.href = 'index.html';
  }
}

function logout() {
  sessionStorage.removeItem('gc_auth');
  sessionStorage.removeItem('gc_user');
  window.location.href = 'index.html';
}