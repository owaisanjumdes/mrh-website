"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Stat = {
  topLabel: string;
  metric: string;
  // Numeric value to animate up to.
  bigValue: number;
  // Number of decimal places to display.
  bigDecimals: number;
  // Anything appended after the number (e.g. "%", "+").
  bigSuffix?: string;
  // Whether to format the integer part with thousands commas.
  bigCommas?: boolean;
  description: ReactNode;
  // Full-screen image revealed when the user clicks the plus button.
  image: string;
};

const STATS: Stat[] = [
  {
    topLabel: "Scale",
    metric: "Coverage",
    bigValue: 2000,
    bigDecimals: 0,
    bigCommas: true,
    description: "sq ft cleared in 10 minutes per unit.",
    image: "/scale.png",
  },
  {
    topLabel: "Purity",
    metric: "Filtration",
    bigValue: 99.95,
    bigDecimals: 2,
    bigSuffix: "%",
    description: "HEPA H13 capture, independently tested on PM2.5.",
    image: "/Purity.png",
  },
  {
    topLabel: "Deployment",
    metric: "Deployments",
    bigValue: 200,
    bigDecimals: 0,
    bigSuffix: "+",
    description: "Buildings actively running PureAir across India.",
    image: "/deployment.png",
  },
];

const COUNTER_DURATION_MS = 1400;
const CARD_BASE_DELAY_MS = 220; // delay before first card starts pushing up
const CARD_STAGGER_MS = 140;
const HEADING_DURATION_MS = 700;

function formatStat(value: number, stat: Stat) {
  let s = value.toFixed(stat.bigDecimals);
  if (stat.bigCommas) {
    const [intPart, decPart] = s.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    s = decPart ? `${withCommas}.${decPart}` : withCommas;
  }
  return s + (stat.bigSuffix ?? "");
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function StatCard({
  stat,
  index,
  play,
  onOpen,
}: {
  stat: Stat;
  index: number;
  play: boolean;
  onOpen: (stat: Stat) => void;
}) {
  const [display, setDisplay] = useState(() => formatStat(0, stat));

  // Counter animation
  useEffect(() => {
    if (!play) return;
    const startDelay = CARD_BASE_DELAY_MS + index * CARD_STAGGER_MS + 200;
    const startAt = performance.now() + startDelay;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / COUNTER_DURATION_MS);
      const eased = easeOutCubic(t);
      setDisplay(formatStat(stat.bigValue * eased, stat));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, index, stat]);

  const cardDelay = CARD_BASE_DELAY_MS + index * CARD_STAGGER_MS;
  const textDelay = cardDelay + 280; // inner text fades in after card lands

  return (
    <div
      className="po-card"
      style={{
        ["--po-card-delay" as string]: `${cardDelay}ms`,
        position: "relative",
        background: "#ffffff",
        borderRadius: "20px",
        color: "#0b0b0b",
        padding: "clamp(28px, 2.8vw, 48px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(20px, 1.8vw, 28px)",
        textAlign: "center",
        aspectRatio: "1 / 1",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        opacity: 0,
        transform: "translateY(36px)",
        willChange: "transform, opacity",
      }}
    >
      <span
        className="po-text"
        style={{
          ["--po-text-delay" as string]: `${textDelay}ms`,
          fontSize: "clamp(16px, 1.25vw, 22px)",
          fontWeight: 500,
          color: "#148042",
          letterSpacing: "-0.005em",
          lineHeight: 1.2,
        }}
      >
        {stat.topLabel}
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(8px, 0.8vw, 14px)",
          width: "100%",
        }}
      >
        <span
          className="po-text"
          style={{
            ["--po-text-delay" as string]: `${textDelay + 80}ms`,
            fontSize: "clamp(56px, 6vw, 108px)",
            fontWeight: 700,
            color: "#0b0b0b",
            letterSpacing: "-0.035em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {display}
        </span>
        <p
          className="po-text"
          style={{
            ["--po-text-delay" as string]: `${textDelay + 140}ms`,
            margin: 0,
            fontSize: "clamp(14px, 1.1vw, 19px)",
            fontWeight: 400,
            color: "#4d4d4d",
            lineHeight: 1.4,
            letterSpacing: "-0.005em",
            maxWidth: "26ch",
          }}
        >
          {stat.description}
        </p>
      </div>

      <button
        type="button"
        aria-label={`Open ${stat.metric} detail`}
        onClick={() => onOpen(stat)}
        className="po-text po-plus"
        style={{
          ["--po-text-delay" as string]: `${textDelay + 220}ms`,
          position: "absolute",
          bottom: "clamp(16px, 1.6vw, 28px)",
          right: "clamp(16px, 1.6vw, 28px)",
          color: "#ffffff",
          border: "none",
          borderRadius: "9999px",
          width: "clamp(40px, 3.2vw, 56px)",
          height: "clamp(40px, 3.2vw, 56px)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg
          width="50%"
          height="50%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

export default function ProvenOutput() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [play, setPlay] = useState(false);
  const [activeStat, setActiveStat] = useState<Stat | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPlay(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!activeStat) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveStat(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeStat]);

  return (
    <section
      ref={sectionRef}
      className={play ? "po-section po-play" : "po-section"}
      style={{
        background: "#148042",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "clamp(20px, 4vw, 80px)",
        paddingRight: "clamp(20px, 4vw, 80px)",
        paddingTop: "clamp(48px, 8vh, 120px)",
        paddingBottom: "clamp(48px, 8vh, 120px)",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        color: "#ffffff",
      }}
    >
      <style>{`
        @keyframes poFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes poCardRise {
          from { opacity: 0; transform: translateY(36px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes poTextFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .po-heading { opacity: 0; transform: translateY(12px); will-change: opacity, transform; }
        .po-section.po-play .po-heading {
          animation: poFadeIn ${HEADING_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .po-section.po-play .po-card {
          animation: poCardRise 720ms cubic-bezier(0.22, 1, 0.36, 1) var(--po-card-delay, 0ms) forwards;
        }
        .po-text { opacity: 0; will-change: opacity, transform; }
        .po-section.po-play .po-text {
          animation: poTextFade 520ms cubic-bezier(0.22, 1, 0.36, 1) var(--po-text-delay, 0ms) forwards;
        }
        .po-plus {
          position: absolute;
          overflow: hidden;
          isolation: isolate;
          background: #0b0b0b;
          transition: color 420ms cubic-bezier(0.65, 0, 0.35, 1);
        }
        .po-plus::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #148042;
          transform: translateX(-101%);
          transition: transform 520ms cubic-bezier(0.65, 0, 0.35, 1);
          z-index: -1;
          will-change: transform;
        }
        .po-plus:hover::before { transform: translateX(0); }
        @media (prefers-reduced-motion: reduce) {
          .po-section.po-play .po-heading,
          .po-section.po-play .po-card,
          .po-section.po-play .po-text {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

      <h2
        className="po-heading"
        style={{
          margin: 0,
          fontSize: "clamp(32px, 3.6vw, 60px)",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          marginBottom: "clamp(32px, 5vh, 64px)",
          textAlign: "center",
        }}
      >
        Proven output
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 360px))",
          gap: "clamp(16px, 1.8vw, 32px)",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {STATS.map((stat, i) => (
          <StatCard
            key={i}
            stat={stat}
            index={i}
            play={play}
            onOpen={setActiveStat}
          />
        ))}
      </div>

      {activeStat ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStat.metric} detail`}
          onClick={() => setActiveStat(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8, 8, 8, 0.92)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            animation: "poOverlayIn 360ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setActiveStat(null);
            }}
            style={{
              position: "absolute",
              top: "clamp(16px, 2vw, 32px)",
              right: "clamp(16px, 2vw, 32px)",
              background: "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.24)",
              borderRadius: "9999px",
              width: "44px",
              height: "44px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            src={activeStat.image}
            alt={activeStat.metric}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: "16px",
              cursor: "default",
              animation:
                "poOverlayImgIn 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          />
          <style>{`
            @keyframes poOverlayIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes poOverlayImgIn {
              from { opacity: 0; transform: scale(0.97); }
              to { opacity: 1; transform: scale(1); }
            }
            @media (prefers-reduced-motion: reduce) {
              [role="dialog"], [role="dialog"] img {
                animation-duration: 1ms !important;
              }
            }
          `}</style>
        </div>
      ) : null}
    </section>
  );
}
