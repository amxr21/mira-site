"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Step {
  icon: string;
  name: string;
  detail: string;
  desc: string;
  warn?: boolean;
}

interface PipelineWalkthroughProps {
  steps: Step[];
  autoPlayMs?: number;
  label?: string;
}

export default function PipelineWalkthrough({ steps, autoPlayMs = 2500, label }: PipelineWalkthroughProps) {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => { setActive(idx); setVisible(true); }, 200);
  }, []);

  const prev = () => { setPlaying(false); goTo((active - 1 + steps.length) % steps.length); };
  const next = () => { setPlaying(false); goTo((active + 1) % steps.length); };

  useEffect(() => {
    if (!playing || autoPlayMs <= 0) return;
    timerRef.current = setTimeout(() => goTo((active + 1) % steps.length), autoPlayMs);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, playing, autoPlayMs, steps.length, goTo]);

  const step = steps[active];

  return (
    <div className="relative border-px border-border bg-black/50 p-5 md:p-8">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {label && (
        <div className="font-mono text-[10px] text-rust/60 uppercase tracking-wide5 mb-5">{label}</div>
      )}

      {/* ── Steps: horizontal on md+, vertical on mobile ── */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-0 mb-5">
        {steps.map((s, i) => {
          const isActive = i === active;
          const isPast   = i < active;
          const isNext   = i === active + 1;

          return (
            <div key={s.name} className="flex flex-col md:flex-row md:items-stretch md:flex-1">

              {/* Step cell — equal flex-1 so all 5 are same width on desktop */}
              <button
                onClick={() => { setPlaying(false); goTo(i); }}
                className={[
                  "flex-1 text-left p-3 md:p-4 border-px transition-all duration-300 focus:outline-none w-full",
                  isActive
                    ? "border-border-h bg-rust/[0.10] shadow-card z-10"
                    : isPast
                      ? "border-border bg-black/30 opacity-50"
                      : "border-border bg-black/30 opacity-40 hover:opacity-60",
                ].join(" ")}
              >
                <div className={`text-[20px] mb-2 transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
                  {s.icon}
                </div>
                <div className={`font-display font-bold text-[12px] mb-1 leading-snug transition-colors duration-300 ${isActive ? "text-white" : "text-sand-dim"}`}>
                  {s.name}
                </div>
                <div className={`font-mono text-[10px] leading-[1.5] whitespace-pre-line transition-colors duration-300 ${isActive ? "text-sand-faint" : "text-sand-faint/40"}`}>
                  {s.detail}
                </div>
                {isActive && <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-rust animate-orb-pulse" />}
              </button>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <>
                  {/* Desktop: horizontal centered arrow */}
                  <div className={`hidden md:flex items-center justify-center w-6 shrink-0 transition-colors duration-500 ${isActive ? "text-rust" : "text-rust/20"}`}>
                    <span className={`text-[14px] ${isActive ? "animate-pulse" : ""}`}>›</span>
                  </div>
                  {/* Mobile: vertical centered arrow */}
                  <div className={`md:hidden flex items-center justify-center h-6 transition-colors duration-500 ${isActive ? "text-rust" : "text-rust/20"}`}>
                    <span className={`text-[14px] ${isActive ? "animate-pulse" : ""}`}>↓</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${i <= active ? "bg-rust" : "bg-white/10"}`}
          />
        ))}
      </div>

      {/* Per-step description */}
      <div className="min-h-[72px] transition-opacity duration-200" style={{ opacity: visible ? 1 : 0 }}>
        <p className="text-[13px] md:text-[14px] leading-[1.8] text-sand-dim">
          {step.warn && <span className="text-rust-l font-semibold mr-1">⚠ Key constraint:</span>}
          {step.desc}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t-px border-t-border">
        <div className="font-mono text-[10px] text-sand-faint tracking-wide3">
          Step <span className="text-rust-l">{active + 1}</span> / {steps.length}
          <span className="hidden sm:inline"> · {step.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="font-mono text-[11px] text-sand-dim hover:text-rust-l px-3 py-1.5 border-px border-border hover:border-border-h transition-colors">
            ← Prev
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className={`font-mono text-[11px] px-3 py-1.5 border-px transition-colors ${playing ? "text-rust border-rust/40" : "text-sand-dim border-border hover:text-rust-l hover:border-border-h"}`}
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button onClick={next} className="font-mono text-[11px] text-sand-dim hover:text-rust-l px-3 py-1.5 border-px border-border hover:border-border-h transition-colors">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
