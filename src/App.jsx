import { useState, useEffect } from 'react'
import './App.css'
import Nav      from './components/Nav'
import Hero     from './components/Hero'
import About    from './components/About'
import Products from './components/Products'
import People   from './components/People'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

function App() {
  const [theme,    setTheme]    = useState('dark')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <Nav onToggle={toggle} theme={theme} />
      <main>
        <Hero onToggle={toggle} theme={theme} />
        <About />
        <Products />
        <People />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
