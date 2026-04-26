import { useState, useEffect } from "react"

export function useAdminStats() {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/stats", { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch stats")
      setStats(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])
  return { stats, loading, error, refetch: fetchStats }
}