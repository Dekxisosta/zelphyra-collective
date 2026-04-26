import { useState } from "react"
import { Field, SaveButton, selectStyle } from "../components/ProfileUI"

export default function AddressSection() {
  const [addresses, setAddresses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({
    label: "Home", full_name: "", phone: "",
    address_line1: "", address_line2: "",
    city: "", province: "", zip_code: "",
    country: "Philippines", is_default: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = async () => {
    setStatus("saving")
    try {
      const res = await fetch("/api/users/me/addresses", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setAddresses(prev => [...prev, data])
      setShowForm(false)
      setStatus(null)
      setForm({ label: "Home", full_name: "", phone: "", address_line1: "", address_line2: "", city: "", province: "", zip_code: "", country: "Philippines", is_default: false })
    } catch {
      setStatus("error")
      setTimeout(() => setStatus(null), 2500)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {addresses.length === 0 && !showForm && (
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>No saved addresses yet.</p>
      )}

      {addresses.map((addr, i) => (
        <div key={i} style={{ padding: "0.875rem 1rem", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.8rem" }}>{addr.label}</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", lineHeight: 1.7, marginTop: "0.2rem" }}>
                {addr.full_name} · {addr.phone}<br />
                {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ""}<br />
                {addr.city}, {addr.province} {addr.zip_code} · {addr.country}
              </p>
            </div>
            {addr.is_default && (
              <span style={{ fontSize: "0.65rem", color: "var(--color-primary)", fontWeight: 700, whiteSpace: "nowrap" }}>
                ★ Default
              </span>
            )}
          </div>
        </div>
      ))}

      {showForm && (
        <div style={{ padding: "1rem", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <label style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 600 }}>Label</label>
              <select name="label" value={form.label} onChange={handleChange} style={selectStyle}>
                <option>Home</option>
                <option>Office</option>
                <option>Other</option>
              </select>
            </div>
            <Field label="Full Name"      name="full_name"     value={form.full_name}     onChange={handleChange} />
            <Field label="Phone"          name="phone"         value={form.phone}         onChange={handleChange} type="tel" />
            <Field label="Address Line 1" name="address_line1" value={form.address_line1} onChange={handleChange} />
            <Field label="Address Line 2 (optional)" name="address_line2" value={form.address_line2} onChange={handleChange} />
            <Field label="City"     name="city"     value={form.city}     onChange={handleChange} />
            <Field label="Province" name="province" value={form.province} onChange={handleChange} />
            <Field label="ZIP Code" name="zip_code" value={form.zip_code} onChange={handleChange} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="is_default" checked={form.is_default} onChange={handleChange} id="is_default" />
            <label htmlFor="is_default" style={{ color: "var(--color-text-muted)", fontSize: "0.78rem" }}>
              Set as default address
            </label>
          </div>
          <div className="flex gap-2">
            <SaveButton status={status} onClick={handleSubmit} />
            <button
              onClick={() => setShowForm(false)}
              style={{ padding: "0.4rem 1rem", fontSize: "0.8rem", background: "none", border: "1px solid var(--color-border)", color: "var(--color-text-muted)", borderRadius: "var(--radius)", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{ alignSelf: "flex-start", padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)", borderRadius: "var(--radius)", cursor: "pointer" }}
        >
          + Add Address
        </button>
      )}
    </div>
  )
}