# Hunk Tutor

Learn [Hunk](https://github.com/modem-dev/hunk) inside Hunk. The extension opens a six-lesson practice review, watches the commands you actually run, and highlights the exact checkpoint where each action lands.

https://github.com/user-attachments/assets/4a5b6ef1-389b-46a5-92e3-9dd2f7e78570

## Requirements

- [Hunk](https://github.com/modem-dev/hunk) with extension API v5 or newer
- [Bun](https://bun.sh) only for development or the short `bun run tutor` command

The extension declares its API requirement in `package.json`, so an older Hunk exits with a clear compatibility notice instead of partially loading the tutor. Hunk 0.18.2 does not yet include this API; until the next compatible release, install Hunk from its current `main` branch.

## Run the tutor

Clone the repository:

```bash
git clone https://github.com/mikeclarke/hunk-tutor.git
cd hunk-tutor
bun install
```

Then run the convenient script:

```bash
bun run tutor
```

That script expands to the full Hunk command below:

```bash
hunk diff \
  --extension . \
  --theme hunk-tutor \
  --mode stack
```

`--extension .` explicitly loads this checkout for one Hunk session. The extension's checkout-scoped review adapter supplies the synthetic changeset and its exact old/new documents in memory, so there is no generated patch file and nothing in your project can be modified.

Or run the full command directly from the checkout:

```bash
cd ~/Code/hunk-tutor
hunk diff \
  --extension . \
  --theme hunk-tutor \
  --mode stack
```

### Run against a Hunk source checkout

If your installed `hunk` is still 0.18.2, run the compatible Hunk source tree directly until API v5 reaches a release:

```bash
cd ~/Code/hunk-tutor
bun run ../hunk/src/main.tsx -- diff \
  --extension . \
  --theme hunk-tutor \
  --mode stack
```

Follow the **NEXT ACTION** card in the Tutor pane. Its key labels come from your effective Hunk keybindings, so custom mappings are reflected automatically. The bright mark is the next destination; the softer tint confirms the result of the action you just completed.

## Why it is loaded explicitly

The tutor is a guided session, not an always-on enhancement for normal reviews. Running it with `--extension` keeps its pane, transient view settings, theme, and progress tracking scoped to the practice review. You do not need to copy it into `~/.config/hunk/extensions` or run `hunk extension install`.

The extension also checks the exact practice-file set before opening its welcome dialog. Accidentally loading it against an ordinary diff will not replace the file pane.

## What the lessons cover

1. Moving by row, hunk, file, and review boundary
2. Paging, half-paging, horizontal panning, and folded context
3. Split/stack layout, line chrome, wrapping, themes, and panes
4. File filtering, focus, refresh, and editor handoff
5. Agent rationale and human review notes
6. How Hunk extensions use commands, events, panes, and line highlights

## Repository layout

```text
src/index.tsx       extension entrypoint and lesson state machine
src/content.ts      before/after documents that make up the lessons
src/reviewSource.ts checkout-scoped adapter that builds the review in memory
tests/              content and exact-spotlight contract tests
```

## Development

Install development dependencies and run the contract tests:

```bash
bun install
bun run test
```

The review is derived directly from `src/content.ts`, so editing a lesson requires no generated-file step.

For a real terminal check, run `bun run tutor` and complete the trail. The tutor uses only Hunk's public extension API; `react` is a development dependency for local tests and is supplied by Hunk at runtime.

## License

MIT
