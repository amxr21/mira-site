"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Step {
  icon: string;
  name: string;
  detail: string;     // compact 3-line summary shown inside the step cell
  desc: string;       // full description shown in the bottom panel
  warn?: boolean;     // show ⚠ accent
}

interface PipelineWalkthroughProps {
  steps: Step[];
  autoPlayMs?: number;  // ms between auto-advances; 0 = no auto-play
  label?: string;
}

export default function PipelineWalkthrough({
  steps,
  autoPlayMs = 2500,
  label,
}: PipelineWalkthroughProps) {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true); // drives fade-out/in on desc change
  const [playing, setPlaying] = useState(true);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      setVisible(true);
    }, 200);
  }, []);

  const prev = () => { setPlaying(false); goTo((active - 1 + steps.length) % steps.length); };
  const next = () => { setPlaying(false); goTo((active + 1) % steps.length); };

  // Auto-advance
  useEffect(() => {
    if (!playing || autoPlayMs <= 0) return;
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % steps.length);
    }, autoPlayMs);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, playing, autoPlayMs, steps.length, goTo]);

  const step = steps[active];

  return (
    <div className="relative border-px border-border bg-black/50 p-6 md:p-9 overflow-hidden">
      {/* Corner brackets */}
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Header row */}
      {label && (
        <div className="font-mono text-2xs text-rust uppercase tracking-wide5 mb-6 opacity-60">{label}</div>
      )}

      {/* ── Step cells ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-0 mb-6">
        {steps.map((s, i) => {
          const isActive = i === active;
          const isPast   = i < active;
          const isNext   = i === active + 1;

          return (
            <div key={s.name} className="flex flex-col md:flex-row items-stretch flex-1 min-w-0">

              {/* Step cell */}
              <button
                onClick={() => { setPlaying(false); goTo(i); }}
                className={[
                  "flex-1 text-left p-4 border-px transition-all duration-300 cursor-pointer min-w-0",
                  "focus:outline-none",
                  isActive
                    ? "border-border-h bg-rust/[0.10] scale-[1.02] shadow-card z-10"
                    : isPast
                      ? "border-border bg-black/30 opacity-50"
                      : "border-border bg-black/30 opacity-40 hover:opacity-60",
                ].join(" ")}
              >
                {/* Icon with entrance animation when active */}
                <div
                  className={[
                    "text-[22px] mb-2 transition-transform duration-300",
                    isActive ? "scale-110" : "scale-100",
                  ].join(" ")}
                  key={isActive ? `icon-${i}-active` : `icon-${i}`}
                >
                  {s.icon}
                </div>

                {/* Step name */}
                <div className={[
                  "font-display font-bold text-[13px] mb-1 transition-colors duration-300",
                  isActive ? "text-white" : "text-sand-dim",
                ].join(" ")}>
                  {s.name}
                </div>

                {/* Compact detail */}
                <div className={[
                  "font-mono text-[10px] leading-[1.55] whitespace-pre-line transition-colors duration-300",
                  isActive ? "text-sand-faint" : "text-sand-faint/50",
                ].join(" ")}>
                  {s.detail}
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="mt-3 w-1.5 h-1.5 rounded-full bg-rust animate-orb-pulse" />
                )}
              </button>

              {/* Arrow connector — desktop horizontal, mobile vertical */}
              {i < steps.length - 1 && (
                <>
                  {/* Desktop → */}
                  <div className={[
                    "hidden md:flex items-center justify-center w-7 shrink-0 transition-colors duration-500",
                    isNext || isActive ? "text-rust" : "text-rust/25",
                  ].join(" ")}>
                    <span className={[
                      "text-[16px] transition-all duration-300",
                      isActive ? "animate-pulse" : "",
                    ].join(" ")}>
                      →
                    </span>
                  </div>
                  {/* Mobile ↓ */}
                  <div className={[
                    "md:hidden flex items-center justify-center h-7 transition-colors duration-500",
                    isNext || isActive ? "text-rust" : "text-rust/25",
                  ].join(" ")}>
                    <span className={["text-[16px]", isActive ? "animate-pulse" : ""].join(" ")}>↓</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────────── */}
      <div className="flex gap-1.5 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={[
              "h-[2px] flex-1 rounded-full transition-all duration-500",
              i <= active ? "bg-rust" : "bg-white/10",
            ].join(" ")}
          />
        ))}
      </div>

      {/* ── Per-step description — fades between steps ──────────────────────── */}
      <div
        className="min-h-[80px] transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className={[
          "text-[14px] leading-[1.8]",
          step.warn ? "text-sand-dim" : "text-sand-dim",
        ].join(" ")}>
          {step.warn && (
            <span className="text-rust-l font-semibold mr-1">⚠ Key constraint:</span>
          )}
          {step.desc}
        </p>
      </div>

      {/* ── Controls ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t-px border-t-border">

        {/* Step counter */}
        <div className="font-mono text-2xs text-sand-faint tracking-wide3">
          Step <span className="text-rust-l">{active + 1}</span> / {steps.length}
          {" · "}
          <span className="text-sand-faint">{step.name}</span>
        </div>

        {/* Prev / Play-Pause / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="font-mono text-[11px] text-sand-dim hover:text-rust-l transition-colors px-3 py-1.5 border-px border-border hover:border-border-h"
          >
            ← Prev
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className={[
              "font-mono text-[11px] px-3 py-1.5 border-px transition-colors",
              playing
                ? "text-rust border-rust/40 hover:border-border-h"
                : "text-sand-dim border-border hover:border-border-h hover:text-rust-l",
            ].join(" ")}
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>

          <button
            onClick={next}
            className="font-mono text-[11px] text-sand-dim hover:text-rust-l transition-colors px-3 py-1.5 border-px border-border hover:border-border-h"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
