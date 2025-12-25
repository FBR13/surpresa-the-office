import { useState } from 'react';

export const MusicPlayer = () => {
  const playlist = [
    { title: "Purple Rain - Duquesa Ft. Yunk Vino", id: "6MMqXx6KBTw" }, // A FAVORITA DELA!
    { title: "November Rain - Guns N' Roses", id: "8SbUC-UaAxE" },
    { title: "Traficante do Amor - Wanderley Andrade", id: "eef1qRVNQls" },
    { title: "KIA - Ebony", id: "OZphib375D0" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <div className="bg-[#c0c0c0] border-retro-inset p-2 font-mono shadow-inner">
      <div className="bg-black text-[#00ff00] p-2 text-[10px] mb-2 border-2 border-gray-600 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          A TOCAR: {playlist[currentTrack].title} • FAVORITA DA RIANA • 
        </div>
      </div>
      
      <div className="flex justify-center mb-3">
        <iframe 
          width="100%" 
          height="160" 
          src={`https://www.youtube.com/embed/${playlist[currentTrack].id}?autoplay=0&controls=1`}
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          className="border-2 border-gray-800"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => setCurrentTrack((prev) => (prev > 0 ? prev - 1 : playlist.length - 1))}
          className="bg-[#c0c0c0] border-retro text-[10px] font-bold py-1 active:border-retro-inset"
        >
          ANTERIOR
        </button>
        <button 
          onClick={() => setCurrentTrack((prev) => (prev < playlist.length - 1 ? prev + 1 : 0))}
          className="bg-[#c0c0c0] border-retro text-[10px] font-bold py-1 active:border-retro-inset"
        >
          PRÓXIMA
        </button>
      </div>
    </div>
  );
};