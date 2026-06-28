// Impact hero — light gradient top with a blue misty glow carrying the headline
// "Products that are backed by data.", over a full-bleed forest photo with white
// overlay copy and a green-highlighted line.

export default function ImpactHero() {
  return (
    <section className="ie" aria-label="Products that are backed by data">
      <style>{`
        .ie {
          --gutter: clamp(20px, 6vw, 126px);
          --ie-nav: clamp(64px, 7vw, 130px);
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }

        /* ---- Top: headline — fills the hero viewport ---- */
        .ie-top {
          position: relative;
          z-index: 2;
          min-height: calc(100svh - var(--ie-nav));
          padding: clamp(60px, 8vw, 120px) var(--gutter);
          background: linear-gradient(180deg, #f4f4f6 0%, #e6edef 50%, #ece9e3 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        /* blue misty glow behind the headline */
        .ie-glow {
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
          width: min(1120px, 92vw);
          height: clamp(360px, 48vw, 640px);
          background: radial-gradient(ellipse at center,
            rgba(96, 156, 200, 0.55) 0%,
            rgba(140, 186, 216, 0.40) 32%,
            rgba(180, 206, 226, 0.18) 56%,
            rgba(255, 255, 255, 0) 76%);
          filter: blur(70px);
          z-index: 0;
          pointer-events: none;
        }
        .ie-top-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ie-headline {
          margin: 0;
          max-width: 16ch;
          color: #000000;
          font-size: clamp(40px, 7vw, 96px);
          font-weight: 500;
          line-height: 1.06;
          letter-spacing: -0.02em;
        }

        /* ---- Full proof image (shown in full, never cropped) ---- */
        .ie-forest {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .ie-forest-img {
          display: block;
          width: 100%;
          height: auto;
        }
      `}</style>

      <div className="ie-top">
        <div className="ie-glow" aria-hidden />
        <div className="ie-top-content">
          <h1 className="ie-headline" data-reveal>
            Products that are backed by data
          </h1>
        </div>
      </div>

      <div className="ie-forest">
        <img loading="lazy"
          className="ie-forest-img"
          src="/IIITTTT.jpg.jpeg"
          alt="IIT Delhi field evaluation of PureAir"
        />
      </div>
    </section>
  );
}
