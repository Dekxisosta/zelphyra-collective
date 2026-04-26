// features/home/hooks/useFeatured.js
import { useEffect, useState } from "react"

export function useFeatured() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const fetchFeatured = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/products/featured")
      if (!res.ok) throw new Error("Failed to fetch featured products")
      const data = await res.json()
      setFeatured(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeatured()
  }, [])

  return { featured, loading, error, refetch: fetchFeatured }
}