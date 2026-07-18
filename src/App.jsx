import { useState, useEffect } from 'react'
import './App.css'
import Nav          from './components/Nav'
import Hero          from './components/Hero'
import TrustBar       from './components/TrustBar'
import Products       from './components/Products'
import HowWeBuild     from './components/HowWeBuild'
import Education      from './components/Education'
import FounderStory   from './components/FounderStory'
import PreFooterCTA   from './components/PreFooterCTA'
import Footer         from './components/Footer'

function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <HowWeBuild />
        <Education />
        <FounderStory />
        <PreFooterCTA />
        <Footer />
      </main>
    </>
  )
}

export default App
