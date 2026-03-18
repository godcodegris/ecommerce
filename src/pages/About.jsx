import '../styles/Productos.css';

export default function About() {
  return (
    <div className="page-section">
      <h1>Sobre <span>Thundera Collectibles</span></h1>
      <p>
        Somos una tienda dedicada a los coleccionables mas exclusivos del mundo
        del comic, el cine y la cultura pop. Cada pieza que ofrecemos esta
        cuidadosamente seleccionada para los verdaderos fans.
      </p>
      <p>
        Nuestro objetivo es que encuentres esa figura, ese comic o ese objeto
        unico que le falta a tu coleccion. Trabajamos con las mejores marcas
        y distribuidores para traerte lo mejor.
      </p>

      <div className="page-features">
        <div className="feature-card">
          <div className="feature-icon">&#127919;</div>
          <h3>Productos Originales</h3>
          <p>Solo trabajamos con productos 100% originales y licenciados.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">&#128666;</div>
          <h3>Envios Seguros</h3>
          <p>Embalaje especial para que tu coleccionable llegue perfecto.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">&#11088;</div>
          <h3>Fan Community</h3>
          <p>Unite a nuestra comunidad de coleccionistas apasionados.</p>
        </div>
      </div>
    </div>
  );
}
