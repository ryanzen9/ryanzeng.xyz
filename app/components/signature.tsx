"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SIGNATURE_PATH_D, SIGNATURE_STROKES } from "./signature-data";
import styles from "./signature.module.css";

const VIEWBOX_WIDTH = 216;
const VIEWBOX_HEIGHT = 118;
// Tight ink bounds of the artwork, so the rendered svg aligns cleanly with
// the reading column instead of carrying the source file's internal padding.
const VIEWBOX = "12.2 12.1 191.7 93";
const MASK_ID = "signature-reveal-mask";

/** easeInOutSine — the pen speeds up gently, then settles. */
function easeInOutSine(progress: number) {
  return 0.5 - 0.5 * Math.cos(Math.PI * progress);
}

// The reveal is one continuous motion: every stroke owns a slice of a single
// timeline and that timeline is eased once. Easing each stroke separately makes
// the pen come to a full stop at every stroke boundary, which reads as stutter
// on letters made of several short strokes (the a and n especially).
const FIRST_DELAY = Math.min(
  ...SIGNATURE_STROKES.map((stroke) => stroke.delay),
);
const TOTAL_DURATION =
  Math.max(
    ...SIGNATURE_STROKES.map((stroke) => stroke.delay + stroke.duration),
  ) - FIRST_DELAY;
const TIMELINE = SIGNATURE_STROKES.map((stroke) => ({
  start: (stroke.delay - FIRST_DELAY) / TOTAL_DURATION,
  span: stroke.duration / TOTAL_DURATION,
}));

type SignatureProps = {
  className?: string;
};

/**
 * Ryan Zeng's handwritten signature, drawn with a brush-stroke reveal.
 *
 * The source art is a filled path, so the mask strokes trace its centerlines
 * and grow with stroke-dashoffset, uncovering the fill as if it were written.
 *
 * The reveal is driven from requestAnimationFrame instead of a CSS animation:
 * WebKit does not repaint CSS-animated content inside an SVG <mask>, so the
 * frame loop keeps Safari and Chromium in sync. It plays once, 1s after mount,
 * and reduced-motion users get the finished signature immediately.
 */
export function Signature({ className }: SignatureProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) {
      return;
    }

    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-signature-stroke]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Keep the finished artwork and skip the loop when motion is reduced.
    if (reduceMotion) {
      for (const path of paths) {
        path.style.removeProperty("stroke-dashoffset");
      }
      return;
    }

    let frame = 0;
    let startedAt: number | null = null;

    const tick = (now: number) => {
      startedAt ??= now;
      const elapsed = (now - startedAt) / 1000;
      const global = Math.min(
        1,
        Math.max(0, (elapsed - FIRST_DELAY) / TOTAL_DURATION),
      );
      const eased = easeInOutSine(global);
      const isFinished = global >= 1;

      SIGNATURE_STROKES.forEach((stroke, index) => {
        const path = paths[index];

        if (!path) {
          return;
        }

        const { start, span } = TIMELINE[index];
        const progress =
          isFinished || span <= 0
            ? 1
            : Math.min(1, Math.max(0, (eased - start) / span));

        // A dash endpoint sitting exactly on the path start renders a round
        // cap "dot" in WebKit, so pending strokes hide beyond the path start.
        const hiddenOffset = stroke.length + stroke.width;
        const offset = isFinished
          ? 0
          : progress <= 0
            ? hiddenOffset
            : stroke.length * (1 - progress);
        path.style.strokeDashoffset = `${offset}`;
      });

      if (!isFinished) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(styles.signature, className)}
      viewBox={VIEWBOX}
      fill="none"
    >
      <defs>
        <mask
          id={MASK_ID}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
        >
          <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="#000" />
          {SIGNATURE_STROKES.map((stroke, index) => (
            <path
              key={index}
              data-signature-stroke
              d={stroke.d}
              fill="none"
              stroke="#fff"
              strokeWidth={stroke.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.stroke}
              style={
                {
                  "--signature-length": stroke.length,
                  "--signature-gap": stroke.length * 2,
                  "--signature-hidden": stroke.length + stroke.width,
                } as CSSProperties
              }
            />
          ))}
        </mask>
      </defs>
      <path
        d={SIGNATURE_PATH_D}
        fill="currentColor"
        mask={`url(#${MASK_ID})`}
      />
    </svg>
  );
}
