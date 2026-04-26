import { useState, useEffect } from "react";
import userAvatars from "../../../data/avatars.json";

export function useAdminCustomers({ search, page = 1 } = {}) {
  const [customers, setCustomers]   = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  const fetchCustomers = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      params.set("page", page)
      params.set("limit", 10)

      const res = await fetch(`/api/admin/customers?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch customers")
      const data = await res.json()

      // resolve avatar_id → url from local pool
      const enriched = data.customers.map(c => {
        const avatar = userAvatars.find(a => a.id === c.avatar_id)
        return { ...c, avatarUrl: avatar?.url ?? null }
      })

      setCustomers(enriched)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCustomers() }, [search, page])
  return { customers, totalPages, loading, error, refetch: fetchCustomers }
}