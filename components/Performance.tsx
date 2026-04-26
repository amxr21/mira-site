import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import DataTable from "@/components/ui/DataTable";
import Bar from "@/components/ui/Bar";

const SCENARIOS = [
  { label: "Both on Hailo NPU",                yolo: "HEF",      depth: "HEF",      fps: "13–20", bar: 100, ideal: true  },
  { label: "Split — one on Hailo, one on CPU", yolo: "HEF/ONNX", depth: "ONNX/HEF", fps: "5–8",   bar: 40,  ideal: false },
  { label: "Both on CPU ONNX",                 yolo: "ONNX",     depth: "ONNX",     fps: "1–2",   bar: 10,  ideal: false },
];

const FLAGS = [
  { flag: "ARDUINO_ENABLED",  vals: "0 / 1",    desc: "0 = dummy sensor readings (all-clear)" },
  { flag: "RECORD_ENABLED",   vals: "0 / 1",    desc: "1 = write annotated AVI to logs/" },
  { flag: "COCO_ENABLED",     vals: "0 / 1",    desc: "1 = tag unknown objects via COCO" },
  { flag: "MOTORS_ENABLED",   vals: "0 / 1",    desc: "0 = keyboard, 1 = autonomous pipeline" },
  { flag: "WINDOWS_MODE",     vals: "0 / 1",    desc: "1 = disable tty/termios, enable VIDEO_SOURCE" },
  { flag: "VIDEO_SOURCE",     vals: "0 / path", desc: "0 = live camera, path = video file" },
  { flag: "HAILO_AVAILABLE",  vals: "auto",     desc: "Auto-detected at boot" },
];

const KEYS = [
  { key: "W / ↑",         action: "FORWARD"    },
  { key: "A / ←",         action: "TURN LEFT"  },
  { key: "D / →",         action: "TURN RIGHT" },
  { key: "Q",              action: "SLOW"       },
  { key: "S / ↓ / Space", action: "STOP"       },
  { key: "Ctrl+C",         action: "Quit"       },
];

const barColor = (s: typeof SCENARIOS[0]): "rust" | "rust-dim" | "rust-faint" =>
  s.ideal ? "rust" : s.bar === 40 ? "rust-dim" : "rust-faint";

export default function Performance() {
  return (
    <Section id="performance" bg="void3">
      <SectionHeader tag="06 — Performance" title="Inference benchmarks & configuration" />

      {/* FPS cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {SCENARIOS.map((s, i) => (
          <div key={s.label} className={`reveal card d${i + 1} p-8 ${s.ideal ? "!border-rust/40" : ""}`}>
            {s.ideal && (
              <div className="font-mono text-[10px] text-rust uppercase tracking-wide4 mb-4">★ Optimal</div>
            )}
            <div className="font-display font-extrabold text-[3.5rem] leading-none text-rust-l mb-1">{s.fps}</div>
            <div className="font-mono text-[10px] text-sand-faint uppercase tracking-wide4 mb-5">FPS</div>
            <div className="mb-5">
              <Bar pct={s.bar} color={barColor(s)} height="sm" />
            </div>
            <div className="font-display font-bold text-[14px] text-white mb-4 leading-snug">{s.label}</div>
            <div className="flex flex-col gap-2">
              {([["YOLO", s.yolo], ["Depth", s.depth]] as [string, string][]).map(([lbl, val]) => (
                <div key={lbl} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-sand-faint w-11">{lbl}</span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 ${val.includes("HEF") ? "bg-rust/[0.18] text-rust-l" : "bg-white/[0.04] text-sand-faint"}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Config + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="reveal d1">
          <h3 className="font-display font-bold text-white text-[1.1rem] mb-2">Config Flags</h3>
          <p className="text-[14px] text-sand-dim mb-4 leading-[1.7]">
            All flags in <code className="font-mono text-[12px] text-rust-l">pipeline/config.py</code>. Nothing else needs changing for a typical run.
          </p>
          <DataTable
            columns={[
              { key: "flag", header: "Flag",   mono: true },
              { key: "vals", header: "Values", render: (r) => <span className="font-mono text-[11px] text-sand-faint">{(r as {vals:string}).vals}</span> },
              { key: "desc", header: "Effect" },
            ]}
            rows={FLAGS as Record<string, unknown>[]}
            minWidth="420px"
          />
        </div>

        <div className="reveal d2">
          <h3 className="font-display font-bold text-white text-[1.1rem] mb-2">Manual Drive Controls</h3>
          <p className="text-[14px] text-sand-dim mb-4 leading-[1.7]">
            When <code className="font-mono text-[12px] text-rust-l">MOTORS_ENABLED = 0</code> (default), keyboard drives the rover.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
            {KEYS.map((k) => (
              <div key={k.key} className="card flex items-center gap-3 px-3.5 py-3">
                <kbd className="font-mono text-[11px] text-rust-l bg-black/50 border-px border-border-h px-2.5 py-1 min-w-[52px] text-center shrink-0">
                  {k.key}
                </kbd>
                <span className="text-[13px] text-sand-dim">{k.action}</span>
              </div>
            ))}
          </div>
          <div className="font-mono text-[10px] text-rust uppercase tracking-wide4 mb-3">Recorded Video Layout</div>
          <div className="bg-black/50 border-px border-border p-4 overflow-x-auto">
            <pre className="font-mono text-[11px] text-sand-faint leading-[1.8] whitespace-pre">{`┌─────────────────────────────┬──────────┐
│  Camera + bbox + velocity   │ Depth    │
│  + mode badge  1280 × 720   │ 320×180  │
├─────────────────────────────┴──────────┤
│  TOF C/LF/RF/LS/RS    pitch/roll/yaw  │
│  LDR / speed          ► NAV CMD       │
│               1280 × 80               │
└───────────────────────────────────────┘
Output: 1280 × 800  XVID AVI → logs/`}</pre>
          </div>
        </div>

      </div>
    </Section>
  );
}
