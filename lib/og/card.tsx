import type { ReactNode } from "react";

import { fitTitle } from "@/lib/og/title";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const colors = {
  background: "#0d0d0c",
  ink: "#f4f4f2",
  muted: "#8a8a84",
  border: "rgba(255,255,255,0.14)",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column" as const,
  width: "100%",
  height: "100%",
  background: colors.background,
  color: colors.ink,
  padding: "64px 72px",
  position: "relative" as const,
};

const metaStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 19,
  letterSpacing: "0.06em",
  color: colors.muted,
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: `1px solid ${colors.border}`,
  paddingTop: 18,
  fontSize: 17,
  letterSpacing: "0.05em",
  color: colors.muted,
};

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash = Math.imul(hash ^ (character.codePointAt(0) ?? 0), 16777619);
  }
  return hash >>> 0;
}

/** A seeded, deterministic drizzle so every card has its own weather. */
function RainField({ seed }: { seed: string }) {
  let state = hashSeed(seed) || 1;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };

  const lines: ReactNode[] = [];
  for (let index = 0; index < 26; index++) {
    const x = random() * 1300;
    const y = random() * 660;
    const length = 40 + random() * 90;
    lines.push(
      <line
        key={index}
        x1={x}
        y1={y}
        x2={x - length * 0.45}
        y2={y + length}
        stroke="#ffffff"
        strokeWidth={1}
        opacity={0.18}
      />,
    );
  }

  return (
    <svg
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {lines}
    </svg>
  );
}

function MetaRow({ left, right }: { left: string; right: string }) {
  return (
    <div style={metaStyle}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function CardFooter({ left, right }: { left: string; right: string }) {
  return (
    <div style={footerStyle}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

type CardFooterProps = {
  footerLeft: string;
  footerRight: string;
};

export type PostCardProps = CardFooterProps & {
  eyebrow: string;
  title: string;
  date: string;
  /** Stable seed for the drizzle, usually the post slug. */
  seed: string;
};

export function PostCard({
  eyebrow,
  title,
  date,
  seed,
  footerLeft,
  footerRight,
}: PostCardProps) {
  const { fontSize, lines } = fitTitle(title, 940);

  return (
    <div style={cardStyle}>
      <RainField seed={seed} />
      <MetaRow left={eyebrow} right={date} />
      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <div
          lang="zh-CN"
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize,
            lineHeight: 1.22,
            letterSpacing: "-0.015em",
            color: colors.ink,
            maxWidth: 940,
          }}
        >
          {lines.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <CardFooter left={footerLeft} right={footerRight} />
    </div>
  );
}

export type SiteCardProps = CardFooterProps & {
  eyebrow: string;
  headline: string;
  taglineLines: string[];
  /** Language of the eyebrow and tagline, used by the font fallback. */
  lang: string;
};

export function SiteCard({
  eyebrow,
  headline,
  taglineLines,
  lang,
  footerLeft,
  footerRight,
}: SiteCardProps) {
  return (
    <div style={cardStyle}>
      <RainField seed="may-rain" />
      <div
        lang={lang}
        style={{
          display: "flex",
          fontSize: 19,
          letterSpacing: "0.06em",
          color: colors.muted,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 112,
            letterSpacing: "-0.045em",
            lineHeight: 1,
            color: colors.ink,
          }}
        >
          {headline}
        </div>
        <div
          lang={lang}
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 40,
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            color: colors.muted,
            marginTop: 28,
            maxWidth: 920,
          }}
        >
          {taglineLines.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <CardFooter left={footerLeft} right={footerRight} />
    </div>
  );
}
