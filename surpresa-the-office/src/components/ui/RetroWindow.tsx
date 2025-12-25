import React from 'react';


export const RetroWindow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#c0c0c0] border-retro shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden mb-6">
    {/* Barra de título clássica */}
    <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center text-sm font-bold">
      <span className="truncate">{title}</span>
      <div className="flex gap-1">
        <div className="w-4 h-4 bg-[#c0c0c0] border-retro text-black text-[10px] flex items-center justify-center">_</div>
        <div className="w-4 h-4 bg-[#c0c0c0] border-retro text-black text-[10px] flex items-center justify-center font-bold italic">X</div>
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);