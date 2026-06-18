import Link from "next/link";

// Products hero — Apple-style product reveal (adapted from Figma "assemble" hero).
// Layout: small brand eyebrow → giant wordmark → large centered product render
// → centered pill CTA + financing line. Black canvas, brand-green accents.

export default function ProductsHero() {
  return (
    <section className="ph">
      <style>{`
        .ph {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(28px, 5vh, 64px) clamp(16px, 4vw, 56px) clamp(40px, 6vh, 80px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }
        .ph-stage {
          max-width: 1680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* --- Wordmark --- */
        .ph-head {
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .ph-eyebrow {
          display: block;
          color: #ffffff;
          font-weight: 500;
          font-size: clamp(20px, 3.4vw, 46px);
          line-height: 1;
          letter-spacing: 0.01em;
          margin-bottom: clamp(2px, 0.4vw, 6px);
        }
        .ph-wordmark {
          margin: 0;
          font-weight: 800;
          font-size: clamp(58px, 15vw, 220px);
          line-height: 0.86;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          background: linear-gradient(180deg, #4ade80 0%, #1bb35a 46%, #148042 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        /* --- Product render --- */
        .ph-media {
          position: relative;
          width: 100%;
          margin-top: clamp(-12px, -1.5vw, -4px);
          display: flex;
          justify-content: center;
        }
        .ph-shot {
          width: min(96%, 1180px);
          height: auto;
          display: block;
          object-fit: contain;
          /* pull the render up so the product crowds under the wordmark */
          margin-top: clamp(-24px, -4vw, -8px);
          filter: drop-shadow(0 40px 80px rgba(0, 0, 0, 0.6));
        }

        /* --- CTA --- */
        .ph-buy {
          position: relative;
          z-index: 3;
          margin-top: clamp(-120px, -10vw, -48px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(8px, 1vw, 13px);
        }
        .ph-cta {
          background: #148042;
          color: #ffffff;
          border-radius: 980px;
          font-weight: 600;
          font-size: clamp(15px, 1.2vw, 19px);
          line-height: 1;
          padding: 0.62em 1.5em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: background 200ms ease, transform 200ms ease;
        }
        .ph-cta:hover { background: #0f6a36; transform: translateY(-1px); }
        .ph-price {
          color: #ffffff;
          font-weight: 700;
          font-size: clamp(15px, 1.2vw, 19px);
          line-height: 1.3;
          letter-spacing: 0.012em;
          text-align: center;
        }
        .ph-price sup {
          font-size: 0.7em;
          vertical-align: super;
          color: rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 720px) {
          .ph-shot { width: 100%; }
          .ph-eyebrow { font-size: clamp(18px, 6vw, 30px); }
          .ph-wordmark { font-size: clamp(54px, 22vw, 120px); }
        }

        /* --- Entrance animations --- */
        @keyframes phUp {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes phShotIn {
          from { opacity: 0; transform: scale(1.08) translateY(28px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ph-head, .ph-buy {
          opacity: 0;
          animation: phUp 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ph-head { animation-delay: 80ms; }
        .ph-shot {
          opacity: 0;
          transform-origin: center top;
          animation: phShotIn 1100ms cubic-bezier(0.22, 1, 0.36, 1) 260ms forwards;
        }
        .ph-buy { animation-delay: 760ms; }

        @media (prefers-reduced-motion: reduce) {
          .ph-head, .ph-buy, .ph-shot {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="ph-stage">
        <div className="ph-head">
          <span className="ph-eyebrow">MRH</span>
          <h1 className="ph-wordmark">PureAir</h1>
        </div>

        <div className="ph-media">
          <img
            className="ph-shot"
            src="/productshot.png"
            alt="MRH PureAir air purifier — brushed-steel body with honeycomb grille"
          />
        </div>

        <div className="ph-buy">
          <Link href="/contact" className="ph-cta">
            Pre-order
          </Link>
          <p className="ph-price">
            From ₹24,999 or ₹2,083/mo. for 12 mo.<sup>*</sup>
          </p>
        </div>
      </div>
    </section>
  );
}
