import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/0cf03cb69b044a951dbc8b85fd075efe3787b517.png';

interface NavigationProps {
  onNavigateToPricing?: () => void;
  onNavigateToAIAgents?: () => void;
  onNavigateToEnterprise?: () => void;
  onNavigateToCommunity?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToSignup?: () => void;
  onLogoClick?: () => void;
  onNavigateToHome?: () => void;
}

export function Navigation({ 
  onNavigateToPricing, 
  onNavigateToAIAgents, 
  onNavigateToEnterprise, 
  onNavigateToCommunity, 
  onNavigateToLogin, 
  onNavigateToSignup, 
  onLogoClick, 
  onNavigateToHome 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="relative flex items-center justify-between w-full">
            {/* Left - Logo */}
            <div className="flex-shrink-0 z-50">
              <button 
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center"
                aria-label="Go to home page"
              >
                <img src={logoImage} alt="Infinall" className="h-[220px] w-auto object-contain self-start -mt-[75px]" />
              </button>
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#0D0D0F]/90 border border-white/10 rounded-full p-2 absolute left-1/2 -translate-x-1/2 top-0">
              <button 
                onClick={onNavigateToAIAgents}
                className="text-base font-semibold text-[#C5D0DA] hover:text-white hover:bg-white/5 transition-all px-8 py-3 rounded-full"
              >
                AI Agents
              </button>
              <button 
                onClick={onNavigateToPricing}
                className="text-base font-semibold text-[#C5D0DA] hover:text-white hover:bg-white/5 transition-all px-8 py-3 rounded-full"
              >
                Pricing
              </button>
              <button 
                onClick={onNavigateToCommunity}
                className="text-base font-semibold text-[#C5D0DA] hover:text-white hover:bg-white/5 transition-all px-8 py-3 rounded-full"
              >
                Community
              </button>
              <button 
                onClick={onNavigateToEnterprise}
                className="text-base font-semibold text-[#C5D0DA] hover:text-white hover:bg-white/5 transition-all px-8 py-3 rounded-full"
              >
                Enterprise
              </button>
            </div>

            {/* Right - Login/Signup (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 bg-[#0D0D0F]/90 border border-white/10 rounded-full p-1.5 transition-all hover:border-[#00C2FF]/30 self-start">
              <button 
                onClick={onNavigateToLogin}
                className="text-sm font-semibold text-[#C5D0DA] hover:text-white hover:bg-white/5 transition-all px-6 py-2 rounded-full"
              >
                Login
              </button>
              <button 
                onClick={onNavigateToSignup}
                className="text-sm font-bold bg-[#00C2FF] text-black px-6 py-2 rounded-full transition-all hover:bg-[#72D4FF] shadow-[0_0_20px_rgba(0,194,255,0.2)] hover:shadow-[0_0_30px_rgba(0,194,255,0.4)]"
              >
                Signup
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden z-50 self-start mt-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-[#00C2FF] transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 bg-black border-b border-white/10 p-6 pt-32 lg:hidden min-h-screen z-40"
            >
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => {
                    onNavigateToAIAgents?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-semibold text-[#C5D0DA] hover:text-white text-left py-2 border-b border-white/5"
                >
                  AI Agents
                </button>
                <button 
                  onClick={() => {
                    onNavigateToPricing?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-semibold text-[#C5D0DA] hover:text-white text-left py-2 border-b border-white/5"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => {
                    onNavigateToCommunity?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-semibold text-[#C5D0DA] hover:text-white text-left py-2 border-b border-white/5"
                >
                  Community
                </button>
                <button 
                  onClick={() => {
                    onNavigateToEnterprise?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-semibold text-[#C5D0DA] hover:text-white text-left py-2 border-b border-white/5"
                >
                  Enterprise
                </button>
                
                <div className="flex flex-col gap-4 mt-8">
                  <button 
                    onClick={() => {
                      onNavigateToLogin?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      onNavigateToSignup?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-3 rounded-xl bg-[#00C2FF] text-black font-bold shadow-[0_0_20px_rgba(0,194,255,0.2)]"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}