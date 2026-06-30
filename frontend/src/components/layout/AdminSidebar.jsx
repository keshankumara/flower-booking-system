import { NavLink } from 'react-router-dom'
import './AdminSidebar.css'

const NAV_ITEMS = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    to: '/admin/flowers',
    label: 'Manage Flowers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
        <path d="M12 2a4 4 0 014 4c0 1.5-.7 2.8-1.8 3.7A4 4 0 0112 18a4 4 0 01-2.2-8.3A4 4 0 018 6a4 4 0 014-4z"/>
        <path d="M12 18v4"/>
      </svg>
    ),
  },
  {
    to: '/admin/categories',
    label: 'Categories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
        <path d="M4 6h16M4 10h16M4 14h10M4 18h6"/>
      </svg>
    ),
  },
  {
    to: '/admin/bookings',
    label: 'Bookings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
]

function AdminSidebar() {
  return (
    <aside className="admin-sidebar" aria-label="Admin navigation">
      {/* Brand */}
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__brand-icon" aria-hidden="true">✿</span>
        <span className="admin-sidebar__brand-name">Botanical</span>
        <span className="admin-sidebar__brand-tag">Admin</span>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar__nav">
        <p className="admin-sidebar__section-label">Management</p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
            }
          >
            <span className="admin-sidebar__link-icon">{item.icon}</span>
            <span className="admin-sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Back to site */}
      <div className="admin-sidebar__footer">
        <NavLink to="/" className="admin-sidebar__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
          </svg>
          Back to Site
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSidebar
