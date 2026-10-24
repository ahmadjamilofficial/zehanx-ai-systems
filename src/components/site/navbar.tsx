import { useEffect, useState } from "react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import {
  isSoundEnabled,
  onSoundEnabledChange,
  setSoundEnabled,
} from "@/lib/sounds";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "WORK", href: "#work" },
  { label: "INDUSTRIES", href: "#industries" },
  { label: "TALK", href: "#contact" },
];

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-6 md:px-10 lg:px-14">
          <a
            href="#top"
            aria-label="ZehanX Tech home"
            className="text-foreground transition-opacity hover:opacity-70"
          >
            <Logo />
          </a>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] text-foreground transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2 text-foreground transition-opacity hover:opacity-70 md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-6">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label="ZehanX Tech home"
            className="text-foreground"
          >
            <Logo />
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 text-foreground transition-opacity hover:opacity-70"
          >
            <X size={24} />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col items-center justify-center gap-8"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-2xl tracking-widest text-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="pb-10 text-center text-xs text-muted-foreground">
          zehanxtech@gmail.com
        </div>
      </div>
    </>
  );
}
