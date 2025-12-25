import { useState, useEffect } from 'react';

export const Clippy = () => {
  const messages = [
    "Parece que você está tentando ser a pessoa mais linda do mundo. Deseja ajuda?",
    "Dica do dia: O Felipe te ama mais que o Michael ama o Ryan.",
    "O sistema detectou um excesso de perfeição nesta tela!",
    "Lembrete: Você é a Pam do meu Jim."
  ];

  const [msg, setMsg] = useState(messages[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsg(messages[Math.floor(Math.random() * messages.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000); // Some após 5s
    }, 15000); // Aparece a cada 15s
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 right-4 z-[100] flex items-end animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-[#ffffcc] border border-black p-2 rounded-lg text-[10px] max-w-[120px] shadow-lg relative mb-8">
        {msg}
        <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-[#ffffcc] border-b border-r border-black transform rotate-45"></div>
      </div>
      <img src="clippy.png" className="w-32 h-22 object-contain" alt="Clippy" />
    </div>
  );
};