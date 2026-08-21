# ali

Personal portfolio site for Ali El Haj — full-stack software developer, Berlin.

A single page of five full-viewport sections: intro, an interactive world map of the
five countries behind the career, services, an auto-scrolling project carousel, and
contact.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # typecheck + production build into dist/
npm run preview    # serve the built site at http://localhost:4173
```

## Stack

Vite · React 18 · TypeScript · Tailwind CSS v4 · Framer Motion ·
react-simple-maps + d3-geo.

React is pinned to 18 because `react-simple-maps@3` declares peer support for
React 16–18 only; on React 19 the install fails rather than warns.

## Editing the content

Everything that changes often lives in `src/data/`:

| File | Contents |
| --- | --- |
| `src/data/places.ts` | The five map countries — ISO id, years, coordinates, blurb |
| `src/data/projects.ts` | Carousel projects — name, stack, description, tag colour |
| `src/data/sections.ts` | Section order, which drives both the page and the side nav |

The carousel duplicates its list automatically, so adding a project needs no
changes to the loop.

### The map

Country shapes come from `public/countries-50m.json`, a copy of the
[world-atlas](https://www.npmjs.com/package/world-atlas) TopoJSON. It is served as a
static asset rather than imported, so it downloads in parallel with the app instead
of being bundled into the JavaScript.

`id` in `places.ts` is the ISO 3166-1 numeric code **as it appears in that file** —
these were read off the data, not from memory, so verify against the atlas if you
add a country.

Countries are filled for colour, but the hover/focus targets are the marker dots
layered on top. At world scale Hong Kong is roughly one screen pixel wide and
Lebanon only a few, so their outlines can't be hovered or tabbed to; the markers
give all five places an identical, reliably sized hit area. Below the `sm`
breakpoint the map is illustrative and the legend beneath it carries the full text.

**The map shows the Eastern Hemisphere only.** The `MAP` config at the top of
`WorldMap.tsx` holds the whole viewport definition. Two parts of it are
load-bearing and easy to break:

- **`rotate`.** Russia's Chukotka crosses the antimeridian into negative
  longitudes, so dropping the Americas on its own leaves a feature near -169°
  and the map's bounds stay a full 360° wide — no space is reclaimed at all.
  Rotating to centre on 80°E moves the seam into the empty Pacific; only then
  does the crop buy anything.
- **`scale` / `center`.** These are the exact d3 `fitExtent` result for the
  filtered country set, converted to a `center` because react-simple-maps pins
  `translate` to the viewBox centre and ignores it in `projectionConfig`. If you
  change `westLimit` or the filter, recompute them rather than nudging by eye.

The section caps its own width to `(100vh - 341px) × 1.658` at `md` and up, where
341px is the measured non-map chrome and 1.658 the map's aspect ratio. That keeps
the legend above the fold — the section is a snap target, so anything past the
fold would be unreachable.

## ⚠️ Open item — Impressum address

`src/components/Impressum.tsx` has `POSTAL_ADDRESS = null`. A German Impressum is
only compliant with a real **ladungsfähige Anschrift** (§ 5 DDG) — name and email
alone do not satisfy it, and an *incomplete* Impressum is as abmahnfähig as a
missing one. Until the c/o business address is set, the dialog says so plainly
rather than printing a placeholder.

Set the constant, push, done:

```ts
const POSTAL_ADDRESS = ['c/o Some Service GmbH', 'Musterstraße 12', '10115 Berlin']
```

Related, and worth doing: the page loads **Google Fonts from Google's servers**,
which transmits visitor IPs to Google — a documented Abmahnung vector in Germany
(LG München I, 2022). The Impressum discloses it, but self-hosting the two font
families removes the exposure entirely.

## After the first deploy

`index.html` ships a link-preview card (`public/og-image.png`, 1200×630) for when
the site is shared on LinkedIn. Open Graph requires **absolute** URLs, so two tags
carry a placeholder domain and need updating once the real one exists — both are
marked `CHANGE AFTER DEPLOY`:

```html
<meta property="og:url"   content="https://YOUR-DOMAIN/" />
<meta property="og:image" content="https://YOUR-DOMAIN/og-image.png" />
```

(`twitter:image` uses the same URL.) Re-scrape with the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) afterwards —
LinkedIn caches previews aggressively.

## Deploying

**Vercel is the simplest option.** It detects Vite automatically, needs no
configuration, and serves the site from the repository root path:

```bash
npx vercel        # or connect the GitHub repo at vercel.com/new
```

Netlify is equally easy — build command `npm run build`, publish directory `dist`.

GitHub Pages works but costs you two extra steps, because the site is served from
`/<repo-name>/` rather than the domain root: set `base: '/ali/'` in
`vite.config.ts`, and add a workflow to publish `dist/`. Prefer Vercel or Netlify
unless Pages is a requirement.

## Accessibility and motion

- Map waypoints are keyboard-focusable; focus shows the same card as hover,
  positioned from the element's own bounds rather than the cursor.
- The carousel's autoplay is replaced by a manually scrollable row when
  `prefers-reduced-motion: reduce` is set.
- Scroll snapping is disabled below the `md` breakpoint and on short viewports, so
  content taller than the screen can never be snapped out of reach.
