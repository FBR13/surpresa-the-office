import { useState, useEffect } from 'react';
import { weddingService } from '../../services/weddingService';

export const WeddingManager = () => {
  const [date, setDate] = useState('Carregando...');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    weddingService.getDate().then(res => setDate(res.wedding_date)).catch(() => setDate('Clique para definir'));
  }, []);

  const handleSave = async () => {
    await weddingService.updateDate(date);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border-retro-inset p-3 shadow-inner font-mono mt-4">
      <p className="text-[10px] font-bold mb-2 uppercase text-gray-500">Dunder Mifflin Wedding Registry</p>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input type="text" value={date} onChange={e => setDate(e.target.value)} className="border-2 border-gray-500 p-1 text-sm outline-none bg-blue-50" />
          <button onClick={handleSave} className="bg-[#c0c0c0] border-retro text-xs font-bold px-2 py-1">SALVAR</button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-blue-900 tracking-tighter">{date}</span>
          <button onClick={() => setIsEditing(true)} className="text-[9px] underline mt-2 text-gray-500 hover:text-black">[ Editar Registro ]</button>
        </div>
      )}
    </div>
  );
};