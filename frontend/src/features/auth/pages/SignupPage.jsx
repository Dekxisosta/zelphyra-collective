export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 border rounded-xl space-y-4">
        <h1 className="text-xl font-bold">Sign Up</h1>

        <input className="w-full border p-2 rounded" placeholder="Name" />
        <input className="w-full border p-2 rounded" placeholder="Email" />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" />

        <button
          className="w-full py-2 rounded text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}