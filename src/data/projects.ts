/**
 * Carousel contents. Edit this array to change the marquee — the loop
 * duplicates it automatically, so no seam maintenance is needed.
 *
 * `tag` is a per-project hue used only for the small type tag, keeping the
 * carousel from reading as five identical cards while staying inside the
 * dark/amber palette.
 */
export type Project = {
  name: string
  tagline: string
  tag: string
  stack: string[]
  what: string
}

export const PROJECTS: Project[] = [
  {
    name: 'rich-friend',
    tagline: 'Luxury Personal Shopping Concierge',
    tag: '#F0A02A',
    stack: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Django REST Framework',
      'PostgreSQL',
      'JWT Auth',
    ],
    what: 'Full-stack concierge platform connecting clients with personal shoppers — a decoupled Next.js frontend and Django REST API backend with authenticated user flows.',
  },
  {
    name: 'applyfly',
    tagline: 'Compliant Document Generator',
    tag: '#D97757',
    stack: ['Python', 'Streamlit', 'python-docx', 'Supabase (PostgreSQL)', 'Werkzeug'],
    what: 'Generates DIN 5008-compliant German cover letters and official documents for HR and Legal professionals, with drawn-signature support — cuts drafting time from ~20 minutes to ~3, no AI involved, built for privacy.',
  },
  {
    name: 'Mildew-Leaf Smart Detector',
    tagline: 'Computer-Vision Classification',
    tag: '#8FB339',
    stack: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Pandas', 'Scikit-learn'],
    what: 'A computer-vision image classification model that detects mildew on plant leaves for early intervention — a predictive analytics tool from research to deployment.',
  },
  {
    name: 'The Castle Hotel',
    tagline: 'Booking & Reservation System',
    tag: '#5B9EA6',
    stack: ['Django', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    what: 'A full CRUD hotel booking system with role-based access control and an admin dashboard for managing reservations.',
  },
  {
    name: "Souma's Events Planning",
    tagline: 'Responsive B2C Marketing Site',
    tag: '#A98BC4',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    what: 'A responsive, mobile-first B2C website for browsing and planning event services, built with a UX/UI-first approach.',
  },
]
