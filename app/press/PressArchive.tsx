"use client";

// Full press archive — filter (all / print / online) + search over all 216
// placements from the coverage dossier. Rendered from app/press/coverage.json.
import { useMemo, useState } from "react";

type Row = { t: string; d: string; p: string; h: string; pg: string; u: string };
type Filter = "all" | "print" | "online";

export default function PressArchive({ rows }: { rows: Row[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      all: rows.length,
      print: rows.filter((r) => r.t === "print").length,
      online: rows.filter((r) => r.t === "online").length,
    }),
    [rows]
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.t !== filter) return false;
      if (q && !(`${r.p} ${r.h}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [rows, filter, query]);

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "print", label: "Print" },
    { key: "online", label: "Online" },
  ];

  return (
    <div className="pa">
      <style>{PA_CSS}</style>

      <div className="pa__controls">
        <div className="pa__filters" role="group" aria-label="Filter coverage">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`pa__chip${filter === c.key ? " is-on" : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label} <b>{counts[c.key]}</b>
            </button>
          ))}
        </div>
        <label className="pa__search">
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search publication"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search publication"
          />
        </label>
      </div>

      <p className="pa__count" aria-live="polite">
        Showing {shown.length} of {rows.length}
      </p>

      <ul className="pa__list" role="list">
        {shown.map((r, i) => {
          const inner = (
            <>
              <span className="pa__pub">{r.p}</span>
              <span className="pa__head">{r.h}</span>
              <span className="pa__meta">
                <span className={`pa__kind pa__kind--${r.t}`}>{r.t}</span>
                <span className="pa__date">{r.d}</span>
                {r.t === "print" && r.pg ? <span className="pa__pg">p.{r.pg}</span> : null}
              </span>
            </>
          );
          return (
            <li className="pa__row" key={`${r.p}-${i}`}>
              {r.u ? (
                <a className="pa__link" href={r.u} target="_blank" rel="noopener noreferrer">
                  {inner}
                  <svg className="pa__go" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <span className="pa__link pa__link--static">{inner}</span>
              )}
            </li>
          );
        })}
      </ul>

      {shown.length === 0 ? <p className="pa__empty">No placements match that search.</p> : null}
    </div>
  );
}

const PA_CSS = `
  .pa { --a-ink:#0B0C0E; --a-soft:#6B7076; --a-faint:#A2A7AD; --a-line:#E8EAED; --a-tint:#FAFBFC; --a-ease:cubic-bezier(0.32,0.72,0,1); }
  .pa *, .pa *::before, .pa *::after { box-sizing: border-box; }

  .pa__controls { display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between; margin-bottom:18px; }
  .pa__filters { display:flex; gap:8px; flex-wrap:wrap; }
  .pa__chip { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; font:inherit; font-size:13px; font-weight:600; letter-spacing:-0.01em; color:var(--a-soft); background:#fff; border:1px solid var(--a-line); border-radius:999px; cursor:pointer; transition:color .25s var(--a-ease), border-color .25s var(--a-ease), background .25s var(--a-ease); }
  .pa__chip b { font-weight:700; color:var(--a-faint); font-variant-numeric:tabular-nums; }
  .pa__chip:hover { color:var(--a-ink); border-color:#D4D7DC; }
  .pa__chip.is-on { color:#fff; background:var(--a-ink); border-color:var(--a-ink); }
  .pa__chip.is-on b { color:rgba(255,255,255,0.7); }

  .pa__search { display:inline-flex; align-items:center; gap:8px; padding:8px 14px; border:1px solid var(--a-line); border-radius:999px; color:var(--a-faint); min-width:220px; }
  .pa__search:focus-within { border-color:#B7BBC1; color:var(--a-soft); }
  .pa__search input { border:0; outline:0; font:inherit; font-size:14px; color:var(--a-ink); background:none; width:100%; }

  .pa__count { margin:0 0 14px; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:var(--a-faint); }

  .pa__list { list-style:none; margin:0; padding:0; border-top:1px solid var(--a-line); }
  .pa__row { border-bottom:1px solid var(--a-line); }
  .pa__link { display:grid; grid-template-columns:minmax(150px,1.1fr) minmax(0,2fr) auto auto; align-items:center; gap:14px 20px; padding:16px 8px; text-decoration:none; color:inherit; transition:background .3s var(--a-ease); }
  a.pa__link:hover { background:var(--a-tint); }
  a.pa__link:focus-visible { outline:2px solid var(--a-ink); outline-offset:-2px; }
  .pa__link--static { cursor:default; }

  .pa__pub { font-size:15px; font-weight:600; letter-spacing:-0.01em; color:var(--a-ink); }
  .pa__head { font-size:14px; line-height:1.5; color:var(--a-soft); }
  .pa__meta { display:inline-flex; align-items:center; gap:10px; justify-self:end; }
  .pa__kind { font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:3px 8px; border-radius:999px; }
  .pa__kind--print { color:#8A5A00; background:#FBF1DC; }
  .pa__kind--online { color:#0A5C36; background:#E3F3EA; }
  .pa__date { font-size:12px; color:var(--a-faint); font-variant-numeric:tabular-nums; white-space:nowrap; }
  .pa__pg { font-size:11px; color:var(--a-faint); }
  .pa__go { color:var(--a-faint); opacity:0; transform:translate(-3px,3px); transition:opacity .3s var(--a-ease), transform .3s var(--a-ease); }
  a.pa__link:hover .pa__go { opacity:1; transform:translate(0,0); }

  .pa__empty { margin:28px 0 0; text-align:center; font-size:14px; color:var(--a-faint); }

  @media (max-width: 720px) {
    .pa__link { grid-template-columns:1fr; gap:8px; padding:16px 6px; }
    .pa__meta { justify-self:start; }
    .pa__go { display:none; }
  }
`;
