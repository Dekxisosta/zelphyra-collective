import { useState } from "react";
import { useAuth } from "../../auth";
import {AvatarPicker, Section} from "../components";
import {ProfileSection, AddressSection, SecuritySection} from "../sections/";
import avatars from "../../../data/avatars.json";

export default function ProfilePage() {
  const { user } = useAuth()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [avatarId, setAvatarId] = useState(1)
  const currentAvatar = avatars.find(a => a.id === avatarId)

  return (
    <div style={{ minHeight: "100vh", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentAvatar?.url}
              alt={currentAvatar?.label}
              className="object-cover"
              style={{ width: "72px", height: "72px", borderRadius: "50%", border: "3px solid var(--color-primary)" }}
            />
            <button
              onClick={() => setPickerOpen(true)}
              className="absolute bottom-0 right-0 flex items-center justify-center rounded-full"
              style={{ width: "22px", height: "22px", backgroundColor: "var(--color-primary)", color: "#fff", border: "2px solid var(--color-bg)", cursor: "pointer", fontSize: "0.65rem" }}
            >
              ✎
            </button>
          </div>
          <div>
            <h1 style={{ color: "var(--color-text)", fontWeight: 800, fontSize: "1.25rem" }}>
              {user?.name ?? "Guest"}
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
              {user?.email ?? "—"}
            </p>
          </div>
        </div>

        <Section title="Personal Information">
          <ProfileSection user={user} />
        </Section>

        <Section title="Saved Addresses">
          <AddressSection />
        </Section>

        <Section title="Security">
          <SecuritySection />
        </Section>

      </div>

      {pickerOpen && (
        <AvatarPicker
          currentAvatarId={avatarId}
          onSelect={(id) => setAvatarId(id)}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}