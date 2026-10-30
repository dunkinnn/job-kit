import type { ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary' | 'dark' | 'light'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-sage text-white hover:bg-sage-dark',
  secondary: 'border border-line bg-surface text-ink hover:bg-dim',
  dark: 'bg-ink text-white hover:bg-black',
  light: 'bg-paper text-ink hover:bg-white',
}

type Props = {
  to: string
  variant?: Variant
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}

export default function ButtonLink({ to, variant = 'primary', size = 'lg', className = '', children }: Props) {
  const classes = `inline-flex items-center justify-center rounded-[10px] font-medium transition-colors ${
    size === 'lg' ? 'h-[52px] px-7 text-base' : 'h-11 px-4 text-[15px]'
  } ${VARIANTS[variant]} ${className}`

  // Hash links scroll within the page, so they stay plain anchors.
  if (to.startsWith('#')) {
    return (
      <a href={to} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  )
}
