import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import DataTable from "@/components/ui/DataTable";

const THREADS = [
  {
    label: "Fast Loop",   hz: "~30 Hz",           thread: "daemon thread",
    steps: ["Arduino.update()", "decide()", "NavigationCommand"],
    desc:  "Sensor polling and navigation decisions run at 30 Hz, decoupled from the slower vision loop.",
  },
  {
    label: "Vision Loop", hz: "8–20 FPS (Hailo) · 1–2 FPS (CPU)", thread: "daemon thread",
    steps: ["Camera frame", "YOLO inference", "Depth inference", "COCO tagging", "fuse()", "display + record"],
    desc:  "AI inference runs as fast as the NPU allows — auto-falls back to ONNX CPU when Hailo is unavailable.",
  },
  {
    label: "Main Loop",   hz: "50 ms tick",        thread: "main thread",
    steps: ["AUTO: send NavigationCommand", "MANUAL: keyboard → command", "Arduino serial write"],
    desc:  "Coordinates output to Arduino. In manual mode, keyboard input overrides autonomous commands.",
  },
];

const SERIAL_FIELDS = [
  { idx: "0–4", name: "tof0–tof4",         desc: "5× TOF distances (m)"       },
  { idx: "5–7", name: "pitch / roll / yaw", desc: "IMU Euler angles (°)"       },
  { idx: "8",   name: "ldr",                desc: "Ambient light, 0.0 – 1.0"  },
  { idx: "9",   name: "ultra_front",         desc: "Front ultrasonic (m)"       },
  { idx: "10",  name: "ultra_rear",          desc: "Rear ultrasonic (m)"        },
  { idx: "11",  name: "speed",               desc: "Current motor speed"        },
  { idx: "12",  name: "tof_ok",              desc: "TOF health flag (0/1)"      },
];

const MODELS = [
  { name: "yolo26n_mars.hef",             backend: "Hailo NPU", input: "416×416", purpose: "Mars terrain detection",  primary: true  },
  { name: "yolo26n_mars.onnx",            backend: "CPU",       input: "640×640", purpose: "Mars YOLO — CPU fallback", primary: false },
  { name: "depth_anything_v2_vits.hef",   backend: "Hailo NPU", input: "224×224", purpose: "Monocular depth map",      primary: true  },
  { name: "depth_anything_v2_small.onnx", backend: "CPU",       input: "224×224", purpose: "Depth — CPU fallback",     primary: false },
  { name: "yolo26n-seg.onnx",             backend: "CPU",       input: "640×640", purpose: "COCO unknown tagging",     primary: false },
];

const COMMANDS = [
  { key: "F", label: "FORWARD"   },
  { key: "S", label: "SLOW"      },
  { key: "L", label: "TURN LEFT" },
  { key: "R", label: "TURN RIGHT"},
  { key: "X", label: "STOP"      },
];

export default function Architecture() {
  return (
    <Section id="architecture" bg="void2">
      <SectionHeader tag="05 — Architecture" title="Three concurrent threads. One coherent system." />

      {/* Thread strip — 3 cols desktop, stacked mobile */}
      <div className="reveal d1 grid grid-cols-1 md:grid-cols-3 border-px border-border mb-14">
        {THREADS.map((t, i) => (
          <div
            key={t.label}
            className={[
              "relative p-8 overflow-hidden",
              i < THREADS.length - 1
                ? "border-b-px border-b-border md:border-b-0 md:border-r-px md:border-r-border"
                : "",
            ].join(" ")}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-glow-h" />

            <div className="flex items-start justify-between gap-2 mb-6">
              <div>
                <div className="font-display font-bold text-[1rem] text-white mb-1">{t.label}</div>
                <div className="font-mono text-[11px] text-rust">{t.hz}</div>
              </div>
              <span className="font-mono text-[9px] text-sand-faint border-px border-border px-2 py-0.5 shrink-0 whitespace-nowrap">
                {t.thread}
              </span>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              {t.steps.map((step, si) => {
                const isLast = si === t.steps.length - 1;
                return (
                  <div key={step} className="flex items-start gap-[10px]">
                    <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isLast ? "bg-rust" : "bg-rust/30"}`} />
                      {!isLast && <div className="w-px h-3 bg-rust/20" />}
                    </div>
                    <span className={`font-mono text-[11px] leading-[1.4] ${isLast ? "text-rust-l" : "text-sand-faint"}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[13px] text-sand-dim leading-[1.7]">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Serial + Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Serial protocol */}
        <div className="reveal d2 bg-black/35 border-px border-border p-8">
          <h3 className="font-display font-bold text-white text-[1.1rem] mb-2">Serial Protocol</h3>
          <p className="text-[14px] text-sand-dim mb-4 leading-[1.7]">
            Arduino → Pi: 13 comma-separated values at 115200 baud, 30 Hz.
          </p>
          <div className="bg-black/50 border-px border-border px-[18px] py-3.5 mb-5 overflow-x-auto">
            <div className="font-mono text-[12px] text-rust-l whitespace-nowrap tracking-wide2">
              tof0, tof1, tof2, tof3, tof4, pitch, roll, yaw, ldr, ultra_front, ultra_rear, speed, tof_ok
            </div>
          </div>
          <div className="flex flex-col mb-6">
            {SERIAL_FIELDS.map((f) => (
              <div key={f.name} className="flex items-start gap-3 py-2.5 border-b-px border-b-border/50">
                <span className="font-mono text-[10px] text-rust/40 w-7 shrink-0 pt-px">{f.idx}</span>
                <span className="font-mono text-[11px] text-rust-l shrink-0 w-[120px] md:w-36">{f.name}</span>
                <span className="text-[12px] md:text-[13px] text-sand-dim">{f.desc}</span>
              </div>
            ))}
          </div>
          <div className="bg-black/40 border-px border-border p-5">
            <div className="font-mono text-[10px] text-rust uppercase tracking-wide4 mb-3">Commands (Pi → Arduino)</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMANDS.map((cmd) => (
                <div key={cmd.key} className="flex items-center gap-2 bg-black/40 border-px border-border px-3 py-1.5">
                  <span className="font-mono font-bold text-[13px] text-rust-l">{cmd.key}</span>
                  <span className="font-mono text-[10px] text-sand-faint">{cmd.label}</span>
                </div>
              ))}
            </div>
            <div className="font-mono text-[11px] text-sand-faint">
              500 ms watchdog — Arduino forces STOP if no command received.
            </div>
          </div>
        </div>

        {/* AI Models table */}
        <div className="reveal d3 bg-black/35 border-px border-border p-8">
          <h3 className="font-display font-bold text-white text-[1.1rem] mb-2">AI Models</h3>
          <p className="text-[14px] text-sand-dim mb-5 leading-[1.7]">
            Hailo HEF for NPU-accelerated inference, ONNX for CPU fallback. Backend auto-detected at boot.
          </p>
          <DataTable
            columns={[
              { key: "name",    header: "Model",   render: (r) => <span className="font-mono text-[11px] text-rust-l block truncate max-w-[130px]" title={(r as {name:string}).name}>{(r as {name:string}).name}</span> },
              { key: "backend", header: "Backend", render: (r) => {
                const m = r as { backend: string; primary: boolean };
                return <span className={`font-mono text-[10px] px-2 py-0.5 border-px ${m.primary ? "bg-rust/[0.18] text-rust-l border-rust/35" : "bg-white/[0.04] text-sand-faint border-white/[0.07]"}`}>{m.backend}</span>;
              }},
              { key: "input",   header: "Input",   mono: true },
              { key: "purpose", header: "Purpose" },
            ]}
            rows={MODELS as Record<string, unknown>[]}
            minWidth="440px"
          />
        </div>

      </div>
    </Section>
  );
}
