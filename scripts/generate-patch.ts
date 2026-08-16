import { createTwoFilesPatch } from "diff";
import { TUTOR_DOCUMENTS } from "../src/content";

/** Build the deterministic practice patch loaded by the tutor command. */
function buildTutorPatch() {
  const patch = TUTOR_DOCUMENTS.map((document) =>
    createTwoFilesPatch(
      document.path,
      document.path,
      document.before,
      document.after,
      "before",
      "after",
      { context: 3 },
    ),
  ).join("\n");

  // `diff` emits one space after +/- for blank changed lines. Unified diffs do
  // not need it, and removing it keeps the checked-in patch whitespace-clean.
  return patch.replace(/^[+-] $/gm, (line) => line[0]!);
}

const outputUrl = new URL("../tutor.patch", import.meta.url);
const generated = buildTutorPatch();

if (process.argv.includes("--check")) {
  const existing = await Bun.file(outputUrl).text();
  if (existing !== generated) {
    console.error("tutor.patch is stale; run `bun run generate:patch`.");
    process.exit(1);
  }
} else {
  await Bun.write(outputUrl, generated);
  console.log("Generated tutor.patch");
}
