function Informativa() {
  return (
    <div className="page-container">
      <h2 className="page-title"> Acerca de la App</h2>

      <div className="info-card">
        <div className="info-section">
          <h3>📚 ¿Qué es esta aplicación?</h3>
          <p>
            Esta app te permite explorar, buscar y guardar libros en español del
            catálogo de <strong>Project Gutenberg</strong>, la biblioteca digital
            más grande de libros de dominio público del mundo.
          </p>
        </div>

        <div className="info-section">
          <h3> API utilizada</h3>
          <p><strong>Gutendex</strong> — JSON Web API para Project Gutenberg</p>
          <p> <code>https://gutendex.com/books</code></p>
          <ul className="info-list">
            <li><code>?languages=es</code> — Libros en español</li>
            <li><code>?search=quijote</code> — Búsqueda por título o autor</li>
            <li><code>?topic=Fiction</code> — Filtrar por tema</li>
            <li><code>/books/{'{id}'}</code> — Detalle de un libro</li>
          </ul>
        </div>

        <div className="info-section">
          <h3> Funciones principales</h3>
          <ul className="info-list">
            <li> Buscar libros por título o autor</li>
            <li> Filtrar por categoría o tema</li>
            <li> Ver detalle completo del libro</li>
            <li> Guardar libros en favoritos</li>
            <li> Ver top 10 más descargados</li>
            <li> Acceder al texto completo gratis</li>
          </ul>
        </div>

        <div className="info-section">
          <h3> Desarrollador</h3>
          <p>Proyecto académico — React Native con TypeScript</p>
          <p>Materia: Desarrollo Móvil</p>
          <p>Fecha: Abril 2025</p>
        </div>

        <div className="info-badge">
          <span></span>
          <p>Más de <strong>60,000 libros</strong> disponibles gratuitamente</p>
        </div>
      </div>
    </div>
  )
}

export default Informativa
