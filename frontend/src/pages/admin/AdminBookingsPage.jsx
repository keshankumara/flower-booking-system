import { useState, useEffect } from 'react'
import { getAllBookings } from '../../services/adminService'
import AdminTable from '../../components/admin/AdminTable'
import Badge from '../../components/common/Badge'
import './admin.css'
import './AdminBookingsPage.css'

const STATUSES = ['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED']

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('ALL')

  useEffect(() => {
    getAllBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const visible = filter === 'ALL'
    ? bookings
    : bookings.filter((b) => b.status === filter)

  const columns = [
    { key: 'id',          label: '#',        width: '60px' },
    { key: 'user',        label: 'Customer', render: (v) => v?.email ?? '—' },
    { key: 'flower',      label: 'Flower',   render: (v) => v?.name  ?? '—' },
    { key: 'quantity',    label: 'Qty',      width: '64px' },
    {
      key: 'totalPrice',
      label: 'Total',
      sortable: true,
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      key: 'bookingDate',
      label: 'Date',
      sortable: true,
      render: (v) =>
        new Date(v).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
        }),
    },
    {
      key: 'status',
      label: 'Status',
      render: (v) => <Badge status={v} />,
    },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Manage Bookings</h1>

        {/* Status filter chips */}
        <div className="bookings-filter" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              key={s}
              className={`filter-chip${filter === s ? ' filter-chip--active' : ''}`}
              onClick={() => setFilter(s)}
              aria-pressed={filter === s}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <AdminTable
        columns={columns}
        rows={visible}
        loading={loading}
        emptyMessage="No bookings found."
        defaultSort={{ key: 'bookingDate', asc: false }}
      />
    </div>
  )
}

export default AdminBookingsPage
