import React from 'react';
import { Plus } from 'lucide-react';

export function CreditSection({ credits = 1000, theme = 'dark', onUpgrade }: { credits?: number, theme?: 'dark' | 'light', onUpgrade?: () => void }) {
  const isDark = theme === 'dark';
  
  return (
    <button 
      onClick={onUpgrade}
      className={`flex items-center gap-1.5 px-2 py-1 backdrop-blur-md border rounded-full transition-all active:scale-95 group ${
      isDark 
        ? 'bg-white/5 border-white/10 hover:bg-white/10' 
        : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-[#00C2FF]/30 shadow-sm'
    }`}>
      <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_6px_rgba(0,194,255,0.8)]" />
      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{credits}</span>
      <Plus size={10} className={`${isDark ? 'text-white/40 group-hover:text-white' : 'text-gray-400 group-hover:text-[#00C2FF]'}`} />
    </button>
  );
}
