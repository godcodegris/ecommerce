import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      rol: "assistant",
      contenido: "¡Hola! Soy el asistente de Thundera Store 🛒 ¿En qué te puedo ayudar?"
    }
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const mensajesRef = useRef(null);

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (!input.trim() || cargando) return;

    const nuevoMensaje = { rol: "user", contenido: input };
    const nuevosMensajes = [...mensajes, nuevoMensaje];
    setMensajes(nuevosMensajes);
    setInput("");
    setCargando(true);

    try {    const response = await fetch("https://ecommerce-backend-production-e9f1.up.railway.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensajes: nuevosMensajes.map(m => ({
            role: m.rol,
            content: m.contenido
          }))
        })
      });
  

      const data = await response.json();
      setMensajes(prev => [...prev, { rol: "assistant", contenido: data.respuesta }]);
    } catch (error) {
      console.error("Error chat:", error);
      setMensajes(prev => [...prev, {
        rol: "assistant",
        contenido: "Hubo un error. Por favor contactanos por WhatsApp al 1127435579."
      }]);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  return (
    <>
      <button
        className="chatbot-bubble"
        onClick={() => setAbierto(!abierto)}
        title="Chat con nosotros"
      >
        {abierto ? "✕" : "💬"}
      </button>

      {abierto && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar">⚡</span>
              <div>
                <p className="chatbot-nombre">Thundera Store</p>
                <p className="chatbot-estado">● En línea</p>
              </div>
            </div>
            <button className="chatbot-cerrar" onClick={() => setAbierto(false)}>✕</button>
          </div>

          <div className="chatbot-mensajes" ref={mensajesRef}>
            {mensajes.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-mensaje ${msg.rol === "user" ? "chatbot-mensaje-user" : "chatbot-mensaje-bot"}`}
              >
                {msg.contenido}
              </div>
            ))}
            {cargando && (
              <div className="chatbot-mensaje chatbot-mensaje-bot">
                <span className="chatbot-typing">···</span>
              </div>
            )}
          </div>

          <div className="chatbot-input-wrapper">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Escribí tu pregunta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={cargando}
            />
            <button
              className="chatbot-enviar"
              onClick={enviarMensaje}
              disabled={cargando || !input.trim()}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}