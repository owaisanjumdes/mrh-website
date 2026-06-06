"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ShaderCanvas, SHADER_SRC } from "@/components/ui/phosphor-30";

export default function ProductsHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    let raf = 0;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const h = section.offsetHeight;
      // p=0 when section sits at top of viewport, p=1 when scrolled fully past.
      const p = Math.max(0, Math.min(1, -rect.top / h));
      // Push the whole hero (background included) up faster than the page so
      // the next section appears to slide over it.
      const ty = -p * 180;
      const scale = 1 - p * 0.06;
      section.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
      section.style.opacity = String(1 - p * 0.4);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        // Pull the hero up under the now-transparent nav so the image fills
        // the area behind it. Nav still occupies its own row but is z-indexed
        // above this section.
        marginTop: "calc(-1 * (clamp(82px, 8vw, 100px)))",
        overflow: "hidden",
        background: "#0a0a0a",
        color: "#ffffff",
        willChange: "transform, opacity",
        transformOrigin: "center 35%",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <style>{`
        @keyframes paHeroTextIn {
          0% { opacity: 0; transform: scale(1.08); filter: blur(18px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes paHeroTextOut {
          0% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(0.28); filter: blur(10px); }
        }
        @keyframes paHeroImgUp {
          0% { transform: translate3d(0, 100%, 0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate3d(0, 0, 0); opacity: 1; }
        }
        @keyframes paHeroFadeUp {
          0% { opacity: 0; transform: translate3d(0, 16px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .pa-hero-word {
          opacity: 0;
          will-change: opacity, transform, filter;
          animation:
            paHeroTextIn 800ms cubic-bezier(0.22, 1, 0.36, 1) 100ms forwards,
            paHeroTextOut 700ms cubic-bezier(0.55, 0, 0.7, 0.2) 1400ms forwards;
        }
        .pa-hero-img-wrap {
          opacity: 0;
          transform: translate3d(0, 100%, 0);
          will-change: transform, opacity;
          animation: paHeroImgUp 1000ms cubic-bezier(0.22, 1, 0.36, 1) 1400ms forwards;
        }
        .pa-hero-overlay {
          opacity: 0;
          will-change: opacity, transform;
          animation: paHeroFadeUp 800ms cubic-bezier(0.22, 1, 0.36, 1) 2200ms forwards;
        }
        @keyframes paHeroBgIn {
          0% { opacity: 0; }
          100% { opacity: 0.45; }
        }
        @keyframes paHeroBgOut {
          0% { opacity: 0.45; }
          100% { opacity: 0; }
        }
        .pa-hero-bg {
          opacity: 0;
          will-change: opacity;
          animation:
            paHeroBgIn 400ms cubic-bezier(0.22, 1, 0.36, 1) 0ms forwards,
            paHeroBgOut 700ms cubic-bezier(0.55, 0, 0.7, 0.2) 1400ms forwards;
        }
        @keyframes paHeroShine {
          0%   { background-position: 0 0, -120% 0, 0 0; }
          100% { background-position: 0 0,  120% 0, 0 0; }
        }
        .pa-hero-word.pa-hero-word--chrome {
          background-image:
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.32 -0.05'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>"),
            linear-gradient(112deg, transparent 36%, rgba(255, 255, 255, 0.65) 50%, transparent 64%),
            linear-gradient(180deg, #3d3c3b 0%, #b1adaa 22%, #f5f2ec 44%, #ffffff 50%, #f5f2ec 56%, #b1adaa 78%, #3d3c3b 100%);
          background-blend-mode: multiply, screen, normal;
          background-size: 240px 240px, 220% 100%, 100% 100%;
          background-repeat: repeat, no-repeat, no-repeat;
          background-position: 0 0, -120% 0, 0 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation:
            paHeroTextIn 800ms cubic-bezier(0.22, 1, 0.36, 1) 100ms forwards,
            paHeroTextOut 700ms cubic-bezier(0.55, 0, 0.7, 0.2) 1400ms forwards,
            paHeroShine 2400ms cubic-bezier(0.22, 1, 0.36, 1) 300ms forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .pa-hero-word, .pa-hero-img-wrap, .pa-hero-overlay, .pa-hero-bg {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>

      {/* Stage 0: phosphor-30 shader backdrop — fills behind the heavy text,
          then fades out in sync with the cinematic image rise. */}
      <div
        className="pa-hero-bg"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
          background: "#000",
          filter: "grayscale(1)",
        }}
      >
        <ShaderCanvas fragSource={SHADER_SRC} />
      </div>

      {/* Stage 1: centered "PureAir" — fades in heavy, holds, then shrinks/fades out */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <h1
          className="pa-hero-word pa-hero-word--chrome"
          style={{
            margin: 0,
            fontSize: "clamp(48px, 9vw, 160px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textAlign: "center",
            transformOrigin: "center",
            maxWidth: "16ch",
          }}
        >
          From the House of MRH
        </h1>
      </div>

      {/* Stage 2: cinematic image slides up from below */}
      <div
        className="pa-hero-img-wrap"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
        }}
      >
        <img
          src="/PA Products.png"
          alt="PureAir in context"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Tonal overlay — darker at top + bottom so the overlay copy reads cleanly */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Stage 3: overlay copy fades in once the image has landed */}
      <div
        className="pa-hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          // Extra top padding so the microcopy clears the floating nav.
          paddingTop: "calc(clamp(82px, 8vw, 100px) + clamp(20px, 2vw, 40px))",
          paddingRight: "clamp(28px, 4vw, 72px)",
          paddingBottom: "clamp(28px, 4vw, 72px)",
          paddingLeft: "clamp(28px, 4vw, 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        {/* Top-left: microcopy */}
        <div
          style={{
            fontSize: "clamp(11px, 0.9vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.88)",
            lineHeight: 1.3,
          }}
        >
          Engineered for everyday air &middot; Made in India
        </div>

        {/* Bottom row: heading + price/CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(24px, 3vw, 56px)",
            flexWrap: "wrap",
            pointerEvents: "auto",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(36px, 5.6vw, 88px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              color: "#ffffff",
              maxWidth: "18ch",
            }}
          >
            PureAir for the spaces
            <br />
            you breathe in.
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px, 1.8vw, 32px)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: "rgba(255, 255, 255, 0.92)",
                fontSize: "clamp(16px, 1.2vw, 20px)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              From &#8377;39,999
            </span>
            <Link
              href="/products/pureair"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "clamp(12px, 1.2vw, 18px) clamp(20px, 1.8vw, 32px)",
                background: "#ffffff",
                color: "#0a0a0a",
                borderRadius: "9999px",
                fontSize: "clamp(14px, 1.1vw, 17px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              Explore PureAir
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
