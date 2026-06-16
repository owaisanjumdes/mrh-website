import React from "react";

export function SmokeText({
  text,
  startMs,
  staggerMs,
  letterDurationMs,
}: {
  text: string;
  startMs: number;
  staggerMs: number;
  letterDurationMs: number;
}) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <>
      {words.map((word, wi) => {
        const wordLetters = Array.from(word).map((char) => {
          const delay = startMs + charIndex * staggerMs;
          const span = (
            <span
              key={`${wi}-${charIndex}`}
              className="mrh-letter"
              style={{
                animationDelay: `${delay}ms`,
                animationDuration: `${letterDurationMs}ms`,
              }}
            >
              {char}
            </span>
          );
          charIndex += 1;
          return span;
        });
        return (
          <span key={wi}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {wordLetters}
            </span>
            {wi < words.length - 1 ? (
              <span
                aria-hidden
                style={{ display: "inline-block", width: "0.32em" }}
              />
            ) : null}
          </span>
        );
      })}
    </>
  );
}

export const SMOKE_KEYFRAMES = `
  @keyframes mrhSmokeIn {
    0% {
      opacity: 0;
      filter: blur(14px);
      transform: translateY(10px) scale(0.96);
    }
    60% {
      opacity: 0.85;
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0) scale(1);
    }
  }
  .mrh-letter {
    display: inline-block;
    opacity: 0;
    filter: blur(14px);
    transform: translateY(10px) scale(0.96);
    animation-name: mrhSmokeIn;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-fill-mode: both;
    will-change: opacity, filter, transform;
  }
  @media (prefers-reduced-motion: reduce) {
    .mrh-letter {
      animation-duration: 1ms !important;
      animation-delay: 0ms !important;
    }
  }
`;
