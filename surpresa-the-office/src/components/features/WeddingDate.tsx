import { useState, useEffect } from 'react';
import { weddingService } from '../../services/weddingService';

export const WeddingDate = () => {
  const [date, setDate] = useState('Carregando...');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    weddingService.getDate()
      .then(res => setDate(res.wedding_date))
      .catch(() => setDate('Definir'));
  }, []);

  const save = async () => {
    await weddingService.updateDate(date);
    setIsEditing(false);
  };

  // Classe CSS para o botão estilo Windows 98
  const retroButtonStyle = `
    bg-[#c0c0c0] 
    border-t-2 border-l-2 border-white 
    border-r-2 border-b-2 border-[#808080] 
    shadow-[1px_1px_0px_black]
    px-4 py-1 
    text-xs font-bold text-black uppercase
    active:border-t-2 active:border-l-2 active:border-[#808080] 
    active:border-r-2 active:border-b-2 active:border-white 
    active:shadow-none 
    active:translate-x-[1px] active:translate-y-[1px]
    outline-none focus:outline-dotted focus:outline-1 focus:outline-offset-[-4px]
    mt-2
  `;

  return (
    <div className="bg-white border-2 border-inset border-gray-400 p-6 shadow-inner text-center font-mono">
      <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">
        Agendamento Dunder Mifflin
      </p>
      
      {isEditing ? (
        <div className="flex flex-col items-center gap-2">
          <input 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            className="border-2 border-gray-600 p-1 text-center text-sm outline-none bg-blue-50 text-blue-900 font-bold" 
          />
          <button onClick={save} className={retroButtonStyle}>
            Salvar Registro
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-black text-blue-900 tracking-tighter italic mb-2">
            {date}
          </h2>
          <button 
            onClick={() => setIsEditing(true)} 
            className={retroButtonStyle}
          >
            Modificar registro
          </button>
        </div>
      )}
    </div>
  );
};