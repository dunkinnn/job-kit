import { Navigate, Route, Routes } from 'react-router'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'
import MatchCheck from './pages/MatchCheck.tsx'
import Rewriter from './pages/Rewriter.tsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<MatchCheck />} />
          <Route path="/rewrite" element={<Rewriter />} />
          {/* Pages not built yet fall back to home. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
