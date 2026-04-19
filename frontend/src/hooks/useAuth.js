import { useState, useEffect } from "react";

const API_URL = "/api/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --------------------
  // LOGIN
  // --------------------
  async function login(email, password) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // --------------------
  // SIGNUP
  // --------------------
  async function signup(name, email, password) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        credentials: "include", // 🔥 IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // --------------------
  // GET CURRENT USER
  // --------------------
  async function fetchUser() {
    try {
      const res = await fetch(`${API_URL}/me`, {
        credentials: "include",
      });

      if (!res.ok) return null;

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }

  // --------------------
  // LOGOUT
  // --------------------
  async function logout() {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }

  // Auto-check session on load
  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };
}