import { Navigate, Route, Routes } from 'react-router'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Tool pages are not built yet, so unknown paths fall back to home. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
