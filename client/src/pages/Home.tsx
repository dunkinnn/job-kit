import Hero from '../components/home/Hero.tsx'
import ProductPreview from '../components/home/ProductPreview.tsx'
import Features from '../components/home/Features.tsx'
import TrustSection from '../components/home/TrustSection.tsx'
import CtaBand from '../components/home/CtaBand.tsx'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductPreview />
      <Features />
      <TrustSection />
      <CtaBand />
    </>
  )
}
