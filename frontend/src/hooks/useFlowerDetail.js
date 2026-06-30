import { useState, useEffect } from 'react'
import { getById } from '../services/flowerService'

export function useFlowerDetail(id) {
  const [flower, setFlower] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function fetchFlower() {
      try {
        const data = await getById(id)

        if (ignore) return

        setFlower(data)
        document.title = `${data.name} — Botanical Elegance`
      } catch (err) {
        if (ignore) return

        setError(err?.message || 'Could not load flower.')
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    if (id) {
      fetchFlower()
    }

    return () => {
      ignore = true
      document.title = 'Botanical Elegance'
    }
  }, [id])

  return { flower, loading, error }
}