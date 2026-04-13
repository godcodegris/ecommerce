import { useState } from 'react';
import '../styles/Productos.css';

export default function Contact() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="page-section">
      <h1><span>Contacto</span></h1>
      <p>
        ¿Tenés alguna consulta sobre un producto o pedido? Estamos para ayudarte.
      </p>

      <div className="contact-info-grid">

        <div className="contact-info-card">
          <div className="contact-info-icon">📍</div>
          <h4>Local</h4>
          <p>Av. Corrientes 1372, Local 15</p>
          <p>Ciudad Autónoma de Buenos Aires</p>
          <a
            href="https://maps.google.com/?q=Av.+Corrientes+1372+Buenos+Aires"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            Ver en Google Maps →
          </a>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon">📱</div>
          <h4>WhatsApp</h4>
          <p>Respondemos de lunes a sábado</p>
          <a
            href="https://wa.me/541127435579"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            Escribinos por WhatsApp →
          </a>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon">📸</div>
          <h4>Instagram</h4>
          <p>Seguinos para novedades y lanzamientos</p>
          <a
            href="https://instagram.com/thundera.ia"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            @thundera.ia →
          </a>
        </div>

      </div>

      <div className="contact-form">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Envianos un mensaje
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="Tu nombre" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label>Mensaje</label>
            <textarea placeholder="Escribí tu mensaje..." rows="4" required></textarea>
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px' }}
          >
            {enviado ? '✅ Mensaje enviado!' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </div>
  );
}