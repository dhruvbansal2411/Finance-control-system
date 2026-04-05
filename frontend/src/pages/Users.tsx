import { useState, useEffect } from 'react'
import { Shield, UserCheck, UserX, Trash2 } from 'lucide-react'
import api from '../api/axios'
import { User, UserRole, UserStatus } from '../types'
import { useAuth } from '../contexts/AuthContext'
import './Users.css'

export default function Users() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: number, role: UserRole) => {
    try {
      await api.patch(`/users/${userId}/role`, { role })
      fetchUsers()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update role')
    }
  }

  const updateUserStatus = async (userId: number, status: UserStatus) => {
    try {
      await api.patch(`/users/${userId}/status`, { status })
      fetchUsers()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update status')
    }
  }

  const deleteUser = async (userId: number, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return
    }

    try {
      await api.delete(`/users/${userId}`)
      fetchUsers()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to delete user')
    }
  }

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="users-page">
      <h1 className="page-title">User Management</h1>

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar-large">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info-main">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="user-details">
              <div className="detail-row">
                <span className="detail-label">
                  <Shield size={16} />
                  Role
                </span>
                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                  className="role-select"
                >
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="detail-row">
                <span className="detail-label">
                  {user.status === 'active' ? <UserCheck size={16} /> : <UserX size={16} />}
                  Status
                </span>
                <select
                  value={user.status}
                  onChange={(e) => updateUserStatus(user.id, e.target.value as UserStatus)}
                  className={`status-select ${user.status}`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="detail-row">
                <span className="detail-label">Joined</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className={`user-status-badge ${user.status}`}>
              {user.status}
            </div>

            {currentUser?.id !== user.id && (
              <button
                onClick={() => deleteUser(user.id, user.name)}
                className="delete-user-btn"
                title="Delete user"
              >
                <Trash2 size={16} />
                Delete User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
