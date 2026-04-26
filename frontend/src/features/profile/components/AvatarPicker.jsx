import { useState } from "react"
import avatars from "../../../data/avatars.json"

export default function AvatarPicker({ currentAvatarId, onSelect, onClose }) {
  const [selected, setSelected] = useState(currentAvatarId ?? null)

  const current = avatars.find(a => a.id === selected)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 flex flex-col gap-5"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h2 style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1.1rem" }}>
              Choose your avatar
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem", marginTop: "0.15rem" }}>
              Select a character to represent you
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: "var(--color-text-muted)", fontSize: "1.25rem", lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* PREVIEW */}
        {current && (
          <div className="flex flex-col items-center gap-2">
            <img
              src={current.url}
              alt={current.label}
              className="rounded-full object-cover"
              style={{
                width: "80px",
                height: "80px",
                border: "3px solid var(--color-primary)",
                borderRadius: "50%",
              }}
            />
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
              {current.label}
            </p>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-3 gap-3">
          {avatars.map(avatar => {
            const isSelected = avatar.id === selected
            return (
              <button
                key={avatar.id}
                onClick={() => setSelected(avatar.id)}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                style={{
                  background: isSelected ? "var(--color-primary)" : "var(--color-bg)",
                  border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                  cursor: "pointer",
                }}
              >
                <img
                  src={avatar.url}
                  alt={avatar.label}
                  className="rounded-full object-cover"
                  style={{
                    width: "56px",
                    height: "56px",
                    opacity: isSelected ? 1 : 0.75,
                    transition: "opacity 0.2s",
                  }}
                />
                <span style={{
                  fontSize: "0.7rem",
                  fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? "#fff" : "var(--color-text-muted)",
                }}>
                  {avatar.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* CONFIRM */}
        <button
          onClick={() => {
            if (selected) onSelect(selected, current)
            onClose()
          }}
          disabled={!selected}
          className="w-full py-2.5 rounded-xl font-semibold text-sm transition"
          style={{
            backgroundColor: selected ? "var(--color-primary)" : "var(--color-border)",
            color: selected ? "#fff" : "var(--color-text-muted)",
            border: "none",
            cursor: selected ? "pointer" : "not-allowed",
            borderRadius: "var(--radius)",
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}