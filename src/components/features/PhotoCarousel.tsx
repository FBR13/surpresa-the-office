import { useState } from 'react';

interface PhotoCarouselProps {
  photos: string[];
}

export const PhotoCarousel = ({ photos }: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Moldura da Foto */}
      <div className="border-retro-inset p-1 bg-white relative group">
        <img 
          src={photos[currentIndex]} 
          alt={`Foto ${currentIndex + 1}`} 
          className="w-full aspect-[4/3] object-cover grayscale-[0.1]" 
        />
        
        {/* Contador de fotos estilo sistema */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] px-1 font-mono">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Controles da Roleta */}
      <div className="flex justify-between items-center bg-[#c0c0c0] p-1 border-retro">
        <button 
          onClick={prevPhoto}
          className="border-retro px-3 py-1 text-xs font-bold active:border-retro-inset"
        >
          &lt; ANTERIOR
        </button>
        
        <span className="text-[10px] font-bold uppercase text-gray-600">Galeria_Recuerdos</span>
        
        <button 
          onClick={nextPhoto}
          className="border-retro px-3 py-1 text-xs font-bold active:border-retro-inset"
        >
          PRÓXIMA &gt;
        </button>
      </div>
    </div>
  );
};