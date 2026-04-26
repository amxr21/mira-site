// Horizontal progress bar. `pct` is 0–100.
// The only inline style is the dynamic width — unavoidable for runtime values.
type BarColor = "rust" | "sand" | "rust-dim" | "rust-faint";

interface BarProps {
  pct: number;
  color?: BarColor;
  height?: "sm" | "md";
}

const FILL: Record<BarColor, string> = {
  "rust":       "bg-rust",
  "sand":       "bg-sand/35",
  "rust-dim":   "bg-rust/40",
  "rust-faint": "bg-rust/20",
};

const HEIGHT = { sm: "h-[3px]", md: "h-[5px]" };

export default function Bar({ pct, color = "rust", height = "md" }: BarProps) {
  return (
    <div className={`${HEIGHT[height]} bg-white/[0.06] rounded-full overflow-hidden`}>
      <div
        className={`h-full rounded-full ${FILL[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
