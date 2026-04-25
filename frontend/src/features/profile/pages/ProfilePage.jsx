import {useProfile} from "../../../shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !profile) {
      navigate("/login");
    }
  }, [loading, profile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        Loading...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-6 flex items-center gap-6 shadow-sm">
          <img
            src={profile.avatar || "https://via.placeholder.com/100"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border border-[var(--color-border)]"
          />

          <div>
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <p className="text-[var(--color-text-muted)]">{profile.email}</p>

            <button className="mt-3 px-4 py-2 rounded-[var(--radius)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
            <h2 className="font-semibold mb-3">Account Info</h2>
            <p><span className="text-[var(--color-text-muted)]">Username:</span> {profile.username}</p>
            <p><span className="text-[var(--color-text-muted)]">Joined:</span> {profile.createdAt || "N/A"}</p>
          </div>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
            <h2 className="font-semibold mb-3">Activity</h2>
            <p><span className="text-[var(--color-text-muted)]">Orders:</span> {profile.orders || 0}</p>
            <p><span className="text-[var(--color-text-muted)]">Reviews:</span> {profile.reviews || 0}</p>
          </div>
        </div>

      </div>
    </div>
  );
}