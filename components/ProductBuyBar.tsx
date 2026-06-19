// Sticky frosted-glass buy bar pinned to the bottom of the product pages.
// Product name on the left, "Buy now" CTA on the right.

export default function ProductBuyBar({
  name,
  href = "#buy",
}: {
  name: string;
  href?: string;
}) {
  return (
    <div className="pbb" role="region" aria-label={`${name} — buy`}>
      <style>{`
        .pbb {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
          background: rgba(22, 22, 24, 0.66);
          backdrop-filter: blur(22px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .pbb-inner {
          max-width: 1340px;
          margin: 0 auto;
          padding: clamp(9px, 1.2vw, 13px) clamp(20px, 6vw, 88px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .pbb-name {
          color: #f5f5f7;
          font-size: clamp(16px, 1.6vw, 21px);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .pbb-cta {
          flex: none;
          display: inline-flex;
          align-items: center;
          background: #148042;
          color: #ffffff;
          border: none;
          border-radius: 980px;
          padding: 10px 22px;
          font-size: clamp(14px, 1.1vw, 16px);
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .pbb-cta:hover { background: #0f6a36; }
      `}</style>

      <div className="pbb-inner">
        <span className="pbb-name">{name}</span>
        <a className="pbb-cta" href={href}>
          Buy now
        </a>
      </div>
    </div>
  );
}
