import { useLayoutEffect, useRef } from 'react'
import ButtonLink from '../ButtonLink.tsx'
import Skyline from './Skyline.tsx'

// The desktop hero is designed at 1680x840 and scaled as one picture,
// so every laptop sees the same layout without zooming the browser.
const DESIGN_WIDTH = 1680
const DESIGN_HEIGHT = 840

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const update = () => {
      const fit = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT, 1.5)
      hero.style.setProperty('--fit', fit.toFixed(4))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section ref={heroRef} className="relative m-2 flex min-h-[720px] flex-col overflow-hidden rounded-[20px] bg-skyline md:m-3 md:h-[calc(var(--fit,1)*816px)] md:min-h-0 md:rounded-3xl">
      {/* The giant name works as a logo; the tagline below is the real page heading. */}
      <div
        aria-hidden="true"
        className="headline relative z-[1] mt-[86px] text-center text-[clamp(52px,15.2vw,224px)] md:text-[202px] md:[zoom:var(--fit,1)] leading-[0.86] tracking-[-0.02em] text-white md:mt-[104px]"
      >
        Job Kit
      </div>
      <Skyline />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[2] h-[62%] bg-[linear-gradient(180deg,rgba(20,43,74,0)_0%,rgba(20,43,74,0.84)_36%,rgba(20,43,74,0.96)_100%)] md:h-[55%] md:bg-[linear-gradient(180deg,rgba(20,43,74,0)_0%,rgba(20,43,74,0.85)_40%,rgba(20,43,74,0.96)_100%)]"
      />
      <div className="relative z-[3] mt-auto flex flex-col gap-4 px-[18px] pb-[18px] md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-8 md:px-10 md:pb-10 md:[zoom:var(--fit,1)]">
        <div className="flex max-w-[640px] flex-col gap-3.5">
          <span className="text-xs font-medium text-sky-200 md:text-[13px]">Free for Filipino fresh grads · No sign-up</span>
          <h1 className="headline text-[22px] leading-[1.14] text-white md:text-[34px] md:leading-[1.12] md:tracking-[-0.01em]">
            Applying everywhere and hearing nothing back? Fix that first.
          </h1>
        </div>
        <div className="flex flex-col gap-3.5 md:items-end">
          <ButtonLink to="/match" variant="light" arrow className="w-full md:w-auto">
            Check a job post
          </ButtonLink>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/35 bg-white/15 px-4 py-3.5 text-white backdrop-blur-md md:w-[240px] md:flex-col md:items-start md:gap-1.5 md:px-5 md:py-[18px]">
            <span className="headline text-[22px] whitespace-nowrap md:text-3xl">62% → 88%</span>
            <span className="text-[11px] leading-snug text-sky-100 md:text-xs">Example: match score after fixing three weak bullets.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
