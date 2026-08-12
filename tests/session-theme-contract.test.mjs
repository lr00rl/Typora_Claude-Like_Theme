import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const common = readFileSync(`${root}/session/agent-session.css`, 'utf8');
const variants = [
  ['light', readFileSync(`${root}/claude-like-session.css`, 'utf8')],
  ['dark', readFileSync(`${root}/claude-like-session-dark.css`, 'utf8')],
];
const showcase = readFileSync(`${root}/tests/typora-theme-workspace/agent-session-showcase.md`, 'utf8');

test('session variants import their matching base theme and one shared transcript contract', () => {
  assert.match(variants[0][1], /@import url\("\.\/claude-like\.css"\);/);
  assert.match(variants[1][1], /@import url\("\.\/claude-like-dark\.css"\);/);
  for (const [name, css] of variants) {
    assert.match(css, /@import url\("\.\/session\/agent-session\.css"\);/, `${name}: missing shared session import`);
    for (const token of [
      '--agent-session-user-surface',
      '--agent-session-assistant-surface',
      '--agent-session-tool-surface',
      '--agent-session-spine',
    ]) {
      assert.match(css, new RegExp(token), `${name}: missing ${token}`);
    }
  }
});

test('shared transcript layout supports navigable turn headings, scrollable tools, branches, narrow windows, and print', () => {
  for (const selector of [
    'p:first-of-type > span[md-inline="code"]:only-child code',
    'figure.md-table-fig:first-of-type',
    'h2:has(+ blockquote)',
    'h2:has(+ h3)',
    'h3:has(+ blockquote)',
    'h4:has(+ .md-fences)',
    'h5:has(+ blockquote)',
    'h6:has(+ .md-fences)',
    '+ blockquote',
    '+ .md-fences',
    'hr + p:last-child > span[md-inline="em"]:only-child > em',
  ]) {
    assert.match(common, new RegExp(escapeRegExp(selector)), `missing ${selector}`);
  }
  assert.match(common, /@media only screen and \(max-width: 680px\)/);
  assert.match(common, /@media print/);
  assert.match(common, /max-height: min\(48vh, 520px\)/);
  for (const match of common.matchAll(/box-shadow:\s*([^;]+)/g)) {
    assert.equal(match[1].trim(), 'none', 'session presentation must not add decorative shadows');
  }
});

test('session styles remain structurally balanced', () => {
  for (const [name, css] of [['common', common], ...variants]) {
    let depth = 0;
    for (const character of css.replace(/\/\*[\s\S]*?\*\//g, '')) {
      if (character === '{') depth += 1;
      if (character === '}') depth -= 1;
      assert.ok(depth >= 0, `${name}: closing block without opening block`);
    }
    assert.equal(depth, 0, `${name}: unclosed CSS block`);
  }
});

test('showcase uses the live-editor standard Markdown grammar without raw HTML blocks', () => {
  assert.match(showcase, /^`SESSION ARCHIVE`$/m);
  assert.match(showcase, /^## YOU ·/m);
  assert.match(showcase, /^## CODEX Replying$/m);
  assert.match(showcase, /^### \*CODEX · commentary ·/m);
  assert.match(showcase, /^#### TOOL · exec_command · CALL ·/m);
  assert.match(showcase, /^### CODEX Answered ·/m);
  assert.match(showcase, /^```text$/m);
  assert.doesNotMatch(showcase, /<(?:script|style|details|h6|dl|section)\b/i);
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
