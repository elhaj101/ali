import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { Reveal, Section, Eyebrow } from '../components/Reveal'
import { PLACES, PLACE_BY_ID, formatCoords, type Place } from '../data/places'

/** Same-origin copy of world-atlas `countries-50m.json` (see public/). */
const GEO_URL = `${import.meta.env.BASE_URL}countries-50m.json`

const CARD_W = 310
const GAP = 14

type Anchor = { place: Place; rect: DOMRect }

/**
 * Positions the info card against an anchor rect, flipping and clamping so it
 * can never be clipped at a viewport edge. The anchor is a rect rather than a
 * point so the exact same maths serves both inputs: the pointer supplies a
 * zero-size rect, a keyboard-focused waypoint supplies its bounding box.
 */
function place(rect: DOMRect, size: { w: number; h: number }) {
  const vw = window.innerWidth
  const vh = window.innerHeight

  // Prefer above the anchor; drop below when there isn't room.
  let top = rect.top - size.h - GAP
  if (top < GAP) top = rect.bottom + GAP
  top = Math.min(top, vh - size.h - GAP)
  top = Math.max(GAP, top)

  // Centre on the anchor, then clamp to the viewport.
  let left = rect.left + rect.width / 2 - size.w / 2
  left = Math.max(GAP, Math.min(left, vw - size.w - GAP))

  return { top, left }
}

export function WorldMap() {
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Measure the card once it exists, then place it — so the height used is the
  // real wrapped height rather than a guess.
  useLayoutEffect(() => {
    if (!anchor || !cardRef.current) {
      setPos(null)
      return
    }
    const { width, height } = cardRef.current.getBoundingClientRect()
    setPos(place(anchor.rect, { w: width, h: height }))
  }, [anchor])

  const showAtPointer = useCallback((place: Place, e: { clientX: number; clientY: number }) => {
    setAnchor({
      place,
      rect: new DOMRect(e.clientX, e.clientY, 0, 0),
    })
  }, [])

  const showAtElement = useCallback((place: Place, el: SVGGElement) => {
    setAnchor({ place, rect: el.getBoundingClientRect() })
  }, [])

  const hide = useCallback(() => setAnchor(null), [])

  return (
    <Section id="map">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-amber" aria-hidden="true" />
            <Eyebrow>Five countries, one route</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-bone">
            Where I've Worked
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-6" onMouseLeave={hide}>
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 168, center: [12, 8] }}
              width={980}
              height={460}
              className="h-auto w-full"
              role="img"
              aria-label="World map highlighting the five countries Ali El Haj has lived and worked in: Lebanon, Kuwait, China, Hong Kong, and Germany."
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const isPlace = PLACE_BY_ID.has(String(geo.id))
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        tabIndex={-1}
                        style={{
                          default: {
                            fill: isPlace ? '#4d3915' : '#252a31',
                            stroke: isPlace ? '#f0a02a' : '#363c45',
                            strokeWidth: isPlace ? 0.8 : 0.4,
                            outline: 'none',
                            transition: 'fill 300ms ease',
                          },
                          hover: {
                            fill: isPlace ? '#5e4619' : '#252a31',
                            stroke: isPlace ? '#f0a02a' : '#363c45',
                            strokeWidth: isPlace ? 0.8 : 0.4,
                            outline: 'none',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    )
                  })
                }
              </Geographies>

              {/* Waypoints are the interaction layer: at world scale Hong Kong is
                  about one pixel wide, so the country outlines themselves can't
                  be hovered or tabbed to. */}
              {PLACES.map((p, i) => {
                const isActive = anchor?.place.id === p.id
                return (
                  <Marker key={p.id} coordinates={p.coords}>
                    <g
                      tabIndex={0}
                      role="button"
                      aria-label={`${p.country}, ${p.years}. ${p.blurb}`}
                      className="cursor-pointer focus:outline-none"
                      onMouseEnter={(e) => showAtPointer(p, e)}
                      onMouseMove={(e) => showAtPointer(p, e)}
                      onMouseLeave={hide}
                      onFocus={(e) => showAtElement(p, e.currentTarget)}
                      onBlur={hide}
                      // Touch has no hover: a tap anchors the card to the
                      // waypoint itself.
                      onClick={(e) => showAtElement(p, e.currentTarget)}
                    >
                      {/* generous invisible hit area */}
                      <circle r={13} fill="transparent" />
                      <circle
                        r={9}
                        fill="#f0a02a"
                        opacity={0.18}
                        className="map-pulse"
                        style={{ animationDelay: `${i * 0.45}s` }}
                      />
                      <circle
                        r={isActive ? 6 : 4.2}
                        fill="#f0a02a"
                        stroke="#0b0c0e"
                        strokeWidth={1.4}
                        style={{ transition: 'r 250ms ease' }}
                      />
                    </g>
                  </Marker>
                )
              })}
            </ComposableMap>

            {/* Legend / index — the route in list form. At world scale on a
                phone the waypoints are only a few pixels apart, so below `sm`
                this list carries the full text and the map stays illustrative. */}
            <ol className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
              {PLACES.map((p) => (
                <li key={p.id} className="border-t border-hairline pt-3">
                  <span className="block font-display text-sm font-medium text-bone">
                    {p.country}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] tracking-wider text-mute">
                    {p.years}
                  </span>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-mute sm:hidden">
                    {p.blurb}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-6 hidden font-mono text-[0.68rem] tracking-wider text-mute/70 sm:block">
              Hover or tab a waypoint for detail
            </p>
          </div>
        </Reveal>
      </div>

      {/* Floating info card — never blocks the pointer, so it can't trap hover. */}
      <AnimatePresence>
        {anchor && (
          <motion.div
            ref={cardRef}
            key={anchor.place.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: pos ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            // Purely visual: the waypoint's own aria-label already announces
            // country, years and blurb on focus, so a live region here would
            // read the same text a second time.
            aria-hidden="true"
            className="pointer-events-none fixed z-40 rounded-lg border border-hairline bg-raised/95 p-4 shadow-2xl shadow-black/60 backdrop-blur-sm"
            style={{
              width: CARD_W,
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-base font-semibold text-bone">
                {anchor.place.country}
              </span>
              <span className="font-mono text-[0.68rem] tracking-wider text-amber">
                {anchor.place.years}
              </span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-mute">{anchor.place.blurb}</p>
            <p className="mt-3 border-t border-hairline pt-2 font-mono text-[0.62rem] tracking-wider text-mute/60">
              {formatCoords(anchor.place.coords)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
