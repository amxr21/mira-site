import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import DataTable from "@/components/ui/DataTable";
import PipelineWalkthrough from "@/components/ui/PipelineWalkthrough";

const YOLO_SPECS = [
  { label: "Architecture",         val: "YOLO nano single-pass"  },
  { label: "Training",             val: "AI4Mars (19,757 pairs)"  },
  { label: "Input (HEF)",          val: "416×416 NHWC"            },
  { label: "Input (ONNX)",         val: "640×640"                 },
  { label: "NPU latency",          val: "8–15 ms"                 },
  { label: "CPU latency",          val: "80–150 ms"               },
  { label: "Conf. threshold",      val: "0.55"                    },
  { label: "HEF exec contexts",    val: "5"                       },
];

const DEPTH_SPECS = [
  { label: "Backbone",             val: "DINOv2 ViT-S"            },
  { label: "Training data",        val: "62M+ diverse images"     },
  { label: "Input",                val: "224×224 NHWC uint8"      },
  { label: "Output",               val: "224×224 UINT16 disparity"},
  { label: "NPU latency",          val: "~31 ms (32.4 FPS)"       },
  { label: "CPU latency",          val: "200–350 ms (0.5 FPS)"    },
  { label: "AbsRel (float32)",     val: "0.15"                    },
  { label: "AbsRel (INT8 NPU)",    val: "0.16 (<7% drop)"         },
];

const CONV_STEPS = [
  {
    icon: "🏋",
    name: "AWS Training",
    detail: "Ultralytics fine-tune\nAI4Mars dataset\nml.g5.4xlarge",
    desc: "Fine-tuned YOLOv6n-seg on AI4Mars dataset using Ultralytics on an ml.g5.4xlarge GPU instance. AI4Mars provides 326,000 semantic labels across 35,000 images captured by Curiosity, Opportunity, Spirit, and Perseverance — covering four terrain classes: soil, bedrock, sand, and big_rock.",
  },
  {
    icon: "📦",
    name: "ONNX Export",
    detail: "Ultralytics pipeline\nFloat32 weights\n640×640 graph",
    desc: "Exported trained model weights as a Float32 ONNX computational graph at 640×640 input resolution using the Ultralytics export pipeline. This graph serves as the portable interchange format before Hailo-specific compilation steps.",
  },
  {
    icon: "🔍",
    name: "Parse",
    detail: "Hailo DFC 3.33.1\nGraph translation\nDFL layer → CPU",
    desc: "Hailo DFC 3.33.1 translated the ONNX graph into a Hailo-compatible intermediate representation. The DFL (Distribution Focal Loss) reshape layer in YOLO's bounding box decoder is unsupported by the compiler — it is automatically offloaded to CPU for post-processing.",
  },
  {
    icon: "⚖️",
    name: "Quantize INT8",
    detail: "1024 calibration frames\nPer-layer dynamic range\nFloat32 → INT8",
    desc: "Calibrated over 1024 AI4Mars frames with per-layer dynamic range compression, converting all Float32 activations and weights to INT8. The resulting AbsRel accuracy drop is <7% (0.15 float32 → 0.16 INT8), which is within acceptable bounds for navigation use.",
  },
  {
    icon: "⚡",
    name: "Compile HEF",
    detail: "Hailo-8L cluster map\n5 exec contexts\n416×416 (640 OOM)",
    desc: "640×640 input exceeded the Hailo-8L's on-chip SRAM budget and failed to compile. Re-exporting at 416×416 resolved the memory constraint — the compiler successfully partitioned the model into 5 sequential execution contexts, mapping each across the Hailo-8L cluster to achieve 8–15 ms NPU inference latency.",
    warn: true,
  },
];

const CHOSEN_DEPTH = [
  "Trained on 62M+ diverse real-world images — strong zero-shot outdoor generalization",
  "Hailo Model Zoo provides pre-compiled HEF — no manual compilation required",
  "SCDepthV3 runs at 145 FPS on Hailo but trained only on NYUv2 indoor (poor outdoor domain gap)",
  "AbsRel 0.15 (float32) → 0.16 (INT8 NPU) — minimal quantization degradation",
  "Transformer splits across 15 NPU execution contexts, eliminating CPU fallback",
];

const CHOSEN_YOLO = [
  { yes: true,  text: "Equivalent accuracy to YOLOv8n with lower parameter count → smaller HEF memory footprint" },
  { yes: true,  text: "Single-pass inference — no separate proposal stage, faster latency on embedded hardware" },
  { yes: true,  text: "Fine-tuned on AI4Mars — 19,757 validated image-label pairs from actual Mars rover imagery" },
  { yes: false, text: "Standalone segmentation gives no distance info — cannot determine collision range alone" },
  { yes: false, text: "Monocular depth alone cannot classify terrain type — fusion is required for full context" },
];

const COMPARE_ROWS = [
  { metric: "YOLO26n-seg latency",      cpu: "80–150 ms",    npu: "8–15 ms",    speedup: "10–15×"   },
  { metric: "DepthAnything V2 latency", cpu: "200–350 ms",   npu: "~31 ms",     speedup: "~10×"     },
  { metric: "Combined slow loop",       cpu: "300–500 ms",   npu: "50–75 ms",   speedup: "6–8×"     },
  { metric: "Effective visual FPS",     cpu: "1–3 FPS",      npu: "13–20 FPS",  speedup: "~8×"      },
  { metric: "DepthAnything AbsRel",     cpu: "0.15 float32", npu: "0.16 INT8",  speedup: "<7% drop" },
];

function ModelCard({ tag, name, full, desc, specs, delay }: {
  tag: string; name: string; full: string; desc: React.ReactNode;
  specs: { label: string; val: string }[]; delay: number;
}) {
  return (
    <div className={`model-card primary reveal d${delay}`}>
      <div className="absolute top-0 left-0 right-0 h-px bg-glow-h" />
      <div className="font-mono text-[10px] text-rust uppercase tracking-wide4 mb-3">{tag}</div>
      <div className="font-display font-extrabold text-[1.4rem] text-white leading-[1.2] mb-1.5">{name}</div>
      <div className="font-mono text-[12px] text-sand-faint tracking-wide2 mb-5">{full}</div>
      <div className="text-[14px] text-sand-dim leading-[1.8] mb-6">{desc}</div>
      <div className="grid grid-cols-2 gap-[10px]">
        {specs.map((s) => (
          <div key={s.label} className="mc-spec">
            <div className="font-mono text-[10px] text-sand-faint uppercase tracking-[0.15em] mb-1">{s.label}</div>
            <div className="font-mono text-[13px] text-rust-l">{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AIModels() {
  return (
    <Section id="ai" bg="void2" overlay="radial-top">
      <SectionHeader
        tag="03 — AI Models"
        title="The vision brain behind MIRA"
        description="No single model provides sufficient environmental context for reliable autonomous navigation. MIRA fuses two complementary AI models with physical sensor measurements — terrain classification to know what is present, depth estimation to know how far, and TOF to validate both."
      />

      {/* Model cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        <ModelCard
          tag="Object Detection & Segmentation"
          name="YOLO26n-seg"
          full="You Only Look Once · Nano · Instance Segmentation"
          delay={1}
          specs={YOLO_SPECS}
          desc={<>A lightweight nano-sized instance segmentation model fine-tuned on the AI4Mars dataset containing 326,000 labels across 35,000 images from Curiosity, Opportunity, Spirit, and Perseverance rovers. Classifies Martian terrain into four classes — <strong className="text-rust-ll">soil, bedrock, sand, big_rock</strong> — with confidence threshold 0.55 (above default 0.40) to suppress false positives on featureless Martian background.</>}
        />
        <ModelCard
          tag="Monocular Depth Estimation"
          name="DepthAnything V2"
          full="ViT-S · DINOv2 Vision Transformer · Zero-Shot Depth"
          delay={2}
          specs={DEPTH_SPECS}
          desc="Monocular depth estimation model based on a DINOv2 Vision Transformer encoder, trained on over 62 million diverse real-world images. Produces a dense per-pixel depth map from a single camera frame. Selected over MiDaS and SCDepthV3 for strong zero-shot generalization to unstructured outdoor terrains. The Hailo Model Zoo provides a pre-compiled HEF splitting the transformer across 15 execution contexts on the Hailo-8L — achieving 32.4 FPS vs. 0.5 FPS on CPU. Exponential smoothing α=0.7 suppresses inter-frame flicker."
        />
      </div>

      {/* HEF Compilation Pipeline — interactive walkthrough */}
      <div className="reveal d2 mb-12">
        <PipelineWalkthrough
          steps={CONV_STEPS}
          autoPlayMs={2500}
          label="YOLO26n-seg — ONNX → Hailo HEF Compilation Pipeline"
        />
      </div>

      {/* Model selection rationale */}
      <h3 className="font-display font-bold text-[1.2rem] text-white mb-4 reveal d1">Model selection rationale</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 reveal d2">
        <div className="choice-box">
          <div className="font-display font-bold text-[15px] text-status-green mb-3">✓ DepthAnything V2 over MiDaS / SCDepthV3</div>
          {CHOSEN_DEPTH.map((t) => (
            <div key={t} className="flex items-start gap-2 text-[14px] text-sand-dim leading-[1.65] mb-2">
              <span className="shrink-0 mt-[6px] w-[5px] h-[5px] rounded-full bg-status-green" />
              {t}
            </div>
          ))}
        </div>
        <div className="choice-box">
          <div className="font-display font-bold text-[15px] text-status-green mb-3">✓ YOLO26n-seg over YOLOv8n / standalone segmentation</div>
          {CHOSEN_YOLO.map((t) => (
            <div key={t.text} className="flex items-start gap-2 text-[14px] text-sand-dim leading-[1.65] mb-2">
              <span className={`shrink-0 mt-[6px] w-[5px] h-[5px] rounded-full ${t.yes ? "bg-status-green" : "bg-status-red"}`} />
              {t.text}
            </div>
          ))}
        </div>
      </div>

      {/* CPU vs NPU comparison */}
      <h3 className="font-display font-bold text-[1.2rem] text-white mb-4 reveal d1">CPU vs. NPU inference comparison</h3>
      <div className="reveal d2">
        <DataTable
          columns={[
            { key: "metric",  header: "Metric" },
            { key: "cpu",     header: "CPU-Only (ONNX)",    mono: true },
            { key: "npu",     header: "Hailo-8L NPU (HEF)", mono: true, render: (r) => <span className="font-mono text-[13px] text-status-green">{(r as {npu:string}).npu}</span> },
            { key: "speedup", header: "Speedup",            mono: true, render: (r) => <span className="font-mono text-[13px] text-rust-l">{(r as {speedup:string}).speedup}</span> },
          ]}
          rows={COMPARE_ROWS as Record<string, unknown>[]}
          minWidth="540px"
        />
      </div>
    </Section>
  );
}
