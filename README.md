# Oak Hill Advisors — Redesigned Website

Elegant, photography-forward redesign of oakhilladvisors.com — inspired by
Blackstone, Apollo and Brookfield. Clean white pages, navy blue brand color,
serif display typography, generous whitespace.

## Pages

| File              | Purpose |
|-------------------|---------|
| `index.html`      | Home: hero with One Vanderbilt photo, intro, four strategies, HQ feature, navy principles band, insights, six offices, CTA |
| `strategies.html` | Detailed breakdown of private credit, high yield & loans, distressed, CLOs, structured credit |
| `about.html`      | Firm history timeline, leadership, offices |
| `insights.html`   | Filterable insights / outlook / press grid |
| `contact.html`    | Contact form + careers listings |

## Design system

- **Palette** — navy `#0c2340` (the OHA blue) with white, warm cream
  `#f7f4ec` and a deep gold accent `#b8954a`.
- **Typography** — Cormorant Garamond (serif display, used everywhere
  for headlines and brand) + Inter (UI body).
- **Layout** — 1280px container, generous vertical rhythm, photography
  on every major section.
- **Motion** — restrained: subtle scroll reveals, gentle photo zoom on
  card hover. Honors `prefers-reduced-motion`.

## Adding photography

The site references several local image paths. Drop your real photos in
`assets/img/` to make them appear — the layout falls back to elegant
gradient placeholders if any image is missing.

| Path | Where it appears |
|------|------------------|
| `assets/img/one-vanderbilt-hero.jpg` | Full-bleed hero on the home page (cinematic, ~2400×1400 ideal) |
| `assets/img/one-vanderbilt.jpg` | Headquarters feature panel on the home page (vertical works well, ~1200×1500) |
| `assets/img/strategy-private-credit.jpg` | Private credit strategy card |
| `assets/img/strategy-high-yield.jpg` | High yield strategy card |
| `assets/img/strategy-distressed.jpg` | Distressed strategy card |
| `assets/img/strategy-clo.jpg` | CLO strategy card |
| `assets/img/insight-1.jpg` … `insight-9.jpg` | Insights cards |

For best results use high-quality 16:9 or 4:3 images at 1600px+ wide. JPG
or WebP both work.

## Stack

Static HTML / CSS / JS — no build step. Drop the directory on Netlify,
Vercel, S3, GitHub Pages or any other static host.

```
.
├── index.html
├── strategies.html
├── about.html
├── insights.html
├── contact.html
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/        ← drop photographs here
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Notes

- AUM, deployment figures, office locations and dates reflect publicly
  reported information from late 2025 / early 2026. They should be
  reviewed by the firm before any production use.
- Leadership names on the about page are illustrative placeholders for
  layout demonstration.
- This is an unofficial concept redesign and is not affiliated with
  Oak Hill Advisors, L.P. or T. Rowe Price.
