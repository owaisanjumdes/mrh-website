// "PureAir®" showcase — Figma node 683:2809.
// Oversized wordmark bleeding off both edges, with the product render tucked
// beneath it and dissolving into white at the bottom.

export default function PureAirShowcase() {
  return (
    <section className="pa-section" aria-label="PureAir">
      <style>{`
        .pa-section {
          position: relative;
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow: hidden;
          padding-top: clamp(40px, 7vh, 96px);
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .pa-headline {
          position: relative;
          z-index: 2;
          margin: 0;
          color: var(--ink);
          font-size: clamp(48px, 17vw, 246px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.1;
          white-space: nowrap;
          text-align: center;
        }
        .pa-product {
          position: relative;
          z-index: 1;
          width: min(1180px, 96vw);
          /* Tuck the render slightly under the wordmark. */
          margin-top: clamp(-72px, -4.5vw, -20px);
        }
        .pa-product img {
          display: block;
          width: 100%;
          height: auto;
        }
        .pa-fade {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: clamp(120px, 22vw, 320px);
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 86%);
          pointer-events: none;
          z-index: 3;
        }
      `}</style>

      <h2 className="pa-headline">PureAir®&nbsp;—&nbsp;PureAir®</h2>

      <div className="pa-product">
        <img loading="lazy" src="/HCC 3.png" alt="PureAir air purifier" />
      </div>

      <div className="pa-fade" aria-hidden />
    </section>
  );
}
