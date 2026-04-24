import { useParams } from 'react-router-dom'
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

function getCover(formats: Record<string, string>): string {
  return formats['image/jpeg'] || 'https://via.placeholder.com/150x200?text=📖'
}

function Detalle() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [esFavorito, setEsFavorito] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://gutendex.com/books/${id}`)
        const data: Book = await res.json()
        setBook(data)

        const favs: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
        setEsFavorito(favs.includes(data.id))
      } catch (error) {
        console.error('Error cargando libro:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const toggleFavorito = () => {
    if (!book) return
    const favs: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
    let nuevos: number[]
    if (esFavorito) {
      nuevos = favs.filter((fid) => fid !== book.id)
    } else {
      nuevos = [...favs, book.id]
    }
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
    setEsFavorito(!esFavorito)
  }

  if (loading) return <p className="loading-text">Cargando libro...</p>
  if (!book) return <p className="loading-text">Libro no encontrado.</p>
  const leerUrl =
    book.formats['text/html'] ||
    book.formats['text/plain; charset=utf-8'] ||
    book.formats['text/plain']

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">← Volver</Link>

      <div className="detalle-card">
        <img
          src={getCover(book.formats)}
          alt={book.title}
          className="detalle-cover"
        />
        <h2 className="detalle-title">{book.title}</h2>

        <p className="detalle-autor">
           {book.authors.map((a) => a.name).join(', ') || 'Autor desconocido'}
        </p>

        {book.authors[0]?.birth_year && (
          <p className="detalle-meta">
             {book.authors[0].birth_year} — {book.authors[0].death_year ?? 'presente'}
          </p>
        )}

        <p className="detalle-meta"> {book.download_count.toLocaleString()} descargas</p>
        <p className="detalle-meta"> Idioma: {book.languages.join(', ')}</p>

        {book.subjects.length > 0 && (
          <div className="detalle-tags">
            {book.subjects.slice(0, 4).map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        )}

        <button
          className={`fav-btn ${esFavorito ? 'fav-activo' : ''}`}
          onClick={toggleFavorito}
        >
          {esFavorito ? ' Quitar de favoritos' : ' Agregar a favoritos'}
        </button>

        {leerUrl && (
          <a
            href={leerUrl}
            target="_blank"
            rel="noreferrer"
            className="read-btn"
          >
             Leer libro
          </a>
        )}
      </div>
    </div>
  )
}
export default Detalle
