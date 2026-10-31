import { Link } from 'react-router'

export default function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="text-[19px] font-medium tracking-[-0.02em] text-ink md:text-xl">
      Job <span className="bg-hl px-1">Kit</span>
    </Link>
  )
}
