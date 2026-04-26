import { http, HttpResponse } from "msw"
import payments from "../json/payments.json"

export const paymentHandlers = [

  http.get("/api/payments", () => HttpResponse.json(payments)),

  http.get("/api/payments/:id", ({ params }) => {
    const payment = payments.find(p => p.id === parseInt(params.id))
    if (!payment) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    return HttpResponse.json(payment)
  }),

  http.post("/api/payments", async ({ request }) => {
    const body = await request.json()
    const newPayment = {
      id: payments.length + 1,
      status: "pending",
      transaction_ref: null,
      paid_at: null,
      created_at: new Date().toISOString(),
      ...body,
    }
    payments.push(newPayment)
    return HttpResponse.json(newPayment, { status: 201 })
  }),
]