export const LINKS = {
  github: 'https://github.com/elhaj101',
  linkedin: 'https://www.linkedin.com/in/ali-elhaj-a00085265',
  email: 'alielhajj@outlook.de',
}

/* Inline SVG marks. Decorative here — each link carries its own accessible
   name — so the paths are hidden from assistive tech. */
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function MailMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect x="2" y="4.5" width="20" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  )
}

/** GitHub / LinkedIn / Email row, repeated in the hero and the contact section. */
export function SocialRow({ className = '' }: { className?: string }) {
  const items = [
    { href: LINKS.github, label: 'GitHub profile', mark: <GitHubMark /> },
    { href: LINKS.linkedin, label: 'LinkedIn profile', mark: <LinkedInMark /> },
    { href: `mailto:${LINKS.email}`, label: `Email ${LINKS.email}`, mark: <MailMark /> },
  ]

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label}
            {...(item.href.startsWith('http')
              ? { target: '_blank', rel: 'noreferrer noopener' }
              : {})}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-mute transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            {item.mark}
          </a>
        </li>
      ))}
    </ul>
  )
}
