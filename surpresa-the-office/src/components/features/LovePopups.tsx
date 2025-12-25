import { useState, useEffect } from 'react';
import { RetroWindow } from '../ui/RetroWindow';

export const LovePopups = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState({ title: "", text: "" });

  const alerts = [
    { title: "Alerta de Wanderley Andrade", text: "O Felipe é o teu traficante do amor, Riana!" },
    { title: "Guns N' Roses Update", text: "Nem a 'November Rain' é tão linda como o nosso namoro." },
    { title: "Dica da Ebony", text: "O sistema detectou que és a 'KIA' mais valiosa deste mundo." },
    { title: "Mensagem da Duquesa", text: "Debaixo desta 'Purple Rain', o Felipe só tem olhos para ti." },
    { title: "Erro de Sistema", text: "Impossível processar tanta beleza numa só psicóloga." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setContent(alerts[Math.floor(Math.random() * alerts.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 7000); // Fecha após 7s
    }, 30000); // Aparece a cada 30 segundos
    return () => clearInterval(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[300] w-[90vw] max-w-[280px] animate-in zoom-in">
      <RetroWindow title={content.title}>
        <div className="text-center">
          <p className="text-[11px] font-bold leading-tight mb-3">{content.text}</p>
          <button onClick={() => setShow(false)} className="bg-[#c0c0c0] border-retro px-4 py-1 text-[10px] font-bold">FECHAR</button>
        </div>
      </RetroWindow>
    </div>
  );
};