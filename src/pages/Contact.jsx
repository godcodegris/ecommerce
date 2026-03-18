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
      <h1><span>Contactanos</span></h1>
      <p>
        Tenes alguna consulta sobre un producto, un pedido o queres hacernos
        una sugerencia? Completa el formulario y te responderemos a la brevedad.
      </p>

      <div className="contact-form">
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
            <textarea placeholder="Escribi tu mensaje..." rows="4" required></textarea>
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px' }}
          >
            {enviado ? 'Mensaje enviado!' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </div>
  );
}
