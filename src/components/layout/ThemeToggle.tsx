import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-[68px] h-8 rounded-full transition-all duration-700 flex items-center p-1
        ${isDark ? 'bg-[#0f172a] border border-[#1e293b]' : 'bg-[#38bdf8] border border-[#7dd3fc]'}
        shadow-inner overflow-hidden cursor-pointer
      `}
      aria-label="Toggle theme"
    >
      {/* Night Sky Elements */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isDark ? 'opacity-100 translateY(0)' : 'opacity-0 translate-y-2'}`}>
        <div className="absolute top-1.5 left-2.5 w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-4 left-6 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
        <div className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full opacity-40 shadow-[0_0_2px_#fff]" />
        <div className="absolute top-5 left-[34px] w-[1px] h-[1px] bg-white rounded-full opacity-80" />
      </div>
      
      {/* Day Sky Elements (Clouds) */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isDark ? 'opacity-0 translate-y-2' : 'opacity-100 translateY(0)'}`}>
        <div className="absolute top-1 left-7 w-4 h-1.5 bg-white/70 rounded-full blur-[0.5px]" />
        <div className="absolute top-4 left-4 w-6 h-2 bg-white/80 rounded-full blur-[0.5px]" />
        <div className="absolute top-2 left-10 w-3 h-1.5 bg-white/60 rounded-full blur-[0.5px]" />
      </div>

      {/* Toggle Orb */}
      <div
        className={`
          relative w-6 h-6 rounded-full flex items-center justify-center transform transition-all duration-700 z-10 shadow-md
          ${isDark ? 'translate-x-9 bg-zinc-800 text-sky-100 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'translate-x-0 bg-[#fbbf24] text-yellow-700 shadow-[0_0_10px_rgba(251,191,36,0.6)]'}
        `}
      >
        {isDark ? (
          <Moon size={14} className="fill-transparent stroke-current absolute transition-opacity duration-300 opacity-100" />
        ) : (
          <Sun size={15} className="fill-current stroke-current absolute transition-opacity duration-300 opacity-100" />
        )}
      </div>
    </button>
  );
}
