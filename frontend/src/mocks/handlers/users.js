import { http, HttpResponse } from "msw"
import { getSessionUserId } from "./session"
import usersData from "../json/users.json"
import usersImages from "../json/user_images.json"
import addressesData from "../json/addresses.json"

const imageByUserId = Object.fromEntries(usersImages.map(img => [img.user_id, img.avatar_id]))

const mockUsers = Object.fromEntries(
  usersData.map(u => {
    const avatar_id = imageByUserId[u.id] ?? 1
    return [u.id, { ...u, avatar_id }]
  })
)

const mockAddressesByUser = addressesData.reduce((acc, addr) => {
  if (!acc[addr.user_id]) acc[addr.user_id] = []
  acc[addr.user_id].push({ ...addr })
  return acc
}, {})

export { mockUsers }

function getSessionUser() {
  const id = getSessionUserId()
  if (!id || !mockUsers[id]) return null
  return mockUsers[id]
}

export const userHandlers = [

  // GET /api/users/me
  http.get("/api/users/me", () => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    return HttpResponse.json(user)
  }),

  // PATCH /api/users/me
  http.patch("/api/users/me", async ({ request }) => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    const body = await request.json()
    Object.assign(user, body)
    return HttpResponse.json(user)
  }),

  // GET /api/users/me/addresses
  http.get("/api/users/me/addresses", () => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    return HttpResponse.json(mockAddressesByUser[user.id] ?? [])
  }),

  // POST /api/users/me/addresses
  http.post("/api/users/me/addresses", async ({ request }) => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    const body = await request.json()
    const addresses = mockAddressesByUser[user.id] ?? []
    if (body.is_default) addresses.forEach(a => { a.is_default = false })
    const allIds = Object.values(mockAddressesByUser).flat().map(a => a.id)
    const newId = allIds.length ? Math.max(...allIds) + 1 : 1
    const newAddress = { id: newId, user_id: user.id, ...body }
    addresses.push(newAddress)
    mockAddressesByUser[user.id] = addresses
    return HttpResponse.json(newAddress, { status: 201 })
  }),

  // PATCH /api/users/me/addresses/:id
  http.patch("/api/users/me/addresses/:id", async ({ params, request }) => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    const addresses = mockAddressesByUser[user.id] ?? []
    const addr = addresses.find(a => a.id === parseInt(params.id))
    if (!addr) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    const body = await request.json()
    if (body.is_default) addresses.forEach(a => { a.is_default = false })
    Object.assign(addr, body)
    return HttpResponse.json(addr)
  }),

  // DELETE /api/users/me/addresses/:id
  http.delete("/api/users/me/addresses/:id", ({ params }) => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    const addresses = mockAddressesByUser[user.id] ?? []
    const idx = addresses.findIndex(a => a.id === parseInt(params.id))
    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 })
    addresses.splice(idx, 1)
    return HttpResponse.json({ message: "Deleted" })
  }),

  // PATCH /api/users/me/password
  http.patch("/api/users/me/password", async ({ request }) => {
    const user = getSessionUser()
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 })
    const { new_password } = await request.json()
    if (!new_password || new_password.length < 8) {
      return HttpResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 })
    }
    return HttpResponse.json({ message: "Password updated." })
  }),
]