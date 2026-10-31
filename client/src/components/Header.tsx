import { useCallback, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import ButtonLink from './ButtonLink.tsx'
import MobileMenu from './MobileMenu.tsx'
import Wordmark from './Wordmark.tsx'

const NAV = [
  { label: 'Match check', to: '/match' },
  { label: 'Bullet rewriter', to: '/rewrite' },
  { label: 'Mock interview', to: '/interview' },
]

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-11 items-center px-3 text-[15px] ${isActive ? 'bg-hl font-medium' : 'hover:bg-desk'}`

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Returns focus to the hamburger so keyboard users land where they started.
  const closeMenu = useCallback(() => {
    setOpen(false)
    menuButton.current?.focus()
  }, [])

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-7 py-2 pr-3 pl-5 md:px-6">
          <Wordmark />
          <nav aria-label="Main" className="hidden flex-1 gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          {/* Wrapper hides the button on mobile, since ButtonLink sets its own display. */}
          <div className="hidden md:block">
            <ButtonLink to="/match" size="md">
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
            className="ml-auto flex size-11 items-center justify-center md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </header>
      {/* Rendered outside the header: its backdrop blur would trap a fixed panel inside it. */}
      <MobileMenu open={open} onClose={closeMenu} links={NAV} />
    </>
  )
}
