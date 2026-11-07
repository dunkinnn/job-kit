import type { ReactNode } from 'react'
import { Link } from 'react-router'
import ArrowIcon from './ArrowIcon.tsx'
import { buttonClass, type ButtonVariant } from '../lib/ui.ts'

type Props = {
  to: string
  variant?: ButtonVariant
  size?: 'md' | 'lg'
  arrow?: boolean
  className?: string
  children: ReactNode
}

export default function ButtonLink({ to, variant = 'primary', size = 'lg', arrow = false, className = '', children }: Props) {
  // Arrow buttons end in a round icon, like the hero and closing band designs.
  const arrowClass = arrow ? `!justify-between !pr-1.5 uppercase tracking-[0.04em] ${size === 'lg' ? '!text-[13px]' : '!text-xs'}` : ''
  const circle = `flex shrink-0 items-center justify-center rounded-full ${size === 'lg' ? 'size-10' : 'size-8'} ${
    variant === 'light' || variant === 'outline' ? 'bg-accent text-white' : 'bg-white/15'
  }`

  return (
    <Link to={to} className={`${buttonClass(variant, size)} ${arrowClass} ${className}`}>
      {children}
      {arrow && (
        <span className={circle}>
          <ArrowIcon />
        </span>
      )}
    </Link>
  )
}
