import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Score {
  nome: string;
  pontos: number;
}

export const Leaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);

  const fetchScores = async () => {
    const { data } = await supabase
      .from('ranking')
      .select('nome, pontos')
      .order('pontos', { ascending: false })
      .limit(5);
    if (data) setScores(data);
  };

  useEffect(() => {
    fetchScores();

    // O "pulo do gato": Atualiza em tempo real sem refresh
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ranking' }, () => {
        fetchScores();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="bg-[#c0c0c0] border-retro-inset p-2 font-mono mt-4">
      <div className="bg-blue-900 text-white text-[10px] px-2 py-1 mb-2 font-bold uppercase">
        Top 5 - Hall da Fama
      </div>
      <div className="flex flex-col gap-1">
        {scores.map((s, i) => (
          <div key={i} className="flex justify-between text-[10px] border-b border-gray-400 pb-1">
            <span>{i + 1}. {s.nome}</span>
            <span className="font-bold">{s.pontos} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};