import { useEffect, useState } from "react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import {
  isSoundEnabled,
  onSoundEnabledChange,
  setSoundEnabled,
} from "@/lib/sounds";

const NAV_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "PLAN PROJECT", href: "/plan-project" },
  { label: "SERVICES", href: "/services/custom-software" },
  { label: "PROCESS", href: "/#process" },
  { label: "WORK", href: "/work" },
  { label: "INDUSTRIES", href: "/industries/finance" },
  { label: "TALK", href: "/contact" },
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

function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());
    return onSoundEnabledChange(setEnabled);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!enabled)}
      aria-label={enabled ? "Mute interface sounds" : "Unmute interface sounds"}
      aria-pressed={enabled}
      className="p-2 text-foreground transition-opacity hover:opacity-70"
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
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
            href="/"
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
          <div className="flex items-center gap-1">
            <SoundToggle />
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="zehanx-mobile-navigation"
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line bg-background/80 p-2 text-foreground shadow-sm transition-colors hover:border-foreground/40 hover:bg-background md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="zehanx-mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex min-h-[100dvh] flex-col overflow-y-auto bg-background/98 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-[opacity,visibility] duration-300 ${
          open ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <a
            href="/"
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
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line p-2 text-foreground transition-colors hover:border-foreground/40"
          >
            <X size={22} />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-8 sm:gap-7"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`text-xl tracking-[0.16em] text-foreground transition-all duration-300 sm:text-2xl sm:tracking-widest ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 flex-col items-center gap-3 border-t border-line px-5 py-5">
          <SoundToggle />
          <a href="mailto:zehanxtech@gmail.com" className="break-all text-center text-xs text-muted-foreground">
            zehanxtech@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
