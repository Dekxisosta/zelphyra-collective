import { useState, useEffect } from "react"

export function useAdminProducts({ search, category, page = 1 } = {}) {
  const [products, setProducts]     = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (search)   params.set("search", search)
      if (category) params.set("category", category)
      params.set("page", page)
      params.set("limit", 10)

      const res = await fetch(`/api/admin/products?${params}`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setProducts(data.products)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id, body) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("Failed to update product")
    await fetchProducts()
  }

  const deleteProduct = async (id) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE", credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to delete product")
    await fetchProducts()
  }

  useEffect(() => { fetchProducts() }, [search, category, page])
  return { products, totalPages, loading, error, refetch: fetchProducts, updateProduct, deleteProduct }
}