/**
 * bookingService.js  (also imported as orderService for aliasing)
 *
 * Endpoints from BookingController.java:
 *
 *   POST  /api/bookings?email=&flowerId=&quantity=  → Booking
 *   GET   /api/bookings/user?email=                 → Booking[]
 *   PUT   /api/bookings/cancel/:id                  → Booking
 *
 * Booking shape:
 *   {
 *     id, quantity, totalPrice, bookingDate,
 *     status: 'PENDING'|'CONFIRMED'|'CANCELLED',
 *     user: { id, name, email, role },
 *     flower: { id, name, price, ... }
 *   }
 */

import api from './api'

/**
 * Create a single booking (one flower + quantity).
 * The backend derives price and total from its own data.
 *
 * @param {string} email     — authenticated user's email
 * @param {number} flowerId
 * @param {number} quantity
 * @returns {Promise<Booking>}
 */
export async function createBooking(email, flowerId, quantity) {
  const { data } = await api.post('/bookings', null, {
    params: { email, flowerId, quantity },
  })
  return data
}

/**
 * Fetch all bookings for a given user, sorted by date descending.
 *
 * @param {string} email
 * @param {object} [config]  — optional Axios config (e.g. cancelToken)
 * @returns {Promise<Booking[]>}
 */
export async function getUserBookings(email, config = {}) {
  const { data } = await api.get('/bookings/user', {
    params: { email },
    ...config,
  })
  // Sort newest first on the client so the UI doesn't need to
  return [...data].sort(
    (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
  )
}

/**
 * Cancel a PENDING booking.
 * Returns the updated Booking with status = 'CANCELLED'.
 *
 * @param {number} id
 * @returns {Promise<Booking>}
 */
export async function cancelBooking(id) {
  const { data } = await api.put(`/bookings/cancel/${id}`)
  return data
}
