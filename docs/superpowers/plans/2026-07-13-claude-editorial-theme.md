# Claude Editorial Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn both Typora stylesheets into one coherent Claude Editorial system while preserving Songti prose and every runtime contract owned by `typora-plugin-lite`.

**Architecture:** Keep the two distributable CSS files self-contained, but give them identical semantic token names and structural selectors. Add a dependency-free Node contract test that reads the real CSS, checks palette/contrast/geometry/plugin boundaries, and prevents light/dark drift; use a temporary Markdown fixture plus the installed Typora instance for live visual verification.

**Tech Stack:** Typora theme CSS, Node.js built-in test runner, `typora-plugin-lite` remote-control JSON-RPC, macOS window capture, OMX visual-verdict workflow, Git.

---

## File Map

- Modify: `claude-like.css` — light Claude Editorial tokens and all light-theme component/UI rules.
- Modify: `claude-like-dark.css` — dark token mapping with selector parity to the light theme.
- Create: `tests/theme-contract.test.mjs` — dependency-free regression checks for shared theme behavior.
- Create: `docs/superpowers/plans/2026-07-13-claude-editorial-theme.md` — this execution checklist.
- Use without committing: `/tmp/claude-editorial-theme-fixture.md` — comprehensive live Typora fixture.
- Use without committing: `/tmp/typora-claude-editorial-*.png` — screenshots for visual review.
- Persist but do not commit unless already tracked: `.omx/state/claude-editorial-theme/ralph-progress.json` — visual-verdict state.

No `typora-plugin-lite` source file is modified. Its Wider, Sidenote, and Fence Enhance implementations are read-only integration contracts.

### Task 1: Add the failing theme contract

**Files:**
- Create: `tests/theme-contract.test.mjs`

- [ ] **Step 1: Write a contract test that reads both real stylesheets**

Create a Node test containing local helpers for root-variable parsing, rule-body lookup, selector extraction, color resolution, and WCAG contrast. Require these shared semantic variables in both files:

```js
const requiredSemanticTokens = [
  '--canvas-color',
  '--sidebar-color',
  '--surface-color',
  '--surface-subtle-color',
  '--surface-active-color',
  '--ink-color',
  '--ink-strong-color',
  '--ink-muted-color',
  '--line-color',
  '--line-strong-color',
  '--accent-color',
  '--accent-hover-color',
  '--selection-soft-color',
  '--selection-strong-color',
  '--radius-inline',
  '--radius-block',
];
```

The initial test group must assert:

```js
test('both themes expose the Claude Editorial semantic token contract', () => {
  for (const theme of themes) {
    const vars = parseRootVariables(theme.css);
    for (const token of requiredSemanticTokens) assert.ok(vars.has(token), `${theme.name}: ${token}`);
  }
});

test('primary and secondary text meet the contrast contract', () => {
  for (const theme of themes) {
    const vars = parseRootVariables(theme.css);
    assert.ok(contrast(vars.get('--ink-color'), vars.get('--canvas-color')) >= 7);
    assert.ok(contrast(vars.get('--ink-muted-color'), vars.get('--canvas-color')) >= 4.5);
    assert.ok(contrast(vars.get('--accent-color'), vars.get('--canvas-color')) >= 4.5);
  }
});
```

Also assert that `#write` keeps an `860px` fallback, neither file defines a generic large-screen `#write` width override, and the Sidenote/line-number variables still appear.

- [ ] **Step 2: Run the contract and verify RED**

Run:

```bash
node --test tests/theme-contract.test.mjs
```

Expected: FAIL because semantic tokens such as `--canvas-color` and `--radius-inline` do not exist yet. Width/plugin-boundary assertions should already pass.

- [ ] **Step 3: Commit the failing contract**

Commit only the test and plan with a Lore message whose first line explains why the theme needs an executable design contract. Record the RED result in `Tested:`.

### Task 2: Introduce the shared semantic palette

**Files:**
- Modify: `claude-like.css:1-55`
- Modify: `claude-like-dark.css:1-55`
- Test: `tests/theme-contract.test.mjs`

- [ ] **Step 1: Add exact light semantic tokens and alias Typora variables to them**

Use this light mapping at the top of `claude-like.css`:

```css
--canvas-color: #faf9f6;
--sidebar-color: #f3f1ec;
--surface-color: #f2f1ee;
--surface-subtle-color: #f7f6f3;
--surface-active-color: #ebe8e2;
--ink-color: #34312e;
--ink-strong-color: #201e1c;
--ink-muted-color: #6f6b66;
--line-color: #ddd9d2;
--line-strong-color: #c9c3bb;
--accent-color: #a85d3b;
--accent-hover-color: #8d4b31;
--selection-soft-color: rgba(168, 93, 59, 0.18);
--selection-strong-color: rgba(168, 93, 59, 0.34);
--radius-inline: 3px;
--radius-block: 6px;
```

Alias Typora-facing variables rather than duplicating hex values:

```css
--side-bar-bg-color: var(--sidebar-color);
--control-text-color: var(--ink-muted-color);
--text-color: var(--ink-color);
--bg-color: var(--canvas-color);
--heading-color: var(--ink-strong-color);
--border-color: var(--line-color);
--active-file-bg-color: var(--surface-active-color);
--active-file-border-color: var(--accent-color);
```

Keep quote/code/inline-code roles neutral and contrast-safe. Use
`#575754` on `#f2f1ee` for quote text/surface, `#8e4f37` for inline code,
and `#797169` for completed tasks.

- [ ] **Step 2: Add exact dark semantic tokens with the same names**

Use this mapping at the top of `claude-like-dark.css`:

```css
--canvas-color: #1f1e1c;
--sidebar-color: #181715;
--surface-color: #292826;
--surface-subtle-color: #242321;
--surface-active-color: #32302d;
--ink-color: #d7d4cf;
--ink-strong-color: #f1eee8;
--ink-muted-color: #9b9790;
--line-color: #3b3935;
--line-strong-color: #4b4842;
--accent-color: #e0a07a;
--accent-hover-color: #efb390;
--selection-soft-color: rgba(224, 160, 122, 0.22);
--selection-strong-color: rgba(224, 160, 122, 0.38);
--radius-inline: 3px;
--radius-block: 6px;
```

Use `#c9c6c0` for quote text on the shared dark surface, `#e3a08f` for inline code, and `#9b9790` for completed tasks.

- [ ] **Step 3: Map alert colors to semantic variables**

Add `--alert-note`, `--alert-tip`, `--alert-important`, `--alert-warning`, and `--alert-caution` plus matching `-surface` tokens in each root. Replace per-alert hard-coded declarations with those variables so each semantic color is defined once per theme.

- [ ] **Step 4: Run the contract and verify GREEN for palette tests**

Run:

```bash
node --test tests/theme-contract.test.mjs
```

Expected: all current tests PASS, including minimum contrast and plugin-boundary checks.

- [ ] **Step 5: Commit the semantic palette**

Commit the two stylesheets and updated contract. State the measured light/dark contrast ratios in `Tested:`.

### Task 3: Lock and implement typography and rhythm

**Files:**
- Modify: `tests/theme-contract.test.mjs`
- Modify: `claude-like.css:60-220`
- Modify: `claude-like-dark.css:60-220`

- [ ] **Step 1: Add failing typography and rhythm assertions**

Add rule-body assertions for:

```js
expectDeclaration(light, 'body', 'line-height', '1.58');
expectDeclaration(light, 'p, blockquote, ul, ol, dl, table', 'margin', '0.74em 0');
expectDeclaration(light, 'h2', 'line-height', '1.22');
expectDeclaration(light, 'h6', 'font-family', 'var(--font-ui)');
expectDeclaration(dark, 'body', 'line-height', '1.58');
```

Assert that body rules do not add non-zero `letter-spacing` and that heading selectors remain structurally identical between themes.

- [ ] **Step 2: Run and verify RED**

Run `node --test tests/theme-contract.test.mjs`.

Expected: FAIL on the old `1.57`, `.78em`, and H2 `1.2` values.

- [ ] **Step 3: Implement the shared editorial rhythm**

Apply identically to both files:

```css
body { line-height: 1.58; }
p, blockquote, ul, ol, dl, table { margin: 0.74em 0; }
h2 { line-height: 1.22; margin-top: 1.72rem; }
h3 { margin-top: 1.5rem; }
h4, h5, h6 { margin-top: 1.3rem; }
h6 { font-size: 0.91em; }
```

Keep H1 near the existing document-scale `1.84em`; do not create marketing-scale display text. Preserve Songti for body/headings and the existing UI/mono stacks.

- [ ] **Step 4: Run and verify GREEN**

Run `node --test tests/theme-contract.test.mjs` and expect all tests PASS.

- [ ] **Step 5: Commit typography and rhythm**

Record the exact body, heading, and paragraph rhythm in the Lore commit.

### Task 4: Unify document components

**Files:**
- Modify: `tests/theme-contract.test.mjs`
- Modify: `claude-like.css:200-620,760-850`
- Modify: `claude-like-dark.css:200-620,760-850`

- [ ] **Step 1: Add failing component assertions**

Assert these declarations in both themes:

```js
expectDeclaration(theme, 'blockquote', 'border-radius', 'var(--radius-inline)');
expectDeclaration(theme, 'blockquote', 'line-height', '1.48');
expectDeclaration(theme, '.md-alert', 'border-radius', 'var(--radius-block)');
expectDeclaration(theme, '.md-fences', 'border-radius', 'var(--radius-block)');
expectDeclaration(theme, 'code, tt', 'border-radius', 'var(--radius-inline)');
expectDeclaration(theme, '.md-toc', 'border-radius', 'var(--radius-block)');
```

Also assert that the `.md-fences` body contains `box-shadow: none`, image rules include an inset neutral outline, and table cells remain below the body size with top alignment.

- [ ] **Step 2: Run and verify RED**

Run `node --test tests/theme-contract.test.mjs`.

Expected: FAIL on literal radii, old quote line height, remaining fence shadow, and missing image outline.

- [ ] **Step 3: Implement quote, alert, code, table, image, TOC, metadata, and math rules**

Use the shared surfaces and radius tokens. Key declarations:

```css
blockquote {
  border-radius: var(--radius-inline);
  line-height: 1.48;
  padding: 0.5rem 0.8rem 0.5rem 0.68rem;
}

.md-alert,
.md-fences,
.md-toc,
#write pre.md-meta-block {
  border-radius: var(--radius-block);
}

.md-fences {
  box-shadow: none;
  line-height: 1.52;
}

code,
tt {
  border-radius: var(--radius-inline);
}

#write img {
  outline: 1px solid var(--image-outline-color);
  outline-offset: -1px;
}
```

Define `--image-outline-color` in both roots. Replace TOC, metadata, and math backgrounds with semantic surface variables. Keep the line-number counter logic and `--tpl-lineno-digits` untouched.

- [ ] **Step 4: Run and verify GREEN**

Run `node --test tests/theme-contract.test.mjs`; expect all tests PASS.

- [ ] **Step 5: Commit document component polish**

Explain that containers now share low-chroma surfaces and one radius family; record the contract result.

### Task 5: Neutralize Typora chrome and restore light/dark parity

**Files:**
- Modify: `tests/theme-contract.test.mjs`
- Modify: `claude-like.css:850-1526`
- Modify: `claude-like-dark.css:850-1515`

- [ ] **Step 1: Add failing application-UI assertions**

Add tests that:

- compare normalized selector sets and report every light-only/dark-only selector;
- require active file rows to use `var(--surface-active-color)` and a `2px` inset accent marker;
- require quick open, dropdowns, menu-style buttons, metadata, and math surfaces to use semantic variables;
- require search highlights to use selection tokens;
- forbid the old light peach values `#faf4ec`, `#fdf9f4`, `#fff9f2`, `#f6efe6`, `#f6f1ea`, and `#f7f2eb` outside comments/data URLs;
- forbid old dark chrome literals `#252525`, `#2a2a2a`, and `#333333` outside root fallback declarations.

- [ ] **Step 2: Run and verify RED**

Run `node --test tests/theme-contract.test.mjs`.

Expected: FAIL with the current hard-coded application surfaces and the known missing dark megamenu heading selector.

- [ ] **Step 3: Replace chrome hard-codes with semantic roles**

Apply the following behavior in both stylesheets:

```css
.file-tree-node.active > .file-node-content,
.outline-item.active {
  background-color: var(--surface-active-color) !important;
  box-shadow: inset 2px 0 0 var(--accent-color);
}

#typora-quick-open,
#typora-quick-open-item,
.dropdown-menu,
.menu-item-container a.menu-style-btn {
  background-color: var(--surface-subtle-color);
  border-color: var(--line-color);
  background-image: none;
}

.md-search-hit { background: var(--selection-soft-color) !important; }
.md-search-select { background: var(--selection-strong-color) !important; }
```

Use shared surface/line tokens for sticky ancestors and the sticky active file; retain the minimum shadow needed to distinguish sticky overlay rows. Use `--tree-line-color` for ordinary connector declarations and keep equivalent embedded SVG RGBA values in light/dark data URLs.

- [ ] **Step 4: Restore exact structural parity**

Add the megamenu heading selector group to the dark file and mirror any other structural rule discovered by the parity test. Differences should remain only in root values and visually necessary shadow/embedded SVG colors.

- [ ] **Step 5: Run and verify GREEN**

Run:

```bash
node --test tests/theme-contract.test.mjs
git diff --check
```

Expected: all tests PASS and no whitespace errors.

- [ ] **Step 6: Commit Typora chrome and parity**

Record removed hard-coded surface families, final selector counts, and test result.

### Task 6: Install the candidate and build the live Typora fixture

**Files:**
- Create outside repo: `/tmp/claude-editorial-theme-fixture.md`
- Copy candidate CSS to the user Typora theme directory

- [ ] **Step 1: Discover the active Typora theme directory and back up installed candidates**

Inspect `~/Library/Application Support/abnerworks.Typora/themes/`. Copy any existing installed `claude-like.css` and `claude-like-dark.css` to timestamped files under `/tmp`, never into the repository.

- [ ] **Step 2: Create the comprehensive temporary Markdown fixture**

Write real Chinese/English sample content covering H1–H6, paragraphs, links, emphasis, nested lists, tasks, quotes, nested quotes, all five GitHub alerts, narrow/wide tables, inline code, a 120-line fence, image, math, TOC, metadata, and a Sidenote span. The content exists only to expose rendering behavior and contains no user-document edits.

- [ ] **Step 3: Install the candidate CSS**

Copy the worktree stylesheets to the actual Typora themes directory, preserving the expected filenames. Record SHA-256 checksums for worktree and installed copies and require exact matches.

- [ ] **Step 4: Open and verify the fixture through Typora Remote**

Run:

```bash
node /Users/cdcd/.agents/skills/typora-remote/scripts/typora-remote-cli.mjs open-file /tmp/claude-editorial-theme-fixture.md
node /Users/cdcd/.agents/skills/typora-remote/scripts/typora-remote-cli.mjs context
```

Expected: `context.filePath` is the fixture, `sourceMode` is false, and there are no unsaved changes.

- [ ] **Step 5: Verify runtime DOM contracts using the opt-in eval RPC**

Read computed style and geometry for the active visible `#write`, quote, fence, table, inline code, TOC, and Sidenote elements. Invoke `wider:set-default`, `wider:set-wide`, and `wider:set-full`, re-read after each invocation, and assert actual width equals computed width without horizontal document overflow.

### Task 7: Iterate visually in Typora

**Files:**
- Modify as needed: `claude-like.css`
- Modify as needed: `claude-like-dark.css`
- Update as needed: `tests/theme-contract.test.mjs`
- Persist: `.omx/state/claude-editorial-theme/ralph-progress.json`

- [ ] **Step 1: Capture a light Default-width screenshot**

Bring Typora to the foreground and capture only its document window. If Computer Use cannot resolve the window, obtain the CoreGraphics window ID and use `screencapture -l`; do not accept an all-black or full-desktop capture.

- [ ] **Step 2: Run visual-verdict against the Claude Editorial design**

Use repository `image/light.png` as historical context, not as a pixel-perfect target. Persist strict JSON:

```json
{
  "score": 0,
  "verdict": "revise",
  "category_match": true,
  "differences": [],
  "suggestions": [],
  "reasoning": "",
  "threshold": 90,
  "next_actions": []
}
```

Score reading hierarchy, color restraint, geometry, spacing, table/code behavior, sidebar integration, and Claude Editorial character. If the score is below 90, apply only the concrete next actions, rerun static tests, reinstall CSS, and capture again before another edit.

- [ ] **Step 3: Exercise Wider and narrow-window behavior**

Capture or inspect Default, Wide, and Full at the current large viewport. Resize to a narrow working window and verify all modes collapse without overflow. Confirm type size and vertical rhythm remain constant while tables/code gain horizontal room.

- [ ] **Step 4: Exercise Sidenote and Fence Enhance**

Confirm Sidenote reserve is present only when the fixture includes sidenotes and only at the wide breakpoint. Confirm code line-number columns match the 120-line fence, copy controls stay inside the fence, and selecting/copying code excludes line numbers.

- [ ] **Step 5: Capture and score the dark theme**

Switch Typora to `claude-like-dark`, capture the same document region, and run visual-verdict. Iterate until the score is at least 90 and the dark theme reads as warm charcoal rather than pure black or high-chroma orange.

- [ ] **Step 6: Commit any evidence-driven corrections**

Keep light/dark changes mirrored, extend the contract when a regression becomes mechanically testable, and record the visual-verdict scores in `Tested:`.

### Task 8: Run the final verification and prepare integration

**Files:**
- Verify: all tracked files on `design/claude-editorial-system`

- [ ] **Step 1: Run fresh static verification**

Run:

```bash
node --test tests/theme-contract.test.mjs
git diff --check master...HEAD
git status --short --branch
```

Expected: all tests PASS, no whitespace errors, and only documented work remains.

- [ ] **Step 2: Run fresh live verification**

Recompute installed/worktree checksums, reopen the fixture, inspect context, invoke all Wider modes, and record final actual/computed widths. Reconfirm light and dark representative screenshots score at least 90.

- [ ] **Step 3: Review the complete diff against the design spec**

Check every acceptance criterion in `docs/superpowers/specs/2026-07-13-claude-editorial-theme-design.md`. Confirm there are no new dependencies, no plugin edits, no generic large-screen width override, and no unexplained selector asymmetry.

- [ ] **Step 4: Create the final Lore commit if corrections remain uncommitted**

The first line must explain why the final corrections were necessary. Include constraints, rejected alternatives, confidence, scope risk, reversibility, all static/live verification, visual scores, and honest untested risks.

- [ ] **Step 5: Use `superpowers:finishing-a-development-branch`**

Verify the branch one final time, then integrate the approved implementation into the primary checkout without touching the pre-existing untracked `.omc/` directory. Do not push unless the user explicitly requests it.
