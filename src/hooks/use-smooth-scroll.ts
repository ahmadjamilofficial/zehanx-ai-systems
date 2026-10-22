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

    // Use the document's real scrolling element so this works regardless of
    // how the host environment wires scrolling.
    const scroller = () =>
      document.scrollingElement ?? document.documentElement;

    const maxScroll = () =>
      scroller().scrollHeight - window.innerHeight;

    const loop = () => {
      current += (target - current) * 0.075;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        active = false;
      } else {
        raf = requestAnimationFrame(loop);
      }
      // "instant" is critical: the page CSS sets scroll-behavior: smooth,
      // which would re-animate every frame and cause erratic jumps.
      scroller().scrollTo({ top: current, behavior: "instant" });
    };

    const onWheel = (e: WheelEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      if (!active) {
        current = scroller().scrollTop;
        target = current;
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
        current = scroller().scrollTop;
        target = current;
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
