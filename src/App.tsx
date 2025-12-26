import { useState, useRef, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { RetroWindow } from './components/ui/RetroWindow';
import { WeddingDate } from './components/features/WeddingDate';
import { HeartGame } from './components/features/HeartGame';
import { RelationshipTimer } from './components/features/RelationshipTimer';
import { DundieGenerator } from './components/features/DundieGenerator';
import { Clippy } from './components/features/Clippy';
import { JelloPrank } from './components/features/JelloPrank';
import { MusicPlayer } from './components/features/MusicPlayer';
import { LovePopups } from './components/features/LovePopups';
import { PhotoCarousel } from './components/features/PhotoCarousel';
import { Leaderboard } from './components/features/Leaderboard';

const DesktopIcon = ({ label, icon, onClick }: { label: string; icon: string; onClick?: () => void }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-1 w-16 p-1 cursor-pointer group active:opacity-70 transition-all">
    <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[10px] text-white font-mono text-center leading-tight drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">{label}</span>
  </div>
);

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  
  // Ref para capturar o score atual sem disparar re-renders no timer do jogo
  const scoreRef = useRef(0);

  const rankingRef = useRef<HTMLDivElement | null>(null);
  const memoRef = useRef<HTMLDivElement | null>(null);
  const extrasRef = useRef<HTMLDivElement | null>(null);

  const minhasFotos = ["sua-foto.JPG", "foto2.jpg", "foto3.jpg", "foto6.jpg", "foto4.jpg", "foto5.jpg", "foto7.jpg"];

  const scrollToWindow = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Atualiza o score e a referência simultaneamente
  const handleScore = useCallback(() => {
    setScore(prev => {
      const newScore = prev + 1;
      scoreRef.current = newScore;
      return newScore;
    });
  }, []);

  const handleGameEnd = useCallback(async () => {
    const finalScore = scoreRef.current;
    setGameActive(false);

    if (finalScore > 0) {
      const nomeUsuario = prompt("UAU! Que pontuação! Qual o seu nome?", "Riana") || "Anônimo";
      const { data: recorde } = await supabase.from('ranking').select('pontos').eq('nome', nomeUsuario).maybeSingle();
      
      if (!recorde || finalScore > recorde.pontos) {
        await supabase.from('ranking').upsert({ nome: nomeUsuario, pontos: finalScore }, { onConflict: 'nome' });
        alert(`🏆 NOVO RECORDE: ${finalScore} pontos!`);
      } else {
        alert(`Recorde de ${recorde.pontos} pontos mantido!`);
      }
      setScore(0);
      scoreRef.current = 0;
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#008080] select-none overflow-x-hidden relative flex flex-col font-sans">
      <header className="w-full bg-black/20 backdrop-blur-md border-b border-white/10 p-2 flex items-center justify-between z-[300] sticky top-0 shadow-lg">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-blue-600 p-1 border-retro-inset shadow-sm">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Dunder_Mifflin%2C_Inc.svg" className="w-8 invert" alt="Logo" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white text-[10px] font-bold uppercase tracking-widest leading-none">Workstation_v2.0</h1>
            <p className="text-blue-200 text-[9px] font-mono italic">Sessão: Riana Comanetti</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/80 text-[10px] font-mono mr-2">
          <span className="animate-pulse text-green-400">● ONLINE</span>
          <div className="bg-white/10 px-3 py-1 border border-white/20 rounded-full font-bold shadow-inner">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </header>

      <div className="absolute top-20 left-4 hidden lg:grid grid-cols-1 gap-8 z-0 opacity-80">
        <DesktopIcon label="Meu_PC" icon="💻" onClick={() => scrollToWindow(rankingRef)} />
        <DesktopIcon label="Fotos.zip" icon="🖼️" onClick={() => scrollToWindow(memoRef)} />
        <DesktopIcon label="Extras" icon="📂" onClick={() => scrollToWindow(extrasRef)} />
      </div>

      <main className="flex-1 flex flex-col items-center pt-6 pb-24 px-2 min-h-screen relative z-10">
        <HeartGame 
          isActive={gameActive} 
          onScore={handleScore} 
          onGameEnd={handleGameEnd} 
        />
        <Clippy />
        <LovePopups />

        {!isLogged ? (
          <div className="my-auto animate-reveal">
            <RetroWindow title="Acesso Restrito - Estação Riana">
              <div className="flex flex-col items-center gap-6 py-4 w-full text-center px-4">
                <div className="bg-black border-retro-inset p-4 w-full flex justify-center shadow-lg">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Dunder_Mifflin%2C_Inc.svg" className="w-40 invert" alt="Logo" />
                </div>
                <button onClick={() => setIsLogged(true)} className="bg-[#c0c0c0] border-retro px-12 py-3 font-bold active:border-retro-inset hover:bg-gray-100 transition-colors uppercase shadow-md text-xs">Acessar Sistema</button>
              </div>
            </RetroWindow>
          </div>
        ) : (
          <div className="w-full max-w-[1400px] mx-auto animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
              <div ref={rankingRef} className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1 scroll-mt-24">
                <RetroWindow title="Ranking_Estação.exe"><Leaderboard /></RetroWindow>
                <RetroWindow title="Music_Player.exe"><MusicPlayer /></RetroWindow>
              </div>
              <div ref={memoRef} className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2 scroll-mt-24">
                <RetroWindow title="Contador_De_Amor.exe"><RelationshipTimer /></RetroWindow>
                <RetroWindow title="memorando.txt">
                  <div className="flex flex-col gap-4">
                    <PhotoCarousel photos={minhasFotos} />
                    <div className="bg-[#ffffd1] border border-gray-400 p-4 text-[11px] font-mono shadow-inner leading-relaxed">
                      <p className="border-b border-gray-400 pb-2 mb-3 font-bold italic text-blue-800 uppercase tracking-widest">Memorando Interno</p>
                      <p>"Sabe, eu esperei muito tempo para encontrar alguém que fizesse eu me sentir como eu me sinto com você. Você é a minha Pam. Te amo."</p>
                    </div>
                  </div>
                </RetroWindow>
              </div>
              <div ref={extrasRef} className="lg:col-span-3 flex flex-col gap-6 order-3 scroll-mt-24">
                <RetroWindow title="The_Dundies.exe"><DundieGenerator /></RetroWindow>
                <RetroWindow title="Jim_Prank.exe"><JelloPrank /></RetroWindow>
                <RetroWindow title="Registro_Civil.exe"><WeddingDate /></RetroWindow>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-[#c0c0c0] border-t-2 border-white p-1 flex items-center justify-between z-[400] shadow-[0_-2px_5px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-1">
          <button onClick={() => { setScore(0); scoreRef.current = 0; setGameActive(!gameActive); }} className={`flex items-center gap-1 border-retro px-3 py-1 font-bold text-xs shadow-sm active:border-retro-inset ${gameActive ? 'bg-gray-400 border-retro-inset text-blue-900' : ''}`}>
            <span className="text-base">🪟</span> <span>Start</span>
          </button>
          <div className="hidden sm:flex border-l-2 border-gray-400 h-5 mx-2"></div>
          {isLogged && <div className="hidden sm:flex bg-gray-300 border-retro-inset px-4 py-1 text-[10px] font-bold italic shadow-inner">Love_System_v1.0</div>}
        </div>
        <div className="flex items-center gap-2 border-retro-inset bg-gray-300 px-3 py-1 shadow-inner">
          {gameActive && <span className="text-[10px] font-bold text-red-600 animate-pulse">❤️: {score}</span>}
          <div className="w-[1px] h-3 bg-gray-500 mx-1"></div>
          <div className="text-[10px] font-bold font-mono uppercase tracking-tighter">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </footer>
    </div>
  );
}