import errorIllustration from "/images/error_icon2.png";
import { ERROR_MAP } from "../../../shared";

export default function ErrorComponent({ 
  type = "DEFAULT", 
  onRetry, 
  onHome 
}) {
  const { code, title, message } = ERROR_MAP[type] || ERROR_MAP.DEFAULT;

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <div style={styles.titleWrapper}>
            <h1 style={styles.mainTitle}>{title.split(" ")[0]}</h1>
            <h1 style={styles.mainTitle}>{title.split(" ").slice(1).join(" ") + " . . ."}</h1>
          </div>
          <img src={errorIllustration} alt="Error Illustration" style={styles.icon} />
        </div>
      </div>

      {/* Bottom Data Section - Adapts to Theme */}
      <div style={styles.footer}>
        <div style={styles.statusGroup}>
          <div style={styles.iconMisc}> XXXXX XXXXX</div>
          <div style={styles.divider} />
          <span style={styles.errorCode}>SYSTEM_LOG ::: {code}</span>
        </div>

        <div style={styles.content}>
          <p style={styles.message}>{message}</p>
        </div>

        <div style={styles.actions}>
          {onRetry && (
            <button onClick={onRetry} style={styles.btnPrimary}>
              RETRY_CONNECTION
            </button>
          )}
          {onHome && (
            <button onClick={onHome} style={styles.btnSecondary}>
              RETURN_HOME
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "800px", // Increased width for better proportions
    margin: "2rem auto",
    backgroundColor: "var(--color-bg)",
    overflow: "hidden",
    border: "2px solid var(--color-border)",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
  },
  banner: {
    backgroundColor: "var(--color-accent)",
    padding: "3rem 2.5rem", // More padding for "bigger" feel
    position: "relative",
    minHeight: "240px",
    display: "flex",
    alignItems: "center",
    backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 10px)",
  },
  bannerContent: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  mainTitle: {
    fontSize: "4rem",
    fontWeight: "900",
    lineHeight: "0.9",
    color: "#000000",
    margin: 0,
    letterSpacing: "-0.06em",
    textAlign: "left",
    textTransform: "uppercase",
  },
  icon: {
    width: "220px", // Significantly bigger illustration
    height: "auto",
    filter: "drop-shadow(6px 6px 0px rgba(0,0,0,0.15))",
    // Slight negative margin if your image has white space around it
    marginRight: "-1rem", 
  },
  footer: {
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text)",
    padding: "2rem 2.5rem",
    textAlign: "left",
  },
  statusGroup: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  iconMisc: {
    fontSize: "1.2rem",
    opacity: 0.9,
  },
  divider: {
    width: "2px",
    height: "20px",
    backgroundColor: "var(--color-border)",
    opacity: 0.3,
  },
  errorCode: {
    color: "var(--color-accent)",
    fontSize: "1rem",
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: "2px",
  },
  content: {
    marginBottom: "2.5rem",
  },
  subTitle: {
    fontSize: "1.5rem", // Bigger sub-title
    fontWeight: "800",
    color: "var(--color-text)",
    marginBottom: "0.75rem",
    textTransform: "uppercase",
  },
  message: {
    fontSize: "1rem",
    color: "var(--color-text-muted)",
    maxWidth: "550px",
    margin: 0,
    lineHeight: "1.6",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  btnPrimary: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "var(--color-primary)",
    color: "#ffffff",
    border: "none",
    borderRadius: "calc(var(--radius) / 2)",
    fontWeight: "800",
    fontSize: "0.85rem",
    cursor: "pointer",
    letterSpacing: "0.05em",
  },
  btnSecondary: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "transparent",
    color: "var(--color-text-muted)",
    border: "2px solid var(--color-border)",
    borderRadius: "calc(var(--radius) / 2)",
    fontWeight: "800",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
};