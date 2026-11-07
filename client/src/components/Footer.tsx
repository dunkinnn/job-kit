import { Link } from 'react-router'
import Wordmark from './Wordmark.tsx'

const TOOLS = [
  { label: 'Match check', to: '/match' },
  { label: 'Bullet rewriter', to: '/rewrite' },
]

const SECTIONS = [
  { label: 'What you get', to: '/#tools' },
  { label: 'Honest by design', to: '/#honest' },
  { label: 'Before and after', to: '/#before-after' },
]

const heading = 'text-xs font-semibold tracking-[0.1em] text-muted uppercase'
const link = 'flex min-h-11 items-center text-[15px] text-ink-soft hover:text-accent md:min-h-9'

function backToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  // Moves keyboard focus to the logo so the next Tab starts from the top of the page.
  document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
}

export default function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-line md:mt-16">
      <div className="relative z-[1] mx-auto flex max-w-[1240px] flex-col gap-12 px-5 pt-12 pb-6 md:gap-16 md:px-7 md:pt-16 md:pb-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:gap-12">
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-1">
            <Wordmark />
            <p className="max-w-[320px] text-sm leading-relaxed text-muted">
              Know your match before you apply. A free job kit for Filipino fresh grads.
            </p>
          </div>

          <nav aria-labelledby="footer-tools" className="flex flex-col gap-2">
            <h2 id="footer-tools" className={heading}>
              Tools
            </h2>
            <ul>
              {TOOLS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="flex min-h-11 items-center gap-2 text-[15px] whitespace-nowrap text-muted md:min-h-9">
                Mock interview
                <span className="rounded-full border border-line-strong px-2 py-0.5 text-[11px]">Soon</span>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-sections" className="flex flex-col gap-2">
            <h2 id="footer-sections" className={heading}>
              Learn more
            </h2>
            <ul>
              {SECTIONS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <h2 className={heading}>Your privacy</h2>
            <p className="text-sm leading-relaxed text-muted">
              We never store your resume. Your text goes to our AI provider only to create your feedback, and it's gone when you
              close the tab.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-5 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-muted">© {new Date().getFullYear()} Job Kit · A portfolio case study</p>
          <button
            type="button"
            onClick={backToTop}
            className="inline-flex h-11 items-center gap-3 rounded-full border border-line-strong bg-paper pr-1.5 pl-5 text-xs font-bold tracking-[0.06em] text-ink uppercase transition-colors hover:border-accent"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="headline pointer-events-none -mb-[3vw] text-center text-[19vw] leading-[0.8] tracking-[-0.02em] whitespace-nowrap text-accent/[0.05] select-none md:text-[clamp(120px,16vw,240px)]"
      >
        Job Kit
      </div>
    </footer>
  )
}
