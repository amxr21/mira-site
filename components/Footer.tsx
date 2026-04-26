import Btn from "@/components/ui/Btn";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

const NAV_LINKS = ["#overview", "#hardware", "#ai", "#pipeline", "#architecture", "#performance"];

// ── Personal links — uncomment and fill in to add your own ────────────────
const PERSONAL_LINKS: { label: string; href: string; icon: IconName; sub: string }[] = [
  // { label: "ammar.dev",       href: "https://yourwebsite.com",            icon: "web",      sub: "Personal website"    },
  // { label: "LinkedIn",        href: "https://linkedin.com/in/yourhandle", icon: "linkedin", sub: "Professional profile" },
  // { label: "Research Paper",  href: "https://arxiv.org/abs/your-paper",   icon: "external", sub: "MIRA — SDP2 2026"    },
  // { label: "hi@ammar.dev",    href: "mailto:hi@ammar.dev",                icon: "mail",     sub: "Get in touch"        },
];

export default function Footer() {
  return (
    <>
      {/* ── Research & personal links ────────────────────────────────────────── */}
      <section className="bg-void-3 py-16 px-6 md:py-[80px] md:px-[60px] border-t-px border-t-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[11px] text-rust uppercase tracking-wide5 whitespace-nowrap">Research & Links</span>
            <div className="rule" />
          </div>

          {PERSONAL_LINKS.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PERSONAL_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card flex items-center gap-3 p-4 group"
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-rust/[0.12] text-rust shrink-0">
                    <Icon name={l.icon} size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-[14px] text-white group-hover:text-rust-l transition-colors truncate">{l.label}</div>
                    <div className="font-mono text-[11px] text-sand-faint mt-0.5 truncate">{l.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="border-px border-border border-dashed p-8 text-center max-w-xl mx-auto">
              <div className="font-mono text-[11px] text-rust/50 uppercase tracking-wide4 mb-3">Coming soon</div>
              <p className="text-[14px] text-sand-faint leading-[1.7]">
                Personal website, research papers, and future work links will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-void-3 bg-radial-section py-20 px-6 md:py-[140px] md:px-[60px] text-center overflow-hidden">
        <div className="relative max-w-[800px] mx-auto">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 border-px border-border-h px-4 py-1.5 mb-8 font-mono text-[11px] text-rust-ll uppercase tracking-wide4">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-ll shrink-0 animate-orb-pulse" />
              Open Source
            </div>

            <h2 className="font-display font-extrabold text-[clamp(2rem,6vw,4.5rem)] text-white leading-[1.05] mb-5">
              Explore the full codebase
            </h2>

            <p className="text-[0.95rem] md:text-[1rem] text-sand-dim max-w-[520px] mx-auto leading-[1.85] mb-11">
              Arduino firmware, Python pipeline, ONNX model configs, hardware test sketches,
              and a Flask streaming dashboard — all in one repo.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <Btn href="https://github.com/amxr21/MIRA" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Icon name="github" size={16} /> github.com/amxr21/MIRA
              </Btn>
              <Btn variant="secondary" href="#" className="flex items-center justify-center gap-2">
                <Icon name="arrow-up" size={16} /> Back to top
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer bar ───────────────────────────────────────────────────────── */}
      <footer className="border-t-px border-t-border bg-void px-6 py-6 md:px-[60px] md:py-7">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-rust shadow-orb-sm" />
            <span className="font-display font-extrabold text-[14px] tracking-wide5 text-sand">MIRA</span>
          </div>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex gap-7">
            {NAV_LINKS.map((href) => (
              <a key={href} href={href} className="footer-link">
                {href.replace("#", "")}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-[10px] text-sand/[0.18] tracking-wide2">
            University of Sharjah · SAASST · SDP2 2025/2026
          </div>
        </div>
      </footer>
    </>
  );
}
