# Refuge Next

National Refuge LARP website design preview, based on the supplied Claude Design public-site export. This is a review site, not the production website or character database.

## Local preview

Run `python3 -m http.server 8793 --bind 127.0.0.1`, then open http://127.0.0.1:8793/.

## Scope

- Static HTML, CSS and JavaScript. No build step, accounts, credentials or backend.
- Public-site design and motion only. Character-management and administration prototypes are omitted.
- Original event photographs are not published. Original SVG placeholders mark where approved photographs can go.
- Event dates and chapter links are a design-export snapshot, not a live data feed. The page labels these limitations. Confirm details with the current website or Refuge Database.
- External Google Fonts requests were removed. Existing fallback fonts render the preview.
- Theme choices are preview controls, not verified accessibility modes. All palettes still need contrast review.

GitHub Pages serves the repository root on `main`. No custom domain is configured. Updating this repository must not change the current national website, chapter sites, or Rails database.

## Review before production

Validate current copy, rules/document links, chapter contacts and dates. Clear image rights, measure contrast, check keyboard and screen-reader behavior, and test supported browsers. Preview browser checks do not establish production readiness.
