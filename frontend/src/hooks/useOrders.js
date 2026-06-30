/**
 * useOrders — fetches and manages bookings for the authenticated user.
 */
import { useState, useEffect, useCallback } from 'react'
import { getUserBookings, cancelBooking } from '../services/bookingService'

export function useOrders(email) {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    if (!email) { setLoading(false); return }

    let mounted = true
    setLoading(true)
    setError(null)

    getUserBookings(email)
      .then((data) => { if (mounted) setBookings(data) })
      .catch((err) => { if (mounted) setError(err?.message || 'Failed to load orders.') })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [email])

  const cancel = useCallback(async (id) => {
    await cancelBooking(id)
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b))
    )
  }, [])

  return { bookings, loading, error, cancel }
}
