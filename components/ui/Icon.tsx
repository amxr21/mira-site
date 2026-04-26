// Unified icon set — all icons used across the site in one place.
// Usage: <Icon name="arrow-right" className="text-rust" />
// To add a new icon: add a case in the switch below.

interface IconProps {
  name: keyof typeof ICONS;
  className?: string;
  size?: number;
}

const ICONS = {
  "arrow-right": (
    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "arrow-down": (
    <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "arrow-up": (
    <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "external": (
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "github": (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "menu": (
    <>
      <line x1="3" y1="6" x2="21" y2="6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "x": (
    <>
      <line x1="18" y1="6" x2="6" y2="18" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "chevron-right": (
    <path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "dot": (
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  ),
  "web": (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "mail": (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.5" />
      <path d="M2 8l10 6 10-6" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  "linkedin": (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" strokeWidth="1.5" />
    </>
  ),
  "triangle-right": (
    <polygon points="6,4 20,12 6,20" fill="currentColor" />
  ),
};

export default function Icon({ name, className = "", size = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export type IconName = keyof typeof ICONS;
