import { useState, useEffect } from "react";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { AvatarPicker, Section } from "../components";
import { ProfileSection, AddressSection, SecuritySection } from "../sections";
import { useProfile } from "../context";
import { RetryComponent } from "../../../shared";
import avatars from "../../../data/avatars.json";
import { ShoppingCart, Heart, Pencil, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { user }    = useAuth()   // used for role-gated admin button
  const navigate    = useNavigate()
  const [pickerOpen, setPickerOpen] = useState(false)

  const {
    profile, addresses, loading: profileLoading, error, refetch,
    updateProfile, updateAvatar,
    updatePassword,
    addAddress, updateAddress, deleteAddress,
  } = useProfile()

  useEffect(() => {
    if (!profileLoading && !profile) {
      navigate("/login");
    }
  }, [profileLoading, profile, navigate]);

  const avatarId      = profile?.avatar_id ?? 1
  const currentAvatar = avatars.find(a => a.id === avatarId)

  const handleSelectAvatar = async (id) => {
    try { await updateAvatar(id) } catch {}
  }

  if (profileLoading) return (
    <div style={{ minHeight: "100vh", padding: "2.5rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>Loading profile…</p>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: "100vh", padding: "2.5rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <RetryComponent errorType="FETCH_ERROR" onRetry={refetch} />
    </div>
  )

  if (!profile) return null;

  return (
    <div style={{
      minHeight: "100vh",
      padding: "1.25rem 1rem",
      backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/user-background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <div className="py-4 px-4 sm:py-5 sm:px-6 bg-[var(--color-bg)] rounded-2xl" style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* HEADER */}
        <div className="flex flex-col gap-3">
          {/* Avatar + name row */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={currentAvatar?.url}
                alt={currentAvatar?.label}
                className="object-cover"
                style={{ width: "72px", height: "72px", borderRadius: "50%", border: "3px solid var(--color-primary)" }}
              />
              <button
                onClick={() => setPickerOpen(true)}
                className="absolute bottom-0 right-0 flex min-w-10 items-center rounded-full"
                style={{ width: "22px", height: "22px", backgroundColor: "var(--color-primary)", color: "#fff", border: "2px solid var(--color-bg)", cursor: "pointer" }}
              >
                <Pencil size={11} />
              </button>
            </div>
            <div className="min-w-0">
              <h1 className="truncate" style={{ color: "var(--color-text)", fontWeight: 800, fontSize: "1.25rem" }}>
                {profile.name}
              </h1>
              <p className="truncate" style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
  {user?.role === "admin" && (
    <button
      onClick={() => navigate("/admin")}
      className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors"
      style={{
        background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
        color: "var(--color-primary)",
        border: "0.5px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
      }}
    >
      <ShieldCheck size={14} />
      Admin
    </button>
  )}

    <div className="flex items-center gap-1.5 ml-auto">
      <button
        onClick={() => navigate("/wishlist")}
        className="relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors"
        style={{
          background: "var(--color-bg-soft)",
          color: "var(--color-text-muted)",
          border: "0.5px solid var(--color-border)",
        }}
      >
        <Heart size={14} />
        Wishlist
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-semibold">
          </span>
      </button>

      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90"
        style={{ background: "var(--color-primary)", color: "#fff", border: "none" }}
      >
        <ShoppingCart size={14} />
        Cart
          <span className="flex items-center justify-center px-1.5 rounded-full text-[11px] font-semibold"
            style={{ background: "rgba(255,255,255,0.25)" }}>
          </span>
      </button>
    </div>
  </div>
        </div>

        <Section title="Personal Information">
          <ProfileSection profile={profile} onUpdate={updateProfile} />
        </Section>

        <Section title="Saved Addresses">
          <AddressSection
            addresses={addresses}
            onAdd={addAddress}
            onUpdate={updateAddress}
            onDelete={deleteAddress}
          />
        </Section>

        <Section title="Security">
          <SecuritySection onUpdatePassword={updatePassword} />
        </Section>

      </div>

      {pickerOpen && (
        <AvatarPicker
          currentAvatarId={avatarId}
          onSelect={async (id) => {
            await handleSelectAvatar(id)
            setPickerOpen(false)
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}