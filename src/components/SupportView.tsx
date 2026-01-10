import React from 'react';
import { 
  Search, 
  MessageSquare, 
  Book, 
  ChevronRight, 
  ArrowUpRight, 
  LifeBuoy, 
  Zap, 
  CheckCircle2, 
  Mail, 
  MessageCircle,
  ArrowLeft,
  HeadphonesIcon,
  Twitter,
  Github
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { motion } from 'motion/react';

interface SupportViewProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function SupportView({ onBack, theme = 'dark' }: SupportViewProps) {
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
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
             </div>
           </div>
           <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Support Center</span>
        </div>
      </motion.div>
    </div>
  );
}
