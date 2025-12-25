import { useState } from 'react';

export const DundieGenerator = () => {
  const prizes = [
    "Psicóloga mais gata da Dunder Mifflin",
    "Melhor beijo do setor de vendas",
    "Prêmio 'Minha Pam' de 2025",
    "Funcionária do mês no meu coração",
    "Prêmio Dwight de Lealdade ao nosso amor",
    "Vencedora da Maratona de Fofura"
  ];

  const [prize, setPrize] = useState("");

  return (
    <div className="bg-white border-2 border-inset border-gray-400 p-4 shadow-inner text-center font-mono">
      <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">The Dundies - 2025 Edition</p>
      
      {prize ? (
        <div className="animate-bounce">
          <p className="text-sm font-black text-blue-900 leading-tight">VENCEDORA:</p>
          <p className="text-xs bg-yellow-100 p-1 border border-yellow-400 mt-1">{prize}</p>
        </div>
      ) : (
        <p className="text-[11px] italic mb-2 text-gray-400">Clique para gerar o seu prêmio...</p>
      )}

      <button 
        onClick={() => setPrize(prizes[Math.floor(Math.random() * prizes.length)])}
        className="mt-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 px-4 py-1 text-[10px] font-bold active:border-inset"
      >
        GERAR DUNDIE
      </button>
    </div>
  );
};