import { useState, useEffect } from 'react'
import { getAllBookings } from '../../services/adminService'
import { getAll as getFlowers } from '../../services/flowerService'
import { getAll as getCategories } from '../../services/categoryService'
import StatCard from '../../components/admin/StatCard'
import AdminTable from '../../components/admin/AdminTable'
import Badge from '../../components/common/Badge'
import './admin.css'
import './AdminDashboardPage.css'

const RECENT_COLUMNS = [
  { key: 'id',         label: '#',        width: '60px' },
  {
    key: 'user',
    label: 'Customer',
    render: (val) => val?.email ?? '—',
  },
  {
    key: 'flower',
    label: 'Flower',
    render: (val) => val?.name ?? '—',
  },
  { key: 'quantity',   label: 'Qty',      width: '60px' },
  {
    key: 'totalPrice',
    label: 'Total',
    sortable: true,
    render: (val) => `$${Number(val).toFixed(2)}`,
  },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <Badge status={val} />,
  },
]

function AdminDashboardPage() {
  const [bookings,       setBookings]       = useState([])
  const [flowerCount,    setFlowerCount]    = useState(null)
  const [categoryCount,  setCategoryCount]  = useState(null)
  const [loading,        setLoading]        = useState(true)

  useEffect(() => {
    Promise.all([getAllBookings(), getFlowers(), getCategories()])
      .then(([b, f, c]) => {
        setBookings(b)
        setFlowerCount(f.length)
        setCategoryCount(c.length)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const recent = [...bookings]
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, 5)

  return (
    <div className="admin-dashboard">

      {/* Stat cards */}
      <div className="stat-cards" role="list">
        <StatCard
          icon="🌸"
          label="Total Flowers"
          value={flowerCount ?? '…'}
          color="primary"
        />
        <StatCard
          icon="🏷️"
          label="Total Categories"
          value={categoryCount ?? '…'}
          color="secondary"
        />
        <StatCard
          icon="📋"
          label="Total Bookings"
          value={loading ? '…' : bookings.length}
          color="tertiary"
        />
      </div>

      {/* Recent bookings */}
      <section className="dashboard-section">
        <h2 className="dashboard-section__title">Recent Bookings</h2>
        <AdminTable
          columns={RECENT_COLUMNS}
          rows={recent}
          loading={loading}
          emptyMessage="No bookings yet."
          defaultSort={{ key: 'id', asc: false }}
        />
      </section>
    </div>
  )
}

export default AdminDashboardPage
