import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClass, type ButtonVariant } from '../lib/ui.ts'

type Props = {
  to: string
  variant?: ButtonVariant
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}

export default function ButtonLink({ to, variant, size, className = '', children }: Props) {
  return (
    <Link to={to} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  )
}
