import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import ButtonLink from './ButtonLink.tsx'
import Wordmark from './Wordmark.tsx'

type Props = {
  open: boolean
  onClose: () => void
  links: { label: string; to: string }[]
}

// Full-screen menu that fades in on phones, with links following one by one.
const stagger = (open: boolean, step: number) => ({ transitionDelay: open ? `${80 + step * 50}ms` : '0ms' })

export default function MobileMenu({ open, onClose, links }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeButton.current?.focus()
    document.body.style.overflow = 'hidden'

    // Escape closes, and Tab cycles inside the panel so focus never lands on the hidden page.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panel.current) return
      const items = panel.current.querySelectorAll<HTMLElement>('a, button')
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    // Closes the menu if the window grows to desktop width while it is open.
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && onClose()

    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open, onClose])

  return (
    <div
      ref={panel}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-50 flex flex-col bg-paper motion-reduce:transition-none md:hidden ${
        open
          ? 'visible translate-y-0 opacity-100 [transition:opacity_250ms_ease-out,transform_250ms_ease-out]'
          : 'pointer-events-none invisible -translate-y-2 opacity-0 [transition:opacity_200ms_ease-in,transform_200ms_ease-in,visibility_0s_linear_200ms]'
      }`}
    >
      <div className="flex items-center justify-between border-b border-line py-2 pr-3 pl-5">
        <Wordmark onClick={onClose} />
        <button
          ref={closeButton}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex size-11 items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <nav aria-label="Main" className="px-5 pt-4">
        {links.map((link, index) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            style={stagger(open, index)}
            className={`headline flex items-baseline gap-4 border-b border-line py-5 text-[21px] leading-tight transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            {({ isActive }) => (
              <>
                <span className="text-xs font-medium text-muted tabular-nums">0{index + 1}</span>
                <span className={isActive ? 'rounded-md bg-sky-200 px-2' : ''}>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div
        style={stagger(open, links.length)}
        className={`mt-auto flex flex-col gap-3 px-5 pb-8 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <ButtonLink to="/match" arrow className="w-full">
          Check a job post
        </ButtonLink>
        <span className="text-center text-xs text-muted">
          Free · No sign-up · Resume not stored
        </span>
      </div>
    </div>
  )
}
