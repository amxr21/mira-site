import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// ─── All colour tokens reference CSS custom properties defined in globals.css.
//     To retheme the site: edit :root vars in globals.css — Tailwind picks them
//     up automatically via these var() references.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navbar needs literal rgba — CSS var() breaks Tailwind's /opacity modifier syntax
        nav: {
          scrolled:  "rgba(8,5,7,0.92)",
          dropdown:  "rgba(8,5,7,0.97)",
        },
        rust: {
          DEFAULT: "var(--c-rust)",
          l:       "var(--c-rust-l)",
          ll:      "var(--c-rust-ll)",
        },
        sand: {
          DEFAULT: "var(--c-sand)",
          dim:     "var(--c-sand-dim)",
          faint:   "var(--c-sand-faint)",
        },
        void: {
          DEFAULT: "var(--c-void)",
          2:       "var(--c-void2)",
          3:       "var(--c-void3)",
          800:     "var(--c-void2)",  // alias used in scrollbar
        },
        border: {
          DEFAULT: "var(--c-border)",
          h:       "var(--c-border-h)",
        },
        status: {
          green: "var(--c-green)",
          red:   "var(--c-red)",
          blue:  "var(--c-blue)",
          amber: "var(--c-amber)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
        "3xs": ["9px",  { lineHeight: "1.4" }],
      },
      letterSpacing: {
        wide2:  "0.12em",
        wide3:  "0.18em",
        wide4:  "0.20em",
        wide5:  "0.25em",
        wide6:  "0.30em",
        wide7:  "0.35em",
      },
      borderWidth: { px: "0.5px" },
      animation: {
        "orb-pulse": "orbPulse 3s ease infinite",
      },
      keyframes: {
        orbPulse: {
          "0%, 100%": { opacity: "1",   transform: "scale(1)"    },
          "50%":      { opacity: "0.6", transform: "scale(0.85)" },
        },
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(201,74,24,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,74,24,0.04) 1px,transparent 1px)",

        "glow-h":
          "linear-gradient(90deg,transparent,var(--c-rust),transparent)",
        "scroll-line":
          "linear-gradient(to bottom,transparent,var(--c-rust))",
        "radial-hero":
          "radial-gradient(ellipse,rgba(201,74,24,0.09) 0%,transparent 65%)",
        "radial-section":
          "radial-gradient(ellipse 80% 70% at 50% 50%,rgba(201,74,24,0.07) 0%,transparent 70%)",
        "radial-top":
          "radial-gradient(ellipse 100% 60% at 50% 0%,rgba(201,74,24,0.07) 0%,transparent 70%)",
        "radial-bottom":
          "radial-gradient(ellipse 100% 60% at 50% 100%,rgba(201,74,24,0.07) 0%,transparent 70%)",
      },
      backgroundSize: { "grid-64": "64px 64px" },
      boxShadow: {
        orb:       "0 0 12px var(--c-rust)",
        "orb-sm":  "0 0 8px var(--c-rust)",
        "rust-glow":"0 0 60px rgba(201,74,24,0.50)",
        card:      "0 20px 60px rgba(201,74,24,0.10)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      // ── Scroll-reveal ─────────────────────────────────────
      addUtilities({
        ".reveal": {
          opacity: "0",
          transform: "translateY(32px)",
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        },
        ".reveal.visible": { opacity: "1", transform: "none" },
        ".d1": { transitionDelay: "0.08s" },
        ".d2": { transitionDelay: "0.16s" },
        ".d3": { transitionDelay: "0.24s" },
        ".d4": { transitionDelay: "0.32s" },
      });

      // ── 0.5px border helpers ───────────────────────────────
      addUtilities({
        ".border-px":   { borderWidth:       "0.5px" },
        ".border-t-px": { borderTopWidth:    "0.5px" },
        ".border-b-px": { borderBottomWidth: "0.5px" },
        ".border-r-px": { borderRightWidth:  "0.5px" },
        ".border-l-px": { borderLeftWidth:   "0.5px" },
      });

      // ── Corner bracket decorations ─────────────────────────
      addUtilities({
        ".corner-tl": { position:"absolute", top:"8px",    left:"8px",    width:"10px", height:"10px", borderColor:"rgba(201,74,24,0.40)", borderStyle:"solid", borderWidth:"1px 0 0 1px" },
        ".corner-tr": { position:"absolute", top:"8px",    right:"8px",   width:"10px", height:"10px", borderColor:"rgba(201,74,24,0.40)", borderStyle:"solid", borderWidth:"1px 1px 0 0" },
        ".corner-bl": { position:"absolute", bottom:"8px", left:"8px",    width:"10px", height:"10px", borderColor:"rgba(201,74,24,0.40)", borderStyle:"solid", borderWidth:"0 0 1px 1px" },
        ".corner-br": { position:"absolute", bottom:"8px", right:"8px",   width:"10px", height:"10px", borderColor:"rgba(201,74,24,0.40)", borderStyle:"solid", borderWidth:"0 1px 1px 0" },
      });

      addComponents({
        // ── Buttons ──────────────────────────────────────────
        ".btn-primary": {
          display: "inline-block", textDecoration: "none",
          background: "var(--c-rust)", color: "#fff",
          padding: "14px 32px",
          fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em",
          transition: "background 0.25s",
          "&:hover": { background: "var(--c-rust-l)" },
        },
        ".btn-secondary": {
          display: "inline-block", textDecoration: "none",
          border: "0.5px solid rgba(232,213,183,0.20)", color: "var(--c-sand-dim)",
          padding: "14px 32px", background: "none",
          fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.10em",
          transition: "border-color 0.25s, color 0.25s",
          "&:hover": { borderColor: "var(--c-border-h)", color: "var(--c-rust-l)" },
        },

        // ── Cards ─────────────────────────────────────────────
        ".card": {
          background: "rgba(0,0,0,0.38)",
          border: "0.5px solid var(--c-border)",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          "&:hover": {
            borderColor: "var(--c-border-h)",
            transform: "translateY(-4px)",
            boxShadow: "0 20px 60px rgba(201,74,24,0.10)",
          },
        },
        ".model-card": {
          background: "rgba(0,0,0,0.45)",
          border: "0.5px solid var(--c-border)",
          padding: "36px", position: "relative", overflow: "hidden",
          transition: "border-color 0.35s",
          "&:hover": { borderColor: "var(--c-border-h)" },
          "&.primary": { borderColor: "rgba(201,74,24,0.30)" },
        },
        ".mc-spec": {
          background: "rgba(0,0,0,0.40)",
          border: "0.5px solid rgba(201,74,24,0.12)",
          padding: "12px 14px",
        },

        // ── Nav links ─────────────────────────────────────────
        ".nav-link": {
          fontFamily: "var(--font-mono)", fontSize: "12px",
          letterSpacing: "0.12em", color: "var(--c-sand-dim)",
          textDecoration: "none", transition: "color 0.2s",
          "&:hover": { color: "var(--c-rust-ll)" },
        },
        ".nav-github": {
          fontFamily: "var(--font-mono)", fontSize: "12px",
          letterSpacing: "0.10em", color: "var(--c-rust-l)",
          border: "0.5px solid var(--c-border-h)", padding: "8px 18px",
          textDecoration: "none", transition: "background 0.25s",
          "&:hover": { background: "rgba(201,74,24,0.10)" },
        },
        ".footer-link": {
          fontFamily: "var(--font-mono)", fontSize: "11px",
          letterSpacing: "0.10em", color: "var(--c-sand-faint)",
          textDecoration: "none", textTransform: "capitalize",
          transition: "color 0.2s",
          "&:hover": { color: "var(--c-rust-l)" },
        },

        // ── Badges ────────────────────────────────────────────
        ".badge": {
          display: "inline-block",
          fontFamily: "var(--font-mono)", fontSize: "11px",
          letterSpacing: "0.10em", padding: "4px 10px",
        },
        ".badge-stop":    { background:"rgba(201,74,24,0.18)",  color:"var(--c-red)",   border:"0.5px solid rgba(201,74,24,0.35)"  },
        ".badge-turn":    { background:"rgba(56,100,200,0.12)", color:"var(--c-blue)",  border:"0.5px solid rgba(56,100,200,0.25)" },
        ".badge-slow":    { background:"rgba(180,140,30,0.12)", color:"var(--c-amber)", border:"0.5px solid rgba(180,140,30,0.25)" },
        ".badge-forward": { background:"rgba(50,160,100,0.12)", color:"var(--c-green)", border:"0.5px solid rgba(50,160,100,0.25)" },

        // ── Table wrapper ─────────────────────────────────────
        ".table-wrap": {
          overflowX: "auto",
          border: "0.5px solid var(--c-border)",
        },

        // ── Terminal / diagram box ────────────────────────────
        ".terminal-box": {
          position: "relative", overflowX: "auto",
          background: "rgba(0,0,0,0.50)",
          border: "0.5px solid var(--c-border)",
          padding: "28px 36px",
        },

        // ── Affiliations ──────────────────────────────────────
        ".aff-logo": {
          width:"44px", height:"44px", flexShrink:"0",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"var(--font-display)", fontWeight:"800", fontSize:"13px",
          color:"var(--c-rust-l)",
          border:"0.5px solid var(--c-border-h)",
        },

        // ── AI pipeline step cells ────────────────────────────
        ".conv-step": {
          background:"rgba(0,0,0,0.40)",
          border:"0.5px solid var(--c-border)",
          padding:"20px 16px", textAlign:"center", position:"relative",
        },

        // ── Choice boxes ──────────────────────────────────────
        ".choice-box": {
          background:"rgba(0,0,0,0.35)",
          border:"0.5px solid var(--c-border)",
          padding:"24px",
        },

        // ── Section divider rule ──────────────────────────────
        ".rule": {
          flex:"1", height:"0.5px", background:"var(--c-border)",
        },
      });
    }),
  ],
};

export default config;
