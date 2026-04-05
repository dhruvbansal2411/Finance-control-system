import { useAuth } from '../contexts/AuthContext'
import './Profile.css'

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  const isAdmin = user.role === 'admin'
  const isAnalyst = user.role === 'analyst'
  const isViewer = user.role === 'viewer'

  return (
    <div className="profile-page">
      <h1 className="page-title">Your Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="label">Role:</span>
            <span className={`role-badge ${user.role}`}>{user.role.toUpperCase()}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`status-badge ${user.status}`}>{user.status}</span>
          </div>

          <div className="detail-row">
            <span className="label">User ID:</span>
            <span>{user.id}</span>
          </div>

          <div className="detail-row">
            <span className="label">Joined:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="permissions-section">
          <h3>Your Permissions</h3>
          <div className="permissions-grid">
            <div className={`permission-item ${isAdmin || isAnalyst || isViewer ? 'allowed' : 'denied'}`}>
              <span>📊 View Dashboard</span>
              <span className="status">{isAdmin || isAnalyst || isViewer ? '✅' : '❌'}</span>
            </div>

            <div className={`permission-item ${isAdmin || isAnalyst || isViewer ? 'allowed' : 'denied'}`}>
              <span>📄 View Records</span>
              <span className="status">{isAdmin || isAnalyst || isViewer ? '✅' : '❌'}</span>
            </div>

            <div className={`permission-item ${isAdmin ? 'allowed' : 'denied'}`}>
              <span>➕ Create Records</span>
              <span className="status">{isAdmin ? '✅' : '❌'}</span>
            </div>

            <div className={`permission-item ${isAdmin ? 'allowed' : 'denied'}`}>
              <span>✏️ Edit Records</span>
              <span className="status">{isAdmin ? '✅' : '❌'}</span>
            </div>

            <div className={`permission-item ${isAdmin ? 'allowed' : 'denied'}`}>
              <span>🗑️ Delete Records</span>
              <span className="status">{isAdmin ? '✅' : '❌'}</span>
            </div>

            <div className={`permission-item ${isAdmin ? 'allowed' : 'denied'}`}>
              <span>👥 Manage Users</span>
              <span className="status">{isAdmin ? '✅' : '❌'}</span>
            </div>
          </div>
        </div>

        <div className="debug-section">
          <h3>Debug Information</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
