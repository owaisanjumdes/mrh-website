// "Two Products, Every Space" — section intro (eyebrow + headline + lead).

export default function TwoProducts() {
  return (
    <section className="tp" aria-label="Two products, every space">
      <style>{`
        .tp {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(80px, 13vh, 180px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .tp-head {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        .tp-eyebrow {
          margin: 0;
          color: #ff791b;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }
        .tp-title {
          margin: clamp(12px, 1.6vw, 20px) 0 0;
          color: #f5f5f7;
          font-size: clamp(34px, 5.4vw, 76px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.025em;
          text-wrap: balance;
        }
        .tp-lead {
          margin: clamp(18px, 2.2vw, 30px) auto 0;
          max-width: 720px;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 500;
          line-height: 1.42;
          letter-spacing: -0.005em;
          text-wrap: balance;
        }
      `}</style>

      <div className="tp-head">
        <p className="tp-eyebrow" data-reveal>
          Two Products, Every Space
        </p>
        <h2 className="tp-title" data-reveal style={{ ["--ri" as string]: 1 }}>
          One for indoors. One for everywhere else.
        </h2>
        <p className="tp-lead" data-reveal style={{ ["--ri" as string]: 2 }}>
          Whatever the space, there&rsquo;s an MRH built for it, engineered in
          Germany, made in India, powered by MANN+HUMMEL.
        </p>
      </div>
    </section>
  );
}
