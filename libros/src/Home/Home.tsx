import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Author {
  name: string
  birth_year: number | null
  death_year: number | null
}

interface Book {
  id: number
  title: string
  authors: Author[]
  languages: string[]
  download_count: number
  formats: Record<string, string>
  subjects: string[]
  bookshelves: string[]
}

interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Book[]
}

const TEMAS = ['Todos', 'Fiction', 'Poetry', 'Drama', 'History', 'Philosophy']

function getCover(formats: Record<string, string>): string {
  return (
    formats['image/jpeg'] ||
    'https://via.placeholder.com/80x110?text=📖'
  )
}

function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        let url = 'https://gutendex.com/books/?languages=es'
        if (busqueda.length >= 3) {
          url += `&search=${encodeURIComponent(busqueda)}`
        }
        if (filtro !== 'Todos') {
          url += `&topic=${encodeURIComponent(filtro)}`
        }
        const res = await fetch(url)
        const data: ApiResponse = await res.json()
        setBooks(data.results)
      } catch (error) {
        console.error('Error cargando libros:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [busqueda, filtro])

  return (
    <div className="page-container">
      <h2 className="page-title">📚 Libros en Español</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Buscar libro o autor..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="filtros">
        {TEMAS.map((tema) => (
          <button
            key={tema}
            className={filtro === tema ? 'activo' : ''}
            onClick={() => setFiltro(tema)}
          >
            {tema}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Cargando libros...</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <Link key={book.id} to={`/libro/${book.id}`} className="book-card">
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
                <p className="book-downloads">⬇️ {book.download_count.toLocaleString()} descargas</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
