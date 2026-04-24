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
  subjects: string[]
}

function getCover(formats: Record<string, string>): string {
  return formats['image/jpeg'] || 'https://via.placeholder.com/120x160?text=📖'
}

// Pantalla Original: Top 10 libros más descargados en español
function Original() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await fetch('https://gutendex.com/books/?languages=es&sort=popular')
        const data = await res.json()
        setBooks(data.results.slice(0, 10))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTop()
  }, [])

  return (
    <div className="page-container">
      <h2 className="page-title"> Top 10 Más Descargados</h2>
      <p className="page-sub">Los libros en español más populares de Project Gutenberg</p>

      {loading ? (
        <p className="loading-text">Cargando ranking...</p>
      ) : (
        <div className="top-list">
          {books.map((book, index) => (
            <Link key={book.id} to={`/libro/${book.id}`} className="top-item">
              <span className={`top-rank rank-${index + 1}`}>#{index + 1}</span>
              <img
                src={getCover(book.formats)}
                alt={book.title}
                className="top-cover"
              />
              <div className="top-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">
                  {book.authors.map((a) => a.name).join(', ') || 'Desconocido'}
                </p>
                <div className="download-bar-container">
                  <div
                    className="download-bar"
                    style={{
                      width: `${Math.min(100, (book.download_count / books[0].download_count) * 100)}%`
                    }}
                  />
                  <span className="download-label">⬇ {book.download_count.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Original
