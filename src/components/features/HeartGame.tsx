import { useState, useEffect, useRef } from 'react';

interface HeartGameProps {
  isActive: boolean;
  onScore: () => void;
  onGameEnd: () => void;
}

interface Heart {
  id: string;
  left: number;
  top: number;
  isPopping?: boolean;
}

export const HeartGame = ({ isActive, onScore, onGameEnd }: HeartGameProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Ref para capturar onGameEnd sem reiniciar o useEffect do timer
  const onGameEndRef = useRef(onGameEnd);

  // Atualiza a Ref sempre que a função onGameEnd mudar
  useEffect(() => {
    onGameEndRef.current = onGameEnd;
  }, [onGameEnd]);

  // RESET: Ao ativar o jogo
  useEffect(() => {
    if (isActive) {
      setTimeLeft(30);
      setHearts([]);
    }
  }, [isActive]);

  // TIMER BLINDADO: Não reinicia a cada re-render
  useEffect(() => {
    if (!isActive) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          onGameEndRef.current(); // Usa a referência estável
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isActive]); // Somente isActive é dependência agora

  // SPAM DE CORAÇÕES: Independente do timer
  useEffect(() => {
    if (!isActive) return;

    const spawnInterval = setInterval(() => {
      const batchSize = Math.floor(Math.random() * 4) + 2; 
      const newBatch: Heart[] = Array.from({ length: batchSize }).map(() => ({
        id: crypto.randomUUID(),
        left: Math.random() * 90 + 5,
        top: Math.random() * 80 + 10,
        isPopping: false
      }));
      
      setHearts((prev) => [...prev, ...newBatch]);

      newBatch.forEach(heart => {
        setTimeout(() => {
          setHearts((prev) => prev.filter(h => h.id !== heart.id || h.isPopping));
        }, 1200);
      });
    }, 150); // Spam frenético

    return () => clearInterval(spawnInterval);
  }, [isActive]);

  const handleHeartClick = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onScore();
    setHearts((prev) => 
      prev.map((h) => (h.id === id ? { ...h, isPopping: true } : h))
    );
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 400);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black overflow-hidden pointer-events-none">
      <svg className="hidden">
        <defs>
          <filter id="crt-bend" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
            <feComposite in="SourceGraphic" operator="atop"/>
          </filter>
        </defs>
      </svg>

      <div className="relative w-full h-full p-4" style={{ filter: 'url(#crt-bend)' }}>
        <div className="absolute inset-0 bg-[#008080] opacity-30"></div>
        <div className="absolute inset-0 pointer-events-none z-30 animate-crt-flicker">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_2px,rgba(0,0,0,0.4)_3px)]"></div>
        </div>

        <div className="relative z-20 h-full w-full">
          <div className="absolute top-4 right-4 pointer-events-auto">
            <div className="bg-black/80 border-retro p-2 font-mono text-sm font-bold text-[#00ff00] text-crt-glow min-w-[60px] text-center">
               {timeLeft.toString().padStart(2, '0')}s
            </div>
          </div>

          {timeLeft > 0 && hearts.map((heart) => (
            heart.isPopping ? (
              <div key={heart.id} className="absolute text-6xl animate-heart-burst z-40" style={{ left: `${heart.left}%`, top: `${heart.top}%` }}>💥✨</div>
            ) : (
              <button key={heart.id} onMouseDown={(e) => handleHeartClick(heart.id, e)} className="absolute text-7xl pointer-events-auto cursor-pointer border-none bg-transparent hover:scale-110 transition-all z-40 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" style={{ left: `${heart.left}%`, top: `${heart.top}%` }}>❤️</button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};