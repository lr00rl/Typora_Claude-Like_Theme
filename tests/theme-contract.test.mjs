import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

const themes = [
  loadTheme('light', 'claude-like.css'),
  loadTheme('dark', 'claude-like-dark.css'),
];

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

test('both themes expose the Claude Editorial semantic token contract', () => {
  for (const theme of themes) {
    const variables = parseRootVariables(theme.css);
    for (const token of requiredSemanticTokens) {
      assert.ok(variables.has(token), `${theme.name}: missing ${token}`);
    }
  }
});

test('primary, muted, and accent text meet the contrast contract', () => {
  for (const theme of themes) {
    const variables = parseRootVariables(theme.css);
    const canvas = requireVariable(theme, variables, '--canvas-color');
    const ink = requireVariable(theme, variables, '--ink-color');
    const muted = requireVariable(theme, variables, '--ink-muted-color');
    const accent = requireVariable(theme, variables, '--accent-color');

    assert.ok(
      contrastRatio(ink, canvas) >= 7,
      `${theme.name}: primary prose contrast must be at least 7:1`,
    );
    assert.ok(
      contrastRatio(muted, canvas) >= 4.5,
      `${theme.name}: muted text contrast must be at least 4.5:1`,
    );
    assert.ok(
      contrastRatio(accent, canvas) >= 4.5,
      `${theme.name}: accent text contrast must be at least 4.5:1`,
    );
  }
});

test('the theme keeps a focused no-plugin width without competing with Wider', () => {
  for (const theme of themes) {
    expectDeclaration(theme, '#write', 'max-width', '860px');
    assert.doesNotMatch(
      stripComments(theme.css),
      /@media[^{}]*\(min-width:[^{}]+\)\s*\{[^{}]*#write\s*\{[^{}]*(?:width|max-width)\s*:/s,
      `${theme.name}: generic large-screen #write width override competes with Wider`,
    );
  }
});

test('plugin-owned Sidenote and Fence Enhance variables remain available', () => {
  for (const theme of themes) {
    for (const variable of [
      '--tpl-lineno-digits',
      '--tpl-sidenote-reserve',
      '--tpl-sidenote-offset',
      '--tpl-sidenote-width',
    ]) {
      assert.match(theme.css, new RegExp(escapeRegExp(variable)), `${theme.name}: missing ${variable}`);
    }
  }
});

test('both stylesheets have balanced blocks', () => {
  for (const theme of themes) {
    let depth = 0;
    for (const character of stripComments(theme.css)) {
      if (character === '{') depth += 1;
      if (character === '}') depth -= 1;
      assert.ok(depth >= 0, `${theme.name}: closing block without opening block`);
    }
    assert.equal(depth, 0, `${theme.name}: unclosed CSS block`);
  }
});

test('Songti prose uses the approved compact editorial rhythm', () => {
  for (const theme of themes) {
    expectDeclaration(theme, 'body', 'font-family', 'var(--font-body)');
    expectDeclaration(theme, 'body', 'line-height', '1.58');
    expectDeclaration(theme, 'body', 'letter-spacing', '0');
    expectDeclaration(theme, 'p, blockquote, ul, ol, dl, table', 'margin', '0.74em 0');
    expectDeclaration(theme, 'h2', 'line-height', '1.22');
    expectDeclaration(theme, 'h2', 'margin-top', '1.72rem');
    expectDeclaration(theme, 'h3', 'margin-top', '1.5rem');
    expectDeclaration(theme, 'h6', 'font-family', 'var(--font-ui)');
    expectDeclaration(theme, 'h6', 'font-size', '0.91em');
  }
});

test('document components share restrained geometry and neutral surfaces', () => {
  for (const theme of themes) {
    expectDeclaration(theme, 'blockquote', 'border-radius', 'var(--radius-inline)');
    expectDeclaration(theme, 'blockquote', 'line-height', '1.48');
    expectDeclaration(theme, 'blockquote', 'padding', '0.5rem 0.8rem 0.5rem 0.68rem');
    expectDeclaration(theme, '.md-alert', 'border-radius', 'var(--radius-block)');
    expectDeclaration(theme, '.md-fences', 'border-radius', 'var(--radius-block)');
    expectDeclaration(theme, '.md-fences', 'line-height', '1.52');
    expectDeclaration(theme, '.md-fences', 'box-shadow', 'none');
    expectDeclaration(theme, 'code, tt', 'border-radius', 'var(--radius-inline)');
    expectDeclaration(theme, '.md-toc', 'border-radius', 'var(--radius-block)');
    expectDeclaration(theme, '.md-toc', 'background-color', 'var(--surface-color)');
    expectDeclaration(theme, '#write pre.md-meta-block', 'border-radius', 'var(--radius-block)');
    expectDeclaration(theme, '#write pre.md-meta-block', 'background-color', 'var(--surface-color)');
    expectDeclaration(theme, '.md-mathjax-midline', 'background', 'var(--surface-subtle-color)');
    expectDeclaration(theme, '#write img', 'outline', '1px solid var(--image-outline-color)');
    expectDeclaration(theme, '#write img', 'outline-offset', '-1px');
    expectDeclaration(theme, 'table td', 'font-size', '0.92rem');
    expectDeclaration(theme, 'table td', 'line-height', '1.52');
  }
});

function loadTheme(name, filename) {
  return {
    name,
    filename,
    css: readFileSync(`${repoRoot}/${filename}`, 'utf8'),
  };
}

function parseRootVariables(css) {
  const root = stripComments(css).match(/:root\s*\{([\s\S]*?)\}/);
  assert.ok(root, 'missing :root block');

  const variables = new Map();
  for (const match of root[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    variables.set(match[1], match[2].trim());
  }
  return variables;
}

function requireVariable(theme, variables, token) {
  const value = variables.get(token);
  assert.ok(value, `${theme.name}: missing ${token}`);
  return value;
}

function expectDeclaration(theme, selector, property, value) {
  const body = findRuleBody(theme.css, selector);
  assert.ok(body, `${theme.name}: missing selector ${selector}`);
  const declaration = new RegExp(
    `(?:^|;)\\s*${escapeRegExp(property)}\\s*:\\s*${escapeRegExp(value)}\\s*(?:!important\\s*)?(?:;|$)`,
  );
  assert.match(body, declaration, `${theme.name}: expected ${selector} { ${property}: ${value}; }`);
}

function findRuleBody(css, expectedSelector) {
  const normalizedExpected = normalizeSelector(expectedSelector);
  for (const match of stripComments(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = normalizeSelector(match[1]);
    if (selector === normalizedExpected) return match[2].trim();
  }
  return null;
}

function normalizeSelector(selector) {
  return selector.trim().replace(/\s+/g, ' ');
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color) {
  assert.match(color, /^#[\da-f]{6}$/i, `contrast color must be a six-digit hex value: ${color}`);
  const channels = [1, 3, 5].map((offset) => Number.parseInt(color.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((channel) => (
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
