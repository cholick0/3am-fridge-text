import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

// The 3AM Fridge Text — a text message from the fridge at 3 AM.
// One line, 1-140 characters, UTF-8, not only whitespace.
const entry =
  "3AM. It's your fridge. I counted: you opened me 4 times and ate nothing. The light stays on. I stay disappointed. Go to bed.";

// Self-check gate: 1-140 chars, exactly one line, not only whitespace.
const codePoints = [...entry].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`entry is ${codePoints} code points, must be 1-140`);
}
if (entry.includes("\n") || entry.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Read-back verification: the file must match the entry byte-for-byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== entry) {
  throw new Error("read-back mismatch: /output/entry.txt differs from entry");
}
console.log(`Wrote ${codePoints} characters to /output/entry.txt (verified byte-for-byte)`);
