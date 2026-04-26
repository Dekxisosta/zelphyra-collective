import { http, HttpResponse } from "msw"
import cart from "../json/cart.json"
import cart_items from "../json/cart_items.json"
import products from "../json/products.json"
import product_images from "../json/product_images.json"

export const cartHandlers = [

  // GET /api/cart
  http.get("/api/cart", () => {
    const userCart = cart[0] // mock: always return first cart for now
    const items = cart_items
      .filter(i => i.cart_id === userCart.id)
      .map(i => ({
        ...i,
        product: {
          ...products.find(p => p.id === i.product_id),
          images: product_images.filter(img => img.product_id === i.product_id),
        }
      }))

    return HttpResponse.json({ ...userCart, items })
  }),

  // POST /api/cart/items
  http.post("/api/cart/items", async ({ request }) => {
    const { product_id, quantity } = await request.json()
    const existing = cart_items.find(i => i.cart_id === 1 && i.product_id === product_id)

    if (existing) {
      existing.quantity += quantity
      return HttpResponse.json(existing)
    }

    const newItem = { id: cart_items.length + 1, cart_id: 1, product_id, quantity, added_at: new Date().toISOString() }
    cart_items.push(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  // PATCH /api/cart/items/:id
  http.patch("/api/cart/items/:id", async ({ params, request }) => {
    const { quantity } = await request.json()
    const item = cart_items.find(i => i.id === parseInt(params.id))
    if (!item) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    item.quantity = quantity
    return HttpResponse.json(item)
  }),

  // DELETE /api/cart/items/:id
  http.delete("/api/cart/items/:id", ({ params }) => {
    const idx = cart_items.findIndex(i => i.id === parseInt(params.id))
    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    cart_items.splice(idx, 1)
    return HttpResponse.json({ message: "Removed" })
  }),
]