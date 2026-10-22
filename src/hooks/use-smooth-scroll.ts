import { useEffect } from "react";

/**
 * Awwwards-style slow scroll: wheel input is eased with a lerp loop so the
 * page glides instead of jumping. Native scrolling (anchor links, keyboard,
 * touch) is left untouched and stays in sync.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target = window.scrollY;
    let current = target;
    let raf = 0;
    let active = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const loop = () => {
      current += (target - current) * 0.075;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        active = false;
      } else {
        raf = requestAnimationFrame(loop);
      }
      window.scrollTo(0, current);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      if (!active) {
        current = window.scrollY;
        target = window.scrollY;
      }
      const delta =
        e.deltaMode === 1
          ? e.deltaY * 16
          : e.deltaMode === 2
            ? e.deltaY * window.innerHeight
            : e.deltaY;
      target = Math.max(0, Math.min(maxScroll(), target + delta));
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };

    // Keep in sync when something else scrolls the page (anchors, keyboard).
    const onNativeScroll = () => {
      if (!active) {
        current = window.scrollY;
        target = window.scrollY;
      }
    };

    // An anchor click hands control back to native smooth scrolling.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (anchor) {
        active = false;
        cancelAnimationFrame(raf);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
    };
  }, []);
}
