import { Reveal } from "./reveal";
import coreImg from "@/assets/about-core.jpg";

const MARQUEE_ITEMS = [
  "MACHINE LEARNING",
  "AGENTIC AI",
  "DATA ENGINEERING",
  "LLM TRAINING",
  "ENTERPRISE SOFTWARE",
  "AI SYSTEMS",
  "MLOPS",
  "COMPUTER VISION",
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
  "End-to-end delivery",
  "Private & on-prem option",
  "Domain-tuned models",
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
              01 / What we do
            </p>
            <h2
              className="mt-6 text-3xl font-medium uppercase tracking-wide md:text-5xl"
              style={{ lineHeight: 1.02 }}
            >
              AN ML &amp; DATA COMPANY FOR BUSINESSES THAT CAN&apos;T AFFORD TO
              GUESS
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                ZehanX Tech builds the intelligence behind modern enterprises —
                AI systems, agentic software, enterprise platforms and the data
                infrastructure that powers them, from first pipeline to
                production.
              </p>
              <p>
                We train and fine-tune large language models on your domain, so
                the intelligence speaks your industry&apos;s language — not a
                generic one. Your data stays yours: private deployments,
                governed pipelines, models that never leak.
              </p>
              <p>
                From autonomous agents that run workflows to enterprise platforms
                your staff live in daily, everything we ship is built to operate:
                reliably, privately, at scale.
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
            alt="Abstract visualization of a ZehanX Tech AI core system"
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
