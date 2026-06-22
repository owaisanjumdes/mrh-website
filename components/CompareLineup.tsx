import {
  Clock,
  Filter,
  Maximize2,
  Wind,
  type LucideIcon,
} from "lucide-react";

// Contrast — Ordinary purifiers vs. MRH. Four rows, dark, sized to one viewport.
// Each row carries a topic icon (coverage, filter media, particle size, lifespan),
// muted on the "ordinary" side and green on the MRH side.

type Row = { bad: string; good: string; Icon: LucideIcon };

const ROWS: Row[] = [
  {
    Icon: Maximize2,
    bad: "Cover one small closed room.",
    good: "Clear 2,000 to 3,500 sq ft, indoors and out.",
  },
  {
    Icon: Filter,
    bad: "Run on generic, often imported filters.",
    good: "Run on German MANN+HUMMEL media, the world’s filtration benchmark.",
  },
  {
    Icon: Wind,
    bad: "Miss ultrafine particles below PM2.5.",
    good: "Capture down to 0.3 microns, validated by IIT Delhi.",
  },
  {
    Icon: Clock,
    bad: "Need new filters every few months.",
    good: "Engineered for longer life and lower running cost.",
  },
];

export default function CompareLineup() {
  return (
    <section className="ct" aria-label="Ordinary purifiers versus MRH">
      <style>{`
        .ct {
          background: #000000;
          width: 100vw;
          min-height: 100vh;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 12vh, 140px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ct-grid {
          width: 100%;
          max-width: 1080px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: clamp(16px, 4vw, 72px);
        }
        .ct-head {
          padding-bottom: clamp(14px, 2vw, 24px);
          font-size: clamp(15px, 1.7vw, 22px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .ct-head--bad { color: #86868b; }
        .ct-head--good { color: #4ade80; }

        .ct-cell {
          display: flex;
          align-items: flex-start;
          gap: clamp(10px, 1.2vw, 14px);
          padding: clamp(16px, 3vh, 30px) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: clamp(15px, 1.7vw, 21px);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .ct-cell--bad { color: #86868b; }
        .ct-cell--good { color: #f5f5f7; font-weight: 500; }
        .ct-ico {
          flex: none;
          width: clamp(20px, 2vw, 24px);
          height: auto;
          margin-top: 2px;
        }
        .ct-ico--bad { color: #6e6e73; }
        .ct-ico--good { color: #4ade80; }

        @media (max-width: 600px) {
          .ct-grid { column-gap: 16px; }
          .ct-cell { gap: 8px; }
        }
      `}</style>

      <div className="ct-grid">
        <p className="ct-head ct-head--bad" data-reveal>
          Ordinary purifiers
        </p>
        <p
          className="ct-head ct-head--good"
          data-reveal
          style={{ ["--ri" as string]: 1 }}
        >
          MRH
        </p>

        {ROWS.map((row, i) => (
          <ContrastRow key={i} row={row} index={i} />
        ))}
      </div>
    </section>
  );
}

function ContrastRow({ row, index }: { row: Row; index: number }) {
  const { Icon } = row;
  return (
    <>
      <div
        className="ct-cell ct-cell--bad"
        data-reveal
        style={{ ["--ri" as string]: index + 2 }}
      >
        <Icon className="ct-ico ct-ico--bad" strokeWidth={1.8} aria-hidden />
        {row.bad}
      </div>
      <div
        className="ct-cell ct-cell--good"
        data-reveal
        style={{ ["--ri" as string]: index + 2 }}
      >
        <Icon className="ct-ico ct-ico--good" strokeWidth={1.8} aria-hidden />
        {row.good}
      </div>
    </>
  );
}
