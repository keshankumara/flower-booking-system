import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminTopBar.css'

const PAGE_TITLES = {
  '/admin/dashboard':  { title: 'Dashboard',        subtitle: 'Overview of your store' },
  '/admin/flowers':    { title: 'Manage Flowers',   subtitle: 'Add, edit and remove products' },
  '/admin/categories': { title: 'Categories',       subtitle: 'Organise your flower catalog' },
  '/admin/bookings':   { title: 'Bookings',         subtitle: 'Track and manage all orders' },
}

function AdminTopBar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const page = PAGE_TITLES[pathname] ?? { title: 'Admin', subtitle: '' }

  return (
    <header className="admin-topbar" role="banner">
      <div className="admin-topbar__left">
        <h1 className="admin-topbar__title">{page.title}</h1>
        {page.subtitle && (
          <p className="admin-topbar__subtitle">{page.subtitle}</p>
        )}
      </div>

      <div className="admin-topbar__right">
        <div className="admin-topbar__user">
          <div className="admin-topbar__avatar" aria-hidden="true">
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="admin-topbar__user-info">
            <p className="admin-topbar__user-name">{user?.name}</p>
            <p className="admin-topbar__user-role">Administrator</p>
          </div>
        </div>

        <button
          className="admin-topbar__logout"
          onClick={logout}
          aria-label="Sign out of admin"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>
      </div>
    </header>
  )
}

export default AdminTopBar
