/**
 * adminService.js
 *
 * Admin-only endpoints from AdminController.java:
 *
 *   GET   /api/admin/bookings        → Booking[]
 *   POST  /api/admin/flowers         → Flower
 *   POST  /api/admin/categories      → Category
 */

import api from './api'

/**
 * Fetch all bookings across all users.
 * @returns {Promise<Booking[]>}
 */
export async function getAllBookings() {
  const { data } = await api.get('/admin/bookings')
  return data
}

/**
 * Create a new flower via the admin endpoint.
 * @param {{ name, description, price, stockQuantity, imageUrl, categoryId }} payload
 * @returns {Promise<Flower>}
 */
export async function addFlower(payload) {
  const { data } = await api.post('/admin/flowers', payload)
  return data
}

/**
 * Create a new category via the admin endpoint.
 * @param {{ name, description }} payload
 * @returns {Promise<Category>}
 */
export async function addCategory(payload) {
  const { data } = await api.post('/admin/categories', payload)
  return data
}
