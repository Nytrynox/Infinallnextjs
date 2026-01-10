import React from 'react';
import { DashboardHero } from './DashboardHero';
import { NeuralGallery } from './NeuralGallery';
import { motion } from 'motion/react';

interface HomeViewProps {
  username: string;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
  onSend?: (prompt: string) => void;
}

export function HomeView({ username, theme = 'dark', setTheme, onSend }: HomeViewProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col min-h-full relative overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-[#FAFAFA]'}`}>
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Gradient Base */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#050505] via-[#08080A] to-[#050505]' : 'bg-gradient-to-b from-white via-gray-50 to-white'}`} />
        
        {/* Subtle Grid - Adjusted Opacity */}
        <div 
          className="absolute inset-0 bg-[size:60px_60px] opacity-20"
          style={{
            backgroundImage: isDark 
              ? 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)'
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#00C2FF] rounded-full blur-[180px] opacity-[0.03]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-full max-w-[1600px] mx-auto w-full px-6 py-10">
        {/* Content Grid Effect */}
        <div className={`absolute inset-0 -z-10 h-full w-full bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] ${
          isDark 
            ? 'bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'
        }`} />

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex-1 flex flex-col items-center justify-center min-h-[60vh]"
        >
           <DashboardHero username={username} theme={theme} setTheme={setTheme} onSend={onSend} />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4, duration: 1 }}
           className="w-full pb-20"
        >
          <div className="flex items-center gap-4 mb-8">
             <div className={`h-px flex-1 ${isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'}`} />
             <span className={`text-xs uppercase tracking-[0.2em] font-medium ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Recent Creations</span>
             <div className={`h-px flex-1 ${isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'}`} />
          </div>
          <NeuralGallery 
            theme={theme} 
            onProjectClick={(project) => onSend?.(`Opening ${project.title}`)} 
          />
        </motion.div>
      </div>
    </div>
  );
}
