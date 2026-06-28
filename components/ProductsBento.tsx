"use client";

import { useEffect, useRef, useState } from "react";

const cardStyle = {
  background: "#000000",
  width: "100%",
  height: "100vh",
  position: "relative" as const,
  overflow: "hidden" as const,
} as const;

const imgBase = {
  position: "absolute" as const,
  top: 0,
  height: "100%",
  width: "auto",
  maxWidth: "75%",
  objectFit: "contain" as const,
  display: "block" as const,
  pointerEvents: "none" as const,
} as const;

const FADE_TOP =
  "linear-gradient(180deg, transparent 0%, #000 9%, #000 100%)";
const FADE_BOTTOM =
  "linear-gradient(180deg, #000 0%, #000 91%, transparent 100%)";
const FADE_BOTH =
  "linear-gradient(180deg, transparent 0%, #000 9%, #000 91%, transparent 100%)";

const maskStyle = (mask: string) => ({
  WebkitMaskImage: mask,
  maskImage: mask,
  WebkitMaskRepeat: "no-repeat" as const,
  maskRepeat: "no-repeat" as const,
  WebkitMaskSize: "100% 100%" as const,
  maskSize: "100% 100%" as const,
});

const headingStyle = {
  margin: 0,
  fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  fontSize: "clamp(44px, 6vw, 112px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 0.95,
  color: "#ffffff",
} as const;

const subStyle = {
  margin: "clamp(14px, 1.4vw, 24px) 0 0 0",
  fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  fontSize: "clamp(13px, 1vw, 17px)",
  fontWeight: 400,
  letterSpacing: "-0.005em",
  lineHeight: 1.5,
  color: "rgba(255, 255, 255, 0.78)",
  maxWidth: "44ch",
} as const;

function CardText({
  side,
  heading,
  sub,
  revealed,
}: {
  side: "left" | "right";
  heading: string;
  sub: string;
  revealed: boolean;
}) {
  // Wait for the image fade (1500ms) to be mostly settled before the text starts.
  const headingDelay = "1200ms";
  const subDelay = "1550ms";
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  const dur = "1400ms";

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        [side]: 0,
        transform: "translateY(-50%)",
        paddingLeft: "clamp(24px, 4vw, 80px)",
        paddingRight: "clamp(24px, 4vw, 80px)",
        maxWidth: "min(44%, 560px)",
        textAlign: side,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <h3
        style={{
          ...headingStyle,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(14px)",
          transition: `opacity ${dur} ${easing} ${headingDelay}, transform ${dur} ${easing} ${headingDelay}`,
          willChange: "opacity, transform",
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          ...subStyle,
          marginLeft: side === "right" ? "auto" : 0,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(14px)",
          transition: `opacity ${dur} ${easing} ${subDelay}, transform ${dur} ${easing} ${subDelay}`,
          willChange: "opacity, transform",
        }}
      >
        {sub}
      </p>
    </div>
  );
}

export default function ProductsBento() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setShown((prev) => {
                if (prev[i]) return prev;
                const next = prev.slice();
                next[i] = true;
                return next;
              });
              io.disconnect();
              break;
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  };

  const revealStyle = (i: number) => ({
    opacity: shown[i] ? 1 : 0,
    transition:
      "opacity 1500ms cubic-bezier(0.33, 1, 0.68, 1), transform 1500ms cubic-bezier(0.33, 1, 0.68, 1)",
    transform: shown[i] ? "scale(1)" : "scale(1.035)",
  });

  return (
    <section
      style={{
        background: "#ffffff",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Stack of four full-viewport rectangles with small white gaps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          paddingBottom: "clamp(48px, 8vh, 96px)",
        }}
      >
        <div ref={setCardRef(0)} style={cardStyle}>
          <img loading="lazy"
            src="/HCC.png"
            alt=""
            aria-hidden
            style={{
              ...imgBase,
              right: 0,
              objectPosition: "right center",
              ...maskStyle(FADE_BOTTOM),
              ...revealStyle(0),
            }}
          />
          <CardText
            side="left"
            heading="The intake"
            sub="A honeycomb grille pulls air in from every direction. More surface, more airflow, faster clearing across the whole room."
            revealed={shown[0]}
          />
        </div>
        <div ref={setCardRef(1)} style={cardStyle}>
          <img loading="lazy"
            src="/AQIMC.png"
            alt=""
            aria-hidden
            style={{
              ...imgBase,
              left: 0,
              objectPosition: "left center",
              ...maskStyle(FADE_BOTH),
              ...revealStyle(1),
            }}
          />
          <CardText
            side="right"
            heading="The reading"
            sub="A live PM2.5 sensor shows the room's real air quality on the panel and adjusts the unit automatically. You see the number fall in real time."
            revealed={shown[1]}
          />
        </div>
        <div ref={setCardRef(2)} style={cardStyle}>
          <img loading="lazy"
            src="/SBC.png"
            alt=""
            aria-hidden
            style={{
              ...imgBase,
              left: 0,
              objectPosition: "left center",
              ...maskStyle(FADE_BOTH),
              ...revealStyle(2),
            }}
          />
          <CardText
            side="right"
            heading="The body"
            sub="A sealed steel chassis rated for years of daily commercial use. No flimsy plastic, no rattle, no annual replacement."
            revealed={shown[2]}
          />
        </div>
        <div ref={setCardRef(3)} style={cardStyle}>
          <img loading="lazy"
            src="/SVC.png"
            alt=""
            aria-hidden
            style={{
              ...imgBase,
              right: 0,
              objectPosition: "right center",
              ...maskStyle(FADE_TOP),
              ...revealStyle(3),
            }}
          />
          <CardText
            side="left"
            heading="The output"
            sub="MANN+HUMMEL HEPA H13-filtered air leaves through the side vents in a steady, quiet stream that reaches the entire space."
            revealed={shown[3]}
          />
        </div>
      </div>
    </section>
  );
}
