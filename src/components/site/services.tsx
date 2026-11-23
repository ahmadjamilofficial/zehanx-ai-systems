import { Reveal } from "./reveal";

const SERVICES = [
  { num: "01", slug: "custom-software", title: "CUSTOM SOFTWARE & WEB APPS", desc: "Purpose-built applications and platforms designed around your workflows and users.", bullets: ["Web apps, portals and customer platforms", "Frontend, backend and API integrations", "Testing, deployment and handover"] },
  { num: "02", slug: "business-systems", title: "BUSINESS SYSTEMS & AUTOMATION", desc: "Connected operations tools that reduce repetitive work and improve visibility.", bullets: ["ERP/CRM integrations and dashboards", "Internal tools and approval workflows", "WhatsApp and process automation"] },
  { num: "03", slug: "websites", title: "WEBSITES & E-COMMERCE", desc: "Responsive digital experiences built for clarity, speed and conversion.", bullets: ["Business websites and landing pages", "Online stores and payment integrations", "CMS, analytics and technical SEO"] },
  { num: "04", slug: "ai-ml", title: "AI & ML SYSTEMS", desc: "Production-focused AI capabilities integrated into real products and workflows.", bullets: ["LLM applications and intelligent agents", "Machine learning and model evaluation", "Deployment, monitoring and integration"] },
  { num: "05", slug: "data-engineering", title: "DATA ENGINEERING & DATASETS", desc: "Reliable data foundations for analytics, applications and machine learning.", bullets: ["Data pipelines and transformations", "Cleaning, annotation and quality controls", "Training-ready datasets and documentation"] },
  { num: "06", slug: "zehanx-ml-platform", title: "THE ZEHANX ML PLATFORM", desc: "A platform direction for managing model and data workflows.", bullets: ["Data ingestion and model workflows", "Experiment tracking and evaluation", "Deployment workflow foundations"] },
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
          From complete software products and websites to business automation and production AI, we take projects from discovery through deployment.
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
    desc: "We map your goals, users, current process, data and constraints before proposing a solution.",
  },
  {
    num: "02",
    title: "ARCHITECT",
    desc: "We design the product architecture, user experience, integrations, milestones and deployment path.",
  },
  {
    num: "03",
    title: "BUILD & TRAIN",
    desc: "We build in agreed milestones, with one accountable lead and async recorded progress updates.",
  },
  {
    num: "04",
    title: "DEPLOY & SCALE",
    desc: "We deploy, document and hand over the system. Quotes are fixed after scoping; payment follows an agreed deposit and milestones.",
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
