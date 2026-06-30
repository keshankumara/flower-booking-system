/**
 * api.js — Axios instance with JWT auth, error normalisation, and request cancellation.
 *
 * Endpoints (Spring Boot backend on port 8080):
 *   POST   /api/auth/login
 *   POST   /api/auth/register
 *   GET    /api/flowers              GET /api/flowers/:id
 *   GET    /api/flowers/search       GET /api/flowers/filter/price
 *   GET    /api/flowers/filter/category/:id
 *   PUT    /api/flowers/:id          DELETE /api/flowers/:id
 *   GET    /api/categories           GET /api/categories/:id
 *   PUT    /api/categories/:id       DELETE /api/categories/:id
 *   POST   /api/bookings             GET /api/bookings/user
 *   PUT    /api/bookings/cancel/:id
 *   GET    /api/admin/bookings
 *   POST   /api/admin/flowers        POST /api/admin/categories
 */

import axios from 'axios'

// ─── Environment ────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const TIMEOUT  = Number(import.meta.env.VITE_API_TIMEOUT) || 15_000

// ─── Normalised error class ──────────────────────────────────────────────────
export class ApiError extends Error {
  /**
   * @param {string}  message   — human-readable message
   * @param {number}  status    — HTTP status code (0 = network error)
   * @param {object}  data      — raw response body
   */
  constructor(message, status = 0, data = null) {
    super(message)
    this.name    = 'ApiError'
    this.status  = status
    this.data    = data
  }
}

/**
 * Converts an Axios error into a typed ApiError.
 * Reads `error.response.data.message` if available so Spring Boot
 * validation messages surface cleanly in the UI.
 */
function normalise(error) {
  if (axios.isCancel(error)) {
    return new ApiError('Request cancelled', 0)
  }
  if (error.response) {
    const { status, data } = error.response
    const message =
      (typeof data === 'string' ? data : data?.message) ||
      `Request failed with status ${status}`
    return new ApiError(message, status, data)
  }
  if (error.request) {
    return new ApiError('No response from server. Check your connection.', 0)
  }
  return new ApiError(error.message || 'Unexpected error', 0)
}

// ─── Axios instance ──────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Request interceptor: attach JWT ────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(normalise(error))
)

// ─── Response interceptor: normalise errors + auto-logout on 401 ────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = normalise(error)

    if (apiError.status === 401) {
      // Clear stale credentials and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Use replace so the user can't go "back" to the protected page
      window.location.replace('/login')
    }

    return Promise.reject(apiError)
  }
)

// ─── Cancellation helper ─────────────────────────────────────────────────────
/**
 * Returns a cancel token source.
 * Pass `source.token` as `config.signal` (or `cancelToken`) and call
 * `source.cancel()` in the component cleanup.
 *
 * @example
 *   const source = createCancelSource()
 *   flowerService.getAll({ signal: source.token })
 *   return () => source.cancel()
 */
export function createCancelSource() {
  return axios.CancelToken.source()
}

export default api
