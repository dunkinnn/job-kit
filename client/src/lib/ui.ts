const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  dark: 'bg-ink text-white hover:bg-black',
  outline: 'border border-line-strong bg-paper text-ink hover:bg-desk',
  light: 'bg-paper text-ink hover:bg-sky-100',
}

export type ButtonVariant = keyof typeof VARIANTS

// Shared pill button look for links and real buttons.
export function buttonClass(variant: ButtonVariant = 'primary', size: 'md' | 'lg' = 'lg'): string {
  return `inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
    size === 'lg' ? 'h-[52px] px-7 text-[15px]' : 'h-11 px-5 text-sm'
  } ${VARIANTS[variant]}`
}
