import { Reveal } from "./reveal";
import coreImg from "@/assets/about-core.jpg";

const MARQUEE_ITEMS = [
  "CUSTOM SOFTWARE",
  "BUSINESS SYSTEMS",
  "WEBSITES & E-COMMERCE",
  "MODEL DEVELOPMENT",
  "WORKFLOW AUTOMATION",
  "MODEL EVALUATION",
  "APPLIED AI SYSTEMS",
  "DATASET ENGINEERING",
  "COMPUTER VISION",
  "NLP",
  "PRODUCTION ML",
  "DATA ENGINEERING",
];

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-pixel text-sm text-muted-foreground">
              {item}
            </span>
            <span className="text-accent">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const PROOF_POINTS = [
  "Production-deployed systems",
  "Measurable business outcomes",
  "End-to-end ML expertise",
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
              01 / What we do
            </p>
            <h2
              id="about-heading"
              className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl"
              style={{ lineHeight: 1.02 }}
            >
              A FULL-STACK ML SOLUTIONS PROVIDER FOR ENTERPRISES THAT NEED
              INTELLIGENCE IN PRODUCTION
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                ZehanX Tech designs and builds the digital products businesses depend on: custom software, websites, operational systems and automation.
              </p>
              <p>
                From discovery to deployment, we align the product with your users, workflows, integrations and operating constraints.
              </p>
              <p>
                AI and machine learning strengthen the work where they add value; they are part of our toolkit, not the only thing we build.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-3">
              {PROOF_POINTS.map((point) => (
                <span
                  key={point}
                  className="border border-line px-4 py-3 font-pixel text-xs text-foreground/80"
                >
                  {point}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <img
            src={coreImg}
            alt="Abstract visualization of ZehanX Tech's ML data infrastructure and model development platform"
            loading="lazy"
            width={1200}
            height={1504}
            className="w-full border border-line object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
