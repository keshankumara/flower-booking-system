/**
 * flowerService.js
 *
 * All endpoints from FlowerController.java + AdminController.java:
 *
 *   GET    /api/flowers                  → Flower[]
 *   GET    /api/flowers/:id              → Flower
 *   POST   /api/flowers                  → Flower          (direct, not used from admin)
 *   PUT    /api/flowers/:id              → Flower
 *   DELETE /api/flowers/:id              → String
 *   GET    /api/flowers/search?name=     → Flower[]
 *   GET    /api/flowers/filter/price?min=&max=  → Flower[]
 *   GET    /api/flowers/filter/category/:id     → Flower[]
 *   GET    /api/flowers/category/:categoryId    → Flower[]  (alias)
 *   POST   /api/admin/flowers            → Flower          (admin create)
 *
 * Flower shape:
 *   { id, name, description, price, stockQuantity, imageUrl, category: { id, name } }
 */

import api from './api'

// ─── Public reads ────────────────────────────────────────────────────────────

/** Fetch every flower in the catalog. */
export async function getAll(config = {}) {
  const { data } = await api.get('/flowers', config)
  return data
}

/** Fetch a single flower by numeric id. */
export async function getById(id, config = {}) {
  const { data } = await api.get(`/flowers/${id}`, config)
  return data
}

/**
 * Full-text search on flower name (debounce on the caller side).
 * @param {string} name
 */
export async function search(name, config = {}) {
  const { data } = await api.get('/flowers/search', { params: { name }, ...config })
  return data
}

/**
 * Filter flowers by category id.
 * Uses the /filter/category/:id endpoint (distinct from /category/:categoryId).
 */
export async function filterByCategory(categoryId, config = {}) {
  const { data } = await api.get(`/flowers/filter/category/${categoryId}`, config)
  return data
}

/**
 * Filter flowers by price range.
 * @param {number} min
 * @param {number} max
 */
export async function filterByPrice(min, max, config = {}) {
  const { data } = await api.get('/flowers/filter/price', {
    params: { min, max },
    ...config,
  })
  return data
}

// ─── Admin mutations ─────────────────────────────────────────────────────────

/**
 * Create a new flower (admin only).
 * Routes through /api/admin/flowers to match AdminController.
 *
 * @param {{ name, description, price, stockQuantity, imageUrl, categoryId }} payload
 */
export async function create(payload) {
  const { data } = await api.post('/admin/flowers', payload)
  return data
}

/**
 * Update an existing flower.
 * @param {number} id
 * @param {object} payload
 */
export async function update(id, payload) {
  const { data } = await api.put(`/flowers/${id}`, payload)
  return data
}

/**
 * Delete a flower by id.
 * @param {number} id
 */
export async function remove(id) {
  const { data } = await api.delete(`/flowers/${id}`)
  return data
}
