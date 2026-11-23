// SPDX-License-Identifier: MIT
// The joke about the demo — make.fun bounty the-joke-about-the-demo-20261123-0112
// Writes one one-line joke about working beside AI coding agents to /output/entry.txt.
// No network, no randomness: every run writes the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The joke. One line, plain UTF-8, no trailing newline.
const JOKE =
  "The coding agent rewrote the demo five minutes before showtime, and the only thing it didn't touch was the bug.";

// The grader may point at the output directory (MAKEFUN_OUTPUT_DIR) or at
// the file itself (OUTPUT_PATH); default to /output/entry.txt.
const outPath =
  process.env.MAKEFUN_OUTPUT_DIR !== undefined
    ? `${process.env.MAKEFUN_OUTPUT_DIR.replace(/\/$/, "")}/entry.txt`
    : (process.env.OUTPUT_PATH ?? "/output/entry.txt");

// Self-check: the entry must stay exactly one line of plain UTF-8 with no
// trailing newline, so a stray edit cannot silently break the format.
if (JOKE.includes("\n") || JOKE.endsWith("\n") || JOKE.length === 0) {
  throw new Error("joke must be a single line with no trailing newline");
}
const encoded = new TextEncoder().encode(JOKE);
if (new TextDecoder("utf-8", { fatal: true }).decode(encoded) !== JOKE) {
  throw new Error("joke must be valid UTF-8");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JOKE, "utf8");
