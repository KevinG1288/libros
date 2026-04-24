import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from "./Home/Home"
import Original from "./Original/Original"
import Favoritos from "./Favoritos/Favoritos"
import Informativa from "./Informativa/Informativa"
import Detalle from "./Detalle/Detalle"
import Usuario from "./Usuario/Usuario"
import Splash from "./Splash/Splash"
import { useState, useEffect } from 'react'
import "./App.css"

function NavMenu() {
  const location = useLocation()
  const links = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/favoritos", label: "Favorito", icon: "❤️" },
    { to: "/original", label: "Original", icon: "✨" },
    { to: "/informativa", label: "Info", icon: "ℹ️" },
    { to: "/usuario", label: "Usuario", icon: "👤" },
  ]
  return (
    <nav className="c-menu">
      {links.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          className={location.pathname === to ? 'active' : ''}
        >
          <span className="nav-icon">{icon}</span>
          <p>{label}</p>
        </Link>
      ))}
    </nav>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <Splash />

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<Original />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/libro/:id" element={<Detalle />} />
        </Routes>
        <NavMenu />
        <section id="spacer"></section>
      </div>
    </Router>
  )
}

export default App
