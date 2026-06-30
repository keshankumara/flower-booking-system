/**
 * authService.js
 *
 * Wraps POST /api/auth/login and POST /api/auth/register.
 *
 * Backend contract (AuthController.java):
 *   POST /api/auth/register  body: { name, email, password }  → String message
 *   POST /api/auth/login     body: { email, password }        → AuthResponse { token, ... }
 *
 * AuthResponse shape assumed from Spring Boot JwtService:
 *   { token: string, name: string, email: string, role: 'USER'|'ADMIN' }
 */

import api from './api'

/**
 * Authenticate a user and return the JWT response.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, name: string, email: string, role: string }>}
 * @throws {ApiError}
 */
export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

/**
 * Register a new user account.
 *
 * @param {{ name: string, email: string, password: string }} payload
 * @returns {Promise<string>}  — success message from the backend
 * @throws {ApiError}
 */
export async function register(payload) {
  const { data } = await api.post('/auth/register', payload)
  return data
}

/**
 * Derive a normalised user object from the JWT auth response.
 * Used by AuthContext to store consistent state.
 *
 * @param {object} authResponse
 * @returns {{ name: string, email: string, role: string }}
 */
export function extractUser(authResponse) {
  return {
    name:  authResponse.name  ?? authResponse.email ?? '',
    email: authResponse.email ?? '',
    role:  authResponse.role  ?? 'USER',
  }
}
