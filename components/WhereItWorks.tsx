"use client";

import { useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 2400;

type Slide = {
  src: string;
  title: string;
};

// Same images used in the existing "In Real Spaces" section.
const SLIDES: Slide[] = [
  { src: "/School.png", title: "Classrooms" },
  { src: "/Bank.png", title: "Banking halls" },
  { src: "/Metro.png", title: "Metro platforms" },
  { src: "/Hospital.png", title: "Clinics" },
  { src: "/Corporate.png", title: "Offices" },
  { src: "/Closeup.png", title: "Close-up" },
];

export default function WhereItWorks() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const goPrev = () => setActiveIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % SLIDES.length);

  // Detect when the section is on screen — drives the auto-advance loop.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance the carousel while the section is in view. Resets on every
  // change of activeIdx so manual clicks restart the timer cleanly.
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [inView, activeIdx]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000000",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        paddingTop: "clamp(140px, 16vh, 220px)",
        paddingBottom: "clamp(56px, 8vh, 110px)",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        color: "#ffffff",
      }}
    >
      <style>{`
        @keyframes wiwTitleIn {
          from { opacity: 0; filter: blur(10px); transform: translateY(6px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .wiw-card {
          flex: 0 0 var(--card-w);
          width: var(--card-w);
          aspect-ratio: 1 / 1;
        }
        .wiw-frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          clip-path: inset(15% 0 15% 0 round 28px);
          transition: clip-path 720ms cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 28px;
        }
        .wiw-card.is-active .wiw-frame {
          clip-path: inset(0 0 0 0 round 28px);
        }
        .wiw-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.06);
          display: block;
        }
        .wiw-title-text {
          display: inline-block;
          animation: wiwTitleIn 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .wiw-nav-btn {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          width: clamp(40px, 3vw, 48px);
          height: clamp(40px, 3vw, 48px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 220ms ease;
        }
        .wiw-nav-btn:hover { background: rgba(255, 255, 255, 0.22); }
        @media (prefers-reduced-motion: reduce) {
          .wiw-frame { transition-duration: 1ms !important; }
          .wiw-title-text { animation-duration: 1ms !important; }
        }
      `}</style>

      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(36px, 4.6vw, 76px)",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          margin: 0,
          marginBottom: "clamp(40px, 6vh, 80px)",
          color: "#ffffff",
        }}
      >
        Where it works
      </h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          ["--card-w" as string]: "clamp(300px, 30vw, 480px)",
          ["--gap" as string]: "clamp(12px, 1.2vw, 22px)",
        }}
      >
        {/* Carousel viewport */}
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            style={{
              display: "flex",
              gap: "var(--gap)",
              transform: `translateX(calc(50% - var(--card-w) / 2 - ${activeIdx} * (var(--card-w) + var(--gap))))`,
              transition: "transform 720ms cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform",
            }}
          >
            {SLIDES.map((s, i) => (
              <div
                key={i}
                className={`wiw-card ${i === activeIdx ? "is-active" : ""}`}
              >
                <div className="wiw-frame">
                  <img className="wiw-img" src={s.src} alt={s.title} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active title — fades + blurs in on each change via remount via key */}
        <div
          style={{
            textAlign: "center",
            marginTop: "clamp(20px, 2.5vh, 36px)",
            minHeight: "1.5em",
            fontSize: "clamp(16px, 1.4vw, 22px)",
            fontWeight: 500,
            letterSpacing: "-0.005em",
            color: "#ffffff",
          }}
        >
          <span key={activeIdx} className="wiw-title-text">
            {SLIDES[activeIdx].title}
          </span>
        </div>

        {/* Pagination dots */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "clamp(20px, 2.5vh, 32px)",
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                background: i === activeIdx ? "#ffffff" : "rgba(255, 255, 255, 0.3)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "background 200ms ease",
              }}
            />
          ))}
        </div>

        {/* Prev / next nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "clamp(16px, 2vw, 40px)",
            paddingRight: "clamp(16px, 2vw, 40px)",
            marginTop: "clamp(16px, 2vh, 28px)",
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="wiw-nav-btn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="wiw-nav-btn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
