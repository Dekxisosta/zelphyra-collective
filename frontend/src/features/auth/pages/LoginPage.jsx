import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../../../stylesheets/auth.css";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate  = useNavigate();

    const [email,       setEmail]       = useState("");
    const [password,    setPassword]    = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error,       setError]       = useState("");
    const [loading,     setLoading]     = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Invalid credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-layout">

            {/* Left: brand panel */}
            <aside className="auth-brand">
                <div className="auth-brand__glow" />
                <span className="auth-brand__eyebrow">Members only</span>
                <h1 className="auth-brand__heading">
                    Welcome<br />back to<br />the <em>collective.</em>
                </h1>
                <p className="auth-brand__sub">
                    Sign in to access your wishlist, track orders, and unlock
                    exclusive member drops.
                </p>
                <ul className="auth-brand__perks">
                    {[
                        { icon: "🎁", text: "Exclusive early access to new drops" },
                        { icon: "📦", text: "Track all your orders in one place"  },
                        { icon: "❤️",  text: "Save items to your wishlist"        },
                    ].map(({ icon, text }) => (
                        <li key={text} className="auth-brand__perk">
                            <span className="auth-brand__perk-icon">{icon}</span>
                            {text}
                        </li>
                    ))}
                </ul>
                <div className="auth-brand__rule" />
            </aside>

            {/* Right: form */}
            <main className="auth-form">
                <div className="auth-form__card">

                    <h2 className="auth-form__title">Sign in</h2>
                    <p className="auth-form__subtitle">Good to have you back.</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="auth-field">
                            <label htmlFor="login-email" className="auth-field__label">
                                Email address
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                className="auth-field__input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="login-password" className="auth-field__label">
                                Password
                            </label>
                            <div className="auth-field__input-wrap">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    className="auth-field__input auth-field__input--peekable"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-peek"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <span className="auth-forgot">Forgot password?</span>

                        {error && <p className="auth-error">{error}</p>}

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? "Signing in…" : "Login"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        No account?{" "}
                        <Link to="/signup" className="auth-link">Create one</Link>
                    </p>

                </div>
            </main>
        </div>
    );
}

// Eye icons
function Eye() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOff() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}