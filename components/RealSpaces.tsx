"use client";

import { useEffect, useRef } from "react";

type Space = {
  src: string;
  alt: string;
};

const SPACES: Space[] = [
  { src: "/School.png", alt: "PureAir wall-mounted in a classroom" },
  { src: "/Bank.png", alt: "PureAir wall-mounted in a banking hall" },
  { src: "/Metro.png", alt: "PureAir wall-mounted on a metro platform" },
  { src: "/Hospital.png", alt: "PureAir wall-mounted in a clinic" },
  { src: "/Corporate.png", alt: "PureAir wall-mounted in an office" },
  { src: "/Closeup.png", alt: "PureAir close-up" },
];

export default function RealSpaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf: number | null = null;
    let maxTranslate = 0;

    const SCROLL_BUFFER_PX = 120; // small entry buffer so the first card doesn't jump on stick
    const PACE_FACTOR = 2.0; // >1 = slower scroll-to-pan ratio (matches the old 1000vh feel)

    const measureMax = () => {
      // Reset to neutral position so the last card's true right edge can be read.
      track.style.transform = "translate3d(0, 0, 0)";
      const lastCard = track.lastElementChild as HTMLElement | null;
      if (lastCard) {
        const rect = lastCard.getBoundingClientRect();
        maxTranslate = Math.max(0, rect.right - window.innerWidth);
      }
      // Pin the section's height to exactly the scroll the carousel needs:
      // 100vh (the sticky window) + the horizontal distance to travel (scaled by PACE_FACTOR
      // so the cadence stays calm). Result: scroll ends precisely when the last card
      // hits the right edge — no wasted pinned scroll afterwards.
      const required = Math.round(
        window.innerHeight + maxTranslate * PACE_FACTOR + SCROLL_BUFFER_PX,
      );
      section.style.height = `${required}px`;
    };

    const update = () => {
      raf = null;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const scrollRange = Math.max(1, sectionHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));
      track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    };

    const schedule = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measureMax();
      schedule();
    };

    measureMax();
    update();

    // Re-measure as each carousel image finishes decoding — their intrinsic
    // dimensions only become available after load, and they drive the track's
    // total width (and therefore the section's required scroll budget).
    const imgs = Array.from(track.querySelectorAll("img")) as HTMLImageElement[];
    const onImgReady = () => {
      measureMax();
      schedule();
    };
    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) return;
      img.addEventListener("load", onImgReady);
      img.addEventListener("error", onImgReady);
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onImgReady);
        img.removeEventListener("error", onImgReady);
      });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{
        position: "relative",
        // initial height; JS replaces with a px value sized to the actual scroll distance.
        height: "200vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        {/* Heading */}
        <div
          className="mx-auto"
          style={{
            maxWidth: "1440px",
            width: "100%",
            paddingLeft: "clamp(24px, 4vw, 72px)",
            paddingRight: "clamp(24px, 4vw, 72px)",
            marginBottom: "clamp(32px, 4vw, 64px)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px, 4.2vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#1a1a1a",
              fontFamily:
                "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
            }}
          >
            In real spaces.
          </h2>
          <p
            style={{
              margin: "clamp(12px, 1.5vw, 24px) 0 0 0",
              fontSize: "clamp(15px, 1.2vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#444",
              maxWidth: "60ch",
              fontFamily:
                "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
            }}
          >
            PureAir, wall-mounted and working &mdash; across classrooms, banks,
            metro platforms, clinics, and offices.
          </p>
        </div>

        {/* Track wrapper — same mx-auto + padding as the heading so the first
            card's left edge aligns with the heading's text. Cards overflow this
            wrapper to the right; the sticky parent's overflow: hidden clips
            them at the viewport edge. */}
        <div
          className="mx-auto"
          style={{
            flex: 1,
            minHeight: 0,
            maxWidth: "1440px",
            width: "100%",
            paddingLeft: "clamp(24px, 4vw, 72px)",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "clamp(16px, 1.6vw, 28px)",
              willChange: "transform",
            }}
          >
            {SPACES.map((s) => (
              <img loading="lazy"
                key={s.src}
                src={s.src}
                alt={s.alt}
                style={{
                  flexShrink: 0,
                  maxWidth: "clamp(300px, 68vw, 1200px)",
                  maxHeight: "min(62vh, 680px)",
                  width: "auto",
                  height: "auto",
                  display: "block",
                  borderRadius: "clamp(16px, 1.6vw, 28px)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
