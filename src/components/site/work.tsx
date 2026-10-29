import { Reveal } from "./reveal";
import workAgents from "@/assets/work-agents.jpg";
import workLlm from "@/assets/work-llm.jpg";
import workEnterprise from "@/assets/work-enterprise.jpg";

const PROJECTS = [
  {
    img: workEnterprise,
    alt: "DATAFORGE dataset engineering platform visualization showing data pipelines, annotation workflows, and quality control systems for ML data infrastructure",
    tag: "ML DATA SOLUTIONS",
    title: "DATAFORGE — Dataset Engineering Platform",
    desc: "Automated data cleaning, annotation pipelines, and synthetic data generation that transform raw operational data into training-ready datasets — with quality controls and versioning built in.",
  },
  {
    img: workLlm,
    alt: "CORTEX-D production model pipeline visualization showing model development, benchmarking, performance optimization, and evaluation workflows",
    tag: "MODEL DEVELOPMENT",
    title: "CORTEX-D — Production Model Pipeline",
    desc: "End-to-end model development from classical ML to deep learning — featuring automated benchmarking, performance optimization, and evaluation against production standards before deployment.",
  },
  {
    img: workAgents,
    alt: "AXON enterprise AI integration visualization showing production AI systems, document processing, decision support, and predictive analytics in enterprise infrastructure",
    tag: "APPLIED AI SYSTEMS",
    title: "AXON — Enterprise AI Integration",
    desc: "Production AI systems integrated into existing enterprise infrastructure — from document processing and decision support to predictive analytics, deployed with monitoring and continuous improvement.",
  },
];

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
      aria-labelledby="work-heading"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          04 / Work
        </p>
        <h2 id="work-heading" className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
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
  { name: "FINANCE & BANKING", note: "Risk scoring, fraud detection, demand forecasting" },
  { name: "HEALTHCARE", note: "Clinical NLP, document automation, diagnostic support" },
  { name: "RETAIL & E-COMMERCE", note: "Recommendation engines, demand prediction, pricing optimization" },
  { name: "MANUFACTURING", note: "Quality prediction, maintenance scheduling, yield optimization" },
  { name: "LOGISTICS & SUPPLY CHAIN", note: "Route optimization, demand forecasting, anomaly detection" },
  { name: "TELECOM", note: "Network operations, customer analytics, churn prediction" },
  { name: "ENERGY & UTILITIES", note: "Load forecasting, predictive maintenance, grid optimization" },
  { name: "EDUCATION", note: "Adaptive learning, assessment automation, content generation" },
];

export function Industries() {
  return (
    <section
      id="industries"
      className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
      aria-labelledby="industries-heading"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          05 / Industries
        </p>
        <h2 id="industries-heading" className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
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
