// mocks/handlers/users.js
import { http, HttpResponse } from "msw"

let mockUser = {
  id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  name: "Juan Dela Cruz",
  email: "juan.dela.cruz@gmail.com",
  phone: "",
  role: "user",
}

const mockAddresses = []

export const userHandlers = [

  // PATCH /api/users/me
  http.patch("/api/users/me", async ({ request }) => {
    const body = await request.json()
    mockUser = { ...mockUser, ...body }
    return HttpResponse.json(mockUser)
  }),

  // GET /api/users/me/addresses
  http.get("/api/users/me/addresses", () => {
    return HttpResponse.json(mockAddresses)
  }),

  // POST /api/users/me/addresses
  http.post("/api/users/me/addresses", async ({ request }) => {
    const body = await request.json()
    const newAddress = { id: mockAddresses.length + 1, ...body }
    mockAddresses.push(newAddress)
    return HttpResponse.json(newAddress, { status: 201 })
  }),

  // PATCH /api/users/me/password
  http.patch("/api/users/me/password", async ({ request }) => {
    const { current_password } = await request.json()
    // mock: accept any non-empty current password
    if (!current_password) {
      return HttpResponse.json({ message: "Incorrect current password." }, { status: 400 })
    }
    return HttpResponse.json({ message: "Password updated." })
  }),
]