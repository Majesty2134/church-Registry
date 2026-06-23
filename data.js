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
// === Session Inactivity Timeout (1 hour) ===
const INACTIVITY_LIMIT_MS = 60 * 60 * 1000; // 1 hour
const ACTIVITY_KEY = 'lastActivityTime';

function updateActivityTimestamp() {
  sessionStorage.setItem(ACTIVITY_KEY, Date.now().toString());
}

function getLastActivityTime() {
  const stored = sessionStorage.getItem(ACTIVITY_KEY);
  return stored ? parseInt(stored, 10) : Date.now();
}

function isSessionExpired() {
  return Date.now() - getLastActivityTime() > INACTIVITY_LIMIT_MS;
}

function forceLogout() {
  firebase.auth().signOut().then(() => {
    sessionStorage.clear();
    window.location.href = 'index.html'; // your login page
  });
}

// Refresh the timestamp on real user interaction (throttled via passive listeners)
['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
  document.addEventListener(evt, updateActivityTimestamp, { passive: true });
});

// Initialize timestamp if this is a fresh session
if (!sessionStorage.getItem(ACTIVITY_KEY)) {
  updateActivityTimestamp();
}

// Check every minute in case the user is idle on the same page for a long time
setInterval(() => {
  if (isSessionExpired()) {
    forceLogout();
  }
}, 60 * 1000);