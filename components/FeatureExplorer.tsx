"use client";

import { useEffect, useRef, useState } from "react";

type ColorOption = {
  name: string;
  swatch: string;
  border?: string;
};

type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  accent?: string;
  colors?: ColorOption[];
};

const features: Feature[] = [
  {
    id: "colors",
    label: "Colors",
    title: "Colors",
    description:
      "Available in four powder-coated finishes built for institutional deployment — each tuned to disappear into the room it cleans.",
    image: "/PRODUCTSHOT.png",
    accent: "#148042",
    colors: [
      { name: "Stainless", swatch: "#b8b3af" },
      { name: "Charcoal", swatch: "#2a2a2c" },
      { name: "Champagne", swatch: "#d4b896" },
      { name: "Snow", swatch: "#f5f5f5", border: "#d0d0d0" },
    ],
  },
  {
    id: "filtration",
    label: "Multi-stage filter",
    title: "Multi-stage filter",
    description:
      "Pre-filter, activated carbon, HEPA H13, and antimicrobial mesh tuned for India's particulate, gas, and bioaerosol mix.",
    image: "/Multi Stage Filter.png",
  },
  {
    id: "media",
    label: "MANN+HUMMEL HEPA H13",
    title: "MANN+HUMMEL HEPA H13",
    description:
      "German-engineered filter media partner. Captures 99.97% of particles down to 0.3 microns, independently validated by IIT Delhi.",
    image: "/HEPA filter.png",
  },
  {
    id: "sensor",
    label: "Live AQI sensor",
    title: "Live AQI sensor",
    description:
      "Real-time PM 2.5 and AQI display on the front panel. The same air you're breathing, read continuously, surfaced in plain numbers.",
    image: "/AQIMETER.png",
  },
  {
    id: "quiet",
    label: "Whisper-quiet motor",
    title: "Whisper-quiet motor",
    description:
      "Tuned for bedrooms, classrooms, and consultation rooms. Sleep mode drops below 28 dB — softer than a library.",
    image: "/Honeycomb Grill.png",
  },
  {
    id: "chassis",
    label: "Steel chassis",
    title: "Steel chassis",
    description:
      "Powder-coated steel built for institutional deployment cycles. No plastic creak. No warping. Field-serviceable.",
    image: "/STEELBODY.png",
  },
  {
    id: "smart",
    label: "Smart controls",
    title: "Smart controls",
    description:
      "App control, scheduling, and filter-life alerts. Ships ready for the OK Play deployment ops dashboard.",
    image: "/DIGITAL.png",
  },
];

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1V11M1 6H11"
        stroke="#1a1a1a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 10L8 6L12 10"
        stroke="#1a1a1a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6L8 10L12 6"
        stroke="#1a1a1a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const IMG_EXIT_MS = 380;

export default function FeatureExplorer() {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const active = activeIndex >= 0 ? features[activeIndex] : null;
  const displayed = active ?? features[0];

  // Separate state for which image is rendered, so it can lag behind activeIndex
  // during the exit→swap→enter sequence.
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [imgPhase, setImgPhase] = useState<"rest" | "out" | "in">("rest");
  const imgTimers = useRef<number[]>([]);

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      imgTimers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const select = (i: number) => {
    setActiveIndex(i);
    if (i < 0 || i === imgIndex) return;
    // cancel anything pending
    imgTimers.current.forEach((id) => window.clearTimeout(id));
    imgTimers.current = [];
    setImgPhase("out");
    const t1 = window.setTimeout(() => {
      setImgIndex(i);
      setImgPhase("in");
    }, IMG_EXIT_MS);
    imgTimers.current.push(t1);
  };

  const goPrev = () => {
    if (activeIndex <= 0) return;
    select(Math.max(0, activeIndex - 1));
  };
  const goNext = () => {
    if (activeIndex === -1 || activeIndex === features.length - 1) return;
    select(Math.min(features.length - 1, activeIndex + 1));
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-white ${inView ? "mrh-feat-on" : ""}`}
      style={{
        paddingTop: "clamp(96px, 12vw, 200px)",
        paddingBottom: "clamp(96px, 10vw, 176px)",
      }}
    >
      <style>{`
        @keyframes mrhFeatHeadIn {
          0% { opacity: 0; transform: translate3d(-48px, 16px, 0) skewX(-4deg); filter: blur(8px); }
          60% { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) skewX(0); filter: blur(0); }
        }
        @keyframes mrhFeatPillIn {
          0% { opacity: 0; transform: translate3d(-32px, 28px, 0) scale(0.94); }
          70% { transform: translate3d(0, -4px, 0) scale(1.02); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes mrhFeatChevIn {
          0% { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes mrhFeatImgIn {
          0% { opacity: 0; transform: translate3d(120px, 30px, 0) scale(0.86) rotate(-3deg); filter: blur(10px) drop-shadow(0 14px 24px rgba(0, 0, 0, 0.18)) drop-shadow(0 40px 60px rgba(0, 0, 0, 0.14)); }
          55% { opacity: 1; filter: blur(0) drop-shadow(0 14px 24px rgba(0, 0, 0, 0.18)) drop-shadow(0 40px 60px rgba(0, 0, 0, 0.14)); }
          80% { opacity: 1; transform: translate3d(-8px, -6px, 0) scale(1.03) rotate(0.5deg); filter: blur(0) drop-shadow(0 14px 24px rgba(0, 0, 0, 0.18)) drop-shadow(0 40px 60px rgba(0, 0, 0, 0.14)); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1) rotate(0); filter: blur(0) drop-shadow(0 14px 24px rgba(0, 0, 0, 0.18)) drop-shadow(0 40px 60px rgba(0, 0, 0, 0.14)); }
        }
        @keyframes mrhFeatImgOut {
          0% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
          100% { opacity: 0; transform: translate3d(-140px, 0, 0) scale(0.94); }
        }
        @keyframes mrhFeatImgEnter {
          0% { opacity: 0; transform: translate3d(140px, 0, 0) scale(0.94); }
          70% { opacity: 1; transform: translate3d(-6px, 0, 0) scale(1.015); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        .mrh-feat-img-out {
          animation: mrhFeatImgOut ${IMG_EXIT_MS}ms cubic-bezier(0.55, 0, 0.7, 0.2) forwards !important;
        }
        .mrh-feat-img-in-click {
          animation: mrhFeatImgEnter 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
        }
        .mrh-feat-h {
          opacity: 0;
          transform: translate3d(-48px, 16px, 0) skewX(-4deg);
          filter: blur(8px);
          will-change: opacity, transform, filter;
        }
        .mrh-feat-on .mrh-feat-h {
          animation: mrhFeatHeadIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 0ms forwards;
        }
        .mrh-feat-pill {
          opacity: 0;
          transform: translate3d(-32px, 28px, 0) scale(0.94);
          will-change: opacity, transform;
        }
        .mrh-feat-on .mrh-feat-pill {
          animation: mrhFeatPillIn 720ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
          animation-delay: calc(var(--mrh-i, 0) * 80ms + 250ms);
        }
        .mrh-feat-chev {
          opacity: 0;
          transform: scale(0.6);
          will-change: opacity, transform;
        }
        .mrh-feat-on .mrh-feat-chev {
          animation: mrhFeatChevIn 500ms cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
          animation-delay: calc(var(--mrh-i, 0) * 70ms + 200ms);
        }
        .mrh-feat-img {
          opacity: 0;
          transform: translate3d(120px, 30px, 0) scale(0.86) rotate(-3deg);
          will-change: opacity, transform, filter;
        }
        @keyframes mrhNElastic {
          0%   { transform: scaleX(1);    letter-spacing: 0; }
          18%  { transform: scaleX(3);    letter-spacing: 0.85em; }
          30%  { transform: scaleX(2.7);  letter-spacing: 0.75em; }
          42%  { transform: scaleX(3.05); letter-spacing: 0.88em; }
          55%  { transform: scaleX(2.85); letter-spacing: 0.8em; }
          70%  { transform: scaleX(2.9);  letter-spacing: 0.82em; }
          82%  { transform: scaleX(0.82); letter-spacing: -0.04em; }
          90%  { transform: scaleX(1.08); letter-spacing: 0.04em; }
          96%  { transform: scaleX(0.97); letter-spacing: -0.01em; }
          100% { transform: scaleX(1);    letter-spacing: 0; }
        }
        .mrh-feat-n {
          display: inline-block;
          transform-origin: left center;
          will-change: transform, letter-spacing;
        }
        .mrh-feat-on .mrh-feat-n {
          animation: mrhNElastic 2400ms cubic-bezier(0.4, 0, 0.2, 1) 1100ms forwards;
        }
        .mrh-feat-on .mrh-feat-img {
          animation: mrhFeatImgIn 1100ms cubic-bezier(0.22, 1, 0.36, 1) 350ms forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .mrh-feat-h, .mrh-feat-pill, .mrh-feat-chev, .mrh-feat-img {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          paddingLeft: "clamp(20px, 8.85%, 127px)",
          paddingRight: "clamp(20px, 8.85%, 127px)",
        }}
      >
        <h2
          style={{
            fontFamily:
              "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--ink)",
            margin: "0 0 clamp(40px, 5vw, 80px) 0",
          }}
        >
          What&rsquo;s inside
        </h2>

        <div
          className="flex flex-col md:flex-row md:items-start"
          style={{ gap: "clamp(40px, 5vw, 88px)" }}
        >
          {/* Pills column (with chevron nav on desktop) */}
          <div
            className="flex w-full md:flex-1"
            style={{ gap: "16px", maxWidth: "min(100%, 560px)" }}
          >
            {/* Chevron nav — desktop only */}
            <div className="hidden md:flex flex-col gap-[10px] pt-[6px]">
              <button
                onClick={goPrev}
                disabled={activeIndex <= 0}
                aria-label="Previous feature"
                className="mrh-feat-chev rounded-full bg-[#f3f4f6] flex items-center justify-center transition-opacity disabled:opacity-30 hover:bg-[#eaebee] cursor-pointer disabled:cursor-default"
                style={{ width: "44px", height: "44px", ["--mrh-i" as string]: 0 }}
              >
                <ChevronUp />
              </button>
              <button
                onClick={goNext}
                disabled={activeIndex === -1 || activeIndex === features.length - 1}
                aria-label="Next feature"
                className="mrh-feat-chev rounded-full bg-[#f3f4f6] flex items-center justify-center transition-opacity disabled:opacity-30 hover:bg-[#eaebee] cursor-pointer disabled:cursor-default"
                style={{ width: "44px", height: "44px", ["--mrh-i" as string]: 1 }}
              >
                <ChevronDown />
              </button>
            </div>

            {/* Feature pills */}
            <div className="flex flex-col flex-1" style={{ gap: "12px" }}>
              {features.map((f, i) => {
                const isActive = i === activeIndex;
                const easing = "cubic-bezier(0.32, 0.72, 0, 1)";
                const duration = "560ms";
                return (
                  <button
                    key={f.id}
                    onClick={() => select(i)}
                    aria-expanded={isActive}
                    className={`mrh-feat-pill text-left cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-[#2a2a2c] hover:bg-[#303033]"
                        : "bg-[#f3f4f6] hover:bg-[#eaebee]"
                    }`}
                    style={{
                      borderRadius: "22px",
                      paddingLeft: "26px",
                      paddingRight: "26px",
                      paddingTop: isActive ? "22px" : "16px",
                      paddingBottom: isActive ? "22px" : "16px",
                      border: isActive
                        ? "1px solid rgba(255, 255, 255, 0.10)"
                        : "1px solid rgba(0, 0, 0, 0.06)",
                      boxShadow: isActive
                        ? "inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 1px 0 rgba(0, 0, 0, 0.4), 0 12px 32px -10px rgba(0, 0, 0, 0.45), 0 0 22px -8px rgba(0, 0, 0, 0.5)"
                        : "inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 1px 2px rgba(15, 15, 20, 0.04), 0 8px 22px -10px rgba(15, 15, 20, 0.12)",
                      fontFamily:
                        "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
                      transitionProperty:
                        "padding, background-color, border-color, box-shadow",
                      transitionDuration: duration,
                      transitionTimingFunction: easing,
                      willChange: "padding, box-shadow",
                      ["--mrh-i" as string]: i,
                    }}
                  >
                    {/* Closed-state row (label + icon) — collapses via grid-row */}
                    <div
                      className="grid"
                      style={{
                        gridTemplateRows: isActive ? "0fr" : "1fr",
                        transition: `grid-template-rows ${duration} ${easing}, opacity ${duration} ${easing}`,
                        opacity: isActive ? 0 : 1,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="flex items-center"
                          style={{ gap: "14px" }}
                        >
                          {f.accent ? (
                            <span
                              aria-hidden
                              className="rounded-full shrink-0"
                              style={{
                                width: "14px",
                                height: "14px",
                                background: f.accent,
                              }}
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="rounded-full bg-white flex items-center justify-center shrink-0"
                              style={{
                                width: "22px",
                                height: "22px",
                                border: "1px solid #d0d0d0",
                              }}
                            >
                              <PlusIcon />
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: "clamp(15px, 1.1vw, 17px)",
                              fontWeight: 600,
                              color: "#1a1a1a",
                              lineHeight: 1.25,
                            }}
                          >
                            {f.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Open-state row (title + description + swatches) — grows via grid-row */}
                    <div
                      className="grid"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        transition: `grid-template-rows ${duration} ${easing}, opacity ${duration} ${easing}`,
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="flex flex-col"
                          style={{ gap: "14px" }}
                        >
                          <p
                            style={{
                              fontSize: "clamp(15px, 1.1vw, 17px)",
                              lineHeight: 1.5,
                              color: "#ffffff",
                              margin: 0,
                            }}
                          >
                            <span style={{ fontWeight: 700 }}>{f.title}.</span>{" "}
                            <span
                              style={{ fontWeight: 400, color: "rgba(255,255,255,0.72)" }}
                            >
                              {f.description}
                            </span>
                          </p>

                          {f.colors ? (
                            <div
                              className="flex items-center"
                              style={{ gap: "14px", flexWrap: "wrap" }}
                            >
                              {f.colors.map((c) => (
                                <div
                                  key={c.name}
                                  className="flex items-center"
                                  style={{ gap: "8px" }}
                                >
                                  <span
                                    aria-hidden
                                    className="rounded-full shrink-0"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      background: c.swatch,
                                      border: c.border
                                        ? `1px solid ${c.border}`
                                        : "none",
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      color: "#ffffff",
                                    }}
                                  >
                                    {c.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product image */}
          <div className="w-full md:flex-1 flex items-start justify-center">
            <img
              className={`mrh-feat-img ${
                imgPhase === "out"
                  ? "mrh-feat-img-out"
                  : imgPhase === "in"
                    ? "mrh-feat-img-in-click"
                    : ""
              }`}
              src={features[imgIndex].image}
              alt={features[imgIndex].label}
              style={{
                width: "100%",
                maxWidth: "clamp(360px, 44vw, 720px)",
                aspectRatio: "1402 / 1122",
                height: "auto",
                objectFit: "cover",
                display: "block",
                borderRadius: "clamp(20px, 2vw, 32px)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
