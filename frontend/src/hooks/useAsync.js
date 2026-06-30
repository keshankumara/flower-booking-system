/**
 * useAsync — generic hook for async operations with loading/error/data state.
 * Cancels in-flight requests on unmount via AbortController.
 *
 * @param {(signal: AbortSignal) => Promise<T>} asyncFn
 * @param {Array} deps — dependency array (re-runs when changed)
 * @returns {{ data: T|null, loading: boolean, error: string, refetch: () => void }}
 */
import { useState, useEffect, useCallback, useRef } from 'react'

export function useAsync(asyncFn, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const mountedRef = useRef(true)

  const run = useCallback(async () => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    try {
      const result = await asyncFn(controller.signal)
      if (mountedRef.current) {
        setData(result)
      }
    } catch (err) {
      if (mountedRef.current && err?.name !== 'AbortError' && err?.message !== 'Request cancelled') {
        setError(err?.message || 'Something went wrong.')
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }
    return () => controller.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    mountedRef.current = true
    run()
    return () => { mountedRef.current = false }
  }, [run])

  return { data, loading, error, refetch: run }
}
