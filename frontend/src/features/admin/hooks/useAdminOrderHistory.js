import { useState, useEffect } from "react"

export function useAdminOrderHistory({ user_id, search, page = 1 } = {}) {
  const [history, setHistory]       = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  const fetchHistory = async () => {
    setLoading(true)
    setError(null)
    try {
        const params = new URLSearchParams()
        if (user_id) params.set("user_id", user_id)
        if (search)  params.set("search", search)
        params.set("page", page)
        params.set("limit", 10)

      const res = await fetch(`/api/admin/order-history?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch order history")
      const data = await res.json()
      setHistory(data.orders)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchHistory() }, [user_id, search, page])
  return { history, totalPages, loading, error, refetch: fetchHistory }
}