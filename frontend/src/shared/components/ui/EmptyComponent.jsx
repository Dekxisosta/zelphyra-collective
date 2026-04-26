import { useTheme } from "../../../features/theme";
import emptyDark from "../../../assets/images/empty-dark.png";
import emptyLight from "../../../assets/images/empty-light.png";

export default function EmptyComponent({ title = "Nothing here", message = "There's nothing to display right now." }) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>
        {title}
      </h3>
      <p className="text-sm text-center max-w-xs" style={{ color: "var(--color-text-muted)" }}>
        {message}
      </p>
    </div>
  );
}