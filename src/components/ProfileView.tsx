import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { motion } from 'motion/react';

interface ProfileViewProps {
  onClose?: () => void;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
}

export function ProfileView({ onClose, theme = 'dark', setTheme }: ProfileViewProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full h-full font-sans flex items-center justify-center ${isDark ? 'text-white' : 'text-black'}`}>
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center gap-4 text-center p-6">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-[#00C2FF]/10' : 'bg-[#00C2FF]/5'}`}>
             <div className="w-6 h-6 text-[#00C2FF]">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             </div>
           </div>
           <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Profile Settings</span>
        </div>
      </motion.div>
    </div>
  );
}
