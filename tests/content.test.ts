import { describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { getTutorDocumentText, TUTOR_PATHS } from "../src/content";
import { buildTutorPatch, detectTutorReview, loadTutorReview } from "../src/reviewSource";

const TUTOR_PATCH = buildTutorPatch();

describe("tutor content", () => {
  test("keeps the synthetic review entirely instructional", () => {
    expect(TUTOR_PATHS.every((path) => path.endsWith(".md"))).toBe(true);
    expect(TUTOR_PATCH).toContain("This diff is the tutorial.");
    expect(TUTOR_PATCH).toContain("You are not editing a project.");
    expect(TUTOR_PATCH).toContain("Shortcuts serve one question:");
    expect(TUTOR_PATCH).toContain("Spotlights use exact diff text.");
    expect(TUTOR_PATCH).toContain("Drag diff text to copy it.");
    expect(TUTOR_PATCH).not.toContain("starship");
    expect(TUTOR_PATCH).not.toContain("autopilot");
  });

  test("keeps ordinary guide lines readable beside the tutor pane", () => {
    const intentionalOverflow = ["PAN RIGHT", "WRAP RESULT"];
    const ordinaryLines = TUTOR_PATHS.flatMap((path) =>
      (["old", "new"] as const).flatMap((side) =>
        (getTutorDocumentText(path, side) ?? "")
          .split("\n")
          .filter((line) => !intentionalOverflow.some((prefix) => line.startsWith(prefix))),
      ),
    );

    expect(ordinaryLines.every((line) => line.length <= 36)).toBe(true);
  });

  test("pairs the panning directions on one intentionally wide guide line", () => {
    const revealLine = TUTOR_PATCH.split("\n").find((line) => line.includes("PAN RIGHT once"));

    expect(revealLine).toBeDefined();
    expect(revealLine).toContain("PAN LEFT once");
    expect(revealLine!.indexOf("PAN LEFT once")).toBeGreaterThan(
      revealLine!.indexOf("PAN RIGHT once"),
    );
    expect(revealLine).toContain("gutters stay fixed");
    expect(revealLine!.length).toBeGreaterThan(120);
  });

  test("hides an explanation inside unchanged context for the expansion lesson", () => {
    const hiddenSource = getTutorDocumentText("02-scrolling-and-panning.md", "new");

    expect(hiddenSource).toContain("YOU REVEALED THE FOLDED GUIDE");
    expect(TUTOR_PATCH).not.toContain("YOU REVEALED THE FOLDED GUIDE");
    expect(TUTOR_PATCH).toContain("The collapsed section hides a guide");
  });

  test("makes the filter exercise describe the visible result", () => {
    expect(TUTOR_PATHS).toContain("04-find-a-file/needle.md");
    expect(TUTOR_PATCH).toContain("FILTER MATCH — only visible file");
    expect(TUTOR_PATCH).toContain("FILTER CLEAR — full guide returned");
  });

  test("gives every later lesson named arrivals and an explicit handoff", () => {
    for (const phrase of [
      "SPLIT RESULT",
      "LINE RESULT",
      "THEME RESULT",
      "LESSON 4 START",
      "FILTER FOCUS",
      "FILTER MATCH",
      "FILTER CLEAR",
      "LESSON 5 START",
      "AGENT NOTE RESULT",
      "NEXT NOTE RESULT",
      "PREVIOUS NOTE RESULT",
      "SAVE RESULT",
      "LESSON 6 START",
      "KEYMAP RESULT",
      "FINISH CHECKPOINT",
    ]) {
      expect(TUTOR_PATCH).toContain(phrase);
    }
  });

  test("loads through a checkout-scoped review adapter with exact source sides", async () => {
    const tutorRoot = resolve(import.meta.dir, "..");
    expect(detectTutorReview(tutorRoot)?.id).toBe("tutor");
    expect(detectTutorReview(resolve(tutorRoot, "src"))?.id).toBe("tutor");
    expect(detectTutorReview(resolve(tutorRoot, ".."))).toBeNull();

    const review = await loadTutorReview();
    expect(review.patchText).toBe(TUTOR_PATCH);
    expect(
      await review.readFileSource?.({
        path: "02-scrolling-and-panning.md",
        changeType: "change",
        isUntracked: false,
        side: "new",
      }),
    ).toContain("YOU REVEALED THE FOLDED GUIDE");
  });
});
