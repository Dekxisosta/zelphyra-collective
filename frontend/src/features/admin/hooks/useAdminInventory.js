import { useState, useEffect } from "react"

export function useAdminInventory({ search, low } = {}) {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetchInventory = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (low)    params.set("low", "true")

      const res = await fetch(`/api/admin/inventory?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch inventory")
      setInventory(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStock = async (productId, stock) => {
    const res = await fetch(`/api/admin/inventory/${productId}`, {
      method: "PATCH", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    })
    if (!res.ok) throw new Error("Failed to update stock")
    await fetchInventory()
  }

  useEffect(() => { fetchInventory() }, [search, low])
  return { inventory, loading, error, refetch: fetchInventory, updateStock }
}