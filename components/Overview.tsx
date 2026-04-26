import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";

// ── Data ─────────────────────────────────────────────────────────────────────

const STREAMS = [
  { icon: "◈", label: "Vision",   items: ["YOLO26n-seg Mars terrain detection", "DepthAnything V2 ViT-S depth map", "COCO unknown object tagging"] },
  { icon: "◉", label: "Sensing",  items: ["5× VL53L1X TOF (±2 mm, 1.5 m)", "MPU-6050 IMU — pitch / roll / yaw", "HC-SR04 ultrasonic × 2", "LDR ambient light sensor"] },
  { icon: "◎", label: "Decision", items: ["10-priority navigation waterfall", "Motion velocity tracking", "LDR-weighted depth fusion"] },
  { icon: "◐", label: "Control",  items: ["Arduino Mega 2560", "30 Hz sensor + command loop", "500 ms watchdog failsafe"] },
];

// Each layer of the architecture diagram
const LAYERS = [
  {
    label: "PERCEPTION",
    accent: "rgba(201,74,24,0.18)",
    border: "border-rust/20",
    nodes: [
      { name: "Innomaker IMX415",      sub: "1280×720 · 30 FPS · USB 3.0",           highlight: false },
      { name: "VL53L1X × 5 TOF",       sub: "C · LF · RF · LS · RS zones",            highlight: false },
      { name: "MPU-6050 IMU",           sub: "Pitch / Roll / Yaw",                     highlight: false },
      { name: "LDR",                    sub: "Ambient light sensor",                    highlight: false },
      { name: "HC-SR04 Ultrasonic × 2", sub: "Front + Rear bumper",                   highlight: false },
    ],
  },
  {
    label: "PROCESSING — RASPBERRY PI 5",
    accent: "rgba(201,74,24,0.10)",
    border: "border-rust/25",
    nodes: [
      { name: "Hailo-8L NPU · AI HAT+", sub: "13 TOPS · M.2 Interface",              highlight: true  },
      { name: "YOLO26n-seg",            sub: "Mars terrain · 416×416 HEF · 8–15 ms", highlight: false },
      { name: "DepthAnything V2 ViT-S", sub: "224×224 HEF · ~31 ms",                 highlight: false },
      { name: "Sensor Fusion Layer",    sub: "TOF · depth · IMU · LDR → FusionResult", highlight: false },
      { name: "Decision Layer",         sub: "10-priority waterfall → NavigationCommand", highlight: false },
    ],
  },
  {
    label: "CONTROL",
    accent: "rgba(201,74,24,0.06)",
    border: "border-rust/15",
    nodes: [
      { name: "Arduino Mega 2560",  sub: "115200 baud · 30Hz sensor TX",  highlight: false },
      { name: "Safety Logic",       sub: "Bumper → instant PWM cut",       highlight: true  },
      { name: "Watchdog",           sub: "500 ms timeout → STOP",          highlight: false },
      { name: "PWM Generator",      sub: "F / S / L / R / X → L298N",     highlight: false },
    ],
  },
  {
    label: "ACTUATION",
    accent: "rgba(201,74,24,0.04)",
    border: "border-rust/10",
    nodes: [
      { name: "L298N × 2",           sub: "Dual H-Bridge motor drivers",   highlight: false },
      { name: "DC Gear Motors × 4",  sub: "Differential drive · encoders", highlight: false },
      { name: "Power System",        sub: "7.4V Li-Po → 5V DC-DC",         highlight: false },
      { name: "Aluminum Chassis",    sub: "37.5×24×10.5 cm · ~2.4 kg",     highlight: false },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Node({ name, sub, highlight }: { name: string; sub: string; highlight: boolean }) {
  return (
    <div className={[
      "rounded-[3px] px-3 py-2.5 border-px",
      highlight
        ? "bg-rust/[0.14] border-rust/40"
        : "bg-black/50 border-rust/20",
    ].join(" ")}>
      <div className={`font-display font-semibold text-[12px] leading-snug ${highlight ? "text-rust-ll" : "text-sand"}`}>
        {name}
      </div>
      <div className="font-mono text-[10px] text-sand-faint mt-0.5 leading-snug">{sub}</div>
    </div>
  );
}

// Horizontal arrow between layers (desktop)
function HArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center w-8 shrink-0 self-center">
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
        <line x1="0" y1="8" x2="20" y2="8" stroke="#c94a18" strokeWidth="1.5"/>
        <path d="M18 4L24 8L18 12" fill="none" stroke="#c94a18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// Vertical arrow between layers (mobile)
function VArrow() {
  return (
    <div className="flex lg:hidden items-center justify-center h-8">
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
        <line x1="8" y1="0" x2="8" y2="20" stroke="#c94a18" strokeWidth="1.5"/>
        <path d="M4 18L8 24L12 18" fill="none" stroke="#c94a18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function Overview() {
  return (
    <Section id="overview" bg="void2">
      <SectionHeader
        tag="01 — Overview"
        title="From pixels to motor commands — in real time"
        description="MIRA implements a four-layer architecture where perception, processing, control, and actuation are cleanly separated. Visual AI inference is decoupled from sensor-driven decisions, so emergency stops are never blocked by slow inference cycles."
      />

      {/* ── Architecture Diagram ─────────────────────────────────────────── */}
      <div className="reveal d1 mb-14 relative border-px border-border bg-black/40 p-5 md:p-8">
        {/* corner brackets */}
        <div className="corner-tl" /><div className="corner-tr" />
        <div className="corner-bl" /><div className="corner-br" />

        {/* Layers — row on lg, column on mobile */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {LAYERS.map((layer, li) => (
            <div key={layer.label} className="flex flex-col lg:flex-row items-stretch flex-1 min-w-0">

              {/* Layer card */}
              <div
                className={`flex-1 rounded-sm border-px ${layer.border} p-3 md:p-4 flex flex-col gap-2`}
                style={{ background: layer.accent }}
              >
                {/* Layer label */}
                <div className="font-mono text-[9px] text-rust/60 uppercase tracking-[0.18em] mb-1 text-center">
                  {layer.label}
                </div>
                {/* Nodes */}
                <div className="flex flex-col gap-1.5">
                  {layer.nodes.map((node) => (
                    <Node key={node.name} {...node} />
                  ))}
                </div>
              </div>

              {/* Arrow to next layer */}
              {li < LAYERS.length - 1 && (
                <>
                  <HArrow />
                  <VArrow />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Encoder feedback label */}
        <div className="mt-3 text-center">
          <span className="font-mono text-[9px] text-sand-faint/40 tracking-wide3">
            ↺ encoder feedback (Arduino ← motors)
          </span>
        </div>
      </div>

      {/* ── Stream cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STREAMS.map((s, i) => (
          <div key={s.label} className={`reveal card d${i + 1} p-7`}>
            <div className="font-mono text-[22px] text-rust mb-4">{s.icon}</div>
            <h3 className="font-display font-bold text-[1rem] text-white mb-3">{s.label}</h3>
            <ul className="flex flex-col gap-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] text-sand-dim">
                  <Icon name="triangle-right" size={10} className="text-rust/50 mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
