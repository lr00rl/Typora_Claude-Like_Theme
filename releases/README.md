# Release Notes Convention

The release workflow resolves release notes in this order:

1. `releases/<tag>.md`
2. `releases/<tag-without-leading-v>.md`
3. `releases/latest.md`
4. GitHub auto-generated release notes

Examples:

- Tag `v1.2.3` prefers `releases/v1.2.3.md`
- Tag `v1.2.3` also accepts `releases/1.2.3.md`
- If neither exists, the workflow falls back to `releases/latest.md`

Recommendations:

- Prefer one file per tag for stable historical releases.
- Use `releases/latest.md` only as a temporary fallback for the next release.
- Do not rely on a filesystem symlink for `latest`; a plain Markdown file is simpler and more portable across tools.
- Keep the release title driven by the tag name. Put the detailed changelog in the Markdown body.
