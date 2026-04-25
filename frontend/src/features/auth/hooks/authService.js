const API_URL = "/api/auth"

export const authService = {
  login: (email, password) =>
    fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  signup: (name, email, password) =>
    fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then(r => r.json()),

  logout: () =>
    fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" }),

  me: () =>
    fetch(`${API_URL}/me`, { credentials: "include" }).then(r => r.json()),
}