import type { CSSProperties } from "react";

export type Surface = "paper" | "deep";

export type SectionBlockProps = {
  number: string;
  microLabel: string;
  title: string;
  description: string;
  surface: Surface;
};

const maxContent: CSSProperties = { maxWidth: "var(--max-content)" };

const titleStyle: CSSProperties = {
  fontSize: "clamp(40px, 6vw, 80px)",
  fontWeight: 500,
  letterSpacing: "-0.035em",
  lineHeight: 0.92,
};

const descStyle: CSSProperties = {
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: 1.4,
};

export default function SectionBlock({
  number,
  microLabel,
  title,
  description,
  surface,
}: SectionBlockProps) {
  const isDeep = surface === "deep";
  const surfaceClass = isDeep ? "surface-deep" : "surface-paper";
  const borderClass = isDeep ? "border-border-deep" : "border-border-paper";
  const subTextClass = isDeep ? "text-paper-2" : "text-ink-2";
  const microClass = isDeep ? "text-paper-2" : "text-ink-3";

  return (
    <section
      className={`${surfaceClass} min-h-[80vh] px-[var(--page-gutter)] py-sp-9 flex items-center`}
    >
      <div className="mx-auto w-full" style={maxContent}>
        <div
          className={`border-[0.5px] ${borderClass} p-sp-7 flex flex-col gap-sp-5`}
          style={{ borderRadius: "var(--r-1)" }}
        >
          <div className="flex items-baseline justify-between gap-sp-5">
            <div className="flex items-baseline gap-sp-5">
              <span className={`micro-label font-mono ${microClass}`}>{number}</span>
              <span className={`micro-label ${microClass}`}>{microLabel}</span>
            </div>
            <span
              className={`micro-label ${microClass} border-[0.5px] ${borderClass} px-sp-2 py-sp-1`}
              style={{ borderRadius: "var(--r-1)" }}
            >
              {surface}
            </span>
          </div>
          <h2 style={titleStyle}>{title}</h2>
          <p className={subTextClass} style={descStyle}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
