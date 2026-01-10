import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Zap, Crown, Rocket, ArrowLeft, ChevronDown } from 'lucide-react';

interface PricingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CREDIT_TIERS = [
  { credits: 1000, price: 29 },
  { credits: 2500, price: 59 },
  { credits: 5000, price: 99 },
  { credits: 10000, price: 179 },
];

export function PricingOverlay({ isOpen, onClose }: PricingOverlayProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedTier = CREDIT_TIERS[selectedTierIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[#0D0D0F] flex flex-col overflow-y-auto"
        >
          {/* Header / Nav */}
          <div className="flex items-center justify-between px-6 py-6 md:px-12 border-b border-[#1F1F23]">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Studio</span>
            </button>
            <div className="text-sm text-gray-500 font-[Poppins]">PLAN SELECTION</div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Side: Header & Free Plan */}
              <div className="flex flex-col justify-center space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Upgrade your <br />
                    <span className="text-[#00C2FF]">workflow.</span>
                  </h1>
                  <p className="text-lg text-gray-400 max-w-md">
                    Unlock the full potential of Infinall AI with advanced models, private mode, and priority support.
                  </p>
                </div>

                {/* Free Plan Card */}
                <div className="p-8 rounded-2xl border border-[#1F1F23] bg-[#161618]/50 hover:border-[#30363D] transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Starter</h3>
                    <span className="px-3 py-1 rounded-full bg-[#1F1F23] text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Current
                    </span>
                  </div>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-gray-500 text-lg">/month</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      '5 Projects limit',
                      'Standard generation speed',
                      'Basic AI models',
                      'Community support',
                      'Public projects only'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <Check size={18} className="text-gray-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: Pro Plan */}
              <div className="relative p-8 rounded-2xl border border-[#00C2FF]/30 bg-[#0D0D0F] flex flex-col justify-center">
                {/* Highlight Effect */}
                <div className="absolute inset-0 bg-[#00C2FF]/5 rounded-2xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#00C2FF] text-white">
                        <Crown size={24} fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Pro</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00C2FF] text-white text-xs font-bold uppercase tracking-wider">
                      Recommended
                    </span>
                  </div>

                  {/* Credit Selection Dropdown */}
                  <div className="relative mb-6">
                     <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 block">
                       Select Credits
                     </label>
                     <div 
                       onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                       className="w-full p-4 rounded-xl bg-[#161618] border border-[#30363D] flex items-center justify-between cursor-pointer hover:border-[#00C2FF]/50 transition-colors"
                     >
                       <span className="text-white font-medium">
                         {selectedTier.credits.toLocaleString()} Credits
                       </span>
                       <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                     </div>

                     <AnimatePresence>
                       {isDropdownOpen && (
                         <motion.div
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="absolute top-full left-0 right-0 mt-2 bg-[#161618] border border-[#30363D] rounded-xl overflow-hidden z-20 shadow-xl"
                         >
                           {CREDIT_TIERS.map((tier, index) => (
                             <div
                               key={index}
                               onClick={() => {
                                 setSelectedTierIndex(index);
                                 setIsDropdownOpen(false);
                               }}
                               className={`p-3 px-4 flex items-center justify-between cursor-pointer hover:bg-[#1F1F23] transition-colors ${selectedTierIndex === index ? 'bg-[#00C2FF]/10 text-[#00C2FF]' : 'text-gray-300'}`}
                             >
                               <span>{tier.credits.toLocaleString()} Credits</span>
                               {selectedTierIndex === index && <Check size={16} />}
                             </div>
                           ))}
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">${selectedTier.price}</span>
                      <span className="text-gray-400 text-lg">/month</span>
                    </div>
                    <p className="text-[#00C2FF] mt-2 font-medium">Save 20% with yearly billing</p>
                  </div>

                  <div className="space-y-5 mb-10">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Everything in Starter, plus:</p>
                    <ul className="space-y-4">
                      {[
                        'Unlimited Projects',
                        'Fastest generation speed (2x)',
                        'Access to GPT-4 & Claude 3 Opus',
                        'Private Mode (Keep code hidden)',
                        'Priority 24/7 Support',
                        'API Access'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                          <div className="w-5 h-5 rounded-full bg-[#00C2FF] flex items-center justify-center shrink-0">
                            <Check size={12} className="text-white" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full py-4 px-6 rounded-xl bg-[#00C2FF] hover:bg-[#00A8E0] text-white font-bold text-lg transition-all flex items-center justify-center gap-3 group">
                    <Zap size={20} fill="currentColor" />
                    Upgrade Now
                    <Rocket size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    7-day money-back guarantee
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
