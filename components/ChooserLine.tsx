import Link from "next/link";

// Small chooser prompt that sits under the two product sections and points people
// who aren't sure which fits their space to the contact page.

export default function ChooserLine() {
  return (
    <section className="ch" aria-label="Not sure which fits your space?">
      <style>{`
        .ch {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(28px, 5vh, 64px) clamp(20px, 6vw, 88px) clamp(56px, 9vh, 110px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }
        .ch-text {
          margin: 0;
          color: #86868b;
          font-size: clamp(16px, 1.6vw, 20px);
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .ch-link {
          color: #3bbf6a;
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          transition: color 200ms ease;
        }
        .ch-link:hover { color: #4ade80; }
        .ch-link span {
          display: inline-block;
          transition: transform 200ms ease;
        }
        .ch-link:hover span { transform: translateX(3px); }
      `}</style>

      <p className="ch-text">
        Not sure which fits your space?{" "}
        <Link href="/contact" className="ch-link">
          Tell us about it <span aria-hidden>→</span>
        </Link>
      </p>
    </section>
  );
}
