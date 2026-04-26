interface SectionHeaderProps {
  tag: string;          // e.g. "01 — Overview"
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({ tag, title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`reveal mb-14 ${className}`}>
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-[11px] text-rust uppercase tracking-wide5 whitespace-nowrap">
          {tag}
        </span>
        <div className="rule" />
      </div>
      <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-white leading-[1.05] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[0.95rem] md:text-[1rem] text-sand-dim w-full max-w-[640px] leading-[1.85] mb-[52px]">
          {description}
        </p>
      )}
    </div>
  );
}
