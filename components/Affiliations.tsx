// fs maps to a Tailwind arbitrary text size class
const AFFS = [
  { abbr: "UOS",    fs: "text-[14px]", main: "University of Sharjah",        sub: "College of Computing and Informatics · Computer Engineering" },
  { abbr: "SDP2",   fs: "text-[11px]", main: "Senior Design Project 2",       sub: "Spring 2025 / 2026 · Supervisor: Dr. Sohaib Majzoub"        },
  { abbr: "SAASST", fs: "text-[10px]", main: "Sharjah Academy for Astronomy", sub: "Space Science & Technology · Scientific Collaboration"       },
];

export default function Affiliations() {
  return (
    <section className="bg-void-2 py-14 px-6 border-b-px border-b-border">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-16 flex-wrap max-md:gap-8">
        {AFFS.map((a, i) => (
          <div key={a.abbr} className="contents">
            <div className="reveal flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div className={`aff-logo ${a.fs}`}>{a.abbr}</div>
              <div>
                <div className="font-display font-bold text-[14px] text-sand leading-[1.3]">{a.main}</div>
                <div className="font-mono text-[11px] text-sand-faint mt-[3px]">{a.sub}</div>
              </div>
            </div>
            {i < AFFS.length - 1 && <div className="w-px h-10 bg-border max-md:hidden" />}
          </div>
        ))}
      </div>
    </section>
  );
}
