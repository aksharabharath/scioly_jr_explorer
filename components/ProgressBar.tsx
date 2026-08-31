type ProgressBarProps = {
  value: number;
  label: string;
  fillClassName?: string;
};

/** Display-only bar. `value` is a 0–100 percent for the aria/visual fill. */
export function ProgressBar({
  value,
  label,
  fillClassName = "bg-teal",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-stone-200/90"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
    >
      <div
        className={`progress-fill h-full rounded-full ${fillClassName}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
