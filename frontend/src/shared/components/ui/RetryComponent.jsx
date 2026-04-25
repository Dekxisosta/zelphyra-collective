import { useTheme } from "../../../features/theme";
import { ERROR_MAP } from "../../constants/errorCodes";
import retryDark from "../../../assets/images/retry-dark.png";
import retryLight from "../../../assets/images/retry-light.png";

const RetryComponent = ({ onRetry, errorType = "FETCH_ERROR" }) => {
  const { theme } = useTheme();
  const { code, title, message } = ERROR_MAP[errorType] ?? ERROR_MAP.DEFAULT;

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <span
        className="text-xs font-mono"
        style={{ color: "var(--color-text-muted)" }}
      >
        {code}
      </span>
      <h3
        className="font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-center max-w-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 text-sm rounded transition-colors"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default RetryComponent;