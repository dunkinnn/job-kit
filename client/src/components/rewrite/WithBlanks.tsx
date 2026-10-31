// Shows [blanks] in their own style so users see what they still need to fill in.
export default function WithBlanks({ text, onDark = false }: { text: string; onDark?: boolean }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, index) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={index} className={`font-mono text-[0.9em] ${onDark ? 'rounded bg-white/15 px-1' : 'text-cobalt'}`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
