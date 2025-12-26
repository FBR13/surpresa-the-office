import { useState, useEffect } from 'react';

interface HeartGameProps {
  isActive: boolean;
  onScore: () => void;
  onGameEnd: () => void; // Removido o parâmetro aqui pois o App já controla o score
}

export const HeartGame = ({ isActive, onScore, onGameEnd }: HeartGameProps) => {
  const [hearts, setHearts] = useState<{ id: number; left: number; top: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  // Lógica do Timer (Ajustada para Browser)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>; // Correção do erro NodeJS namespace
    
    if (isActive && timeLeft > 0) {
      setGameStarted(true);
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setGameStarted(false);
      onGameEnd(); // Notifica o App.tsx que o tempo acabou para salvar no Supabase
    }
    
    return () => clearInterval(timer);
  }, [isActive, timeLeft, gameStarted, onGameEnd]);

  // Lógica de spawn dos corações
  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 80 + 10,
        top: Math.random() * 80 + 10,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter(h => h.id !== newHeart.id));
      }, 2000);
    }, 800);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none">
      {/* Overlay do Timer e Placar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
        <div className="bg-[#c0c0c0] border-retro p-2 font-mono text-xs font-bold shadow-lg">
          <div className="border-retro-inset bg-black text-[#00ff00] px-3 py-1">
            TEMPO: {timeLeft}s
          </div>
        </div>
      </div>

      {/* Renderização dos Corações */}
      {timeLeft > 0 ? (
        hearts.map((heart) => (
          <button
            key={heart.id}
            onClick={(e) => {
              e.stopPropagation();
              onScore();
              setHearts((prev) => prev.filter(h => h.id !== heart.id));
            }}
            className="absolute text-4xl pointer-events-auto animate-ping cursor-pointer hover:scale-125 transition-transform"
            style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
          >
            ❤️
          </button>
        ))
      ) : (
        /* Tela de Fim de Jogo Estilo Windows 98 */
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-auto">
          <div className="bg-[#c0c0c0] border-retro p-6 text-center max-w-[280px] animate-in zoom-in">
            <div className="flex items-center gap-2 mb-4 bg-blue-900 text-white px-2 py-1 text-[10px] font-bold">
              <span>Fim de Jogo</span>
            </div>
            <h2 className="font-bold text-sm mb-2 uppercase">Tempo Esgotado!</h2>
            <p className="text-[10px] mb-4 leading-tight">
              O sistema processou todo o amor enviado para a estação **Riana Comanetti**.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#c0c0c0] border-retro px-6 py-2 text-xs font-bold active:border-retro-inset uppercase shadow-sm"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};