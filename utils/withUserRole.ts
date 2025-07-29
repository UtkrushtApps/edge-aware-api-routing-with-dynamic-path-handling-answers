export default function withUserRole() {
  // For this exercise, role could be determined by a cookie or session
  // We'll fake it as 'admin' if a special cookie is present (not secure for prod)
  if (typeof window !== 'undefined') {
    const m = document.cookie.match(/role=([^;]+)/);
    if (m) return m[1];
  }
  // Default to 'user'
  return 'user';
}
