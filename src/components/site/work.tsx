import { Reveal } from "./reveal";
import workAgents from "@/assets/work-agents.jpg";
import workLlm from "@/assets/work-llm.jpg";
import workEnterprise from "@/assets/work-enterprise.jpg";

const PROJECTS = [
  {
    img: workAgents,
    alt: "Abstract network of connected agent nodes",
    tag: "AGENTIC AI",
    title: "AXON — Multi-Agent Orchestration Layer",
    desc: "A supervised agent fabric where planner, tool-use and memory agents decompose objectives, invoke enterprise APIs and execute long-horizon workflows — with human-in-the-loop checkpoints gating every critical action.",
  },
  {
    img: workLlm,
    alt: "Abstract streams of glowing token particles",
    tag: "LLM TRAINING",
    title: "CORTEX-D — Private Domain LLM",
    desc: "A foundation model adapted with SFT and LoRA on proprietary industry corpora, preference-aligned and served through an on-prem inference endpoint — so sensitive data never leaves your infrastructure.",
  },
  {
    img: workEnterprise,
    alt: "Layered dark data infrastructure with red conduits",
    tag: "DATA PLATFORM",
    title: "DATAFORGE — Feature & Vector Platform",
    desc: "Streaming ingestion, a governed feature store and a low-latency vector index powering retrieval-augmented generation — one real-time substrate every model, agent and dashboard reads from.",
  },
];

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          04 / Work
        </p>
        <h2 className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
          SELECTED <span className="font-pixel text-[1.15em]">BUILDS</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={i * 100}>
            <article className="group border border-line transition-colors hover:border-foreground/30">
              <div className="overflow-hidden">
                <img
                  src={project.img}
                  alt={project.alt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <p className="font-pixel text-xs tracking-widest text-accent">
                  {project.tag}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-wide md:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const INDUSTRIES = [
  { name: "FINANCE & BANKING", note: "Risk, fraud and forecasting" },
  { name: "HEALTHCARE", note: "Clinical data and documentation" },
  { name: "RETAIL & E-COMMERCE", note: "Demand, pricing and personalization" },
  { name: "MANUFACTURING", note: "Quality, maintenance and yield" },
  { name: "LOGISTICS & SUPPLY CHAIN", note: "Routing and prediction" },
  { name: "TELECOM", note: "Network and customer operations" },
  { name: "ENERGY & UTILITIES", note: "Load forecasting and optimization" },
  { name: "EDUCATION", note: "Adaptive learning and assessment" },
];

export function Industries() {
  return (
    <section
      id="industries"
      className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          05 / Industries
        </p>
        <h2 className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
          WHERE IT <span className="font-pixel text-[1.15em]">WORKS</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {INDUSTRIES.map((industry, i) => (
          <Reveal key={industry.name} delay={i * 50} className="bg-background">
            <div className="group flex h-full flex-col p-6 transition-colors hover:bg-card md:p-8">
              <h3 className="text-sm font-semibold tracking-wider transition-colors group-hover:text-accent">
                {industry.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {industry.note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="mt-8 text-sm text-muted-foreground">
          Don&apos;t see your industry? Every model is trained on your domain —{" "}
          <a
            href="#contact"
            className="text-accent transition-colors hover:text-accent/80"
          >
            talk to us
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
