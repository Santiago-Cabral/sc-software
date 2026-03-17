import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "¡Hola! Soy SC Bot. ¿En qué puedo ayudarte con tu proyecto hoy?" }
  ]);

  const send = (txt: string) => {
    if (!txt.trim()) return;
    setMessages([...messages, { role: "user", content: txt }]);
    setInput("");
    // Lógica de respuesta simulada
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", content: "Estamos procesando tu consulta. ¿Sabías que una landing page puede estar lista en solo 3-5 días?" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#00E5FF] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-surface border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
          <div className="bg-[#00E5FF] p-4 text-[#080C10] font-bold">SC Bot — Asistente</div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm max-w-[80%] ${m.role === 'user' ? 'bg-[#7B61FF] text-white ml-auto' : 'bg-white/5 text-white'}`}>
                {m.content}
              </div>
            ))}
          </div>
          <form className="p-4 border-t border-white/5 flex gap-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none"
            />
            <button type="submit" className="bg-[#00E5FF] text-[#080C10] px-4 rounded-lg font-bold">↑</button>
          </form>
        </div>
      )}
    </div>
  );
}