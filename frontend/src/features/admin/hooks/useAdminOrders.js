import { useState, useEffect } from "react"

export function useAdminOrders({ status, search, page = 1 } = {}) {
  const [orders, setOrders]     = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (status) params.set("status", status)
      if (search) params.set("search", search)
      params.set("page", page)
      params.set("limit", 10)

      const res = await fetch(`/api/admin/orders?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()
      setOrders(data.orders)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id, newStatus) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    if (!res.ok) throw new Error("Failed to update order")
    await fetchOrders()
  }

  useEffect(() => { fetchOrders() }, [status, search, page])
  return { orders, totalPages, loading, error, refetch: fetchOrders, updateOrderStatus }
}