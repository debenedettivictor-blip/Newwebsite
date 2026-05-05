# Oak Hill Advisors — Redesigned Website

A redesigned marketing site for Oak Hill Advisors, a global credit-focused
alternative asset manager and a wholly-owned subsidiary of T. Rowe Price.

The redesign aims to surpass the existing oakhilladvisors.com on three axes:

1. **Editorial clarity** — a bold, serif-driven hero and a story-led
   structure (firm → strategies → approach → insights → presence → CTA)
   that mirrors the best institutional credit managers (Apollo, Ares,
   Blackstone, Brookfield).
2. **Information density that breathes** — hard-hitting numbers (AUM,
   capital deployed, CLO issuance, headcount) on the surface, with
   detail on demand on dedicated strategy pages.
3. **Modern, restrained motion** — subtle scroll reveals, animated
   counters, hover affordances, full keyboard and reduced-motion support.

## Pages

| File              | Purpose |
|-------------------|---------|
| `index.html`      | Home: hero, stats, intro, strategy summary, principles, insights teasers, global presence, CTA |
| `strategies.html` | Detailed breakdown of private credit, high yield & loans, distressed, CLOs, structured credit |
| `about.html`      | Firm history timeline, leadership, culture, offices |
| `insights.html`   | Filterable insights / market outlook / press releases |
| `contact.html`    | Contact form, IR/media/general details, careers listings |

## Design system

- **Palette** — deep oak green `#2f5d4a`, gold accent `#c8a45a`, near-black
  background `#0b1611`, cream text `#f4efe4`. Sophisticated, institutional,
  warm rather than cold.
- **Typography** — Cormorant Garamond (serif display) + Inter (UI).
- **Layout** — 1280px max container, generous vertical rhythm, asymmetric
  two-column section heads.
- **Motion** — IntersectionObserver-driven reveal, eased number counters,
  honors `prefers-reduced-motion`.

## Stack

Static HTML/CSS/JS — no build step. Drop the directory on any static host
(Netlify, Vercel, S3, GitHub Pages) and it will run.

```
.
├── index.html
├── strategies.html
├── about.html
├── insights.html
├── contact.html
└── assets/
    ├── css/styles.css
    └── js/main.js
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes & disclaimers

- Statistics shown (AUM, deployment figures, office locations, dates)
  reflect publicly reported information about Oak Hill Advisors as of
  late 2025 / early 2026 from public press releases and the firm's own
  disclosures. Numbers should be reviewed and updated by the firm before
  any production use.
- Leadership names on the about page are illustrative placeholders for
  layout demonstration; the firm's actual senior team would replace them.
- This is an unofficial concept redesign and is not affiliated with
  Oak Hill Advisors, L.P. or T. Rowe Price.
