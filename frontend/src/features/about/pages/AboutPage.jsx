import { useState } from "react";
import AboutImage from "/images/about.png";

const values = [
  { num: "01", title: "SIMPLICITY", desc: "No unnecessary clutter. Just clean design that respects your attention." },
  { num: "02", title: "SPEED", desc: "Fast navigation and instant feedback. Every millisecond counts." },
  { num: "03", title: "CLARITY", desc: "Everything is easy to understand and use. No surprises." },
];

const team = [
  { title: "DESIGN", role: "UI/UX Systems" },
  { title: "ENGINEERING", role: "Frontend + Performance" },
  { title: "EXPERIENCE", role: "User Flow + Interaction" },
];

const stats = [
  { value: "500+", label: "Curated Products" },
  { value: "10K+", label: "Active Users" },
  { value: "<1s", label: "Load Time" },
];

function Card3D({ children, accent = false, depth = 6 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", transform: hovered ? "translate(-3px, -3px)" : "translate(0,0)", transition: "transform 0.15s ease" }}
    >
      {Array.from({ length: depth }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          inset: 0,
          background: accent ? "var(--color-primary)" : "var(--color-border)",
          transform: `translate(${i + 1}px, ${i + 1}px)`,
          zIndex: -1,
        }} />
      ))}
      <div style={{
        background: "var(--color-surface)",
        border: "1.5px solid var(--color-border)",
        padding: "1.5rem",
        position: "relative",
        zIndex: 1,
      }}>
        {children}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
        <h2 style={{ fontFamily: "var(--font-normal)", fontSize: 26, letterSpacing: 1, whiteSpace: "nowrap", color: "var(--color-text)" }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
      </div>
      {children}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "3rem 0 2rem" }}>
      <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
      <span style={{ fontSize: 11, letterSpacing: 3, color: "var(--color-primary)", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "var(--font-header)" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-header)", maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem", color: "var(--color-text)" }}>

      {/* HERO */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center", marginBottom: "4rem", paddingBottom: "3rem", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ position: "relative" }}>
          <img src={AboutImage} alt="Zenless Collective" style={{ width: "100%", display: "block", filter: "grayscale(10%) contrast(1.05)" }} />
          <div style={{ position: "absolute", inset: 0, border: "2px solid var(--color-primary)", transform: "translate(8px, 8px)", zIndex: -1, pointerEvents: "none" }} />
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-header)", fontSize: 11, letterSpacing: 3, color: "var(--color-primary)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            // EST. 2024
          </p>
          <h1 style={{ fontFamily: "var(--font-normal)", fontSize: "clamp(52px, 8vw, 80px)", lineHeight: 0.95, letterSpacing: 1, marginBottom: "1rem", color: "var(--color-text)" }}>
            ZENLESS<br />
            <span style={{ color: "var(--color-primary)" }}>COLLEC</span><br />
            TIVE_
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--color-text-muted)" }}>
            A modern ecommerce experience built for simplicity, clarity, and style.
            No clutter. No noise. Just products that matter.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
        {stats.map((s) => (
          <Card3D key={s.label} accent>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-normal)", fontSize: 40, color: "var(--color-primary)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-text-muted)", marginTop: "0.4rem" }}>{s.label}</div>
            </div>
          </Card3D>
        ))}
      </div>

      {/* STORY */}
      <Section title="OUR_STORY">
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--color-text-muted)" }}>
          Zenless Collective started as a small idea — build a clean, fast, and distraction-free shopping experience. No clutter, no noise, just products that matter and a smooth user experience that gets out of your way.
        </p>
      </Section>

      <Section title="MISSION">
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--color-text-muted)" }}>
          We aim to simplify online shopping by focusing on performance, usability, and design. Every interaction is built to feel smooth, responsive, and intentional.
        </p>
      </Section>

      <Section title="VISION">
        <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--color-text-muted)" }}>
          To create a shopping ecosystem where discovery feels natural, products feel curated, and users never feel overwhelmed by choice.
        </p>
      </Section>

      <Divider label="// WHAT WE VALUE" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
        {values.map((v) => (
          <Card3D key={v.title}>
            <span style={{ fontFamily: "var(--font-normal)", fontSize: 44, color: "var(--color-primary)", opacity: 0.15, position: "absolute", top: 8, right: 12, lineHeight: 1, pointerEvents: "none" }}>{v.num}</span>
            <h3 style={{ fontFamily: "var(--font-normal)", fontSize: 20, letterSpacing: 0.5, marginBottom: "0.5rem", color: "var(--color-text)" }}>{v.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-muted)" }}>{v.desc}</p>
          </Card3D>
        ))}
      </div>

      <Divider label="// THE TEAM" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {team.map((t) => (
          <Card3D key={t.title}>
            <h3 style={{ fontFamily: "var(--font-normal)", fontSize: 20, letterSpacing: 0.5, marginBottom: "0.25rem", color: "var(--color-text)" }}>{t.title}</h3>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{t.role}</p>
          </Card3D>
        ))}
      </div>

      {/* CTA */}
      <Card3D accent>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontFamily: "var(--font-normal)", fontSize: 30, letterSpacing: 0.5, color: "var(--color-text)" }}>READY TO EXPLORE?</h2>
          <a href="/products" style={{ fontFamily: "var(--font-header)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", padding: "0.75rem 1.5rem", background: "var(--color-primary)", color: "#fff", textDecoration: "none", display: "inline-block" }}>
            Browse Products →
          </a>
        </div>
      </Card3D>

    </div>
  );
}