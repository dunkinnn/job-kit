// Shows [blanks] in their own style so users see what they still need to fill in.
export default function WithBlanks({ text, onDark = false }: { text: string; onDark?: boolean }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, index) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={index} className={`rounded-md px-1.5 ${onDark ? 'bg-white/15' : 'bg-sky-100 text-accent'}`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
