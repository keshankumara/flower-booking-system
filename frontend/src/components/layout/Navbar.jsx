import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { totalCount } = useCart()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeAll = () => { setMenuOpen(false); setUserMenuOpen(false) }

  return (
    <header className="navbar" role="banner">
      <div className="container navbar__inner">

        {/* ── Brand ── */}
        <Link to="/" className="navbar__brand" onClick={closeAll} aria-label="Botanical Elegance — Home">
          <span className="navbar__brand-name">The Digital Conservatory</span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
            Flowers
          </NavLink>
          <NavLink to="/" end className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
            Occasions
          </NavLink>
          <NavLink to="/flowers" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
            Subcription
          </NavLink>
          <NavLink to="/flowers" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
            About Us
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin/dashboard" className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* ── Right actions ── */}
        <div className="navbar__actions">
          {/* Cart */}
          <Link to="/cart" className="navbar__cart-btn" aria-label={`Shopping cart, ${totalCount} item${totalCount !== 1 ? 's' : ''}`}>
            <svg className="navbar__cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalCount > 0 && (
              <span className="navbar__cart-badge" aria-hidden="true">{totalCount > 99 ? '99+' : totalCount}</span>
            )}
          </Link>

          {/* User area */}
          {isAuthenticated ? (
            <div className="navbar__user" ref={userMenuRef}>
              <button
                className="navbar__user-btn"
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="User menu"
              >
                <span className="navbar__user-avatar" aria-hidden="true">
                  {user?.name?.[0]?.toUpperCase() ?? '👤'}
                </span>
                <span className="navbar__user-name">{user?.name?.split(' ')[0]}</span>
                <svg className={`navbar__chevron${userMenuOpen ? ' navbar__chevron--up' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
                </svg>
              </button>

              {userMenuOpen && (
                <div className="navbar__dropdown" role="menu" aria-label="User options">
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{user?.name}</p>
                    <p className="navbar__dropdown-email">{user?.email}</p>
                  </div>
                  <div className="navbar__dropdown-divider" />
                  <Link to="/orders" className="navbar__dropdown-item" role="menuitem" onClick={closeAll}>
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="navbar__dropdown-item" role="menuitem" onClick={closeAll}>
                      Admin Panel
                    </Link>
                  )}
                  <div className="navbar__dropdown-divider" />
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    role="menuitem"
                    onClick={() => { logout(); closeAll() }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="navbar__link">Sign in</Link>
              <Link to="/register" className="navbar__register-btn">Get started</Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`navbar__bar${menuOpen ? ' navbar__bar--top-open' : ''}`} />
            <span className={`navbar__bar${menuOpen ? ' navbar__bar--mid-open' : ''}`} />
            <span className={`navbar__bar${menuOpen ? ' navbar__bar--bot-open' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-nav"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <NavLink to="/" end className={({ isActive }) => `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`} onClick={closeAll}>Home</NavLink>
          <NavLink to="/flowers" className={({ isActive }) => `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`} onClick={closeAll}>Flowers</NavLink>
          {isAuthenticated && (
            <NavLink to="/orders" className={({ isActive }) => `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`} onClick={closeAll}>My Orders</NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin/dashboard" className={({ isActive }) => `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`} onClick={closeAll}>Admin</NavLink>
          )}
        </nav>
        <div className="navbar__mobile-footer">
          {isAuthenticated ? (
            <button className="navbar__mobile-logout" onClick={() => { logout(); closeAll() }}>Sign out</button>
          ) : (
            <div className="navbar__mobile-auth">
              <Link to="/login" className="btn btn-secondary btn-md" onClick={closeAll}>Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-md" onClick={closeAll}>Get started</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
