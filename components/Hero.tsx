"use client";

import { useEffect, useRef } from "react";
import Btn from "@/components/ui/Btn";
import Icon from "@/components/ui/Icon";

const STATS = [
  { value: "20fps", label: "Hailo NPU"   },
  { value: "30Hz",  label: "Sensor Loop" },
  { value: "10×",   label: "NPU Speedup" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.0,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.25 + 0.04,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,213,183,${s.o})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[100px] pb-16 md:px-[60px] md:pt-[120px] md:pb-[80px] overflow-hidden"
    >
      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-55 pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 bg-hero-grid bg-grid-64 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[min(900px,150vw)] h-[min(900px,150vw)] bg-radial-hero rounded-full pointer-events-none"
        style={{ top: "-20%" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[860px]">

        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 border-px border-border-h px-4 py-[7px] mb-8 font-mono text-[11px] md:text-[12px] tracking-wide4 text-rust-ll">
          <span className="w-[7px] h-[7px] rounded-full bg-rust animate-orb-pulse shrink-0" />
          <span className="max-sm:hidden">Autonomous · Vision · Navigation · AI-Powered</span>
          <span className="sm:hidden">AI-Powered Rover</span>
        </div>

        {/* Title — clamp keeps it readable at all sizes */}
        <h1 className="reveal d1 font-display font-extrabold text-[clamp(3.5rem,14vw,10rem)] leading-[0.95] tracking-[-0.03em] text-white mb-3">
          MI<span className="text-rust shadow-rust-glow">R</span>A
        </h1>

        {/* Tagline */}
        <p className="reveal d2 font-display text-[clamp(0.7rem,2.5vw,1rem)] tracking-[0.2em] md:tracking-wide6 text-sand-dim uppercase mb-5">
          Mars Intelligent Rover Autonomy
        </p>

        {/* Description */}
        <p className="reveal d2 text-[0.95rem] md:text-[1.05rem] text-sand-dim w-full max-w-[600px] mx-auto leading-[1.8] mb-10">
          A real-time autonomous vision and navigation pipeline fusing custom Mars-trained YOLO,
          monocular depth estimation, five time-of-flight sensors, and IMU data — running on a
          Raspberry Pi 5 with a Hailo-8L NPU accelerating inference at up to 20 FPS.
        </p>

        {/* CTA */}
        <div className="reveal d3 flex flex-wrap gap-3 justify-center mb-14">
          <Btn href="https://github.com/amxr21/MIRA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Icon name="github" size={16} /> View on GitHub
          </Btn>
          <Btn variant="secondary" href="#overview" className="flex items-center gap-2">
            Explore System <Icon name="arrow-down" size={16} />
          </Btn>
        </div>

        {/* Stat bar */}
        <div className="reveal d4 grid grid-cols-3 border-px border-border w-full max-w-[480px] mx-auto">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                "text-center py-4 px-2 md:py-5 md:px-4",
                i < STATS.length - 1 ? "border-r-px border-r-border" : "",
              ].join(" ")}
            >
              <div className="font-display font-extrabold text-[1.4rem] md:text-[1.8rem] text-rust-l leading-none mb-1">
                {s.value}
              </div>
              <div className="font-mono text-[9px] md:text-[10px] tracking-wide3 text-sand-faint uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-35">
        <div className="w-px h-10 bg-scroll-line" />
      </div>
    </section>
  );
}
