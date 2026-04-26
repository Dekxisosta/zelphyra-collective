import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../../../stylesheets/auth.css";

// Scores password strength 0-4
// Mirrors Laravel's Password::min(8)->mixedCase()->numbers() rule
function getStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8)           score++;
    if (/[A-Z]/.test(pw))        score++;
    if (/[0-9]/.test(pw))        score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
}

const STRENGTH_META = [
    { label: "",       color: "transparent"        },
    { label: "Weak",   color: "#dc2626"             },
    { label: "Fair",   color: "var(--color-accent)" },
    { label: "Good",   color: "#16a34a"             },
    { label: "Strong", color: "#16a34a"             },
];

export default function SignupPage() {
    const { login }  = useAuth();
    const navigate   = useNavigate();

    const [form, setForm] = useState({
        name:                  "",
        email:                 "",
        password:              "",
        password_confirmation: "",
    });
    const [showPassword,    setShowPassword]    = useState(false);
    const [showConfirm,     setShowConfirm]     = useState(false);
    const [error,           setError]           = useState("");
    const [loading,         setLoading]         = useState(false);

    const set = (key) => (e) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const strength = getStrength(form.password);
    const { label: strengthLabel, color: strengthColor } = STRENGTH_META[strength];

    // Client-side validation mirrors Laravel rules
    function validate() {
        const { name, email, password, password_confirmation } = form;
        if (!name.trim() || !email.trim() || !password)
            return "Please fill in all fields.";
        if (password.length < 8)
            return "Password must be at least 8 characters.";
        if (!/[A-Z]/.test(password))
            return "Password must contain at least one uppercase letter.";
        if (!/[0-9]/.test(password))
            return "Password must contain at least one number.";
        if (password !== password_confirmation)
            return "Passwords do not match.";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            // Fetch CSRF token before POST
            await fetch("/sanctum/csrf-cookie", { credentials: "include" });

            const res = await fetch("/api/register", {
                method:      "POST",
                credentials: "include",
                headers:     { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name:                  form.name.trim(),
                    email:                 form.email.trim(),
                    password:              form.password,
                    password_confirmation: form.password_confirmation,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                const firstError = data.errors
                    ? Object.values(data.errors)[0][0]
                    : data.message;
                throw new Error(firstError || "Registration failed.");
            }

            // Auto login after successful registration
            await login(form.email.trim(), form.password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-layout">

            {/* Left: brand panel */}
            <aside className="auth-brand">
                <div className="auth-brand__glow" />
                <span className="auth-brand__eyebrow">Join the collective</span>
                <h1 className="auth-brand__heading">
                    Start your<br />journey<br />with <em>style.</em>
                </h1>
                <p className="auth-brand__sub">
                    Create your account and get instant access to exclusive drops,
                    member-only deals, and a community that lives for fashion.
                </p>
                <ul className="auth-brand__perks">
                    {[
                        { icon: "🚚", text: "Free shipping on orders over ₱999" },
                        { icon: "⚡", text: "Early access to limited releases"   },
                        { icon: "🏷️", text: "Members-only discounts & rewards"  },
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

                    <h2 className="auth-form__title">Join us</h2>
                    <p className="auth-form__subtitle">Create your account.</p>

                    <form onSubmit={handleSubmit} noValidate>

                        <div className="auth-field">
                            <label htmlFor="signup-name" className="auth-field__label">
                                Full name
                            </label>
                            <input
                                id="signup-name"
                                type="text"
                                className="auth-field__input"
                                placeholder="Joshua Balois"
                                value={form.name}
                                onChange={set("name")}
                                autoComplete="name"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signup-email" className="auth-field__label">
                                Email address
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                className="auth-field__input"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={set("email")}
                                autoComplete="email"
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signup-password" className="auth-field__label">
                                Password
                            </label>
                            <div className="auth-field__input-wrap">
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    className="auth-field__input auth-field__input--peekable"
                                    placeholder="Min. 8 chars, uppercase + number"
                                    value={form.password}
                                    onChange={set("password")}
                                    autoComplete="new-password"
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
                            <div className="auth-strength">
                                {[1, 2, 3, 4].map((n) => (
                                    <span
                                        key={n}
                                        className="auth-strength__bar"
                                        style={{ background: n <= strength ? strengthColor : undefined }}
                                    />
                                ))}
                                {form.password && (
                                    <span
                                        className="auth-strength__label"
                                        style={{ color: strengthColor }}
                                    >
                                        {strengthLabel}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signup-confirm" className="auth-field__label">
                                Confirm password
                            </label>
                            <div className="auth-field__input-wrap">
                                <input
                                    id="signup-confirm"
                                    type={showConfirm ? "text" : "password"}
                                    className="auth-field__input auth-field__input--peekable"
                                    placeholder="Re-enter your password"
                                    value={form.password_confirmation}
                                    onChange={set("password_confirmation")}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="auth-peek"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="auth-error">{error}</p>}

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                            style={{ marginTop: "1rem" }}
                        >
                            {loading ? "Creating account…" : "Create account"}
                        </button>
                    </form>

                    <p className="auth-terms">
                        By creating an account you agree to our{" "}
                        <Link to="/terms-of-service" className="auth-link">Terms of Service</Link>
                        {" "}and{" "}
                        <Link to="/privacy-policy" className="auth-link">Privacy Policy</Link>.
                    </p>

                    <p className="auth-switch">
                        Already a member?{" "}
                        <Link to="/login" className="auth-link">Sign in</Link>
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