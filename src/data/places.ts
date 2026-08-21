/**
 * The five places, in the order they were lived. Edit this array to change the
 * map — nothing else needs touching.
 *
 * `id` is the ISO 3166-1 numeric code as it appears on features in
 * world-atlas `countries-50m.json` (verified against that file, not from
 * memory). `coords` are [longitude, latitude] geographic centroids, used to
 * place the interactive waypoint.
 *
 * Why waypoints rather than clickable country shapes: at world scale Hong Kong
 * covers roughly one screen pixel and Lebanon only a few, so their outlines are
 * impossible to hover or tab to. The country fill stays the visual layer; the
 * waypoint dot is the interaction layer, identical for all five.
 */
export type Place = {
  id: string
  country: string
  years: string
  coords: [number, number]
  blurb: string
}

export const PLACES: Place[] = [
  {
    id: '422',
    country: 'Lebanon',
    years: 'Roots · present',
    coords: [35.88, 33.92],
    blurb:
      'Family roots — where my story began, and where I still take part in business projects today, mainly trading with Europe and further afield.',
  },
  {
    id: '414',
    country: 'Kuwait',
    years: '2012–2019',
    coords: [47.59, 29.33],
    blurb:
      'Studied Business Marketing and worked in luxury retail at Burberry and Harvey Nichols — where I learned client-first service and business fundamentals.',
  },
  {
    id: '156',
    country: 'China',
    years: '2019–2022',
    coords: [103.38, 36.69],
    blurb:
      'Taught English in Beijing and Shanghai, immersed in a new language and culture — and discovered how much I enjoy breaking down complex ideas simply.',
  },
  {
    id: '344',
    country: 'Hong Kong',
    years: '2022–2024',
    coords: [114.11, 22.4],
    blurb:
      'Founded and ran my own recruitment agency, NihaoESL, alongside teaching — while quietly planning my next chapter: a full career switch into tech.',
  },
  {
    id: '276',
    country: 'Germany',
    years: '2024–present',
    coords: [10.36, 51.05],
    blurb:
      'Retrained as a full-stack developer through Code Institute, and now building software and growing a career in tech.',
  },
]

/** Fast lookup for the map's per-country fill decision. */
export const PLACE_BY_ID = new Map(PLACES.map((p) => [p.id, p]))

/** Formats [lon, lat] as a human-readable coordinate stamp: 33.92° N, 35.88° E */
export function formatCoords([lon, lat]: [number, number]): string {
  const ns = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}`
  const ew = `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? 'E' : 'W'}`
  return `${ns}, ${ew}`
}
