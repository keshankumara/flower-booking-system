/**
 * categoryService.js
 *
 * Endpoints from CategoryController.java + AdminController.java:
 *
 *   GET    /api/categories        → Category[]
 *   GET    /api/categories/:id    → Category
 *   POST   /api/categories        → Category    (direct create)
 *   PUT    /api/categories/:id    → Category
 *   DELETE /api/categories/:id    → String
 *   POST   /api/admin/categories  → Category    (admin create)
 *
 * Category shape: { id, name, description }
 */

import api from './api'

/** Fetch all categories. Used for filter dropdowns and the home page. */
export async function getAll(config = {}) {
  const { data } = await api.get('/categories', config)
  return data
}

/** Fetch a single category by id. */
export async function getById(id, config = {}) {
  const { data } = await api.get(`/categories/${id}`, config)
  return data
}

/**
 * Create a new category (admin only).
 * Routes through /api/admin/categories to match AdminController.
 *
 * @param {{ name: string, description?: string }} payload
 */
export async function create(payload) {
  const { data } = await api.post('/admin/categories', payload)
  return data
}

/**
 * Update a category.
 * @param {number} id
 * @param {{ name: string, description?: string }} payload
 */
export async function update(id, payload) {
  const { data } = await api.put(`/categories/${id}`, payload)
  return data
}

/**
 * Delete a category by id.
 * @param {number} id
 */
export async function remove(id) {
  const { data } = await api.delete(`/categories/${id}`)
  return data
}
