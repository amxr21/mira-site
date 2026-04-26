# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Project

MIRA is a single-page portfolio/documentation site for a Mars rover autonomous navigation system. It is built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Architecture

**Entry point:** `app/page.tsx` — imports and orders all section components. This is the only place section order is defined.

**Section components** (in `components/`): Each maps to one visible page section. They are pure server components unless they need browser APIs (`"use client"` only on `Hero`, `Navbar`, `ScrollObserver`).

**Design system lives entirely in `tailwind.config.ts`** via the plugin API (`addComponents`, `addUtilities`). Do not add CSS classes to `globals.css` — that file exists only for:
- CSS custom properties (`--font-*`) needed by Tailwind's `fontFamily` tokens
- `body::before` noise overlay (SVG pseudo-element — cannot be a Tailwind class)
- `::-webkit-scrollbar` pseudo-selectors
- `@keyframes orbPulse` definition

**Color tokens** — all colours are in `tailwind.config.ts` under `theme.extend.colors`:
- `rust` / `rust-l` / `rust-ll` — primary accent palette
- `sand` / `sand-dim` / `sand-faint` — text palette
- `void` / `void-2` / `void-3` — background levels
- `border` / `border-h` — border colours

Changing a colour value in `tailwind.config.ts` propagates everywhere automatically. **Never hardcode hex values in component files.**

**Reusable Tailwind component classes** (defined in the plugin, usable as className strings):
- `.card` — dark glass card with hover lift
- `.model-card` / `.mc-spec` — AI model display cards
- `.badge` + `.badge-stop/turn/slow/forward` — priority action badges
- `.btn-rust` / `.btn-outline` — CTA buttons
- `.nav-link` / `.nav-github` / `.footer-nav-link` — navigation links
- `.terminal-box` — dark terminal-style container with corner brackets
- `.table-wrap` — horizontally scrollable table wrapper
- `.section-rule` — growing horizontal rule for section headers
- `.aff-logo` / `.aff-divider` — affiliations bar elements
- `.conv-step` — pipeline step cells with `→` connector pseudo-element
- `.choice-box` — model selection rationale boxes
- `.reveal` / `.d1–.d4` — scroll-reveal animation with stagger delays
- `.corner-tl/tr/bl/br` — decorative corner bracket overlays
- `.border-px` / `.border-t-px` etc. — 0.5px border utilities

**Scroll reveal** — `ScrollObserver` (`"use client"`) attaches an `IntersectionObserver` to every `.reveal` element and adds `.visible` when in view. Elements start at `opacity:0, translateY(32px)` and animate to visible. Use `.d1`–`.d4` for stagger delays.

**Section numbering:** 01 Overview → 02 Hardware → 03 AI Models → 04 Pipeline → 05 Architecture → 06 Performance

**Fonts** loaded via Google Fonts in `app/layout.tsx` (`<link>`), exposed as CSS variables, consumed via Tailwind `font-display`, `font-body`, `font-mono`.
