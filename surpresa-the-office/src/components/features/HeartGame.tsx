import { useState, useEffect, useRef } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: string; // Adicionei suporte a tamanhos variados
}

export const HeartGame = ({ isActive, onScore }: { isActive: boolean; onScore: () => void }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [poppingHearts, setPoppingHearts] = useState<Heart[]>([]);
  const spawnTimerRef = useRef<number | null>(null);

  // Lista de tamanhos gigantes para variar um pouco
  const sizes = ['text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'];

  useEffect(() => {
    if (!isActive) {
      setHearts([]);
      setPoppingHearts([]);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      return;
    }

    // AUMENTADO: Agora nasce um coração a cada 300ms (antes era 800ms)
    spawnTimerRef.current = window.setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 85, 
        y: Math.random() * 80,
        size: sizes[Math.floor(Math.random() * sizes.length)] // Tamanho aleatório gigante
      };
      setHearts((prev) => [...prev, newHeart]);

      // Remove se não clicar em 1.5s (mais rápido para não lotar a tela demais)
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1500);
    }, 300); 

    return () => {
        if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    }
  }, [isActive]);

  const popHeart = (id: number) => {
    const heartToPop = hearts.find(h => h.id === id);
    if (heartToPop) {
        onScore();
        setHearts((prev) => prev.filter((h) => h.id !== id));
        setPoppingHearts((prev) => [...prev, heartToPop]);

        setTimeout(() => {
            setPoppingHearts((prev) => prev.filter(h => h.id !== id));
        }, 500);
    }
  };

  if (!isActive && poppingHearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Corações Ativos */}
      {hearts.map((heart) => (
        <button
          key={heart.id}
          onClick={() => popHeart(heart.id)}
          className={`absolute pointer-events-auto ${heart.size} animate-bounce hover:scale-110 transition-transform cursor-crosshair leading-none select-none`}
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
        >
          ❤️
        </button>
      ))}

      {/* Corações Estourando */}
      {poppingHearts.map((heart) => (
        <div
          key={'pop-' + heart.id}
          className={`absolute ${heart.size} animate-heart-burst leading-none select-none`}
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};