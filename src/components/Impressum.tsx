import { useEffect, useRef, useState } from 'react'
import { LINKS } from './Social'

/**
 * Ladungsfähige Anschrift for the Impressum.
 *
 * SET THIS. A German Impressum is only compliant with a real postal address
 * (§ 5 DDG) — name and email alone do not satisfy it, and an incomplete
 * Impressum is just as abmahnfähig as a missing one. Ali is using a c/o
 * business address; drop its lines in here and it goes live on the next push.
 *
 * Leave as null until then — the dialog says so plainly rather than printing
 * a fake address.
 */
const POSTAL_ADDRESS: string[] | null = null
// Example once the c/o service is set up:
// const POSTAL_ADDRESS = ['c/o Musterservice GmbH', 'Musterstraße 12', '10115 Berlin']

function H({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-7 font-display text-sm font-semibold text-bone">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[0.82rem] leading-relaxed text-mute">{children}</p>
}

export function Impressum() {
  const ref = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  // <dialog> gives focus trapping, Esc-to-close and inertness for free, but
  // only via showModal() — the `open` attribute alone renders it non-modal.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[0.68rem] tracking-wider text-mute/70 underline underline-offset-4 transition-colors duration-300 hover:text-amber"
      >
        Impressum &amp; Datenschutz
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        // Clicking the backdrop (i.e. the dialog element itself, outside the
        // inner panel) closes it.
        onClick={(e) => {
          if (e.target === ref.current) setOpen(false)
        }}
        aria-labelledby="impressum-title"
        className="m-auto max-h-[85vh] w-[min(42rem,92vw)] rounded-xl border border-hairline bg-raised p-0 text-bone backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <h2 id="impressum-title" className="font-display text-xl font-semibold text-bone">
              Impressum
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Schließen"
              className="-mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-mute transition-colors duration-300 hover:border-amber hover:text-amber"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <p className="mt-1 font-mono text-[0.68rem] tracking-wider text-mute/70">
            Angaben gemäß § 5 DDG
          </p>

          <H>Diensteanbieter</H>
          <P>Ali El Haj</P>
          {POSTAL_ADDRESS ? (
            <P>
              {POSTAL_ADDRESS.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">Deutschland</span>
            </P>
          ) : (
            <P>
              Berlin, Deutschland — die vollständige ladungsfähige Anschrift wird in Kürze ergänzt
              und ist bis dahin per E-Mail erhältlich.
            </P>
          )}

          <H>Kontakt</H>
          <P>
            E-Mail:{' '}
            <a href={`mailto:${LINKS.email}`} className="text-amber hover:underline">
              {LINKS.email}
            </a>
          </P>

          <H>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H>
          <P>Ali El Haj, Anschrift wie oben.</P>

          <H>Haftung für Inhalte</H>
          <P>
            Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </P>

          <H>Haftung für Links</H>
          <P>
            Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
            Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen
            Inhalte erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links
            umgehend entfernt.
          </P>

          <H>Urheberrecht</H>
          <P>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung,
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
            Urheberrechtes bedürfen der schriftlichen Zustimmung.
          </P>

          <H>Verbraucherstreitbeilegung</H>
          <P>
            Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </P>

          <h2 className="mt-10 border-t border-hairline pt-8 font-display text-xl font-semibold text-bone">
            Datenschutz
          </h2>

          <H>Kurz gefasst</H>
          <P>
            Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und
            enthält kein Kontaktformular. Es werden keine Konten angelegt und keine Eingaben
            gespeichert.
          </P>

          <H>Hosting</H>
          <P>
            Die Seite wird über GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. St, San Francisco,
            CA 94107, USA) bereitgestellt. Beim Abruf werden technisch notwendige Zugriffsdaten
            einschließlich der IP-Adresse verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
            DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).
          </P>

          <H>Google Fonts</H>
          <P>
            Die verwendeten Schriftarten werden von Servern der Google Ireland Limited geladen.
            Dabei wird Ihre IP-Adresse an Google übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit.
            f DSGVO. Eine lokale Einbindung der Schriften ist geplant, um diese Übertragung zu
            vermeiden.
          </P>

          <H>Ihre Rechte</H>
          <P>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Wenden Sie sich dafür an die oben
            genannte E-Mail-Adresse. Zudem steht Ihnen ein Beschwerderecht bei einer
            Datenschutz-Aufsichtsbehörde zu.
          </P>
        </div>
      </dialog>
    </>
  )
}
