import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import DataTable from "@/components/ui/DataTable";
import Bar from "@/components/ui/Bar";

const PRIORITIES = [
  { p: 1,  condition: "Ultrasonic bumper contact (TOF failed)",         action: "STOP",        type: "stop"    },
  { p: 2,  condition: "Dangerous tilt — pitch > 20° or roll > 25°",     action: "STOP",        type: "stop"    },
  { p: 3,  condition: "Side TOF threat — obstacle < 0.8 m",             action: "TURN AWAY",   type: "turn"    },
  { p: 4,  condition: "Front obstacle < 0.5 m or close rock/unknown",   action: "STOP",        type: "stop"    },
  { p: 5,  condition: "Object approaching — velocity < −0.5 m/s",       action: "TURN AWAY",   type: "turn"    },
  { p: 6,  condition: "Slope detected + TOF confirmation",               action: "STOP / SLOW", type: "slow"    },
  { p: 7,  condition: "Moderate tilt — pitch > 10° or roll > 15°",      action: "SLOW",        type: "slow"    },
  { p: 8,  condition: "Low ambient light — LDR < 0.25",                 action: "SLOW",        type: "slow"    },
  { p: 9,  condition: "Medium range obstacle < 1.5 m",                  action: "SLOW",        type: "slow"    },
  { p: 10, condition: "All clear",                                        action: "FORWARD",     type: "forward" },
];

const FUSION_ROWS = [
  { disagreement: "≤ 0.3 m",     correction: "Blend using LDR weights",     confidence: "0.95" },
  { disagreement: "0.3 – 1.0 m", correction: "Scale zone to TOF value",      confidence: "0.60" },
  { disagreement: "> 1.0 m",     correction: "Stamp zone flat at TOF value", confidence: "0.30" },
];

const LIGHT_MODES = [
  { mode: "Bright", ldr: "≥ 0.6",    depth: 70,  tof: 30  },
  { mode: "Dim",    ldr: "0.25–0.6", depth: 30,  tof: 70  },
  { mode: "Dark",   ldr: "< 0.25",   depth: 0,   tof: 100 },
];


export default function Pipeline() {
  return (
    <Section id="pipeline" bg="void" overlay="radial-bottom">
      <SectionHeader
        tag="04 — Pipeline"
        title="10-priority navigation waterfall"
        description="Every decision tick evaluates conditions in strict priority order — highest danger first, all-clear last. The first matching condition wins."
      />

      {/* Waterfall table */}
      <div className="reveal d1 mb-14">
        <DataTable
          columns={[
            { key: "p",         header: "#",         width: "40px", render: (r) => <span className="font-mono text-[13px] text-rust/35">{(r as {p:number}).p}</span> },
            { key: "condition", header: "Condition"  },
            { key: "action",    header: "Action",    render: (r) => <span className={`badge badge-${(r as {type:string}).type}`}>{(r as {action:string}).action}</span> },
          ]}
          rows={PRIORITIES as Record<string, unknown>[]}
          minWidth="560px"
          rowHighlight={(r) => (r as {type:string}).type === "stop"}
        />
      </div>

      {/* Depth Fusion + LDR — stack vertically on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Depth Fusion */}
        <div className="reveal d2 bg-black/35 border-px border-border p-8">
          <h3 className="font-display font-bold text-white text-[1.1rem] mb-2">Depth Fusion</h3>
          <p className="text-[14px] text-sand-dim leading-[1.75] mb-6">
            DepthAnything V2 output is validated against the front-facing TOF sensor every frame.
            When they disagree, the correction strategy depends on the magnitude of disagreement.
          </p>
          <DataTable
            columns={[
              { key: "disagreement", header: "Disagreement", mono: true },
              { key: "correction",   header: "Correction"               },
              { key: "confidence",   header: "Conf.", render: (r) => <span className="font-mono text-[13px] text-white">{(r as {confidence:string}).confidence}</span> },
            ]}
            rows={FUSION_ROWS as Record<string, unknown>[]}
          />
        </div>

        {/* LDR Trust Weighting */}
        <div className="reveal d3 bg-black/35 border-px border-border p-8">
          <h3 className="font-display font-bold text-white text-[1.1rem] mb-2">LDR Trust Weighting</h3>
          <p className="text-[14px] text-sand-dim leading-[1.75] mb-6">
            Ambient light reading dynamically adjusts how much to trust the depth camera vs. physical TOF.
          </p>
          <div className="flex flex-col">
            {LIGHT_MODES.map((m, i) => (
              <div
                key={m.mode}
                className={`flex items-center gap-5 py-4 ${i < LIGHT_MODES.length - 1 ? "border-b-px border-b-border/50" : ""}`}
              >
                <div className="shrink-0 w-16">
                  <div className="font-display font-bold text-[14px] text-white">{m.mode}</div>
                  <div className="font-mono text-[11px] text-rust mt-0.5">{m.ldr}</div>
                </div>
                <div className="flex flex-1 gap-4">
                  <div className="flex-1">
                    <div className="font-mono text-[11px] text-sand-faint mb-[5px]">Depth</div>
                    <Bar pct={m.depth} color="rust" height="md" />
                    <div className="font-mono text-[12px] text-rust-l mt-1">{m.depth}%</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[11px] text-sand-faint mb-[5px]">TOF</div>
                    <Bar pct={m.tof} color="sand" height="md" />
                    <div className="font-mono text-[12px] text-sand-dim mt-1">{m.tof}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
