import { useState } from "react"
import { Field, SaveButton } from "../components/ProfileUI"

export default function ProfileSection({ user }) {
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "", phone: "" })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    setStatus("saving")
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus("saved")
      setTimeout(() => setStatus(null), 2500)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus(null), 2500)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
        <Field label="Full Name"     name="name"  value={form.name}  onChange={handleChange} />
        <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" />
        <Field label="Phone Number"  name="phone" value={form.phone} onChange={handleChange} type="tel" />
      </div>
      <div className="flex items-center gap-3">
        <SaveButton status={status} onClick={handleSubmit} />
        {status === "saved" && <span style={{ color: "#10b981", fontSize: "0.8rem" }}>✓ Saved</span>}
        {status === "error" && <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>Something went wrong.</span>}
      </div>
    </div>
  )
}