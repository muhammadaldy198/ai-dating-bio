import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "I never ghost. I just run out of context and forget you existed.";

const OUT_DIR = "/output";
const OUT = "/output/entry.txt";

function assertGate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 180) {
    throw new Error(`gate: length ${chars.length} not in 1..180`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: whitespace-only");
  }
  if (/[\n\r]/.test(text)) {
    throw new Error("gate: must be a single line");
  }
  if (/[\u00a0\u200b\u200c\u200d\ufeff]/.test(text)) {
    throw new Error("gate: invisible whitespace");
  }
}

function main(): void {
  assertGate(LINE);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  const back = readFileSync(OUT, "utf8");
  if (back !== LINE) {
    throw new Error("verify: entry.txt differs from LINE");
  }
}

main();
