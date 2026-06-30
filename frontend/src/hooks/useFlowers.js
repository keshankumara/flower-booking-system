/**
 * useFlowers — fetches flowers with optional filter support.
 * Returns data, loading, error, and a refetch callback.
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getAll,
  search as searchFlowers,
  filterByCategory,
  filterByPrice,
} from '../services/flowerService'

export function useFlowers({ query = '', categoryId = '', minPrice = '', maxPrice = '' } = {}) {
  const [flowers, setFlowers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const timerRef   = useRef(null)
  const mountedRef = useRef(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data
      if (query.trim())               data = await searchFlowers(query.trim())
      else if (categoryId)            data = await filterByCategory(categoryId)
      else if (minPrice || maxPrice)  data = await filterByPrice(minPrice || 0, maxPrice || 999999)
      else                            data = await getAll()
      if (mountedRef.current) setFlowers(data)
    } catch (err) {
      if (mountedRef.current) {
        setError(err?.message || 'Failed to load flowers.')
        setFlowers([])
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [query, categoryId, minPrice, maxPrice])

  useEffect(() => {
    mountedRef.current = true
    clearTimeout(timerRef.current)
    // Debounce only search queries; apply others immediately
    const delay = query.trim() ? 400 : 0
    timerRef.current = setTimeout(load, delay)
    return () => {
      mountedRef.current = false
      clearTimeout(timerRef.current)
    }
  }, [load, query])

  return { flowers, loading, error, refetch: load }
}
