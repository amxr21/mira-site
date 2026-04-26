// Section wrapper — padding, max-width, optional named background variant.
// bg prop maps to Tailwind bg-* classes. bgVariant adds a named overlay from tailwind.config.ts.

type BgVariant = "void" | "void2" | "void3";
type BgOverlay = "radial-top" | "radial-bottom" | "radial-section" | "none";

interface SectionProps {
  id?: string;
  bg?: BgVariant;
  overlay?: BgOverlay;
  children: React.ReactNode;
  className?: string;
}

const BG_CLASS: Record<BgVariant, string> = {
  void:  "bg-void",
  void2: "bg-void-2",
  void3: "bg-void-3",
};

// These map to backgroundImage tokens defined in tailwind.config.ts
const OVERLAY_CLASS: Record<BgOverlay, string> = {
  "radial-top":     "bg-radial-top",
  "radial-bottom":  "bg-radial-bottom",
  "radial-section": "bg-radial-section",
  "none":           "",
};

export default function Section({ id, bg = "void", overlay = "none", children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "relative py-[120px] px-[60px] max-md:py-20 max-md:px-6",
        BG_CLASS[bg],
        OVERLAY_CLASS[overlay],
        className,
      ].filter(Boolean).join(" ")}
    >
      <div className="max-w-[1200px] mx-auto">
        {children}
      </div>
    </section>
  );
}
