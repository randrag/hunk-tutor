import { describe, expect, test } from "bun:test";
import { getTutorSpotlightPlan } from "../src";
import { getTutorDocumentText } from "../src/content";

describe("tutor spotlight plan", () => {
  test("addresses every guided step to the exact source phrase it teaches", () => {
    const plan = getTutorSpotlightPlan();

    expect(plan).toHaveLength(40);
    expect(new Set(plan.map((target) => target.taskId)).size).toBe(plan.length);
    for (const target of plan) {
      const sourceLine = getTutorDocumentText(target.path, target.side)?.split("\n")[
        target.line - 1
      ];
      expect(sourceLine?.slice(...target.range)).toBe(target.phrase);
    }

    expect(plan.find((target) => target.taskId === "next-file")).toMatchObject({
      path: "02-scrolling-and-panning.md",
      phrase: "LESSON 2 START",
    });
    expect(plan.find((target) => target.taskId === "top")).toMatchObject({
      path: "00-start-here.md",
      phrase: "TOP OF REVIEW",
    });
    expect(plan.find((target) => target.taskId === "bottom")).toMatchObject({
      path: "07-finish-and-next-steps.md",
      phrase: "BOTTOM OF REVIEW",
    });
    expect(plan.find((target) => target.taskId === "sidebar")).toMatchObject({
      path: "04-find-a-file/needle.md",
      phrase: "LESSON 4 START",
    });
    expect(plan.find((target) => target.taskId === "momentum-next-file")).toMatchObject({
      path: "03-shaping-the-view.md",
      phrase: "LESSON 3 START",
    });
    expect(plan.find((target) => target.taskId === "editor")).toMatchObject({
      path: "05-context-and-notes.md",
      phrase: "LESSON 5 START",
    });
    expect(plan.find((target) => target.taskId === "context-next-file")).toMatchObject({
      path: "06-how-the-tutor-works.md",
      phrase: "LESSON 6 START",
    });
  });
});
