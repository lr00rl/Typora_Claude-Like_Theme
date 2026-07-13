# Claude Editorial Theme Design

**Status:** Approved direction  
**Date:** 2026-07-13  
**Scope:** `claude-like.css` and `claude-like-dark.css`  
**Reference systems:** `cd-design-skill`, Typora, and `typora-plugin-lite`

## 1. Intent

Evolve the theme into a coherent Claude-style writing environment: warm,
quiet, editorial, and technically reliable. Preserve the existing Chinese
serif reading character while replacing scattered styling decisions with one
semantic system shared by the light and dark themes.

This is a document theme, not a recreation of the Claude chat application.
Long-form reading and Markdown authoring take priority over product-UI mimicry.

## 2. Design Position

**Style:** Warm Minimalism × Editorial Document  
**Primary feeling:** Calm, considered, and comfortable for sustained reading  
**Primary job:** Author and read Chinese-first technical and long-form notes  
**One big idea:** Treat the editor as quiet warm paper. Use neutral surfaces,
hairline structure, and typography for hierarchy; reserve terracotta for true
attention and interaction.

The theme deliberately avoids large marketing typography, pill-shaped inline
elements, decorative gradients, visible texture, strong shadows, glass effects,
and card-per-section composition.

## 3. System Boundaries

### Theme owns

- Color, typography, spacing, radius, border, and component presentation.
- Responsive internal padding and safe overflow.
- Visual treatment for Typora editor states and plugin-injected elements.
- Light/dark semantic parity.

### `typora-plugin-lite` owns

- `wider`: the `#write` shell width and Default/Wide/Full calculations.
- `sidenote`: sidenote detection, reserved space, portals, and interaction.
- `fence-enhance`: eager fence rendering, copy behavior, and dynamic line-number
  digit metadata.

The theme must not reintroduce large-screen `#write` width media queries that
override Wider. It may keep `860px` as its no-plugin fallback. It must continue
to honor `--tpl-sidenote-reserve`, `--tpl-sidenote-offset`,
`--tpl-sidenote-width`, and `--tpl-lineno-digits`.

## 4. Color Architecture

Both themes use the same semantic token roles. Dark mode is a deliberate
low-chroma warm-charcoal mapping, not a direct inversion.

### Required semantic roles

| Role | Purpose |
| --- | --- |
| Canvas | Main editor paper |
| Sidebar | Slightly deeper application rail |
| Surface | Quote, code, TOC, and metadata containers |
| Surface subtle | Hover and secondary grouping |
| Ink | Ordinary prose |
| Ink strong | Headings and emphasis |
| Ink muted | Metadata, markers, and secondary UI |
| Line | Ordinary hairline dividers |
| Line strong | Table header and component boundaries |
| Accent | Terracotta interaction and emphasis |
| Accent hover | Higher-contrast interactive state |
| Selection | Quiet accent-derived selection surface |
| Semantic colors | Note, tip, important, warning, and caution |

### Palette behavior

- Warm color belongs primarily to the canvas and sidebar, not every component.
- Quotes, fences, TOC, metadata, math surfaces, and menus use low-chroma warm
  gray rather than yellow or peach.
- Terracotta appears on links, the caret, selection affordances, task controls,
  active navigation markers, and a small number of plugin controls.
- Ordinary borders and table rules remain neutral.
- Semantic alert colors communicate state and do not become additional theme
  accents.
- Body text must meet WCAG 2 AA at minimum; target 7:1 for primary prose.
- Secondary text and interactive accents must meet 4.5:1 at normal text sizes.

## 5. Typography

### Font roles

- **Body and headings:** `Songti SC`, `Noto Serif CJK SC`,
  `Source Han Serif SC`, followed by the existing robust CJK fallbacks.
- **Interface and metadata:** the existing PingFang/system sans stack.
- **Code:** the existing Menlo/SF Mono/CJK mono stack.
- No new font dependency is introduced.

### Typographic behavior

| Role | Target | Notes |
| --- | --- | --- |
| Body | `16px`, `1.56–1.60` | No CJK letter spacing |
| H1 | about `1.85rem`, `1.16` | Document title, not a hero |
| H2 | about `1.48rem`, `1.22` | Primary section boundary |
| H3 | about `1.24rem`, `1.32` | Subsection |
| H4 | about `1.10rem` | Compact local heading |
| H5 | `1rem` | Weight/color hierarchy first |
| H6 | about `.91rem`, sans | Metadata-like heading |
| Table | about `.92rem`, `1.48–1.54` | Compact and top-aligned |
| Code fence | about `.89em`, `1.50–1.54` | Stable line-number alignment |
| Blockquote | body size, about `1.48` | Slightly tighter than prose |

Headings use weight, spacing, and ink contrast before additional color.
Strong text remains in the current family at weight 600. The theme must not
apply body-wide synthetic letter spacing. Use `font-synthesis: none` only when
the available fallback faces have been verified; otherwise retain controlled
weight synthesis for CJK resilience.

## 6. Spacing and Reading Rhythm

Use a compact document rhythm rather than a web landing-page rhythm.

- Default `#write` fallback width: `860px`.
- Desktop editor padding: approximately `32px 32px 104px`.
- Narrow editor padding: approximately `24px 20px 84px`.
- Paragraph/list/table rhythm: approximately `.72–.78em`.
- Major section separation is carried by heading top margins, not blank cards.
- H2 receives the strongest section break; H3–H6 become progressively tighter.
- List indentation remains compact and markers remain visually subordinate.
- First/last children inside bounded components must not create doubled space.

Wide and Full modes expand structures such as code, tables, diagrams, and
comparison content. They must not inflate type size or vertical spacing.

## 7. Geometry and Surface Rules

Use one restrained radius family:

| Element | Radius |
| --- | ---: |
| Inline code and small metadata | `3px` |
| Blockquote | `3px` |
| Code fence, alert, TOC, metadata block | `5–6px` |
| Circular native controls | Native geometry only |

- Use one-pixel borders as the main separator.
- Blockquote retains a two-pixel left rule.
- Alerts retain a three-pixel semantic left rule.
- Remove visible decorative shadows. A maximum one-pixel lift may remain where
  Typora overlays otherwise merge into the page.
- Ordinary prose stays flat on the canvas.
- Do not introduce nested-card styling.

## 8. Component Specifications

### Blockquotes

- Neutral warm-gray surface and border.
- Compact left padding; no yellow cast.
- `line-height` near `1.48`.
- Single-paragraph quotes have no doubled vertical margin.
- Nested quotes reduce redundant padding and must not accumulate heavy borders.

### Inline code

- Neutral surface, one-pixel border, `3px` radius.
- Tight horizontal padding and no pill silhouette.
- Terracotta-derived text may be used only if contrast remains sufficient.
- Inline-code rules must be neutralized inside fenced code blocks.

### Code fences

- Low-chroma gray surface, subtle border, `5–6px` radius, and no material shadow.
- Syntax colors are readable but less saturated than alert colors.
- Line-number gutter uses `--tpl-lineno-digits` and remains excluded from copied
  text.
- Copy control, language label, and line numbers occupy the UI/mono hierarchy.

### Tables

- Flat canvas with strong top/header/bottom rules and quiet row dividers.
- No decorative zebra striping by default.
- Compact, top-aligned cells; tabular numerals.
- Hover uses only a slight warm-gray surface shift.
- Wide content remains readable in Wider modes and must not force editor
  overflow at narrow widths.

### Alerts

- Shared spacing, radius, and type structure across all variants.
- Very light semantic tint, semantic edge, icon, and label; never color alone.
- Alert title uses the UI font.
- Paragraph spacing remains tighter than ordinary prose.

### Images and rules

- Images preserve aspect ratio and fit the writing area.
- Add an inset one-pixel neutral outline when it improves separation without
  shifting layout.
- Horizontal rules are faint rhythm markers, not decorative bands.

### TOC, metadata, and math

- Use the shared neutral surface and radius family.
- Remove remaining peach/yellow hard-coded surfaces.
- Metadata uses UI typography and muted ink.

### Sidebar and application UI

- Sidebar is one warm-gray step deeper than the editor canvas.
- Active file/outline state uses a quiet surface plus a `2px` terracotta marker.
- Hover, active, focus, menus, quick open, and preferences use shared tokens.
- Focus mode must not reduce text or semantic boundaries below readable contrast.

### Plugin elements

- Sidenotes use muted ink, a compact rule, and the shared neutral surface on
  narrow screens.
- Sidenote focus behavior must keep editable content in normal flow.
- Fence Enhance controls match code-fence geometry and do not create a new
  accent family.
- Wider mode markers or notices, when visible, use UI typography and tokens.

## 9. Light/Dark Parity

The two stylesheets should retain near-identical structural selectors. Expected
differences are token values, semantic alert hues, subtle overlay/shadow values,
and platform-specific contrast adjustments.

Any light-only or dark-only structural selector requires an explicit reason.
Hard-coded colors should be replaced with semantic variables when the role is
shared. This includes sidebar states, metadata, menus, math backgrounds, tags,
notifications, focus mode, and Typora preference surfaces.

## 10. Validation Plan

### Visual fixture

Create a temporary Markdown document outside the repository covering:

- H1 through H6 and long Chinese/Latin paragraphs.
- Ordered, unordered, nested, and task lists.
- Links, strong/emphasis, inline code, and horizontal rules.
- Short, multi-paragraph, and nested blockquotes.
- All GitHub-style alerts.
- Narrow and wide tables.
- Short and long fenced code blocks with multi-digit line numbers.
- Image, TOC, math, metadata, and sidenote examples where Typora supports them.

The fixture is disposable test data and must not be committed as product
content unless documentation later needs a maintained showcase.

### Typora matrix

Inspect the rendered document in:

1. Claude Like, Default width.
2. Claude Like, Wide width.
3. Claude Like, Full width.
4. Claude Like Dark, Default width.
5. Claude Like Dark, Wide or Full width.
6. A narrow window representative of a 14-inch working layout.
7. A large/maximized window representative of a 27-inch display.

Verify editing focus, selection, hover where practical, long-line overflow,
table width, code gutter alignment, sidenote reserve, and source-mode safety.

### Quality gates

- Balanced CSS and no parsing errors.
- No unintended selector-parity drift.
- Contrast calculations for body, muted text, links, quote text, inline code,
  completed tasks, and semantic labels.
- No theme-side override of Wider's runtime width.
- No regression to Sidenote or Fence Enhance contracts.
- Visual-verdict score at least 90 for representative light and dark captures.
- Git diff contains only intentional theme/design documentation changes.

## 11. Acceptance Criteria

The work is complete when:

- The editor reads as one coherent Claude Editorial system rather than a set of
  independently styled Typora components.
- Warm paper is present but the interface no longer looks yellow or peach.
- Terracotta is visibly scarce and meaningful.
- Chinese serif prose remains comfortable for long reading.
- Quotes, code, tables, alerts, TOC, metadata, and sidebars share a consistent
  neutral geometry and spacing language.
- Light and dark themes have structural and semantic parity.
- Default, Wide, Full, Sidenote, and Fence Enhance continue to work in Typora.
- Required static and live verification passes with no known blocking errors.

## 12. Non-Goals

- Rebuilding Typora application behavior.
- Changing Wider width calculations or shortcuts.
- Replacing Songti prose with a sans-serif body.
- Introducing new font or JavaScript dependencies.
- Recreating Claude's chat layout, message bubbles, or marketing surface.
- Adding decorative animations, paper noise, gradients, or glass effects.
