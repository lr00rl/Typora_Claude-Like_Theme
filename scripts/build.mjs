import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const BANNER =
  '/* Generated from src/ by scripts/build.mjs. Edit tokens and shared, then run: node scripts/build.mjs */\n\n';

export const THEME_FILES = [
  { variant: 'light', tokens: 'tokens-light.css', output: 'claude-like.css' },
  { variant: 'dark', tokens: 'tokens-dark.css', output: 'claude-like-dark.css' },
];

export function assembleTheme(variant) {
  const theme = THEME_FILES.find((item) => item.variant === variant);
  if (!theme) {
    throw new Error(`unknown theme variant: ${variant}`);
  }

  const tokens = readFileSync(join(repoRoot, 'src', theme.tokens), 'utf8').trim();
  const shared = readFileSync(join(repoRoot, 'src', 'shared.css'), 'utf8').trim();
  return `${BANNER}${tokens}\n\n${shared}\n`;
}

export function writeThemes() {
  for (const theme of THEME_FILES) {
    writeFileSync(join(repoRoot, theme.output), assembleTheme(theme.variant));
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  writeThemes();
}
