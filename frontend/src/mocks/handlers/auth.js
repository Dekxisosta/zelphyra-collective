import { http, HttpResponse } from "msw"
import users from "../json/users.json"

// simulate a session in memory
let currentUser = null

export const authHandlers = [

  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json()
    const user = users.find(u => u.email === email)

    // mock: any password works as long as email matches
    if (!user) {
      return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    currentUser = user
    return HttpResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  }),

  // POST /api/auth/register
  http.post("/api/auth/register", async ({ request }) => {
    const body = await request.json()
    currentUser = { ...body, id: crypto.randomUUID(), role: "user" }
    return HttpResponse.json({ user: currentUser })
  }),

  // GET /api/auth/me
  http.get("/api/auth/me", () => {
    if (!currentUser) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    return HttpResponse.json(currentUser)
  }),

  // POST /api/auth/logout
  http.post("/api/auth/logout", () => {
    currentUser = null
    return HttpResponse.json({ message: "Logged out" })
  }),
]