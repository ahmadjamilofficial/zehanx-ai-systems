import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CAL_URL, HERO_VIDEO_URL } from "@/lib/site";
import heroPoster from "@/assets/hero-poster.jpg";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Keep the footage playing: some browsers pause muted autoplay videos
  // (power saving, tab focus changes), which leaves only the poster frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attempt = () => {
      const playback = video.play();
      if (playback) playback.catch(() => {});
    };
    const resume = () => {
      if (video.paused && !video.ended) attempt();
    };

    attempt();
    const timer = window.setTimeout(attempt, 250);
    const onPause = () => window.setTimeout(resume, 60);
    const onCanPlay = () => resume();

    window.addEventListener("pointerdown", resume);
    window.addEventListener("touchstart", resume, { passive: true });
    window.addEventListener("focus", resume);
    video.addEventListener("pause", onPause);
    video.addEventListener("canplay", onCanPlay);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("focus", resume);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  // Parallax: the hero footage drifts slower than the page as you scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y =
        (document.scrollingElement?.scrollTop ?? 0) || window.scrollY;
      video.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.25)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Watchdog: some browsers freeze a muted autoplay video (a cached failed
  // load, a stalled stream, power saving). If the playhead stops advancing
  // while the video should be playing, reload the source and resume. The
  // error path refetches with a cache-busting query so a cached 404 can't
  // stick.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const baseSrc = video.src;
    let retried = false;
    let lastTime = -1;
    let stalls = 0;

    const restart = () => {
      const t = video.currentTime;
      video.load();
      const resume = () => {
        video.removeEventListener("loadeddata", resume);
        try {
          if (t > 0 && Number.isFinite(t)) video.currentTime = t % video.duration;
        } catch {
          // seeking unavailable yet — starting from 0 is fine
        }
        const p = video.play();
        if (p) p.catch(() => {});
      };
      video.addEventListener("loadeddata", resume);
    };

    const onError = () => {
      if (retried) {
        // If retry fails, hide video and show fallback
        setVideoError(true);
        return;
      }
      retried = true;
      video.src = `${baseSrc}${baseSrc.includes("?") ? "&" : "?"}r=${Date.now()}`;
      restart();
    };

    const interval = window.setInterval(() => {
      if (document.hidden || !video.isConnected) return;
      if (video.error) {
        onError();
        return;
      }
      if (video.paused || video.ended || video.readyState < 2) return;
      const t = video.currentTime;
      if (Math.abs(t - lastTime) < 0.05) {
        stalls += 1;
        if (stalls >= 4) {
          stalls = 0;
          restart();
        }
      } else {
        stalls = 0;
      }
      lastTime = t;
    }, 500);

    video.addEventListener("error", onError);
    return () => {
      window.clearInterval(interval);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground"
      aria-labelledby="hero-heading"
    >
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ transform: "scale(1.25)" }}
          src={HERO_VIDEO_URL}
          poster={heroPoster}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Hero video showing abstract data visualization representing machine learning and data infrastructure"
        />
      )}
      {videoError && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center will-change-transform"
          style={{ transform: "scale(1.25)", backgroundImage: `url(${heroPoster})` }}
          role="img"
          aria-label="Hero image showing abstract data visualization representing machine learning and data infrastructure"
        />
      )}
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
              from complex data to
              <br />
              production-ready intelligence
            </p>
          </div>
          <div className="text-left">
            <h2 className="text-lg leading-tight tracking-wide md:text-xl">
              SOFTWARE &amp; SYSTEMS
              <br />
              <span className="font-pixel text-2xl md:text-3xl">BUILT SMARTER</span>
            </h2>
          </div>
          <div>
            <p className="mb-3 font-pixel text-base uppercase tracking-widest text-muted-foreground">
              What we do
            </p>
            <p className="max-w-[240px] text-sm leading-relaxed text-foreground/90">
              We design and build software, websites and business systems, with AI as an engineering advantage
            </p>
          </div>
          <div>
            <p className="mb-3 font-pixel text-base uppercase tracking-widest text-muted-foreground">
              Core Services
            </p>
            <ul className="space-y-0.5 text-sm leading-relaxed text-foreground/90">
              <li>Data Engineering</li>
              <li>ML Development</li>
              <li>Model Evaluation</li>
              <li>Deployment</li>
            </ul>
          </div>
        </div>

        <div className="flex-1" />

        <div className="pb-4">
          <div className="grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-2">
            <h1
              id="hero-heading"
              className="text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
              style={{ lineHeight: 0.88 }}
            >
              SOFTWARE, SYSTEMS
              <br />
              <span className="inline-block font-pixel text-[1.25em] font-normal leading-none">
                &amp; WEBSITES
              </span>
              <br />
              ENGINEERED WITH
              <br />
              <span className="inline-block font-pixel text-[1.25em] font-normal leading-none">
                INTELLIGENCE
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
              <a href="/plan-project" className="flex items-center gap-3 self-start border border-accent bg-accent px-6 py-3 text-sm font-semibold tracking-wider text-accent-foreground transition-colors hover:bg-accent/90 lg:self-end"><ArrowUpRight size={14} /> PLAN YOUR PROJECT</a>
              <div className="flex flex-wrap items-stretch gap-2 text-sm text-foreground/80 sm:gap-3">
                <span className="flex items-center bg-card px-3 py-2 sm:px-4">
                  <span className="font-pixel text-xs tracking-tight sm:text-sm">
                    CUSTOM SOFTWARE
                  </span>
                </span>
                <span className="flex items-center gap-2 bg-card px-3 py-2 sm:px-4">
                  <span className="text-base font-bold sm:text-lg">ML</span>
                  <span className="text-xs text-muted-foreground">SYSTEMS</span>
                </span>
                <span className="flex items-center bg-card px-3 py-2 sm:px-4">
                  <span className="text-[10px] font-bold tracking-tight sm:text-xs">
                    AI &amp; DATA
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
