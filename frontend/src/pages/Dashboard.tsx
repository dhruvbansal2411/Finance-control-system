import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'
import api from '../api/axios'
import { DashboardSummary } from '../types'
import './Dashboard.css'

const COLORS = ['#667eea', '#764ba2', '#f56565', '#48bb78', '#4299e1', '#ed8936']

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const response = await api.get('/dashboard/summary')
      setSummary(response.data)
    } catch (error) {
      console.error('Failed to fetch summary:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  if (!summary) {
    return <div className="error">Failed to load dashboard</div>
  }

  const pieData = summary.categoryTotals.map(cat => ({
    name: cat.category,
    value: cat.total
  }))

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card income">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">₹{summary.totalIncome.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="stat-card expense">
          <div className="stat-icon">
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Expense</div>
            <div className="stat-value">₹{summary.totalExpense.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="stat-card balance">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Net Balance</div>
            <div className="stat-value">₹{summary.netBalance.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="stat-card activity">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Transactions</div>
            <div className="stat-value">{summary.recentActivity.length}</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={summary.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#48bb78" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#f56565" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h2>Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary.categoryTotals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {summary.recentActivity.map((record) => (
            <div key={record.id} className={`activity-item ${record.type}`}>
              <div className="activity-info">
                <div className="activity-category">{record.category}</div>
                <div className="activity-description">{record.description}</div>
                <div className="activity-date">{new Date(record.date).toLocaleDateString()}</div>
              </div>
              <div className={`activity-amount ${record.type}`}>
                {record.type === 'income' ? '+' : '-'}₹{record.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
