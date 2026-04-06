import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LayoutDashboard, FileText, Users, LogOut } from 'lucide-react'
import './Layout.css'

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  // Debug: Log user role
  console.log('Current user:', user)
  console.log('User role:', user?.role)
  console.log('Is admin?:', user?.role === 'admin')

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Finance Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">{user?.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/records" className={`nav-link ${isActive('/records') ? 'active' : ''}`}>
            <FileText size={20} />
            <span>Records</span>
          </Link>
          {user?.role === 'admin' && (
            <Link to="/users" className={`nav-link ${isActive('/users') ? 'active' : ''}`}>
              <Users size={20} />
              <span>Users</span>
            </Link>
          )}
        </nav>

        <button onClick={logout} className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
