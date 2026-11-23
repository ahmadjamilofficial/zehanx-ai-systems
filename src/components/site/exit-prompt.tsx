import { useEffect, useState } from "react";
import { CAL_URL } from "@/lib/site";

export function ExitPrompt() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("zehanx-exit-prompt-shown")) return;
    let lastY = window.scrollY;
    const timer: ReturnType<typeof setTimeout> = window.setTimeout(show, 60000);
    const show = () => {
      if (sessionStorage.getItem("zehanx-exit-prompt-shown")) return;
      sessionStorage.setItem("zehanx-exit-prompt-shown", "1");
      setOpen(true);
      window.clearTimeout(timer);
    };
    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0) show();
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (window.innerWidth < 768 && lastY - y > 80 && y > 320) show();
      lastY = y;
    };
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  if (!open) return null;
  return <aside role="dialog" aria-labelledby="exit-prompt-title" aria-describedby="exit-prompt-description" className="fixed bottom-20 right-4 z-50 w-[min(92vw,360px)] border border-line bg-background p-5 shadow-2xl md:bottom-5">
    <button type="button" onClick={() => setOpen(false)} aria-label="Dismiss project prompt" className="absolute right-3 top-3 text-xs text-muted-foreground">CLOSE</button>
    <p className="font-pixel text-[10px] tracking-widest text-accent">BEFORE YOU GO</p>
    <h2 id="exit-prompt-title" className="mt-3 pr-10 text-lg font-semibold">Still shaping an idea?</h2>
    <p id="exit-prompt-description" className="mt-2 text-sm leading-relaxed text-muted-foreground">Turn the rough outline into a project brief, or talk directly with the team.</p>
    <div className="mt-4 flex flex-wrap gap-2">
      <a href="#idea-studio" onClick={() => setOpen(false)} className="bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">OPEN IDEA STUDIO</a>
      <a href={CAL_URL} target="_blank" rel="noreferrer" className="border border-line px-4 py-2 text-xs">BOOK A CALL</a>
    </div>
  </aside>;
}
