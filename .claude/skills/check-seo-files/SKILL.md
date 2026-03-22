---
name: check-seo-files
description: SEO audit skill for this portfolio project - use when the user adds a new page, changes page content/titles, updates routes, or asks to "check seo", "update llms.txt", "seo check", or "check seo files". Verifies that new/changed pages have proper metadata, are in sitemap.ts, and that llms.txt is kept in sync.
version: 1.0.0
---

# SEO Check

Audit SEO-related files for completeness and consistency whenever pages are added or changed.

## SEO Files in This Project

| File | Purpose |
|---|---|
| `app/**/page.tsx` or `layout.tsx` | Must export `metadata` or `generateMetadata` |
| `app/sitemap.ts` | Next.js sitemap — must include every public route |
| `public/llms.txt` | LLM-readable index — must list every public page with a short description |
| `public/robots.txt` | Crawler rules — check if new routes need allow/disallow entries |

## What to Check

### 1. New or Changed Pages — Metadata

For every `app/**/page.tsx` or `app/**/layout.tsx` touched:
- Does it export `metadata` (static) or `generateMetadata` (dynamic)?
- Does `metadata` include: `title`, `description`, `openGraph.title`, `openGraph.description`?
- Is the `title` unique and descriptive (not just "Page" or the site name alone)?
- Is `description` between 50–160 characters?

### 2. sitemap.ts Coverage

Read `app/sitemap.ts` and compare its URL list against all `app/**/page.tsx` files (excluding private routes like `app/wedding/` or routes with `robots: { index: false }`).

Flag any public page route that is:
- Missing from `sitemap.ts`
- Present in `sitemap.ts` but no longer has a corresponding `page.tsx`

### 3. llms.txt Sync

Read `public/llms.txt` and verify:
- Every public page listed in `sitemap.ts` has a corresponding entry in `llms.txt`
- The entry has a meaningful description (not a placeholder)
- If a page was renamed or removed, its `llms.txt` entry is updated/removed too
- New pages added since the last known state of `llms.txt` are listed

### 4. robots.txt

Only flag if a new route is clearly private/sensitive (e.g. admin, internal, staging) and is missing a `Disallow` entry. Don't flag normal public pages.

## Workflow

1. Determine scope:
   - If triggered after a code change, check `git diff --name-only` to find which page files changed.
   - If the user runs `/seo-check` without context, audit all pages.

2. Read the relevant files (`app/sitemap.ts`, `public/llms.txt`, affected `page.tsx`/`layout.tsx` files).

3. Categorise each issue:
   - **[METADATA]** — page missing or incomplete metadata
   - **[SITEMAP]** — page missing from or stale in `sitemap.ts`
   - **[LLMS]** — page missing from or stale in `llms.txt`
   - **[ROBOTS]** — private route not disallowed

4. Present findings (see Output Format).

5. Ask: **"Should I fix these?"** — wait for confirmation before editing any file.

6. If yes, fix each issue using the Edit tool. When updating `llms.txt`, match the existing format:
   ```
   - [Page Title](/route): Brief one-sentence description of what this page contains.
   ```
   When updating `sitemap.ts`, match the existing entry format with appropriate `changeFrequency` and `priority`.

## Output Format

```
## SEO Check Results

Found N issues:

### [METADATA] app/careers/page.tsx
Missing `openGraph.description`. Title and description are present.
→ Add openGraph block mirroring the existing title/description.

### [SITEMAP] app/careers/page.tsx
Route `/careers` is not in app/sitemap.ts.
→ Add entry with `changeFrequency: "monthly"` and `priority: 0.7`.

### [LLMS] public/llms.txt
`/careers` page has no entry.
→ Add: `- [Careers](/careers): Open positions and how to apply at I²`

---
Should I fix these?
```

If no issues are found:
```
## SEO Check Results

All pages have metadata, sitemap coverage, and llms.txt entries. No issues found.
```
