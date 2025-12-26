import { useState } from 'react';
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

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);

  const minhasFotos = [
    "sua-foto.JPG", 
    "foto2.jpg", 
    "foto3.jpg",
    "foto6.jpg",
    "foto4.jpg",
    "foto5.jpg",
    "foto7.jpg",
  ];

  // FUNÇÃO AJUSTADA PARA EVITAR DUPLICATAS (UPSERT)
  const handleSaveScore = async () => {
    const finalScore = score;
    setGameActive(false);

    if (finalScore > 0) {
      const nomeUsuario = prompt("UAU! Que pontuação! Qual o seu nome para o Ranking?", "Riana") || "Anônimo";
      
      // 1. Verificar se esse nome já tem um recorde no banco
      const { data: recordeExistente } = await supabase
        .from('ranking')
        .select('pontos')
        .eq('nome', nomeUsuario)
        .single();

      // 2. Só atualiza se for a primeira vez do nome OU se a pontuação nova for maior
      if (!recordeExistente || finalScore > recordeExistente.pontos) {
        const { error } = await supabase
          .from('ranking')
          .upsert(
            { nome: nomeUsuario, pontos: finalScore }, 
            { onConflict: 'nome' } // Exige a constraint UNIQUE no banco
          );

        if (error) {
          console.error("Erro ao atualizar ranking:", error);
        }
      } else {
        alert(`${nomeUsuario}, você já tem um recorde melhor (${recordeExistente.pontos} pts)!`);
      }
      
      setScore(0); // Reseta o placar para a próxima rodada
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#008080] flex flex-col items-center pt-4 pb-24 overflow-y-auto px-2">
      {/* Elementos Globais */}
      <HeartGame 
        isActive={gameActive} 
        onScore={() => setScore(s => s + 1)} 
        onGameEnd={handleSaveScore} 
      />
      <Clippy />
      <LovePopups />

      {!isLogged ? (
        /* --- TELA DE LOGIN --- */
        <div className="my-auto">
          <RetroWindow title="Login - Estação Riana Comanetti ">
            <div className="flex flex-col items-center gap-6 py-4 w-full text-center">
              <div className="bg-black border-retro-inset p-4 w-full flex justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Dunder_Mifflin%2C_Inc.svg" 
                  className="w-40 invert" 
                  alt="Dunder Mifflin Logo" 
                />
              </div>
              <div className="font-bold text-[10px] uppercase tracking-tight">
                <p>Esta estação de trabalho pertence à:</p>
                <p className="text-blue-900 mt-1">FUTURA PSICOLOGA RIANA COMANETTI</p>
              </div>
              <button 
                onClick={() => setIsLogged(true)}
                className="bg-[#c0c0c0] border-retro px-10 py-3 font-bold text-sm active:border-retro-inset focus:outline-none uppercase"
              >
                Entrar
              </button>
            </div>
          </RetroWindow>
        </div>
      ) : (
        /* --- TELA PRINCIPAL --- */
        <div className="flex flex-col gap-6 w-full max-w-[95vw] animate-reveal">
          
          <RetroWindow title="Dunder_Mifflin_Player.exe">
            <MusicPlayer />
          </RetroWindow>

          <RetroWindow title="Contador_De_Amor.exe">
            <RelationshipTimer />
          </RetroWindow>

          {/* RANKING COM LÓGICA DE RECORDE */}
          <RetroWindow title="Ranking_Estação.exe">
            <Leaderboard />
          </RetroWindow>

          <RetroWindow title="memorando.txt">
            <div className="flex flex-col gap-4">
              <PhotoCarousel photos={minhasFotos} />
              <div className="bg-[#ffffd1] border border-gray-400 p-3 text-[10px] font-mono shadow-sm text-left leading-tight">
                <p className="border-b border-gray-400 pb-1 mb-2 font-bold italic">
                  DE: Felipe <br/>PARA: Riana
                </p>
                <p>"Sabe, eu esperei muito tempo para encontrar alguém que fizesse eu me sentir como eu me sinto com você. Você é a minha Pam. Te amo."</p>
              </div>
            </div>
          </RetroWindow>

          <div className="flex flex-col gap-6">
            <RetroWindow title="The_Dundies.exe">
              <DundieGenerator />
            </RetroWindow>

            <RetroWindow title="Jim_Prank.exe">
              <JelloPrank />
            </RetroWindow>
          </div>
          
          <RetroWindow title="Data do Nosso Casamento.exe">
            <WeddingDate />
          </RetroWindow>
        </div>
      )}

      {/* BARRA DE TAREFAS FIXA */}
      <footer className="fixed bottom-0 left-0 w-full bg-[#c0c0c0] border-t-2 border-white p-1 flex items-center justify-between z-[200]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setScore(0);
              setGameActive(!gameActive);
            }} 
            className={`border-retro px-4 py-1 font-bold text-xs flex items-center gap-1 active:border-retro-inset ${gameActive ? 'bg-gray-400 border-retro-inset text-blue-800' : 'text-blue-900'}`}
          >
            Start
          </button>
          {isLogged && <div className="hidden sm:flex border-retro-inset bg-gray-300 px-2 py-0.5 text-[10px] font-bold italic">Love_System_v1.0</div>}
        </div>

        <div className="flex items-center gap-3">
          {gameActive && <span className="text-[10px] font-bold text-red-600 animate-pulse">❤️: {score}</span>}
          <div className="text-[10px] font-bold border-retro-inset px-3 py-1 bg-[#c0c0c0] shadow-inner">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </footer>
    </main>
  );
}