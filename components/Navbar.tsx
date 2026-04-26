"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

const LINKS = [
  { href: "#overview",     label: "Overview"     },
  { href: "#hardware",     label: "Hardware"      },
  { href: "#ai",           label: "AI Models"     },
  { href: "#pipeline",     label: "Pipeline"      },
  { href: "#architecture", label: "Architecture"  },
  { href: "#performance",  label: "Performance"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={[
        "fixed top-0 left-0 right-0 z-50 h-[72px]",
        "flex items-center justify-between",
        "px-[60px] max-md:px-6",
        "transition-all duration-500",
        scrolled
          ? "bg-nav-scrolled backdrop-blur-md border-b-px border-b-border"
          : "bg-transparent border-b-px border-b-transparent",
      ].join(" ")}>

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 no-underline">
          <span className="w-[10px] h-[10px] rounded-full bg-rust shadow-orb animate-orb-pulse shrink-0" />
          <span className="font-display font-extrabold text-[18px] tracking-wide5 text-white">
            MIRA
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a
            href="https://github.com/amxr21/MIRA"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github flex items-center gap-1.5"
          >
            <Icon name="github" size={14} />
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden text-sand flex items-center"
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </nav>

      {/* Mobile dropdown — fixed outside <nav> so h-[72px] doesn't clip it */}
      {open && (
        <div
          className="fixed top-[72px] left-0 right-0 z-40 w-full flex flex-col md:hidden border-b-px border-b-border"
          style={{ background: "#080507" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="nav-link px-6 py-4 border-b-px border-b-border/50 hover:bg-white/[0.03] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/amxr21/MIRA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 font-mono text-[12px] text-rust-l"
          >
            <Icon name="github" size={14} /> GitHub
          </a>
        </div>
      )}
    </>
  );
}
