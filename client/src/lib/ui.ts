const VARIANTS = {
  primary: 'bg-cobalt text-white hover:bg-cobalt-dark',
  dark: 'bg-ink text-white hover:bg-black',
  outline: 'border border-line bg-paper text-ink hover:bg-desk',
}

export type ButtonVariant = keyof typeof VARIANTS

// Shared button look for links and real buttons.
export function buttonClass(variant: ButtonVariant = 'primary', size: 'md' | 'lg' = 'lg'): string {
  return `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
    size === 'lg' ? 'h-[54px] px-7 text-base' : 'h-11 px-4 text-[15px]'
  } ${VARIANTS[variant]}`
}
