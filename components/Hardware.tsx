import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import DataTable from "@/components/ui/DataTable";

const HARDWARE = [
  {
    category: "Compute", icon: "⬡",
    items: [
      { part: "Raspberry Pi 5",           role: "ARM Cortex-A76 quad-core 2.4 GHz. Runs full Python vision pipeline, AI inference, sensor fusion, and navigation decisions." },
      { part: "Hailo-8L M.2 NPU (AI HAT+)", role: "13 TOPS dedicated neural processing unit. Accelerates YOLO + Depth inference from 1–3 FPS (CPU) to 13–20 FPS." },
      { part: "Arduino Mega 2560",         role: "ATmega2560 at 16 MHz. Reads all sensors at 30 Hz, transmits CSV upstream, executes motor PWM commands." },
    ],
  },
  {
    category: "Sensing", icon: "◈",
    items: [
      { part: "VL53L1X × 5 (TOF Laser)", role: "±2 mm accuracy out to 1.5 m. Covers center-front, left-front, right-front, left-side, right-side zones. I²C with XSHUT address assignment." },
      { part: "MPU-6050 IMU",             role: "6-axis accelerometer and gyroscope. Provides pitch, roll, yaw for tilt detection and slope avoidance logic." },
      { part: "HC-SR04 × 2",              role: "Ultrasonic front + rear bumper fallback. Triggers Arduino-level emergency stop independently of the Pi pipeline." },
      { part: "LDR photoresistor",         role: "Normalized 0–1 on A0. Dynamically shifts depth model trust vs. physical TOF weighting in darkness." },
    ],
  },
  {
    category: "Vision, Drive & Power", icon: "◎",
    items: [
      { part: "Innomaker IMX415 (USB 3.0)",       role: "Sony 4K CMOS sensor. 1280×720 @ 30 FPS for inference. Low-light down to 0.4 Lux with built-in ISP." },
      { part: "DC Gear Motors × 4 + L298N × 2",   role: "High-torque differential drive. Dual H-bridge drivers with encoder feedback. Software speed-limited to protect drivetrain." },
      { part: "7.4V 2200mAh Li-Po + DC-DC Buck",  role: "Regulated 5V rail. Inline 10A fuse. Bidirectional 5V↔3.3V logic level shifter between Arduino and Pi GPIO." },
    ],
  },
];

const PIN_ROWS = [
  { signal: "TOF XSHUT 0–4",               pin: "D38–D42"           },
  { signal: "TOF I²C",                      pin: "SDA / SCL"         },
  { signal: "Ultrasonic Front TRIG / ECHO", pin: "D24 / D25"         },
  { signal: "Ultrasonic Rear TRIG / ECHO",  pin: "D29 / D28"         },
  { signal: "IMU (MPU-6050)",               pin: "SDA / SCL"         },
  { signal: "LDR",                           pin: "A0"                },
  { signal: "Motor ENA / ENB (PWM)",        pin: "D3 / D9"           },
  { signal: "Motor IN1–IN4",                pin: "D5 / D6 / D7 / D8" },
];

export default function Hardware() {
  return (
    <Section id="hardware" bg="void3">
      <SectionHeader
        tag="02 — Hardware"
        title="Purpose-built sensor array and compute stack"
        description="Every component chosen for Mars-analogue autonomy — from NPU-accelerated vision to hardware watchdog failsafes. Total budget: under 4,540 AED (~$1,235)."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {HARDWARE.map((cat, i) => (
          <div key={cat.category} className={`reveal card d${i + 1} p-8`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[20px] text-rust">{cat.icon}</span>
              <h3 className="font-display font-bold text-[1rem] text-white">{cat.category}</h3>
            </div>
            <div className="flex flex-col gap-5">
              {cat.items.map((item) => (
                <div key={item.part} className="border-l-[1.5px] border-rust/25 pl-4">
                  <div className="font-mono text-[12px] text-rust-l mb-1">{item.part}</div>
                  <div className="text-[13px] text-sand-dim leading-[1.65]">{item.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal d3">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-rust/50 uppercase tracking-wide5">Arduino Mega 2560 — Pin Map</span>
          <div className="rule" />
        </div>
        <DataTable
          columns={[
            { key: "signal", header: "Signal" },
            { key: "pin",    header: "Pin", mono: true },
          ]}
          rows={PIN_ROWS as Record<string, unknown>[]}
          minWidth="400px"
        />
      </div>
    </Section>
  );
}
