import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import ButtonLink from './ButtonLink.tsx'

const NAV = [
  { label: 'Match check', to: '/match' },
  { label: 'Bullet rewriter', to: '/rewrite' },
  { label: 'Mock interview', to: '/interview' },
]

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-11 items-center rounded-lg px-3 text-[15px] ${
    isActive ? 'bg-sage-tint font-medium text-sage' : 'text-ink hover:bg-dim'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-2 md:px-6">
        <Link to="/" className="flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.01em] text-ink">
          <span className="flex size-7 items-center justify-center rounded-lg bg-sage text-xs text-white">JK</span>
          Job Kit
        </Link>
        <nav aria-label="Main" className="hidden flex-1 gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ButtonLink to="/match" variant="dark" size="md" className="hidden md:inline-flex">
          Check a job post
        </ButtonLink>
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto flex size-11 items-center justify-center rounded-[10px] md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="flex flex-col gap-1 border-t border-line px-4 pt-2 pb-4 md:hidden">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/match" className="mt-2">
            Check a job post
          </ButtonLink>
        </nav>
      )}
    </header>
  )
}
