import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Layers, 
  Bookmark, 
  Users, 
  Layout, 
  User,
  ChevronDown,
  Zap,
  Settings, 
  LogOut,
  Clock,
  CreditCard,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import infinallLogo from 'figma:asset/4fc33435e781483b806c5f2349023d0fed528c67.png';

interface SidebarProps {
  username: string;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  theme?: 'dark' | 'light';
  onShowPricing: () => void;
}

export function Sidebar({ username, onLogout, activeTab, setActiveTab, isCollapsed, onToggleCollapse, theme = 'dark', onShowPricing }: SidebarProps) {
  // State to track collapsed sections.
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  
  // Removed local popover state as we now use the global SettingsOverlay
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isDark = theme === 'dark';

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', section: 'Main' },
    { id: 'search', icon: Search, label: 'Search', section: 'Main' },
    { id: 'projects', icon: Layers, label: 'All projects', section: 'Projects' },
    { id: 'starred', icon: Bookmark, label: 'Starred', section: 'Projects' },
    { id: 'h1', icon: Clock, label: 'Q1 Strategy Review', section: 'History' },
    { id: 'h2', icon: Clock, label: 'API Integration v2', section: 'History' },
    { id: 'h3', icon: Clock, label: 'Design System Update', section: 'History' },
  ];

  const sections = ['Projects', 'History'];

  return (
    <div className={`h-full border-r flex flex-col py-4 px-3 shrink-0 transition-[width] duration-300 ${isCollapsed ? 'w-20 items-center' : 'w-64'} ${isDark ? 'bg-[#0D0D0F] border-[#1F1F23]' : 'bg-gray-50 border-gray-200'}`}>
      {/* Top Header */}
      <div className={`flex items-center justify-between mb-6 px-2 w-full ${isCollapsed ? 'flex-col gap-4' : ''}`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex items-center gap-3">
            {!isCollapsed && (
              <>
                <div className="w-8 h-8 flex items-center justify-center group cursor-pointer transition-all duration-300">
                  <img 
                    src={infinallLogo} 
                    alt="Infinall Logo" 
                    className="w-[50px] h-[50px] object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className={`text-base font-bold leading-none tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Infinall</span>
                </div>
              </>
            )}
          </div>
        </div>
        <button 
          onClick={onToggleCollapse}
          className={`transition-colors p-1 relative group/collapse ${isDark ? 'text-[#8B949E] hover:text-[#00C2FF]' : 'text-gray-400 hover:text-[#00C2FF]'}`}
        >
          {isCollapsed ? (
            <div className="w-[30px] h-[30px] relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-100 group-hover/collapse:opacity-0">
                 <div 
                   className="w-[30px] h-[30px] bg-[#00C2FF]"
                   style={{
                     maskImage: `url(${infinallLogo})`,
                     maskSize: 'contain',
                     maskRepeat: 'no-repeat',
                     maskPosition: 'center',
                     WebkitMaskImage: `url(${infinallLogo})`,
                     WebkitMaskSize: 'contain',
                     WebkitMaskRepeat: 'no-repeat',
                     WebkitMaskPosition: 'center'
                   }}
                 />
              </div>
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover/collapse:opacity-100">
                 <Layout size={20} />
              </div>
            </div>
          ) : (
            <Layout size={18} />
          )}
        </button>
      </div>

      {/* Main Nav */}
      <div className="space-y-1 mb-6 w-full">
        {menuItems.filter(i => i.section === 'Main').map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              activeTab === item.id 
                ? (isDark ? 'bg-[#1C1C1F] text-[#00C2FF] border border-[#00C2FF]/20' : 'bg-white text-[#00C2FF] border border-[#00C2FF]/20 shadow-sm')
                : (isDark ? 'text-[#8B949E] hover:text-[#00C2FF] hover:bg-[#161618]' : 'text-gray-500 hover:text-[#00C2FF] hover:bg-white/50')
            } ${isCollapsed ? 'justify-center px-0' : ''}`}
          >
            <item.icon size={18} />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar w-full">
        {sections
          .filter((s) => !isCollapsed || s !== 'History')
          .map((section) => (
            <div key={section} className="space-y-1">
              {!isCollapsed ? (
                <button 
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center justify-between px-3 mb-2 group cursor-pointer"
                >
                  <h3 className={`text-[11px] font-semibold uppercase tracking-widest opacity-50 transition-all ${isDark ? 'text-[#48484E] group-hover:text-white group-hover:opacity-100' : 'text-gray-400 group-hover:text-gray-900 group-hover:opacity-100'}`}>
                    {section}
                  </h3>
                  <ChevronDown 
                    size={12} 
                    className={`transition-transform duration-300 ${isDark ? 'text-[#48484E] group-hover:text-white' : 'text-gray-400 group-hover:text-gray-900'} ${collapsedSections.includes(section) ? '-rotate-90' : ''}`}
                  />
                </button>
              ) : (
                <div className={`h-px mx-4 mb-2 opacity-50 ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-300'}`} />
              )}
              
              <AnimatePresence>
                {!collapsedSections.includes(section) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden space-y-1"
                  >
                    {menuItems
                      .filter((item) => item.section === section)
                      .map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          title={isCollapsed ? item.label : undefined}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                            activeTab === item.id 
                              ? (isDark ? 'bg-[#1C1C1F] text-[#00C2FF] border border-[#00C2FF]/20' : 'bg-white text-[#00C2FF] border border-[#00C2FF]/20 shadow-sm')
                              : (isDark ? 'text-[#8B949E] hover:text-[#00C2FF] hover:bg-[#161618]' : 'text-gray-500 hover:text-[#00C2FF] hover:bg-white/50')
                          } ${isCollapsed ? 'justify-center px-0' : ''}`}
                        >
                          <item.icon size={18} />
                          {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>

      {/* Bottom Cards */}
      <div className="mt-auto space-y-2 pt-4 w-full">
        <div 
          onClick={onShowPricing}
          className={`
          relative group cursor-pointer transition-all duration-300
          ${isCollapsed ? 'mx-auto w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#00C2FF]/10' : 'p-3.5 rounded-xl border'}
          ${isDark 
            ? 'bg-[#1C1C1F] border-[#30363D] hover:border-[#00C2FF]/50' 
            : 'bg-white border-gray-200 hover:border-[#00C2FF]/50 shadow-sm'}
        `}>
           {isCollapsed ? (
             <Zap size={20} className="text-[#00C2FF] transition-transform group-hover:scale-110" />
           ) : (
             <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-lg bg-[#00C2FF] flex items-center justify-center shrink-0">
                 <Zap size={16} className="text-white" fill="currentColor" />
               </div>
               <div className="flex flex-col min-w-0">
                 <span className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                   Upgrade to Pro
                 </span>
                 <p className={`text-[11px] leading-snug mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                   Unlock unlimited AI power & features
                 </p>
               </div>
             </div>
           )}
        </div>

        {/* Pricing Overlay - Now handled in Dashboard */}
        
        {/* User Profile */}
        <div className="mt-auto pt-6 px-2 w-full">
          <div className={`
            relative flex items-center gap-3 p-2.5 rounded-xl
            transition-all duration-300 cursor-pointer group
            ${isDark 
              ? 'bg-[#1C1C1F] hover:bg-[#252529] border border-[#30363D]' 
              : 'bg-white hover:bg-white border border-gray-200 shadow-sm'}
            ${isCollapsed ? 'justify-center p-2 bg-transparent border-transparent hover:bg-transparent shadow-none' : 'shadow-lg shadow-black/5'}
          `}>
            
            {/* Avatar */}
            <div className="relative shrink-0">
               <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${isDark ? 'border-[#30363D] group-hover:border-[#00C2FF]' : 'border-gray-100 group-hover:border-[#00C2FF]'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1628070435838-19eb835ad70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRhcmslMjB0aGVtZSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY3ODUzMjA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Ganesh" 
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setActiveTab('profile')}
                  />
               </div>
               {/* Active Indicator */}
               <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full flex items-center justify-center z-10 border-2 ${isDark ? 'border-[#1C1C1F] bg-[#10B981]' : 'border-white bg-[#10B981]'}`}>
               </div>
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                   <div className="flex items-center gap-2">
                     <span className={`text-[13px] font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Ganesh
                     </span>
                     <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#00C2FF] text-white">
                       PRO
                     </span>
                   </div>
                   <span className={`text-[11px] truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                     ganesh@infinall.com
                   </span>
                </div>

                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('profile');
                    }}
                    className={`p-1.5 rounded-md transition-all ${
                       isDark 
                        ? 'text-gray-400 hover:text-[#00C2FF] hover:bg-[#00C2FF]/10' 
                        : 'text-gray-400 hover:text-[#00C2FF] hover:bg-[#00C2FF]/10'
                    }`}
                    title="Settings"
                  >
                     <Settings size={16} strokeWidth={2} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
