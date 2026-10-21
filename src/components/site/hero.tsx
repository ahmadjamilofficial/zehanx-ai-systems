import { ArrowUpRight } from "lucide-react";
import { CAL_URL, HERO_VIDEO_URL } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover lg:scale-[1.2]"
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/25"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-1 flex-col px-5 pt-24 sm:px-6 md:px-10 lg:px-14">
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <div>
            <h2 className="text-lg leading-tight tracking-wide md:text-xl">
              ZEHANX
              <br />
              <span className="font-pixel text-2xl md:text-3xl">TECH</span>
            </h2>
            <p className="mt-3 font-pixel text-[10px] text-muted-foreground">*</p>
            <p className="mt-1 font-pixel text-xs leading-relaxed text-muted-foreground">
              machine intelligence,
              <br />
              built for business
            </p>
          </div>
          <div className="text-left">
            <h2 className="text-lg leading-tight tracking-wide md:text-xl">
              MACHINE LEARNING
              <br />
              <span className="font-pixel text-2xl md:text-3xl">&amp; DATA</span>
            </h2>
          </div>
          <div>
            <p className="mb-3 font-pixel text-base uppercase tracking-widest text-muted-foreground">
              What we do
            </p>
            <p className="max-w-[240px] text-sm leading-relaxed text-foreground/90">
              We build AI systems, agentic and enterprise software, and train
              LLMs for businesses and industries
            </p>
          </div>
          <div>
            <p className="mb-3 font-pixel text-base uppercase tracking-widest text-muted-foreground">
              Capabilities
            </p>
            <ul className="space-y-0.5 text-sm leading-relaxed text-foreground/90">
              <li>AI Systems</li>
              <li>Agentic AI Software</li>
              <li>Enterprise Software</li>
              <li>LLM Training &amp; Fine-Tuning</li>
              <li>Data Engineering</li>
              <li>MLOps &amp; Deployment</li>
            </ul>
          </div>
        </div>

        <div className="flex-1" />

        <div className="pb-4">
          <div className="grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-2">
            <h1
              className="text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
              style={{ lineHeight: 0.88 }}
            >
              WE BUILD THE
              <br />
              <span className="inline-block font-pixel text-[1.25em] font-normal leading-none">
                INTELLIGENCE
              </span>
              <br />
              BEHIND MODERN
              <br />
              <span className="inline-block font-pixel text-[1.25em] font-normal leading-none">
                ENTERPRISES
              </span>
            </h1>

            <div className="flex flex-col gap-4 sm:gap-6 lg:items-end">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 self-start border border-line bg-foreground/5 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-foreground/10 lg:self-end"
              >
                <ArrowUpRight size={14} />
                <span className="text-sm tracking-wider">BOOK A CALL</span>
              </a>
              <div className="flex flex-wrap items-stretch gap-2 text-sm text-foreground/80 sm:gap-3">
                <span className="flex items-center bg-card px-3 py-2 sm:px-4">
                  <span className="font-pixel text-xs tracking-tight sm:text-sm">
                    AGENTIC SYSTEMS
                  </span>
                </span>
                <span className="flex items-center gap-2 bg-card px-3 py-2 sm:px-4">
                  <span className="text-base font-bold sm:text-lg">LLM</span>
                  <span className="text-xs text-muted-foreground">TRAINING</span>
                </span>
                <span className="flex items-center bg-card px-3 py-2 sm:px-4">
                  <span className="text-[10px] font-bold tracking-tight sm:text-xs">
                    ENTERPRISE SOFTWARE
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 pt-4 sm:mt-5 sm:grid-cols-2 sm:gap-4">
            <p className="text-xs text-muted-foreground">
              Booking open for new engagements.{" "}
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="text-accent transition-colors hover:text-accent/80"
              >
                Schedule a call
              </a>
            </p>
            <p className="text-xs text-muted-foreground sm:text-right">
              zehanxtech@gmail.com &bull; WhatsApp (text only)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
