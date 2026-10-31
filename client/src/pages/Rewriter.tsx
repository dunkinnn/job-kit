import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import ToolPage from '../components/ToolPage.tsx'
import BulletInput from '../components/rewrite/BulletInput.tsx'
import BulletStep from '../components/rewrite/BulletStep.tsx'
import RewriteSummary from '../components/rewrite/RewriteSummary.tsx'

// Bullets can arrive from Match results through router state.
type Incoming = { bullets?: string[]; jobTitle?: string } | null

export default function Rewriter() {
  const location = useLocation()
  const navigate = useNavigate()
  const [incoming] = useState(() => location.state as Incoming)
  const [bullets, setBullets] = useState<string[]>(incoming?.bullets?.slice(0, 5) ?? [])
  const [jobTitle, setJobTitle] = useState(incoming?.jobTitle ?? '')
  const [finals, setFinals] = useState<string[]>([])

  // Removes the bullets from browser history right away, so they only live in memory.
  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null })
  }, [location.state, location.pathname, navigate])

  function start(list: string[], title: string) {
    setBullets(list)
    setJobTitle(title)
    setFinals([])
  }

  function finishBullet(text: string) {
    setFinals((current) => [...current, text])
    window.scrollTo({ top: 0 })
  }

  const position = finals.length
  const current = bullets[position]

  return (
    <ToolPage>
      {bullets.length === 0 ? (
        <BulletInput onStart={start} />
      ) : current === undefined ? (
        <RewriteSummary originals={bullets} finals={finals} onRestart={() => start([], '')} />
      ) : (
        <BulletStep key={position} bullet={current} jobTitle={jobTitle} position={position} total={bullets.length} onDone={finishBullet} />
      )}
    </ToolPage>
  )
}
