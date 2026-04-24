import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Author {
  name: string
}

interface Book {
  id: number
  title: string
  authors: Author[]
  formats: Record<string, string>
  download_count: number
}

function getCover(formats: Record<string, string>): string {
  return formats['image/jpeg'] || 'https://via.placeholder.com/80x110?text=📖'
}

function Favoritos() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavoritos = async () => {
      const ids: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
      if (ids.length === 0) {
        setBooks([])
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`https://gutendex.com/books/?ids=${ids.join(',')}`)
        const data = await res.json()
        setBooks(data.results)
      } catch (error) {
        console.error('Error cargando favoritos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFavoritos()
  }, [])

  const quitarFavorito = (id: number) => {
    const ids: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
    const nuevos = ids.filter((fid) => fid !== id)
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="page-container">
      <h2 className="page-title">❤️ Mis Favoritos</h2>

      {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <p>No tienes libros favoritos aún.</p>
          <Link to="/" className="back-btn">Explorar libros</Link>
        </div>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card fav-item">
              <Link to={`/libro/${book.id}`} className="book-card-link">
                <img
                  src={getCover(book.formats)}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">
                    {book.authors.map((a) => a.name).join(', ') || 'Autor desconocido'}
                  </p>
                  <p className="book-downloads">⬇️ {book.download_count.toLocaleString()}</p>
                </div>
              </Link>
              <button
                className="remove-fav-btn"
                onClick={() => quitarFavorito(book.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos
