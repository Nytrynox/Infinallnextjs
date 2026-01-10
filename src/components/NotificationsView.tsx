import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Clock, Calendar, Check, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { motion } from 'motion/react';

interface NotificationsViewProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function NotificationsView({ onBack, theme = 'dark' }: NotificationsViewProps) {
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
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
             </div>
           </div>
           <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Notification Settings</span>
        </div>
      </motion.div>
    </div>
  );
}
