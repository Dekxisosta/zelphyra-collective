export default function Divider({
  label,
  className = "",
  lineClassName = "",
  textClassName = "",
}) {
  return (
    <div className={`flex items-center w-full my-6 ${className}`}>
      <div
        className={`flex-1 h-px bg-[var(--color-border)] ${lineClassName}`}
      />

      {label && (
        <span
          className={`px-3 text-xs tracking-wide whitespace-nowrap text-[var(--color-text-muted)] ${textClassName}`}
        >
          {label}
        </span>
      )}

      <div
        className={`flex-1 h-px bg-[var(--color-border)] ${lineClassName}`}
      />
    </div>
  );
}