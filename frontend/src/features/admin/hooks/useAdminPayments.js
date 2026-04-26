import { useState, useEffect } from "react"

export function useAdminPayments({ status, method, page = 1 } = {}) {
  const [payments, setPayments]     = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  const fetchPayments = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (status) params.set("status", status)
      if (method) params.set("method", method)
      params.set("page", page)
      params.set("limit", 10)

      const res = await fetch(`/api/admin/payments?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch payments")
      const data = await res.json()
      setPayments(data.payments)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPayments() }, [status, method, page])
  return { payments, totalPages, loading, error, refetch: fetchPayments }
}