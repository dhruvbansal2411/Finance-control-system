import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Filter } from 'lucide-react'
import api from '../api/axios'
import { FinancialRecord, TransactionType } from '../types'
import { useAuth } from '../contexts/AuthContext'
import './Records.css'

export default function Records() {
  const { user } = useAuth()
  const [records, setRecords] = useState<FinancialRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingRecord, setEditingRecord] = useState<FinancialRecord | null>(null)
  const [filters, setFilters] = useState({ type: '', category: '', startDate: '', endDate: '' })

  const [formData, setFormData] = useState({
    amount: '',
    type: 'income' as TransactionType,
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  useEffect(() => {
    fetchRecords()
  }, [filters])

  const fetchRecords = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.type) params.append('type', filters.type)
      if (filters.category) params.append('category', filters.category)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)

      const response = await api.get(`/records?${params}`)
      setRecords(response.data)
    } catch (error) {
      console.error('Failed to fetch records:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingRecord) {
        await api.put(`/records/${editingRecord.id}`, formData)
      } else {
        await api.post('/records', formData)
      }
      setShowModal(false)
      setEditingRecord(null)
      resetForm()
      fetchRecords()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Operation failed')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this record?')) return
    try {
      await api.delete(`/records/${id}`)
      fetchRecords()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Delete failed')
    }
  }

  const openEditModal = (record: FinancialRecord) => {
    setEditingRecord(record)
    setFormData({
      amount: record.amount.toString(),
      type: record.type,
      category: record.category,
      date: record.date,
      description: record.description
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      amount: '',
      type: 'income',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    })
  }

  const isAdmin = user?.role === 'admin'

  return (
    <div className="records-page">
      <div className="page-header">
        <h1 className="page-title">Financial Records</h1>
        {isAdmin && (
          <button
            onClick={() => {
              setEditingRecord(null)
              resetForm()
              setShowModal(true)
            }}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Record
          </button>
        )}
      </div>

      <div className="filters-card">
        <div className="filters-header">
          <Filter size={20} />
          <span>Filters</span>
        </div>
        <div className="filters-grid">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading records...</div>
      ) : (
        <div className="records-table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.category}</td>
                  <td>
                    <span className={`badge ${record.type}`}>{record.type}</span>
                  </td>
                  <td className={`amount ${record.type}`}>
                    ₹{record.amount.toLocaleString('en-IN')}
                  </td>
                  <td>{record.description}</td>
                  {isAdmin && (
                    <td>
                      <div className="actions">
                        <button
                          onClick={() => openEditModal(record)}
                          className="btn-icon edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="btn-icon delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingRecord ? 'Edit Record' : 'Add New Record'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingRecord ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
