export const DesktopIcon = ({ label, icon, onClick }: { label: string, icon: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1 w-16 p-1 hover:bg-white/10 rounded cursor-pointer group active:bg-blue-900/30"
  >
    <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[9px] text-white font-mono text-center leading-tight drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
      {label}
    </span>
  </button>
);