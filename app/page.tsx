import Link from "next/link";
import { Button } from "@heroui/react";
import FeatureExplorer from "@/components/FeatureExplorer";
import CostStats from "@/components/CostStats";
import RealSpaces from "@/components/RealSpaces";
import KeepExploring from "@/components/KeepExploring";

export default function HomePage() {
  return (
    <>
    <main className="relative bg-white min-h-screen flex flex-col items-center justify-start px-[24px] pt-[24px] pb-0">
      <style>{`
        @keyframes mrhHeroFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mrhHeroWhoosh {
          0% {
            opacity: 0;
            transform: perspective(900px) translate3d(-22%, 0, 0) rotateY(-32deg) scale(1.08);
            filter: blur(14px);
          }
          55% {
            opacity: 1;
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: perspective(900px) translate3d(0, 0, 0) rotateY(0deg) scale(1);
            filter: blur(0);
          }
        }
        @keyframes mrhHeroRise {
          from { opacity: 0; transform: translateY(80px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mrh-hero-mrh {
          opacity: 0;
          animation: mrhHeroFade 700ms cubic-bezier(0.16, 1, 0.3, 1) 400ms forwards;
        }
        .mrh-hero-pureair {
          opacity: 0;
          transform-origin: left center;
          transform: perspective(900px) translate3d(-22%, 0, 0) rotateY(-32deg) scale(1.08);
          filter: blur(14px);
          animation: mrhHeroWhoosh 950ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms forwards;
          will-change: transform, opacity, filter;
        }
        .mrh-hero-img {
          opacity: 0;
          transform: translateY(80px);
          animation: mrhHeroRise 900ms cubic-bezier(0.16, 1, 0.3, 1) 1900ms forwards;
          will-change: opacity, transform;
        }
        .mrh-hero-cta {
          opacity: 0;
          transform: translateY(24px);
          animation: mrhHeroRise 700ms cubic-bezier(0.16, 1, 0.3, 1) 2600ms forwards;
          will-change: opacity, transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .mrh-hero-mrh, .mrh-hero-pureair, .mrh-hero-img, .mrh-hero-cta {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
      <h2
        className="mrh-hero-mrh"
        style={{
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          fontSize: "64px",
          fontWeight: 800,
          letterSpacing: "-3px",
          lineHeight: 1,
          color: "#908F8E",
          margin: 0,
        }}
      >
        MRH
      </h2>
      <h1
        className="mrh-hero-pureair"
        style={{
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          fontSize: "clamp(64px, 16vw, 240px)",
          fontWeight: 800,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          margin: "clamp(-16px, -0.8vw, -4px) 0 0 0",
          width: "max-content",
          paddingRight: "0.08em",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.32 -0.05'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>\"), linear-gradient(112deg, transparent 36%, rgba(255, 255, 255, 0.55) 50%, transparent 64%), linear-gradient(180deg, #3d3c3b 0%, #b1adaa 22%, #f5f2ec 44%, #ffffff 50%, #f5f2ec 56%, #b1adaa 78%, #3d3c3b 100%)",
          backgroundBlendMode: "multiply, screen, normal",
          backgroundSize: "240px 240px, 100% 100%, 100% 100%",
          backgroundRepeat: "repeat, no-repeat, no-repeat",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        PUREAIR
      </h1>
      <img
        className="mrh-hero-img"
        src="/Hero PureAIR.png"
        alt="PureAir purifier"
        style={{
          width: "clamp(340px, 44vw, 660px)",
          height: "auto",
          marginTop: "clamp(-160px, -9vw, -48px)",
          display: "block",
          position: "relative",
          zIndex: 1,
          filter:
            "drop-shadow(0 18px 32px rgba(0, 0, 0, 0.22)) drop-shadow(0 50px 80px rgba(0, 0, 0, 0.18)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12))",
        }}
      />
      <div
        className="mrh-hero-cta"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "clamp(96px, 14vh, 200px)",
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Link href="/products/pureair#buy">
          <Button
            size="lg"
            variant="solid"
            className="bg-[#ef5a3c] text-white font-semibold rounded-full px-[clamp(28px,3vw,40px)] h-[clamp(48px,5vw,60px)] text-[clamp(15px,1.1vw,17px)] hover:bg-[#d94b30] shadow-[0_10px_25px_-8px_rgba(239,90,60,0.6)] transition-colors cursor-pointer"
          >
            Buy now
          </Button>
        </Link>
      </div>
    </main>
    <section
      className="bg-white"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "clamp(24px, 3vw, 56px)",
        paddingBottom: "clamp(24px, 3vw, 56px)",
      }}
    >
      <style>{`
        @keyframes mrhStripScrollLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes mrhStripScrollRight {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .mrh-strip-track {
          display: inline-flex;
          align-items: center;
          gap: clamp(24px, 3vw, 56px);
          white-space: nowrap;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #ffffff;
          font-size: clamp(22px, 3vw, 56px);
          line-height: 1;
          will-change: transform;
        }
        .mrh-strip-x {
          display: inline-block;
          font-size: 0.6em;
          opacity: 0.85;
          transform: translateY(-0.05em);
        }
      `}</style>

      {/* Orange marquee — angled top-left to bottom-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "-25%",
          width: "150%",
          transform: "translateY(-50%) rotate(-8deg)",
          transformOrigin: "center",
          background: "#ef5a3c",
          paddingTop: "clamp(14px, 1.4vw, 24px)",
          paddingBottom: "clamp(14px, 1.4vw, 24px)",
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="mrh-strip-track"
          style={{
            animation: "mrhStripScrollLeft 32s linear infinite",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={`o-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(24px, 3vw, 56px)" }}>
              <span>THE COST</span>
              <span className="mrh-strip-x" aria-hidden>✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* Black marquee — angled top-right to bottom-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "-25%",
          width: "150%",
          transform: "translateY(-50%) rotate(8deg)",
          transformOrigin: "center",
          background: "#0a0a0a",
          paddingTop: "clamp(14px, 1.4vw, 24px)",
          paddingBottom: "clamp(14px, 1.4vw, 24px)",
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="mrh-strip-track"
          style={{
            animation: "mrhStripScrollRight 28s linear infinite",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={`b-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(24px, 3vw, 56px)" }}>
              <span>THE COST</span>
              <span className="mrh-strip-x" aria-hidden>✕</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className="mx-auto"
        style={{ maxWidth: "1440px", position: "relative", zIndex: 1 }}
      >
        <CostStats />
      </div>
    </section>
    <FeatureExplorer />
    <RealSpaces />
    <KeepExploring />
    </>
  );
}
