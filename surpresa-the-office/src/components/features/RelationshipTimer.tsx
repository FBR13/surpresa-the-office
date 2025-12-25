import { useState, useEffect } from 'react';

export const RelationshipTimer = () => {
  const [elapsed, setElapsed] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2025-08-15T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      let diff = now.getTime() - startDate.getTime();

      // Cálculos de tempo real
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      // Lógica de calendário para Meses e Dias
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months -= 1;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setElapsed({ years, months, days, hours, minutes, seconds });
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-retro-inset p-3 w-full shadow-inner font-mono text-center">
      <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Tempo desde o "Sim" oficial:</p>
      <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 border border-gray-300">
        <div className="flex flex-col"><span className="text-lg font-bold text-blue-900">{elapsed.years}</span><span className="text-[8px]">Anos</span></div>
        <div className="flex flex-col"><span className="text-lg font-bold text-blue-900">{elapsed.months}</span><span className="text-[8px]">Meses</span></div>
        <div className="flex flex-col"><span className="text-lg font-bold text-blue-900">{elapsed.days}</span><span className="text-[8px]">Dias</span></div>
        <div className="flex flex-col border-t border-gray-300 pt-1"><span className="text-sm font-bold">{elapsed.hours}h</span></div>
        <div className="flex flex-col border-t border-gray-300 pt-1"><span className="text-sm font-bold">{elapsed.minutes}m</span></div>
        <div className="flex flex-col border-t border-gray-300 pt-1"><span className="text-sm font-bold animate-pulse text-red-600">{elapsed.seconds}s</span></div>
      </div>
    </div>
  );
};