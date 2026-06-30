/**
 * cartService.js — Client-side cart persistence helpers.
 *
 * The cart is intentionally kept client-side (CartContext) because the
 * backend has no dedicated cart endpoint — orders are created directly
 * via POST /api/bookings at checkout time.
 *
 * This module provides:
 *   1. localStorage persistence so the cart survives a page refresh.
 *   2. Pure calculation utilities used by CartContext.
 *   3. A checkout helper that flushes the cart to the backend in one call.
 */

import { createBooking } from './bookingService'

// ─── Storage key ─────────────────────────────────────────────────────────────
const CART_KEY = 'botanical_cart'

// ─── Persistence ─────────────────────────────────────────────────────────────

/**
 * Load persisted cart items from localStorage.
 * Returns an empty array if nothing is stored or the data is malformed.
 *
 * @returns {CartItem[]}
 */
export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Persist the current cart items to localStorage.
 * @param {CartItem[]} items
 */
export function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // Storage quota exceeded — fail silently; cart still works in memory.
  }
}

/** Remove the persisted cart. */
export function clearCart() {
  localStorage.removeItem(CART_KEY)
}

// ─── Calculation utilities ────────────────────────────────────────────────────

/**
 * Add a flower to the items array.
 * If the flower is already present, its quantity is incremented.
 *
 * @param {CartItem[]} items
 * @param {Flower}     flower
 * @param {number}     quantity — must be ≥ 1
 * @returns {CartItem[]}        — new array reference
 */
export function addItem(items, flower, quantity = 1) {
  if (quantity < 1) return items
  const existing = items.find((i) => i.flower.id === flower.id)
  if (existing) {
    return items.map((i) =>
      i.flower.id === flower.id
        ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * flower.price }
        : i
    )
  }
  return [...items, { flower, quantity, subtotal: quantity * flower.price }]
}

/**
 * Remove a flower from the items array by flower id.
 *
 * @param {CartItem[]} items
 * @param {number}     flowerId
 * @returns {CartItem[]}
 */
export function removeItem(items, flowerId) {
  return items.filter((i) => i.flower.id !== flowerId)
}

/**
 * Update the quantity of a specific item.
 * Quantity is clamped to [1, flower.stockQuantity].
 *
 * @param {CartItem[]} items
 * @param {number}     flowerId
 * @param {number}     quantity
 * @returns {CartItem[]}
 */
export function updateQuantity(items, flowerId, quantity) {
  if (quantity < 1) return items
  return items.map((i) => {
    if (i.flower.id !== flowerId) return i
    const clamped = Math.min(quantity, i.flower.stockQuantity ?? quantity)
    return { ...i, quantity: clamped, subtotal: clamped * i.flower.price }
  })
}

/**
 * Total number of individual items (sum of quantities).
 * @param {CartItem[]} items
 */
export function totalCount(items) {
  return items.reduce((sum, i) => sum + i.quantity, 0)
}

/**
 * Grand total price.
 * @param {CartItem[]} items
 */
export function totalPrice(items) {
  return items.reduce((sum, i) => sum + i.subtotal, 0)
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

/**
 * Place bookings for every item in the cart.
 * Sends one POST /api/bookings per line item (backend contract).
 *
 * Resolves when ALL bookings succeed.
 * Rejects with the first ApiError encountered, preserving the cart.
 *
 * @param {CartItem[]} items
 * @param {string}     email   — authenticated user's email
 * @returns {Promise<Booking[]>}
 */
export async function checkout(items, email) {
  if (!items.length) throw new Error('Cart is empty')
  const results = await Promise.all(
    items.map((item) => createBooking(email, item.flower.id, item.quantity))
  )
  clearCart()
  return results
}

// ─── JSDoc types ──────────────────────────────────────────────────────────────
/**
 * @typedef {{ id: number, name: string, price: number, stockQuantity: number, imageUrl: string, category: object }} Flower
 * @typedef {{ flower: Flower, quantity: number, subtotal: number }} CartItem
 * @typedef {{ id: number, status: string, totalPrice: number }} Booking
 */
