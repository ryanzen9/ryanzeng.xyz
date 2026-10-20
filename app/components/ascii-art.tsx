import type { HTMLAttributes } from "react";
import Script from "next/script";

const ASCII_MAGIC_SCRIPT = "https://www.ascii-magic.com/ascii/ascii.js";

/** Looks offered by the ASCII Magic player. */
type AsciiArtLook =
  | "dots"
  | "ascii"
  | "dense"
  | "numbers"
  | "binary"
  | "letters"
  | "blocks"
  | "squares"
  | "lines"
  | "dither";

/**
 * Attributes of the <ascii-art> custom element registered by the ASCII Magic
 * script. See https://www.ascii-magic.com/ascii/use/ai-coding-agents.
 */
type AsciiArtAttributes = HTMLAttributes<HTMLElement> & {
  /** Piece slug from https://www.ascii-magic.com/ascii/index.json. */
  piece?: string;
  look?: AsciiArtLook;
  /** Playback speed multiplier, defaults to 1. */
  speed?: number | string;
  /** Hold the first frame instead of animating. */
  still?: boolean;
  /** Font size in px; omit to size the piece with the --ascii-size CSS variable. */
  size?: number | string;
  bg?: string;
  chars?: string;
  mono?: boolean;
  contrast?: number | string;
  "dot-size"?: number | string;
  steps?: number | string;
  density?: number | string;
  all?: boolean;
};

// Teach TypeScript about the tag the ASCII Magic script registers at runtime.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ascii-art": AsciiArtAttributes;
    }
  }
}

type AsciiArtProps = {
  /** Piece slug from https://www.ascii-magic.com/ascii/index.json */
  piece: string;
  look?: AsciiArtLook;
  /** Font size in px. Omit to size the piece with the --ascii-size custom property. */
  size?: number;
  /** Draw the piece in the current text colour instead of its palette. */
  mono?: boolean;
  /** Hold the first frame instead of animating. */
  still?: boolean;
};

/**
 * An animated ASCII Magic piece. The custom element is upgraded by the ASCII
 * Magic script, which next/script loads once in the browser after hydration so
 * it never runs during server rendering.
 */
export function AsciiArt({
  piece,
  look = "dots",
  size,
  mono,
  still,
}: AsciiArtProps) {
  return (
    <>
      <Script
        src={ASCII_MAGIC_SCRIPT}
        type="module"
        strategy="afterInteractive"
      />
      <ascii-art
        piece={piece}
        look={look}
        size={size}
        mono={mono || undefined}
        still={still || undefined}
      ></ascii-art>
    </>
  );
}
