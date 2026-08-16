/** One before/after document used to build the bundled tutor's synthetic changeset. */
export interface TutorDocument {
  path: string;
  before: string;
  after: string;
}

/** Join source lines with the final newline real documents normally carry. */
function lines(...source: string[]) {
  return `${source.join("\n")}\n`;
}

/** Build numbered instructional rows that make page-sized movement visible. */
function scrollingRows(prefix: string, count: number) {
  return Array.from(
    { length: count },
    (_, index) => `${prefix} ${String(index + 1).padStart(2, "0")}`,
  );
}

const NAVIGATION_BRIDGE = [
  "Tip 01 — highlight = your place.",
  "Tip 02 — movement never edits.",
  "Tip 03 — files form one stream.",
  "Tip 04 — context frames changes.",
  "Tip 05 — sidebar is an index.",
  "Tip 06 — pane shows your keys.",
  "Tip 07 — mouse shares this state.",
  "Tip 08 — selection anchors jumps.",
  "Tip 09 — big reviews reward jumps.",
  "Tip 10 — next change is below.",
];

const HIDDEN_CONTEXT = [
  "Hidden 01 — long context folds.",
  "Hidden 02 — changes stay central.",
  "Hidden 03 — setup can be evidence.",
  "Hidden 04 — expand it in Hunk.",
  "Hidden 05 — toggle to collapse.",
  "YOU REVEALED THE FOLDED GUIDE.",
  "Hidden 07 — inspect dependencies.",
  "Hidden 08 — the ellipsis is a clue.",
  "Hidden 09 — expansion is local.",
  "Hidden 10 — context can matter.",
];

const beforeScrollRows = scrollingRows("Practice row", 42).map((line, index) => {
  const row = index + 1;
  if (row === 5) return "HALF-PAGE CHECKPOINT — made it.";
  if (row === 10) return "PAGE CHECKPOINT — made it.";
  if (row === 27) return "CHECKPOINT B — mix pages and rows.";
  return line;
});
const afterScrollRows = beforeScrollRows.map((line, index) => {
  const row = index + 1;
  if (row === 1) return "START — row steps are precise.";
  if (row === 5 || row === 10 || row === 27) return line;
  if (row === 34) return "SCAN TIP — page, then row.";
  if (row === 42) return "END — page-up returns.";
  return `Row ${String(row).padStart(2, "0")} — distance made visible.`;
});

const PAN_REVEAL =
  "PAN RIGHT once → PAN LEFT once ← code moves while gutters stay fixed ................................................................................ distant columns stay available without wrapping.";

/** The curated files are themselves the guide, in the order shortcuts reveal them. */
export const TUTOR_DOCUMENTS: readonly TutorDocument[] = [
  {
    path: "00-start-here.md",
    before: lines("# Hunk Tutor", "", "This is a practice review."),
    after: lines(
      "# Hunk Tutor",
      "",
      "TOP OF REVIEW — Start Here.",
      "This diff is the tutorial.",
      "You are not editing a project.",
      "Changed lines teach Hunk.",
      "Each shortcut has a purpose.",
      "",
      "Keep the Tutor pane open.",
      "It shows one configured key.",
      "Follow the exact-text spotlight.",
      "",
      "> Lost? Open controls help.",
      "> Restart from Extensions.",
    ),
  },
  {
    path: "01-moving-through-a-review.md",
    before: lines(
      "# Lesson 1 — Move through a review",
      "",
      "## Nearby rows",
      "The highlight marks your place.",
      "Move around the document.",
      "",
      ...NAVIGATION_BRIDGE,
      "",
      "## Changed blocks and files",
      "A hunk groups nearby changed lines.",
      "Move between changes and files.",
    ),
    after: lines(
      "# Lesson 1 — Follow the trail",
      "",
      "## Nearby rows",
      "START HERE — open controls help.",
      "STEP DOWN — you moved down one row.",
      "PREVIOUS HUNK — back at first hunk.",
      "LESSON 1 RETURN — back one file.",
      "Tint confirms your last arrival.",
      "",
      ...NAVIGATION_BRIDGE,
      "",
      "## Changed blocks and files",
      "NEXT HUNK — reached next change.",
      "A hunk groups nearby changed lines.",
      "Next-file lands on next lesson.",
      "Previous-file returns one lesson.",
      "Top and bottom span the review.",
    ),
  },
  {
    path: "02-scrolling-and-panning.md",
    before: lines(
      "# Lesson 2 — Cover distance",
      "",
      "One line below is extra wide.",
      "Pan across this placeholder.",
      "",
      ...beforeScrollRows,
      "",
      ...HIDDEN_CONTEXT,
      "",
      "## Folded context",
      "Expand context when setup matters.",
    ),
    after: lines(
      "# LESSON 2 START — Cover distance",
      "",
      "One line below is extra wide.",
      "Keep wrapping off for this hunt.",
      PAN_REVEAL,
      "",
      ...afterScrollRows,
      "",
      ...HIDDEN_CONTEXT,
      "",
      "## Folded context",
      "The collapsed section hides a guide.",
      "Expand it to reveal the message.",
      "Pages expose distant rows.",
      "Panning exposes distant columns.",
      "Expansion exposes folded context.",
    ),
  },
  {
    path: "03-shaping-the-view.md",
    before: lines(
      "# Lesson 3 — View settings",
      "",
      "Choose a presentation.",
      "Show useful chrome.",
      "Try a color theme.",
    ),
    after: lines(
      "# LESSON 3 START — Shape the view",
      "",
      "SPLIT RESULT — compare side by side.",
      "STACK RESULT — use the full width.",
      "AUTO RESULT — fit this terminal.",
      "",
      "LINE RESULT — gutter chrome changed.",
      "WRAP RESULT — this deliberately long explanation changes shape when wrapping toggles, showing how a narrow pane can trade horizontal scanning for extra vertical rows.",
      "HEADER RESULT — ranges changed.",
      "",
      "THEME RESULT — palette changed.",
      "Diff meaning stayed the same.",
      "MENU RESULT — top chrome changed.",
      "F10 still opens every menu.",
      "SIDEBAR HANDOFF — hide Tutor now.",
      "It reopens at LESSON 4 START.",
    ),
  },
  {
    path: "04-find-a-file/haystack-a.md",
    before: lines("# Filtering", "", "Many files can share one review."),
    after: lines(
      "# Filtering: haystack A",
      "",
      "This file vanishes for `needle`.",
      "Filtering narrows the review.",
      "It does not alter the changeset.",
    ),
  },
  {
    path: "04-find-a-file/needle.md",
    before: lines("# Filtering", "", "Find one file."),
    after: lines(
      "# LESSON 4 START — Find the signal",
      "",
      "FILTER FOCUS — input is ready.",
      "Type `needle`; watch files vanish.",
      "FILTER MATCH — only visible file.",
      "You made it; Escape restores all.",
      "FILTER CLEAR — full guide returned.",
      "",
      "FOCUS RESULT — review owns keys.",
      "Selection stayed on this file.",
      "REFRESH RESULT — guide unchanged.",
      "A real review reloads its source.",
      "EDITOR HANDOFF — try `$EDITOR`.",
      "No project file will be touched.",
    ),
  },
  {
    path: "04-find-a-file/haystack-b.md",
    before: lines("# Filtering", "", "Many files can share one review."),
    after: lines(
      "# Filtering: haystack B",
      "",
      "This also vanishes for `needle`.",
      "It returns when the query clears.",
      "File order remains stable.",
    ),
  },
  {
    path: "05-context-and-notes.md",
    before: lines(
      "# Lesson 5 — Context and notes",
      "",
      "## Agent explanations",
      "A changed hunk can have rationale.",
      "Read the change alone.",
      "",
      ...NAVIGATION_BRIDGE,
      "",
      "## Human review notes",
      "A reviewer can ask a question.",
      "Keep the question elsewhere.",
    ),
    after: lines(
      "# LESSON 5 START — Add context",
      "",
      "## Agent explanations",
      "AGENT NOTE RESULT — why is visible.",
      "PREVIOUS NOTE RESULT — back at why.",
      "DRAFT RESULT — composer opens here.",
      "SAVE RESULT — your note stays here.",
      "",
      ...NAVIGATION_BRIDGE,
      "",
      "## Human review notes",
      "NEXT NOTE RESULT — question hunk.",
      "Explained changes can be distant.",
      "You made it; return to prior note.",
      "Human questions stay beside code.",
      "NEXT LESSON — continue one file.",
    ),
  },
  {
    path: "06-how-the-tutor-works.md",
    before: lines("# Lesson 6 — Extensions", "", "Extensions add behavior."),
    after: lines(
      "# LESSON 6 START — Extensions",
      "",
      "EXTENSION RESULT — Tutor is proof.",
      "This sidebar uses the public API.",
      "Spotlights use exact diff text.",
      "Lesson entries reveal exact lines.",
      "It adds commands and event handlers.",
      "It transforms the guide changeset.",
      "",
      "KEYMAP RESULT — controls use yours.",
      "FINISH CHECKPOINT — open the dialog.",
      "Tutor listens for command names.",
      "It does not hard-code keys.",
      "Steps follow live `[keybindings]`.",
      "Other extensions use these APIs.",
      "They can add views and dialogs.",
      "They can add review tools.",
      "",
      "Confirm to complete this trail.",
    ),
  },
  {
    path: "07-finish-and-next-steps.md",
    before: lines("# Next", "", "Open a review."),
    after: lines(
      "# Finish — use Hunk on a real change",
      "",
      "BOTTOM OF REVIEW — you made it.",
      "You can move through a review.",
      "You can shape and filter it.",
      "You can add review context.",
      "Shortcuts serve one question:",
      "what changed, and why?",
      "",
      "Try one after leaving Tutor:",
      "",
      "- working tree: `hunk diff`",
      "- staged: `hunk diff --staged`",
      "- commit: `hunk show HEAD~1`",
      "- stash: `hunk stash show`",
      "- patch: `hunk patch change.diff`",
      "- rationale: `--agent-context`",
      "- live reload: `hunk diff --watch`",
      "",
      "Use the mouse when it is natural.",
      "Drag diff text to copy it.",
      "Primary actions keep key parity.",
      "Open controls for a reminder.",
      "Quit when the diff is understood.",
    ),
  },
];

/** Return one complete synthetic tutorial document side for context expansion. */
export function getTutorDocumentText(path: string, side: "old" | "new") {
  const document = TUTOR_DOCUMENTS.find((candidate) => candidate.path === path);
  return document?.[side === "old" ? "before" : "after"] ?? null;
}

/** Paths in the exact narrative order Hunk should render and navigate. */
export const TUTOR_PATHS = TUTOR_DOCUMENTS.map((document) => document.path);
