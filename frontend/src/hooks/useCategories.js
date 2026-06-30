/**
 * useCategories — fetches all categories once and caches in module scope.
 * Subsequent calls from different components reuse the same request.
 */
import { useState, useEffect } from 'react'
import { getAll } from '../services/categoryService'

// Module-level cache — survives component re-mounts within the same session
let _cache = null
let _promise = null

export function useCategories() {
  const [categories, setCategories] = useState(() => _cache ?? [])
  const [loading, setLoading] = useState(() => !_cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    // If data is already cached, no need to fetch
    if (_cache) {
      return
    }

    // Reuse the same request across components
    if (!_promise) {
      _promise = getAll().then((data) => {
        _cache = data
        return data
      })
    }

    let mounted = true

    _promise
      .then((data) => {
        if (!mounted) return

        setCategories(data)
        setLoading(false)
      })
      .catch((err) => {
        if (!mounted) return

        setError(err?.message || 'Failed to load categories.')
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return {
    categories,
    loading,
    error,
  }
}