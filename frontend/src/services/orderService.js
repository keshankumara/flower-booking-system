/**
 * orderService.js — Re-exports bookingService under "order" terminology.
 *
 * The backend uses "Booking" as the domain term but the UI surfaces these
 * as "Orders" to users.  This module is a thin alias so pages can import
 * from 'orderService' without coupling to the backend naming.
 */

export {
  createBooking  as createOrder,
  getUserBookings as getUserOrders,
  cancelBooking  as cancelOrder,
} from './bookingService'
