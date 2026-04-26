import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import TerminalBox from "@/components/ui/TerminalBox";
import Icon from "@/components/ui/Icon";

const STREAMS = [
  { icon: "◈", label: "Vision",   items: ["YOLO26n-seg Mars terrain detection", "DepthAnything V2 ViT-S depth map", "COCO unknown object tagging"] },
  { icon: "◉", label: "Sensing",  items: ["5× VL53L1X TOF (±2 mm, 1.5 m)", "MPU-6050 IMU — pitch / roll / yaw", "HC-SR04 ultrasonic × 2", "LDR ambient light sensor"] },
  { icon: "◎", label: "Decision", items: ["10-priority navigation waterfall", "Motion velocity tracking", "LDR-weighted depth fusion"] },
  { icon: "◐", label: "Control",  items: ["Arduino Mega 2560", "30 Hz sensor + command loop", "500 ms watchdog failsafe"] },
];

export default function Overview() {
  return (
    <Section id="overview" bg="void2">
      <SectionHeader
        tag="01 — Overview"
        title="From pixels to motor commands — in real time"
        description="MIRA implements a four-layer architecture where perception, processing, control, and actuation are cleanly separated. Visual AI inference is decoupled from sensor-driven decisions, so emergency stops are never blocked by slow inference cycles."
      />

      {/* System Architecture SVG Diagram */}
      <TerminalBox className="reveal d1 mb-14 overflow-x-auto">
        <svg
          width="100%"
          viewBox="0 0 1100 340"
          xmlns="http://www.w3.org/2000/svg"
          className="font-mono min-w-[700px]"
        >
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M2 2L8 5L2 8" fill="none" stroke="#c94a18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
            <marker id="arr-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M2 2L8 5L2 8" fill="none" stroke="rgba(201,74,24,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>

          {/* PERCEPTION */}
          <rect x="20" y="20" width="200" height="300" rx="4" fill="rgba(201,74,24,0.05)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="120" y="44" textAnchor="middle" fill="rgba(201,74,24,0.5)" fontSize="10" letterSpacing="2">PERCEPTION</text>
          <rect x="40" y="58" width="160" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.3)" strokeWidth="0.5"/>
          <text x="120" y="78" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Innomaker IMX415</text>
          <text x="120" y="96" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">1280×720 · 30 FPS · USB 3.0</text>
          <rect x="40" y="124" width="160" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.3)" strokeWidth="0.5"/>
          <text x="120" y="144" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">VL53L1X × 5 TOF</text>
          <text x="120" y="162" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">C · LF · RF · LS · RS zones</text>
          <rect x="40" y="190" width="75" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="77" y="210" textAnchor="middle" fill="#e8d5b7" fontSize="11" fontWeight="500">MPU-6050</text>
          <text x="77" y="228" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">IMU</text>
          <rect x="125" y="190" width="75" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="162" y="210" textAnchor="middle" fill="#e8d5b7" fontSize="11" fontWeight="500">LDR</text>
          <text x="162" y="228" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">Ambient</text>
          <rect x="40" y="256" width="160" height="44" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="120" y="274" textAnchor="middle" fill="#e8d5b7" fontSize="11" fontWeight="500">HC-SR04 Ultrasonic × 2</text>
          <text x="120" y="290" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">Front + Rear bumper</text>

          {/* PROCESSING */}
          <rect x="260" y="20" width="280" height="300" rx="4" fill="rgba(201,74,24,0.04)" stroke="rgba(201,74,24,0.25)" strokeWidth="0.5"/>
          <text x="400" y="44" textAnchor="middle" fill="rgba(201,74,24,0.5)" fontSize="10" letterSpacing="2">PROCESSING — RASPBERRY PI 5</text>
          <rect x="278" y="58" width="244" height="40" rx="3" fill="rgba(201,74,24,0.12)" stroke="rgba(201,74,24,0.4)" strokeWidth="0.5"/>
          <text x="400" y="73" textAnchor="middle" fill="#ef7b4a" fontSize="11" fontWeight="500">Hailo-8L NPU · AI HAT+</text>
          <text x="400" y="89" textAnchor="middle" fill="rgba(232,213,183,0.5)" fontSize="10">13 TOPS · M.2 Interface</text>
          <rect x="278" y="112" width="116" height="70" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.3)" strokeWidth="0.5"/>
          <text x="336" y="133" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">YOLO26n-seg</text>
          <text x="336" y="150" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">Mars terrain</text>
          <text x="336" y="165" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">416×416 HEF</text>
          <text x="336" y="178" textAnchor="middle" fill="rgba(201,74,24,0.7)" fontSize="10">8–15 ms</text>
          <rect x="406" y="112" width="116" height="70" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.3)" strokeWidth="0.5"/>
          <text x="464" y="133" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">DepthAnything</text>
          <text x="464" y="150" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">V2 ViT-S</text>
          <text x="464" y="165" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">224×224 HEF</text>
          <text x="464" y="178" textAnchor="middle" fill="rgba(201,74,24,0.7)" fontSize="10">~31 ms</text>
          <rect x="278" y="198" width="244" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.3)" strokeWidth="0.5"/>
          <text x="400" y="218" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Sensor Fusion Layer</text>
          <text x="400" y="236" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">TOF · depth · IMU · LDR · detections → FusionResult</text>
          <rect x="278" y="264" width="244" height="46" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.35)" strokeWidth="0.5"/>
          <text x="400" y="283" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Decision Layer</text>
          <text x="400" y="300" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">10-priority waterfall → NavigationCommand</text>

          {/* CONTROL */}
          <rect x="588" y="20" width="200" height="300" rx="4" fill="rgba(201,74,24,0.03)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="688" y="44" textAnchor="middle" fill="rgba(201,74,24,0.5)" fontSize="10" letterSpacing="2">CONTROL</text>
          <rect x="608" y="58" width="160" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.3)" strokeWidth="0.5"/>
          <text x="688" y="78" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Arduino Mega 2560</text>
          <text x="688" y="96" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">115200 baud · 30Hz sensor TX</text>
          <rect x="608" y="124" width="160" height="52" rx="3" fill="rgba(201,74,24,0.08)" stroke="rgba(201,74,24,0.25)" strokeWidth="0.5"/>
          <text x="688" y="144" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Safety Logic</text>
          <text x="688" y="162" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">Bumper → instant PWM cut</text>
          <rect x="608" y="190" width="160" height="44" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="688" y="207" textAnchor="middle" fill="#e8d5b7" fontSize="11" fontWeight="500">Watchdog</text>
          <text x="688" y="223" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">500 ms timeout → STOP</text>
          <rect x="608" y="248" width="160" height="62" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="688" y="268" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">PWM Generator</text>
          <text x="688" y="285" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">F / S / L / R / X</text>
          <text x="688" y="301" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">→ L298N drivers</text>

          {/* ACTUATION */}
          <rect x="836" y="20" width="240" height="300" rx="4" fill="rgba(201,74,24,0.03)" stroke="rgba(201,74,24,0.15)" strokeWidth="0.5"/>
          <text x="956" y="44" textAnchor="middle" fill="rgba(201,74,24,0.5)" fontSize="10" letterSpacing="2">ACTUATION</text>
          <rect x="856" y="58" width="200" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.25)" strokeWidth="0.5"/>
          <text x="956" y="78" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">L298N × 2</text>
          <text x="956" y="96" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">Dual H-Bridge motor drivers</text>
          <rect x="856" y="124" width="200" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="956" y="144" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">DC Gear Motors × 4</text>
          <text x="956" y="162" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">Differential drive · encoders</text>
          <rect x="856" y="190" width="200" height="52" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="956" y="210" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Power System</text>
          <text x="956" y="228" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">7.4V Li-Po → 5V DC-DC</text>
          <rect x="856" y="256" width="200" height="54" rx="3" fill="rgba(0,0,0,0.5)" stroke="rgba(201,74,24,0.15)" strokeWidth="0.5"/>
          <text x="956" y="276" textAnchor="middle" fill="#e8d5b7" fontSize="12" fontWeight="500">Aluminum Chassis</text>
          <text x="956" y="293" textAnchor="middle" fill="rgba(232,213,183,0.45)" fontSize="10">37.5×24×10.5 cm · ~2.4 kg</text>

          {/* Arrows */}
          <line x1="220" y1="84" x2="258" y2="84" stroke="#c94a18" strokeWidth="1" markerEnd="url(#arr)"/>
          <line x1="220" y1="150" x2="240" y2="150" stroke="rgba(201,74,24,0.4)" strokeWidth="1" markerEnd="url(#arr-dim)"/>
          <line x1="240" y1="150" x2="240" y2="220" stroke="rgba(201,74,24,0.3)" strokeWidth="1"/>
          <line x1="240" y1="220" x2="258" y2="220" stroke="rgba(201,74,24,0.4)" strokeWidth="1" markerEnd="url(#arr-dim)"/>
          <line x1="336" y1="182" x2="336" y2="196" stroke="rgba(201,74,24,0.4)" strokeWidth="1" markerEnd="url(#arr-dim)"/>
          <line x1="464" y1="182" x2="464" y2="196" stroke="rgba(201,74,24,0.4)" strokeWidth="1" markerEnd="url(#arr-dim)"/>
          <line x1="400" y1="250" x2="400" y2="262" stroke="#c94a18" strokeWidth="1" markerEnd="url(#arr)"/>
          <line x1="540" y1="287" x2="586" y2="287" stroke="#c94a18" strokeWidth="1.5" markerEnd="url(#arr)"/>
          <line x1="788" y1="84" x2="834" y2="84" stroke="#c94a18" strokeWidth="1.5" markerEnd="url(#arr)"/>
          <line x1="788" y1="270" x2="834" y2="270" stroke="rgba(201,74,24,0.4)" strokeWidth="1" markerEnd="url(#arr-dim)"/>
          <line x1="956" y1="176" x2="956" y2="320" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5" strokeDasharray="4,3"/>
          <line x1="688" y1="320" x2="956" y2="320" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5" strokeDasharray="4,3"/>
          <line x1="688" y1="310" x2="688" y2="320" stroke="rgba(201,74,24,0.2)" strokeWidth="0.5"/>
          <text x="820" y="316" textAnchor="middle" fill="rgba(232,213,183,0.2)" fontSize="9">encoder feedback</text>
        </svg>
      </TerminalBox>

      {/* Stream cards */}
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
