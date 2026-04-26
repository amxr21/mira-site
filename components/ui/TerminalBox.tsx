interface TerminalBoxProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalBox({ label, children, className = "" }: TerminalBoxProps) {
  return (
    <div className={`terminal-box ${className}`}>
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />
      {label && (
        <div className="font-mono text-2xs text-rust uppercase tracking-wide5 mb-5 opacity-60">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
