import { http, HttpResponse } from "msw"
import orders from "../json/orders.json"
import order_items from "../json/order_items.json"
import payments from "../json/payments.json"

export const orderHandlers = [

  // GET /api/orders
  http.get("/api/orders", () => {
    const result = orders.map(o => ({
      ...o,
      items: order_items.filter(i => i.order_id === o.id),
      payment: payments.find(p => p.order_id === o.id) ?? null,
    }))
    return HttpResponse.json(result)
  }),

  // GET /api/orders/:id
  http.get("/api/orders/:id", ({ params }) => {
    const order = orders.find(o => o.id === parseInt(params.id))
    if (!order) return HttpResponse.json({ message: "Not found" }, { status: 404 })

    return HttpResponse.json({
      ...order,
      items: order_items.filter(i => i.order_id === order.id),
      payment: payments.find(p => p.order_id === order.id) ?? null,
    })
  }),

  // POST /api/orders
  http.post("/api/orders", async ({ request }) => {
    const body = await request.json()
    const newOrder = { id: orders.length + 1, status: "pending", created_at: new Date().toISOString(), ...body }
    orders.push(newOrder)
    return HttpResponse.json(newOrder, { status: 201 })
  }),
]