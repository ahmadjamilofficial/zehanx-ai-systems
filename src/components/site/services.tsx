import { Reveal } from "./reveal";

const SERVICES = [
  {
    num: "01",
    title: "AI SYSTEMS",
    desc: "Custom machine learning systems designed, trained and shipped end to end — forecasting, detection, recommendation, optimization.",
  },
  {
    num: "02",
    title: "AGENTIC AI SOFTWARE",
    desc: "Autonomous and semi-autonomous agents that plan, use tools and execute multi-step workflows across your stack.",
  },
  {
    num: "03",
    title: "ENTERPRISE SOFTWARE",
    desc: "Internal platforms, dashboards and integrations built around your operations — not a generic SaaS you bend your business around.",
  },
  {
    num: "04",
    title: "LLM TRAINING & FINE-TUNING",
    desc: "Large language models trained on your data and your domain, deployable privately on your own infrastructure.",
  },
  {
    num: "05",
    title: "DATA ENGINEERING",
    desc: "Pipelines, warehouses and quality controls that turn scattered operational data into a foundation models can trust.",
  },
  {
    num: "06",
    title: "MLOPS & DEPLOYMENT",
    desc: "Serving, monitoring, evaluation and scaling — keeping models accurate and available long after launch.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          02 / Services
        </p>
        <h2 className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
          WHAT WE <span className="font-pixel text-[1.15em]">BUILD</span>
        </h2>
      </Reveal>
      <div className="mt-12">
        {SERVICES.map((service, i) => (
          <Reveal key={service.num} delay={i * 60}>
            <div className="group grid grid-cols-1 gap-3 border-t border-line py-8 transition-colors hover:bg-card md:grid-cols-[100px_1fr_1.2fr] md:items-baseline md:gap-8 md:px-4">
              <span className="font-pixel text-sm text-muted-foreground transition-colors group-hover:text-accent">
                {service.num}
              </span>
              <h3 className="text-xl font-semibold tracking-wide md:text-2xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.desc}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}

const STEPS = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "We map your operations, data and constraints, and define what intelligence would actually change.",
  },
  {
    num: "02",
    title: "ARCHITECT",
    desc: "We design the system: data flow, model approach, agent topology, integration points and deployment path.",
  },
  {
    num: "03",
    title: "BUILD & TRAIN",
    desc: "We build the software, train and fine-tune the models on your data, and iterate against real metrics.",
  },
  {
    num: "04",
    title: "DEPLOY & SCALE",
    desc: "We ship to production, monitor performance and keep improving as your data and usage grow.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          03 / Process
        </p>
        <h2 className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
          HOW IT <span className="font-pixel text-[1.15em]">SHIPS</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 80} className="bg-background">
            <div className="flex h-full flex-col p-6 transition-colors hover:bg-card md:p-8">
              <span className="font-pixel text-3xl text-accent">{step.num}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-wide">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
