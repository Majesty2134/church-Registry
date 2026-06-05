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

const SEED = [];

function getMembers() {
  const stored = localStorage.getItem('gc_members');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('gc_members', JSON.stringify(SEED));
  return SEED;
}

function addMember(data) {
  const members = getMembers();
  const maxId = members.reduce((max, m) => Math.max(max, m.id), 0);
  members.unshift({ id: maxId + 1, ...data });
  localStorage.setItem('gc_members', JSON.stringify(members));
}
