import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth }              from '../context/AuthContext'
import { getUserBookings, cancelBooking } from '../services/bookingService'
import BookingRow               from '../components/bookings/BookingRow'
import EmptyState               from '../components/common/EmptyState'
import Button                   from '../components/common/Button'
import './OrdersPage.css'

// Inline skeleton rows — lighter than importing SkeletonCard for a table layout
function OrdersSkeleton() {
  return (
    <div className="orders-skeleton" aria-busy="true" aria-label="Loading orders">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="orders-skeleton__row">
          {[8, 20, 8, 12, 15, 10].map((w, j) => (
            <div key={j} className="skeleton" style={{ height: 16, width: `${w}%`, borderRadius: 4 }} />
          ))}
          <div className="skeleton" style={{ height: 26, width: 80, borderRadius: 999 }} />
        </div>
      ))}
    </div>
  )
}

function OrdersPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  useEffect(() => {
    if (!user?.email) { setLoading(false); return }

    let mounted = true
    setLoading(true)
    setError('')

    getUserBookings(user.email)
      .then((data) => {
        if (mounted) setBookings(data) // already sorted by bookingService
      })
      .catch((err) => {
        if (mounted) setError(err?.message || 'Failed to load your orders. Please refresh.')
      })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [user])

  const handleCancel = useCallback(async (id) => {
    setError('')
    try {
      await cancelBooking(id)
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b))
      )
    } catch (err) {
      setError(err?.message || 'Could not cancel booking. Please try again.')
    }
  }, [])

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-page__header">
          <h1 className="orders-page__title">My Orders</h1>
          <p className="orders-page__subtitle">Track and manage your flower bookings</p>
        </div>

        {error && (
          <div className="orders-error" role="alert">
            <span aria-hidden="true">⚠</span> {error}
          </div>
        )}

        {loading ? (
          <OrdersSkeleton />
        ) : bookings.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="You haven't placed any flower bookings yet. Start browsing our collection!"
            action={<Link to="/flowers" className="btn btn-primary btn-lg">Browse Flowers</Link>}
          />
        ) : (
          <div className="orders-table-wrap" role="region" aria-label="Your orders">
            <table className="orders-table">
              <thead>
                <tr>
                  <th scope="col">Order #</th>
                  <th scope="col">Flower</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Total</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <BookingRow
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancel}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
