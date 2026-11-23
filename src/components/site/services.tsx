import { Reveal } from "./reveal";

const SERVICES = [
  { num: "01", slug: "custom-software", title: "CUSTOM SOFTWARE & WEB APPS", desc: "Purpose-built web applications, portals and platforms designed around your workflows, users and business requirements." },
  { num: "02", slug: "business-systems", title: "BUSINESS SYSTEMS & AUTOMATION", desc: "ERP and CRM integrations, operational dashboards, internal tools and workflow automation that reduce repetitive work." },
  { num: "03", slug: "websites", title: "WEBSITES & E-COMMERCE", desc: "Fast, responsive business websites and commerce experiences built to communicate clearly and convert visitors." },
  { num: "04", slug: "ai-ml", title: "AI & ML SYSTEMS", desc: "Production-focused machine learning, LLM applications, intelligent agents, evaluation and model integrations." },
  { num: "05", slug: "data-engineering", title: "DATA ENGINEERING & DATASETS", desc: "Reliable data pipelines, cleaning, annotation, quality controls and training-ready datasets for analytics and AI." },
  { num: "06", title: "THE ZEHANX ML PLATFORM", desc: "Our platform for data ingestion, model workflows, experiment tracking, evaluation and deployment." },
];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
      aria-labelledby="services-heading"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          02 / Services
        </p>
        <h2 id="services-heading" className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
          WHAT WE <span className="font-pixel text-[1.15em]">BUILD</span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Four integrated capabilities — data infrastructure, model development, applied AI systems, and our internal ML platform — working together to deliver measurable business outcomes.
        </p>
      </Reveal>
      <div className="mt-12">
        {SERVICES.map((service, i) => (
          <Reveal key={service.num} delay={i * 60}>
            <div className="group grid grid-cols-1 gap-3 border-t border-line py-8 transition-colors hover:bg-card md:grid-cols-[100px_1fr_1.2fr] md:items-baseline md:gap-8 md:px-4">
              <span className="font-pixel text-sm text-muted-foreground transition-colors group-hover:text-accent">
                {service.num}
              </span>
              <h3 className="text-xl font-semibold tracking-wide md:text-2xl"><a href={`/services/${service.slug}`} className="transition-colors hover:text-accent">{service.title}</a></h3>
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
      aria-labelledby="process-heading"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          03 / Process
        </p>
        <h2 id="process-heading" className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl">
          HOW IT <span className="font-pixel text-[1.15em]">SHIPS</span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          One disciplined path for every engagement, from a focused proof of
          concept to a company-wide intelligence platform. You see working
          software at every stage — not slideware.
        </p>
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
