# Refuge Next

National Refuge LARP website design preview, based on the supplied Claude Design public-site export. This is a review site, not the production website or character database.

## Local preview

Run `python3 -m http.server 8793 --bind 127.0.0.1`, then open http://127.0.0.1:8793/.

## Scope

- Static HTML, CSS and JavaScript. No build step, accounts, credentials or backend.
- Public-site design and motion only. Character-management and administration prototypes are omitted.
- Event photographs from the supplied public-site design export are included. The Refuge Technology Committee Chairperson confirmed that the reused photographs came from the original national website and explicitly permitted use of the added photograph depicting them. This records permission for this site, not a blanket license for third-party reuse.
- Event dates and chapter links are a design-export snapshot, not a live data feed. The page labels these limitations. Confirm details with the current website or Refuge Database.
- External Google Fonts requests were removed. Existing fallback fonts render the preview.
- Theme choices are preview controls, not verified accessibility modes. All palettes still need contrast review.

GitHub Pages serves the repository root on `main`. No custom domain is configured. Updating this repository must not change the current national website, chapter sites, or Rails database.

## Review before production

Validate current copy, rules/document links, chapter contacts and dates. Measure contrast, check keyboard and screen-reader behavior, and test supported browsers. Field, combat and group images are cropped directly from the national repository's `images/newfullscreen-slider1.png`, `newfullscreen-slider2.png` and `newfullscreen-slider3.png`, respectively, and saved as WebP without upscaling. Existing portrait files remain unchanged. Camera originals would still improve sharpness. Preview browser checks do not establish production readiness.

## Shared theme

Presentation assets come from https://github.com/refuge-larp/refuge-theme. `theme.json` follows the latest release; hourly and content-push builds test before deployment. Set a version tag to pin or roll back. Checked-in CSS/JS are a local-preview fallback; deployed builds replace them with the selected release and record it in `theme-version.json`. Theme/tooling updates do not change this site’s content automatically.
