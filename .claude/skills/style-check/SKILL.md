---
name: style-check
description: Styling audit skill - use when the user asks to "check styles", "style check", "audit styles", "check tailwind", or wants to review CSS/styling consistency in the codebase. Checks for raw CSS usage that should be Tailwind, and identifies styles that should be shared globally vs kept per-screen.
version: 1.0.0
---

# Style Check

Audit the codebase for styling issues, then present findings and ask if you should fix them.

## What to Check

### 1. Raw CSS Instead of Tailwind

Find any usage of raw CSS that should be replaced with Tailwind utility classes:

- `style={{ ... }}` inline style props on JSX elements (e.g. `style={{ color: 'red', marginTop: '16px' }}`)
- CSS-in-JS objects with raw values where a Tailwind class exists
- Custom CSS rules in `.css`/`.scss` files that duplicate values already in Tailwind's default scale (colors, spacing, font sizes, border radius, shadows, etc.)
- `!important` overrides that fight Tailwind — usually a sign styles are layered incorrectly

**Exceptions — do NOT flag these:**
- CSS variables / custom properties (`--color-brand`, `--spacing-xl`) defined in `:root` — these are intentional design tokens
- Animations/keyframes that Tailwind doesn't cover (`@keyframes`, `animation`)
- Complex CSS features with no Tailwind equivalent (e.g. `clip-path`, `mask-image`, `backdrop-filter` with non-standard values, `scroll-snap`)
- Third-party component overrides where Tailwind classes cannot reach the element

### 2. Style Scope: Per-Screen vs Global

Identify styles that are defined in a component or page file but are used (or could be used) across multiple screens, and should instead be extracted to a shared utility or global CSS:

- Repeated `className` strings containing the same Tailwind combinations across 2+ unrelated components (e.g. `"flex items-center gap-2 text-sm text-muted-foreground"` repeated verbatim)
- Inline `style` objects with the same values duplicated across files
- Screen-specific overrides that actually apply to a shared component — should be moved into that component with a variant/prop instead

Identify styles defined globally (in a shared utility class or global CSS) that are only ever used by a single screen — these are over-abstracted and should be inlined or scoped.

## Workflow

1. Identify the scope: if the user provided a path or component name, limit the audit to that scope. Otherwise audit the whole project (excluding `node_modules`, generated files, and `components/ui/` shadcn primitives).

2. Search for issues:
   - Grep for `style={{` in TSX/JSX files
   - Grep for repeated className fragments across files
   - Read `styles/globals.css` (or equivalent) for custom rules that duplicate Tailwind values
   - Scan for the same Tailwind combo string appearing 3+ times across different component files

3. Categorise each issue:
   - **[RAW-CSS]** — raw style that should be a Tailwind class
   - **[DUPLICATE]** — repeated class combo that should become a shared utility or component
   - **[OVER-ABSTRACT]** — global style used only in one place

4. Present findings in a structured list (see Output Format below).

5. Ask: **"Should I fix these issues?"** — wait for confirmation before making any edits.

6. If the user says yes, fix them one by one, using Edit tool. Prefer extracting repeated class combos into a reusable component or `cn()` utility call. Prefer Tailwind classes over raw CSS values. Do not change visual appearance.

## Output Format

```
## Style Check Results

Found N issues:

### [RAW-CSS] file/path.tsx:42
`style={{ marginTop: '24px', color: '#6b7280' }}`
→ Replace with: `className="mt-6 text-gray-500"`

### [DUPLICATE] className combo repeated in 3 files
`"flex items-center gap-2 text-sm text-muted-foreground"`
  - components/home/hero.tsx:18
  - components/home/feature-list.tsx:33
  - components/about/team.tsx:11
→ Extract to a shared <MetaText> component or a `cn()` constant in lib/styles.ts

### [OVER-ABSTRACT] styles/globals.css:88
`.card-header-title` — only used in components/blog/post-card.tsx
→ Inline as Tailwind classes in post-card.tsx and remove the CSS rule

---
Should I fix these issues?
```

If no issues are found, say: "No styling issues found." and stop.
