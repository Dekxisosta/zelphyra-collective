export default function Disclaimer() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        padding: "1rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto" }}>
        <span style={{ color: "var(--color-text)", fontWeight: 600 }}>Disclaimer: </span>
        This website is not affiliated with, endorsed by, or associated with HoYoverse or miHoYo in any way.
        All HoYoverse-related imagery, characters, and assets used on this site are the intellectual property of HoYoverse / miHoYo Co., Ltd.
        and are used solely for design portfolio and showcase purposes. No commercial use is intended.
      </p>
    </div>
  )
}