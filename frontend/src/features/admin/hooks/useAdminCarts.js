import { useState, useEffect } from "react"

export function useAdminCarts({ user_id } = {}) {
  const [cart, setCart]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchCart = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (user_id) params.set("user_id", user_id)

      const res = await fetch(`/api/admin/carts?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch cart")
      const data = await res.json()
      
      setCart(data.cart ?? null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user_id) fetchCart() }, [user_id])

  return { cart, loading, error, refetch: fetchCart }
}