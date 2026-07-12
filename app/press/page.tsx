import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import coverage from "./coverage.json";
import PressArchive from "./PressArchive";

export const metadata: Metadata = {
  title: "Press coverage — MRH by OK Play",
  description:
    "216 placements across the national press and trade media, from the MANN+HUMMEL x OK Play India symposium on air pollution.",
};

type Row = { t: string; d: string; p: string; h: string; pg: string; u: string };

const rows = coverage as Row[];
const print = rows.filter((r) => r.t === "print").length;
const online = rows.length - print;

export default function PressPage() {
  return (
    <main className="pc">
      <style>{PC_CSS}</style>

      <section className="pc__wrap">
        <header className="pc__head">
          <p className="pc__eyebrow">Press coverage</p>
          <h1 className="pc__title">Covered across India</h1>
          <p className="pc__lede">
            The MANN+HUMMEL and OK Play India symposium on air pollution, reported in
            the national press and trade media through February 2024.
          </p>

          <dl className="pc__stats">
            <div className="pc__stat">
              <dt>Placements</dt>
              <dd>{rows.length}</dd>
            </div>
            <div className="pc__stat">
              <dt>Print</dt>
              <dd>{print}</dd>
            </div>
            <div className="pc__stat">
              <dt>Online</dt>
              <dd>{online}</dd>
            </div>
          </dl>
        </header>

        <PressArchive rows={rows} />

        <p className="pc__note">
          The online placements are syndications of a single ANI/NewsVoir release dated
          16 February 2024. Print entries are clippings and have no public link.
        </p>
      </section>

      <SiteFooter light />
    </main>
  );
}

const PC_CSS = `
  .pc { --c-ink:#0B0C0E; --c-soft:#6B7076; --c-faint:#A2A7AD; background:#fff; color:var(--c-ink); font-family:var(--font-sans), -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; }
  .pc__wrap { max-width:1140px; margin-inline:auto; padding:clamp(84px,10vw,140px) 24px clamp(48px,6vw,80px); }

  .pc__head { max-width:640px; margin-bottom:clamp(34px,4vw,52px); }
  .pc__eyebrow { margin:0 0 14px; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--c-faint); }
  .pc__title { margin:0 0 14px; font-size:clamp(30px,4vw,46px); font-weight:700; line-height:1.08; letter-spacing:-0.03em; }
  .pc__lede { margin:0; font-size:16px; line-height:1.6; color:var(--c-soft); }

  .pc__stats { display:flex; gap:40px; margin:30px 0 0; padding:0; }
  .pc__stat { margin:0; }
  .pc__stat dt { margin:0 0 4px; font-size:10px; font-weight:600; letter-spacing:0.11em; text-transform:uppercase; color:var(--c-faint); }
  .pc__stat dd { margin:0; font-size:28px; font-weight:700; letter-spacing:-0.03em; font-variant-numeric:tabular-nums; }

  .pc__note { max-width:720px; margin:clamp(30px,4vw,48px) 0 0; font-size:12.5px; line-height:1.6; color:var(--c-faint); }
`;
