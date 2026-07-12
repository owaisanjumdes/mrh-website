import Link from "next/link";

// AirFINEry "Coming Soon" splash — a clean, light-mode full-viewport hero with a
// centered frosted-glass card. Restrained: one soft-tinted backdrop for the glass
// to frost, a single tasteful entrance, and the site's blue accent. Sits under the
// (light) nav on this route, so its white top edge blends into the bar.
export default function ComingSoon() {
  return (
    <section className="cs" aria-label="AirFINEry is coming soon">
      <style>{`
        .cs {
          --cs-nav: clamp(64px, 7vw, 130px);
          --cs-accent: #0071e3;
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: calc(-1 * var(--cs-nav));
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #eef1f5 100%);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          padding: calc(var(--cs-nav) + clamp(24px, 5vh, 56px)) clamp(20px, 5vw, 64px) clamp(48px, 8vh, 96px);
        }

        /* soft, muted tints so the glass has something subtle to frost (static) */
        .cs-tint { position: absolute; border-radius: 50%; filter: blur(80px); z-index: 0; pointer-events: none; }
        .cs-tint--a { width: 44vw; height: 44vw; left: 8%; top: 10%; background: rgba(0, 113, 227, 0.14); }
        .cs-tint--b { width: 40vw; height: 40vw; right: 6%; bottom: 6%; background: rgba(120, 132, 150, 0.12); }

        /* frosted-glass card */
        .cs-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 600px;
          text-align: center;
          padding: clamp(38px, 5vw, 76px) clamp(28px, 5vw, 64px);
          border-radius: clamp(22px, 2.4vw, 30px);
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 24px 60px rgba(15, 23, 42, 0.1);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          opacity: 0;
          animation: csIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 100ms forwards;
        }
        @keyframes csIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

        /* Coming-soon badge */
        .cs-badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 980px; background: rgba(0, 113, 227, 0.09); border: 1px solid rgba(0, 113, 227, 0.18); color: var(--cs-accent); font-size: clamp(12px, 1vw, 13px); font-weight: 600; letter-spacing: 0.02em; }
        .cs-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--cs-accent); }

        .cs-title { margin: clamp(20px, 2.6vw, 30px) 0 0; color: #1d1d1f; font-weight: 700; font-size: clamp(40px, 7vw, 76px); line-height: 0.95; letter-spacing: -0.03em; }
        .cs-sub { margin: clamp(14px, 1.8vw, 20px) auto 0; max-width: 42ch; color: #6e6e73; font-size: clamp(15px, 1.4vw, 18px); font-weight: 500; line-height: 1.5; }
        .cs-cta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: clamp(26px, 3.2vw, 38px); }
        .cs-cta { display: inline-flex; align-items: center; justify-content: center; padding: 0.82em 1.6em; border-radius: 980px; font-weight: 600; font-size: clamp(14px, 1.1vw, 16px); text-decoration: none; transition: transform 200ms ease, background 200ms ease, border-color 200ms ease; }
        .cs-cta--primary { background: var(--cs-accent); color: #ffffff; }
        .cs-cta--primary:hover { background: #0077ed; transform: translateY(-1px); }
        .cs-cta--ghost { background: #ffffff; color: #1d1d1f; border: 1px solid #d2d2d7; }
        .cs-cta--ghost:hover { border-color: #b8b8be; transform: translateY(-1px); }

        @media (prefers-reduced-motion: reduce) {
          .cs-card { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <span className="cs-tint cs-tint--a" aria-hidden />
      <span className="cs-tint cs-tint--b" aria-hidden />

      <div className="cs-card">
        <span className="cs-badge"><span className="cs-badge-dot" aria-hidden />Coming Soon</span>
        <h1 className="cs-title">AirFINEry</h1>
        <p className="cs-sub">
          Our semi-outdoor and outdoor clean-air system is on its way. Register
          your interest and we will let you know the moment it launches.
        </p>
        <div className="cs-cta-row">
          <Link href="/contact" className="cs-cta cs-cta--primary">Notify Me</Link>
          <Link href="/products/pureair" className="cs-cta cs-cta--ghost">Explore PureAir</Link>
        </div>
      </div>
    </section>
  );
}
