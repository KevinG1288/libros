import { useState, useEffect } from 'react'
function Usuario() {
  const [nombre, setNombre] = useState('')
  const [editando, setEditando] = useState(false)
  const [tempNombre, setTempNombre] = useState('')
  const [totalFavs, setTotalFavs] = useState(0)

  useEffect(() => {
    const savedName = localStorage.getItem('usuario_nombre') || ''
    setNombre(savedName)
    setTempNombre(savedName)
    const favs: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
    setTotalFavs(favs.length)
  }, [])
  const guardar = () => {
    localStorage.setItem('usuario_nombre', tempNombre)
    setNombre(tempNombre)
    setEditando(false)
  }
  return (
    <div className="page-container">
      <h2 className="page-title"> Mi Perfil</h2>

      <div className="usuario-card">
        <div className="usuario-avatar">
          {nombre ? nombre.charAt(0).toUpperCase() : '?'}
        </div>

        {editando ? (
          <div className="usuario-edit">
            <input
              className="search-input"
              type="text"
              placeholder="Tu nombre..."
              value={tempNombre}
              onChange={(e) => setTempNombre(e.target.value)}
            />
            <button className="fav-btn fav-activo" onClick={guardar}>
               Guardar
            </button>
            <button className="back-btn" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <>
            <h3 className="usuario-nombre">
              {nombre || 'Sin nombre'}
            </h3>
            <button className="fav-btn" onClick={() => setEditando(true)}>
               Editar nombre
            </button>
          </>
        )}

        <div className="usuario-stats">
          <div className="stat-box">
            <span className="stat-num">{totalFavs}</span>
            <span className="stat-label">Favoritos</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">ES</span>
            <span className="stat-label">Idioma</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">60k+</span>
            <span className="stat-label">Libros</span>
          </div>
        </div>

        <div className="info-section" style={{ marginTop: '1.5rem' }}>
          <h3> Sobre la app</h3>
          <p>Versión 1.0.0</p>
          <p>Tecnología: React Native + TypeScript</p>
          <p>API: Gutendex (Project Gutenberg)</p>
        </div>
      </div>
    </div>
  )
}

export default Usuario
