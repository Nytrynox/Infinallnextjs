import React from 'react';
import { 
  Key, 
  Smartphone, 
  Laptop, 
  LogOut, 
  AlertTriangle, 
  ArrowLeft,
  Shield,
  History,
  Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { motion } from 'motion/react';

interface SecurityViewProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function SecurityView({ onBack, theme = 'dark' }: SecurityViewProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full h-full font-sans flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-[#FAFAFA] text-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-4 text-center p-6">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-[#00C2FF]/10' : 'bg-[#00C2FF]/5'}`}>
             <div className="w-6 h-6 text-[#00C2FF]">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
             </div>
           </div>
           <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Security Settings</span>
        </div>
      </motion.div>
    </div>
  );
}
