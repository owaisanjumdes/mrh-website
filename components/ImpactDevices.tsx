// Impact — "Your Apple products have more to give." recycling card. Figma node
// 794:11358. A light-gray rounded card at the full banner size: the device cluster
// fills it, with heading, subtext, and a blue pill CTA overlaid on the left.

export default function ImpactDevices() {
  return (
    <section className="idev" aria-label="Your Apple products have more to give.">
      <style>{`
        .idev {
          --gutter: clamp(20px, 6vw, 126px);
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(40px, 6vw, 88px) var(--gutter);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .idev-card {
          position: relative;
          max-width: 1260px;
          margin: 0 auto;
          background: #f5f5f5;
          border-radius: clamp(20px, 2vw, 28px);
          overflow: hidden;
        }
        .idev-media img {
          display: block;
          width: 100%;
          height: auto;
        }
        .idev-text {
          position: absolute;
          top: 50%;
          left: clamp(28px, 4.4vw, 72px);
          transform: translateY(-50%);
          max-width: 42%;
          z-index: 2;
        }
        .idev-title {
          margin: 0;
          color: #1d1d1f;
          font-size: clamp(20px, 2.4vw, 32px);
          font-weight: 600;
          line-height: 1.125;
          letter-spacing: -0.01em;
        }
        .idev-sub {
          margin: clamp(10px, 1.4vw, 18px) 0 0;
          max-width: 320px;
          color: #6e6e73;
          font-size: clamp(12px, 1.1vw, 16px);
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: -0.006em;
        }
        .idev-cta {
          display: inline-flex;
          align-items: center;
          margin-top: clamp(16px, 2.4vw, 30px);
          padding: 8px 18px;
          border-radius: 980px;
          background: #0071e3;
          color: #ffffff;
          font-size: clamp(13px, 1.1vw, 16px);
          font-weight: 500;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .idev-cta:hover { background: #0077ed; }

        /* Stack on narrow screens — text above, illustration below */
        @media (max-width: 760px) {
          .idev-text {
            position: static;
            transform: none;
            max-width: none;
            padding: clamp(28px, 7vw, 44px);
            padding-bottom: 0;
            text-align: center;
          }
          .idev-sub { margin-left: auto; margin-right: auto; }
        }
      `}</style>

      <div className="idev-card" data-reveal>
        <div className="idev-text">
          <h2 className="idev-title">
            Our Products are Validated
            <br />
            by IIT Delhi
          </h2>
          <p className="idev-sub">
            Protect the earth’s precious resources by recycling the Apple products,
            packaging, and accessories you no longer use.
          </p>
          <a className="idev-cta" href="#recycle">
            Learn More
          </a>
        </div>

        <div className="idev-media">
          <img
            src="/impact-devices.jpg"
            alt="A laptop, earbuds, phone, watch, and tablet drawn in green line art"
            width={2524}
            height={964}
          />
        </div>
      </div>
    </section>
  );
}
