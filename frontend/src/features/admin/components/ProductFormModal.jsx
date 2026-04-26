import { useState, useRef } from "react"
import { useAdminProductMutations } from "../hooks/useAdminProductMutations"
import categories from "../../../mocks/json/categories.json"
import pills from "../../../mocks/json/pills.json"

const EMPTY_FORM = {
  name: "", description: "", price: "", brand: "", sku: "",
  category_id: "", pill_id: "", discount_percent: "",
  shipping_fee: "", shipping_from: "",
  shipping_days_min: "", shipping_days_max: "",
  size: "",
}

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const isEdit = !!product
  const [form, setForm]       = useState(isEdit ? {
    name:               product.name              ?? "",
    description:        product.description       ?? "",
    price:              product.price             ?? "",
    brand:              product.brand             ?? "",
    sku:                product.sku               ?? "",
    category_id:        product.category_id       ?? "",
    pill_id:            product.pill_id           ?? "",
    discount_percent:   product.discount_percent  ?? "",
    shipping_fee:       product.shipping_fee      ?? "",
    shipping_from:      product.shipping_from     ?? "",
    shipping_days_min:  product.shipping_days_min ?? "",
    shipping_days_max:  product.shipping_days_max ?? "",
    size:               product.size              ?? "",
  } : EMPTY_FORM)

  const [images, setImages]         = useState(product?.images ?? [])
  const [imageUrl, setImageUrl]     = useState("")
  const [isPrimary, setIsPrimary]   = useState(false)
  const [isHover, setIsHover]       = useState(false)
  const [imageError, setImageError] = useState(null)

  const { loading, error, addProduct, updateProduct, addImage, deleteImage, updateImage } = useAdminProductMutations({
    onSuccess
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        price:              parseFloat(form.price)              || 0,
        category_id:        parseInt(form.category_id)         || null,
        pill_id:            parseInt(form.pill_id)             || null,
        discount_percent:   parseFloat(form.discount_percent)  || null,
        shipping_fee:       parseFloat(form.shipping_fee)      || null,
        shipping_days_min:  parseInt(form.shipping_days_min)   || null,
        shipping_days_max:  parseInt(form.shipping_days_max)   || null,
      }
      if (isEdit) {
        await updateProduct(product.id, payload)
      } else {
        await addProduct(payload)
      }
      onClose()
    } catch {}
  }

  const handleAddImage = async () => {
    setImageError(null)
    if (!imageUrl.trim()) return setImageError("URL is required.")
    try {
      const productId = product?.id
      if (!productId) return setImageError("Save the product first before adding images.")
      const newImg = await addImage(productId, { url: imageUrl.trim(), is_primary: isPrimary, is_hover: isHover, sort_order: images.length })
      setImages(prev => [...prev, newImg])
      setImageUrl("")
      setIsPrimary(false)
      setIsHover(false)
    } catch {}
  }

  const handleSetPrimary = async (img) => {
    if (!product?.id) return
    await updateImage(product.id, img.id, { is_primary: true })
    setImages(prev => prev.map(i => ({ ...i, is_primary: i.id === img.id })))
  }

  const handleDeleteImage = async (img) => {
    if (!product?.id) return
    await deleteImage(product.id, img.id)
    setImages(prev => prev.filter(i => i.id !== img.id))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 style={{ color: "var(--color-text)", fontWeight: 800, fontSize: "1.15rem" }}>
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--color-text-muted)", fontSize: "1.25rem", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* FORM FIELDS */}
        <FormSection title="Basic Info">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <FormField label="Name *"        name="name"        value={form.name}        onChange={handleChange} span />
            <FormField label="Brand"         name="brand"       value={form.brand}       onChange={handleChange} />
            <FormField label="SKU"           name="sku"         value={form.sku}         onChange={handleChange} />
            <FormField label="Price (₱) *"   name="price"       value={form.price}       onChange={handleChange} type="number" />
            <FormField label="Discount (%)"  name="discount_percent" value={form.discount_percent} onChange={handleChange} type="number" />
            <FormField label="Description"   name="description" value={form.description} onChange={handleChange} span textarea />
          </div>
        </FormSection>

        <FormSection title="Categorization">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <FormSelect label="Category" name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">— None —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </FormSelect>
            <FormSelect label="Pill" name="pill_id" value={form.pill_id} onChange={handleChange}>
              <option value="">— None —</option>
              {pills.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </FormSelect>
            <FormSelect label="Size" name="size" value={form.size} onChange={handleChange}>
              <option value="">— None —</option>
              {["XS","S","M","L","XL","XXL"].map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
          </div>
        </FormSection>

        <FormSection title="Shipping">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <FormField label="Ships From"    name="shipping_from"      value={form.shipping_from}      onChange={handleChange} span />
            <FormField label="Shipping Fee"  name="shipping_fee"       value={form.shipping_fee}       onChange={handleChange} type="number" />
            <FormField label="Min Days"      name="shipping_days_min"  value={form.shipping_days_min}  onChange={handleChange} type="number" />
            <FormField label="Max Days"      name="shipping_days_max"  value={form.shipping_days_max}  onChange={handleChange} type="number" />
          </div>
        </FormSection>

        {/* IMAGE SECTION — only for edit mode */}
        {isEdit && (
          <FormSection title="Images">
            {/* Existing Images */}
            {images.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                {images.map(img => (
                  <div
                    key={img.id}
                    style={{
                      position: "relative",
                      width: "90px",
                      borderRadius: "var(--radius)",
                      border: img.is_primary ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={img.url}
                      alt=""
                      style={{ width: "90px", height: "90px", objectFit: "cover", display: "block" }}
                    />
                    {/* badges */}
                    <div style={{ position: "absolute", top: "4px", left: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                      {img.is_primary && (
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "1px 5px", borderRadius: "999px", backgroundColor: "var(--color-primary)", color: "#fff" }}>
                          Primary
                        </span>
                      )}
                      {img.is_hover && (
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "1px 5px", borderRadius: "999px", backgroundColor: "#8b5cf6", color: "#fff" }}>
                          Hover
                        </span>
                      )}
                    </div>
                    {/* actions */}
                    <div style={{ display: "flex", gap: "2px", padding: "4px", backgroundColor: "rgba(0,0,0,0.6)" }}>
                      {!img.is_primary && (
                        <button
                          onClick={() => handleSetPrimary(img)}
                          title="Set as primary"
                          style={{ flex: 1, fontSize: "0.6rem", padding: "2px", background: "none", border: "none", color: "#facc15", cursor: "pointer" }}
                        >
                          ★
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteImage(img)}
                        title="Delete"
                        style={{ flex: 1, fontSize: "0.6rem", padding: "2px", background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Image by URL */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}>
              <p style={{ color: "var(--color-text)", fontWeight: 600, fontSize: "0.8rem" }}>Add Image via URL</p>
              <FormField
                label="Image URL"
                name="imageUrl"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://..."
                span
              />

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="preview"
                  onError={e => e.currentTarget.style.display = "none"}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}
                />
              )}

              <div className="flex gap-4">
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)", fontSize: "0.8rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={isPrimary} onChange={e => setIsPrimary(e.target.checked)} />
                  Primary
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)", fontSize: "0.8rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={isHover} onChange={e => setIsHover(e.target.checked)} />
                  Hover
                </label>
              </div>

              {imageError && <p style={{ color: "#ef4444", fontSize: "0.78rem" }}>{imageError}</p>}

              <button
                onClick={handleAddImage}
                style={{ alignSelf: "flex-start", padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, backgroundColor: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "var(--radius)", cursor: "pointer" }}
              >
                + Add Image
              </button>
            </div>
          </FormSection>
        )}

        {/* NOTE for new products */}
        {!isEdit && (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", fontStyle: "italic" }}>
            * Images can be added after the product is created.
          </p>
        )}

        {error && <p style={{ color: "#ef4444", fontSize: "0.82rem" }}>{error}</p>}

        {/* FOOTER */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", background: "none", border: "1px solid var(--color-border)", color: "var(--color-text-muted)", borderRadius: "var(--radius)", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ padding: "0.5rem 1.5rem", fontSize: "0.875rem", fontWeight: 700, backgroundColor: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "var(--radius)", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── FORM PRIMITIVES ───────────────────────────────────────────────────────────
function FormSection({ title, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <p style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          {title}
        </p>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
      </div>
      {children}
    </div>
  )
}

function FormField({ label, name, value, onChange, type = "text", span, textarea, placeholder }) {
  const style = {
    padding: "0.45rem 0.8rem",
    borderRadius: "var(--radius)",
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-bg)",
    color: "var(--color-text)",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    resize: "vertical",
  }

  return (
    <div style={{ gridColumn: span ? "1 / -1" : undefined, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 600 }}>
        {label}
      </label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={3} placeholder={placeholder} style={style} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} style={style} />
      )}
    </div>
  )
}

function FormSelect({ label, name, value, onChange, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label style={{ color: "var(--color-text-muted)", fontSize: "0.72rem", fontWeight: 600 }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ padding: "0.45rem 0.8rem", borderRadius: "var(--radius)", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)", fontSize: "0.875rem", fontFamily: "inherit", outline: "none", width: "100%", cursor: "pointer" }}
      >
        {children}
      </select>
    </div>
  )
}