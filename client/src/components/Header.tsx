import { useCallback, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import ButtonLink from './ButtonLink.tsx'
import MobileMenu from './MobileMenu.tsx'
import Wordmark from './Wordmark.tsx'

const NAV = [
  { label: 'Match check', to: '/match' },
  { label: 'Bullet rewriter', to: '/rewrite' },
  { label: 'Mock interview', to: '/interview' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  // On the homepage the header floats over the sky hero instead of sitting on a white bar.
  const overHero = useLocation().pathname === '/'

  // Returns focus to the hamburger so keyboard users land where they started.
  const closeMenu = useCallback(() => {
    setOpen(false)
    menuButton.current?.focus()
  }, [])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-10 items-center rounded-full px-4 text-sm font-medium ${
      overHero ? 'text-white hover:bg-white/15' : isActive ? 'bg-sky-200 text-ink' : 'text-ink hover:bg-desk'
    }`

  return (
    <>
      <header className={overHero ? 'absolute inset-x-2 top-2 z-20 md:inset-x-3 md:top-3' : 'sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur'}>
        <div
          className={`mx-auto flex items-center justify-between gap-4 ${
            overHero ? 'py-2.5 pr-2.5 pl-4 md:px-7 md:py-5' : 'max-w-[1240px] py-2 pr-3 pl-5 md:px-7'
          }`}
        >
          <Wordmark light={overHero} />
          <nav
            aria-label="Main"
            className={`hidden gap-0.5 rounded-full p-1 md:flex ${overHero ? 'border border-white/30 bg-ink/40 backdrop-blur-md' : ''}`}
          >
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          {/* Wrapper hides the button on mobile, since ButtonLink sets its own display. */}
          <div className="hidden md:block">
            <ButtonLink to="/match" size="md" arrow variant={overHero ? 'light' : 'primary'}>
              Check a job post
            </ButtonLink>
          </div>
          <button
            ref={menuButton}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className={`flex size-11 items-center justify-center rounded-full md:hidden ${
              overHero ? 'border border-white/30 bg-ink/40 text-white backdrop-blur-md' : 'text-ink'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 9h14M5 15h14" />
            </svg>
          </button>
        </div>
      </header>
      {/* Rendered outside the header: its backdrop blur would trap a fixed panel inside it. */}
      <MobileMenu open={open} onClose={closeMenu} links={NAV} />
    </>
  )
}
