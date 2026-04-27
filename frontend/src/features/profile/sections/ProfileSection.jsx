// features/profile/sections/ProfileSection.jsx
import { useState, useEffect } from "react"
import { Field, SaveButton } from "../components/ProfileUI"

export default function ProfileSection({ profile, onUpdate }) {
  const [form, setForm] = useState({
    name:  profile?.name  ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
  })
  const [status, setStatus] = useState(null)

  // sync fields when profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name:  profile.name  ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
      })
    }
  }, [profile])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    setStatus("saving")
    try {
      await onUpdate(form)
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
        <Field disabled={true} label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" />
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