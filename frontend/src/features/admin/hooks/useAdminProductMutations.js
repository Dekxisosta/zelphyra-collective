import { useState } from "react"

export function useAdminProductMutations({ onSuccess } = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const request = async (url, method, body) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message ?? "Request failed")
      }
      const data = method === "DELETE" ? null : await res.json()
      onSuccess?.()
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const addProduct    = (body)         => request("/api/admin/products",                       "POST",   body)
  const updateProduct = (id, body)     => request(`/api/admin/products/${id}`,                 "PATCH",  body)
  const deleteProduct = (id)           => request(`/api/admin/products/${id}`,                 "DELETE")
  const addImage      = (id, body)     => request(`/api/admin/products/${id}/images`,          "POST",   body)
  const updateImage   = (id, imgId, body) => request(`/api/admin/products/${id}/images/${imgId}`, "PATCH", body)
  const deleteImage   = (id, imgId)   => request(`/api/admin/products/${id}/images/${imgId}`, "DELETE")

  return { loading, error, addProduct, updateProduct, deleteProduct, addImage, updateImage, deleteImage }
}