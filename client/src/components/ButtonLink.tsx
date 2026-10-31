import type { ReactNode } from 'react'
import { Link } from 'react-router'

const VARIANTS = {
  primary: 'bg-cobalt text-white hover:bg-cobalt-dark',
  dark: 'bg-ink text-white hover:bg-black',
}

type Props = {
  to: string
  variant?: keyof typeof VARIANTS
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}

export default function ButtonLink({ to, variant = 'primary', size = 'lg', className = '', children }: Props) {
  const classes = `inline-flex items-center justify-center rounded-md font-medium transition-colors ${
    size === 'lg' ? 'h-[54px] px-7 text-base' : 'h-11 px-4 text-[15px]'
  } ${VARIANTS[variant]} ${className}`

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  )
}
