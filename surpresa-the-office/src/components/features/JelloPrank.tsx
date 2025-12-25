import { useState } from 'react';

export const JelloPrank = () => {
  const [clicks, setClicks] = useState(0);
  const [broken, setBroken] = useState(false);

  return (
    <div className="bg-white border-2 border-inset border-gray-400 p-4 text-center font-mono">
      {!broken ? (
        <>
          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Jim's Prank Storage</p>
          <div 
            onClick={() => setClicks(c => c + 1)}
            className={`cursor-pointer transition-transform ${clicks > 0 ? 'animate-ping' : ''}`}
          >
            <span className="text-6xl">🍮</span>
          </div>
          <p className="text-[9px] mt-2 text-gray-400">Clique na gelatina para quebrá-la ({5 - clicks})</p>
          {clicks >= 5 && setBroken(true)}
        </>
      ) : (
        <div className="animate-bounce">
          <span className="text-4xl">💍</span>
          <p className="text-xs font-bold text-blue-900 mt-2">VOCÊ ACHOU:<br/>UM VALE BEIJO INFINITO!</p>
        </div>
      )}
    </div>
  );
};