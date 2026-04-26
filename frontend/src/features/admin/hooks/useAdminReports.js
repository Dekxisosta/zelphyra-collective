import { useState, useEffect } from "react"

export function useAdminReports() {
  const [reports, setReports]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const fetchReports = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/reports", { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch reports")
      setReports(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReports() }, [])
  return { reports, loading, error, refetch: fetchReports }
}