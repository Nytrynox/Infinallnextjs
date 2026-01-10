import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  CreditCard, 
  ShieldCheck, 
  Bell,
  HelpCircle, 
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { ProfileView } from './ProfileView';
import { BillingView } from './BillingView';
import { NotificationsView } from './NotificationsView';
import { SecurityView } from './SecurityView';
import { SupportView } from './SupportView';

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: string;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
  onLogout?: () => void;
}

export function SettingsOverlay({ 
  isOpen, 
  onClose, 
  initialSection = 'profile', 
  theme = 'dark',
  setTheme,
  onLogout
}: SettingsOverlayProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      setActiveSection(initialSection);
    }
  }, [isOpen, initialSection]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage your account info' },
    { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Payments & invoices' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts & emails' },
    { id: 'security', label: 'Security', icon: ShieldCheck, description: 'Password & auth' },
    { id: 'support', label: 'Support', icon: HelpCircle, description: 'Get help & docs' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`fixed inset-4 md:inset-10 lg:inset-20 z-[101] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row ${
              isDark ? 'bg-black' : 'bg-white'
            }`}
          >
            {/* Sidebar Navigation */}
            <div className={`w-full md:w-[280px] flex flex-col shrink-0 ${
              isDark ? 'bg-[#121214]' : 'bg-gray-50 border-r border-gray-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                   <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Settings</h2>
                   <button 
                    onClick={onClose}
                    className={`md:hidden p-2 rounded-lg ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className={`h-px w-full border-b border-dashed ${isDark ? 'border-white/20' : 'border-black/10'}`} />
              </div>

              <div className="flex-1 overflow-y-auto px-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left group relative overflow-hidden ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-[#00C2FF]/10 to-[#00C2FF]/5 border border-[#00C2FF]/20'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                         activeSection === item.id
                           ? 'bg-[#00C2FF] text-black'
                           : (isDark ? 'bg-[#27272A] text-[#8B949E]' : 'bg-gray-200 text-gray-500')
                       }`}>
                          <item.icon size={16} />
                       </div>
                       <div>
                          <div className={`text-sm font-medium ${
                             activeSection === item.id 
                               ? (isDark ? 'text-white' : 'text-black')
                               : (isDark ? 'text-[#8B949E]' : 'text-gray-500')
                          }`}>
                             {item.label}
                          </div>
                          <div className={`text-[10px] ${
                             activeSection === item.id 
                               ? (isDark ? 'text-[#00C2FF]' : 'text-blue-600')
                               : (isDark ? 'text-[#52525B]' : 'text-gray-400')
                          }`}>
                             {item.description}
                          </div>
                       </div>
                    </div>
                    {activeSection === item.id && (
                       <ChevronRight size={14} className="text-[#00C2FF]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 mt-auto">
                <div className={`h-px w-full border-b border-dashed mb-4 ${isDark ? 'border-white/20' : 'border-black/10'}`} />
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-medium text-red-400 group"
                >
                  <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Sign out
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 relative overflow-hidden flex flex-col ${isDark ? 'bg-black' : 'bg-white'}`}>
              <div className="absolute top-6 right-6 z-20 hidden md:block">
                <button 
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'bg-[#18181B] text-[#8B949E] hover:text-white hover:bg-[#27272A]' : 'bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
                 <div className="w-full mx-auto pb-20">
                    <div className={`${isDark ? 'text-white' : 'text-black'}`}>
                      {activeSection === 'profile' && (
                        <ProfileView theme={theme} setTheme={setTheme} onClose={undefined} />
                      )}
                      {activeSection === 'billing' && (
                        <BillingView theme={theme} onBack={undefined} />
                      )}
                      {activeSection === 'notifications' && (
                        <NotificationsView theme={theme} onBack={undefined} />
                      )}
                      {activeSection === 'security' && (
                        <SecurityView theme={theme} onBack={undefined} />
                      )}
                      {activeSection === 'support' && (
                        <SupportView theme={theme} onBack={undefined} />
                      )}
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
