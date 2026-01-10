import React from 'react';
import { Check, Zap, Users, Shield, Box, CreditCard, ChevronDown, IndianRupee, ArrowLeft, Sparkles, Building } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { motion } from 'motion/react';

interface BillingViewProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function BillingView({ onBack, theme = 'dark' }: BillingViewProps) {
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
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
             </div>
           </div>
           <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Billing & Plans</span>
        </div>
      </motion.div>
    </div>
  );
}
