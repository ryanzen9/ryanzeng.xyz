const CJK = /[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u3000-\u303F]/;

function isCJK(character: string) {
  return CJK.test(character);
}

// Rough advance width of a character in em, good enough to choose a type size
// without measuring the font (satori has no text measurement API).
function characterWidth(character: string) {
  if (character === " ") return 0.3;
  if (isCJK(character)) return 1;
  if (/[A-Z0-9]/.test(character)) return 0.62;
  return 0.54;
}

export function measureTitle(text: string) {
  return [...text].reduce(
    (width, character) => width + characterWidth(character),
    0,
  );
}

/** Split a title into `lineCount` lines that are as even as possible. */
function breakTitle(title: string, lineCount: number, maxWidthEm: number) {
  const words: string[] = [];
  let current = "";
  for (const character of title) {
    current += character;
    if (character === " " || isCJK(character)) {
      words.push(current);
      current = "";
    }
  }
  if (current) words.push(current);
  if (words.length < lineCount) return null;

  const target = measureTitle(title) / lineCount;
  const lines: string[] = [];
  let bucket = "";
  let consumed = 0;

  for (const word of words) {
    const width = measureTitle(word);
    if (bucket && lines.length < lineCount - 1 && consumed + width > target) {
      lines.push(bucket.trim());
      bucket = "";
      consumed = 0;
    }
    bucket += word;
    consumed += width;
    if (measureTitle(bucket) > maxWidthEm) return null;
  }
  if (bucket.trim()) lines.push(bucket.trim());

  return lines.length === lineCount ? lines : null;
}

/** Last resort for very long titles: fill three lines and cut with an ellipsis. */
function truncateTitle(title: string, lineCount: number, maxWidthEm: number) {
  const lines: string[] = [];
  let bucket = "";

  for (const character of title) {
    if (measureTitle(bucket + character) <= maxWidthEm) {
      bucket += character;
      continue;
    }
    lines.push(bucket.trim());
    bucket = character;
    if (lines.length === lineCount - 1) break;
  }

  if (lines.length === lineCount - 1) {
    let rest = bucket.trim();
    while (rest && measureTitle(`${rest}…`) > maxWidthEm) {
      rest = [...rest].slice(0, -1).join("");
    }
    lines.push(`${rest}…`);
    return lines;
  }

  lines.push(bucket.trim());
  return lines.slice(0, lineCount);
}

export type TitleLayout = {
  fontSize: number;
  lines: string[];
};

/**
 * Pick the largest type size that fits the title in one line, or fall back to
 * two or three evenly broken lines for long titles.
 */
export function fitTitle(title: string, maxWidth: number): TitleLayout {
  for (let fontSize = 88; fontSize >= 52; fontSize -= 4) {
    const maxWidthEm = maxWidth / fontSize;
    if (measureTitle(title) <= maxWidthEm) return { fontSize, lines: [title] };
    if (fontSize <= 64) {
      for (const lineCount of [2, 3]) {
        const lines = breakTitle(title, lineCount, maxWidthEm);
        if (lines) return { fontSize, lines };
      }
    }
  }
  return { fontSize: 52, lines: truncateTitle(title, 3, maxWidth / 52) };
}
