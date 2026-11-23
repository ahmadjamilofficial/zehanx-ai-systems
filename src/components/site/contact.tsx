import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { Logo } from "./navbar";
import { CAL_URL, EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL, X_URL } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <p className="font-pixel text-sm uppercase tracking-widest text-muted-foreground">
          06 / Talk
        </p>
        <h2
          id="contact-heading"
          className="mt-6 text-4xl font-medium uppercase tracking-wide md:text-6xl xl:text-7xl"
          style={{ lineHeight: 0.95 }}
        >
          LET’S BUILD{" "}
          <span className="font-pixel text-[1.1em] font-normal">YOUR NEXT</span>{" "}
          PRODUCT
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Tell us what you want to build. We scope the work, agree on milestones and provide a clear fixed-price proposal before development begins.

        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={80}>
          <a
            href={`mailto:${EMAIL}`}
            className="group flex h-full flex-col border border-line p-6 transition-colors hover:border-foreground/30 md:p-8"
          >
            <p className="font-pixel text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </p>
            <span className="mt-6 break-all text-lg font-medium md:text-xl">
              {EMAIL}
            </span>
            <span className="mt-auto pt-6 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              Write to us anytime
            </span>
          </a>
        </Reveal>
        <Reveal delay={140}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col border border-line p-6 transition-colors hover:border-foreground/30 md:p-8"
          >
            <p className="font-pixel text-xs uppercase tracking-widest text-muted-foreground">
              WhatsApp — text only
            </p>
            <span className="mt-6 text-lg font-medium md:text-xl">
              {WHATSAPP_DISPLAY}
            </span>
            <span className="mt-auto pt-6 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              Message us, no calls
            </span>
          </a>
        </Reveal>
        <Reveal delay={160}>
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col border border-line p-6 transition-colors hover:border-foreground/30 md:p-8"
          >
            <p className="font-pixel text-xs uppercase tracking-widest text-muted-foreground">
              X (Twitter)
            </p>
            <span className="mt-6 text-lg font-medium md:text-xl">
              @ZehanxTech
            </span>
            <span className="mt-auto pt-6 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              Follow for updates
            </span>
          </a>
        </Reveal>
        <Reveal delay={200}>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col border border-primary bg-primary p-6 text-primary-foreground transition-opacity hover:opacity-90 md:p-8"
          >
            <p className="font-pixel text-xs uppercase tracking-widest opacity-80">
              Fastest
            </p>
            <span className="mt-6 flex items-center gap-3 text-lg font-semibold md:text-xl">
              BOOK A CALL
              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
            <span className="mt-auto pt-6 text-xs opacity-80">
              cal.com/zehanx-technologies-official
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-8 sm:px-6 md:px-10 lg:px-14">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Logo size={22} />
          <span className="font-pixel text-xs text-muted-foreground">
            ZEHANX TECH
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {year} ZehanX Tech. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#about" className="transition-opacity hover:opacity-70">
            About
          </a>
          <a href="#services" className="transition-opacity hover:opacity-70">
            Services
          </a>
          <a href="/pricing" className="transition-opacity hover:opacity-70">Pricing</a>
          <a href="/insights" className="transition-opacity hover:opacity-70">Insights</a>
          <a href="/privacy" className="transition-opacity hover:opacity-70">Privacy</a>
          <a href="/terms" className="transition-opacity hover:opacity-70">Terms</a>
          <a href="/security" className="transition-opacity hover:opacity-70">Security</a>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-opacity hover:opacity-70"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
