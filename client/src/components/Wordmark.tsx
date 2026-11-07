import { Link } from 'react-router'

type Props = { light?: boolean; onClick?: () => void }

export default function Wordmark({ light = false, onClick }: Props) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`headline flex min-h-11 items-center gap-2.5 text-[15px] md:text-[17px] ${light ? 'text-white' : 'text-ink'}`}
    >
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="22" height="22" rx="6" />
        <path d="M8 13.5l3.5 3.5L18.5 9" />
      </svg>
      Job Kit
    </Link>
  )
}
