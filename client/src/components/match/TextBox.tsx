type Props = {
  id: string
  label: string
  hint: string
  placeholder: string
  value: string
  disabled: boolean
  onChange: (value: string) => void
}

export const MIN_CHARS = 50
export const MAX_CHARS = 8000

export default function TextBox({ id, label, hint, placeholder, value, disabled, onChange }: Props) {
  const length = value.trim().length
  const tooLong = length > MAX_CHARS

  return (
    <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-2.5 rounded-md border border-line bg-paper p-4 md:gap-3 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <label htmlFor={id} className="text-base font-medium md:text-[17px]">
          {label}
        </label>
        <span id={`${id}-hint`} className="text-[13px] text-muted">
          {hint}
        </span>
      </div>
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={`${id}-hint ${id}-count`}
        onChange={(event) => onChange(event.target.value)}
        className="h-[200px] resize-y rounded-md border border-line bg-desk p-3.5 text-[15px] leading-relaxed text-ink placeholder:text-muted focus:border-cobalt focus:outline-2 focus:outline-cobalt/20 disabled:opacity-70 md:h-[360px] md:p-4"
      />
      <span id={`${id}-count`} className={`self-end font-mono text-xs ${tooLong ? 'text-missing' : 'text-muted'}`}>
        {length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
      </span>
    </div>
  )
}
