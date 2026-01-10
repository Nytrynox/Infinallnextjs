import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { HomeView } from './HomeView';
import { SearchView } from './SearchView';
import { ProjectListView, Project } from './ProjectListView';
import { HistoryDetailView } from './HistoryDetailView';
import { CreditSection } from './CreditSection';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Bell, Check, Clock, Sparkles, Rocket, Search } from 'lucide-react';
import { StarredView } from './StarredView';
import { SettingsOverlay } from './SettingsOverlay';
import { ExecutionPage } from './ExecutionPage';
import { PricingOverlay } from './PricingOverlay';
import { AICompanion } from './AICompanion';
import { api } from '../utils/api';

interface DashboardProps {
  username: string;
  onLogout: () => void;
  initialPrompt?: string;
}

export function Dashboard({ username: initialUsername, onLogout, initialPrompt }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAICompanionOpen, setIsAICompanionOpen] = useState(false);
  const [credits, setCredits] = useState(1250); 
  const [showPricing, setShowPricing] = useState(false);
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  // Settings Overlay State
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsSection, setSettingsSection] = useState('profile');
  const [executionPrompt, setExecutionPrompt] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
       try {
         const [projs, notifs, profile] = await Promise.all([
           api.getProjects(),
           api.getNotifications(),
           api.getProfile()
         ]);
         setProjects(projs || []);
         setNotifications(notifs || []);
         setUserProfile(profile);
       } catch (e) {
         console.error("Failed to load dashboard data", e);
       }
    }
    fetchData();
  }, []);

  const handleMarkRead = async (id: any) => {
    await api.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabChange = (tab: string) => {
    if (['profile', 'billing', 'security', 'support'].includes(tab)) {
      setSettingsSection(tab);
      setIsSettingsModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleExecution = async (prompt: string) => {
    setExecutionPrompt(prompt);
    setIsTransitioning(true);
    
    // Create new project
    const newProject: Project = {
       id: crypto.randomUUID(),
       title: prompt.slice(0, 30) || 'Untitled Project',
       author: userProfile?.displayName || initialUsername || 'User',
       status: 'Initializing',
       type: 'coding',
       isPrivate: true,
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString(),
       image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800'
    };
    
    // Optimistic update
    setProjects(prev => [newProject, ...prev]);
    
    // Save to DB
    await api.saveProject(newProject);

    setTimeout(() => {
      setIsTransitioning(false);
      setActiveTab('execution');
    }, 2000);
  };
  
  const starredProjects = projects.filter(p => !p.isPrivate).slice(0, 3); // Just logic example
  // Or simply slice 3 recent
  const recentProjects = projects.slice(0, 3);

  const displayName = userProfile?.displayName || initialUsername;

  return (
    <div className={`flex h-screen font-sans overflow-hidden ${theme === 'dark' ? 'bg-[#0D0D0F] text-[#E0FFFF]' : 'bg-white text-black'}`}>
      {/* Desktop Collapsible Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarCollapsed ? '80px' : '256px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative flex-shrink-0 z-40 hidden lg:block overflow-hidden"
      >
        <div className="h-full w-full">
          <Sidebar 
            username={displayName} 
            onLogout={onLogout} 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            theme={theme}
            onShowPricing={() => setShowPricing(true)}
          />
        </div>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 left-0 w-72 border-r z-[70] lg:hidden ${theme === 'dark' ? 'bg-[#0D0D0F] border-[#1F1F23]' : 'bg-white border-gray-200'}`}
            >
              <Sidebar 
                username={displayName} 
                onLogout={onLogout} 
                activeTab={activeTab} 
                setActiveTab={handleTabChange} 
                isCollapsed={false}
                onToggleCollapse={() => setIsMobileMenuOpen(false)}
                theme={theme}
                onShowPricing={() => setShowPricing(true)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-[#FAFAFA]'}`}>
        {/* Desktop Header with Credit Button */}
        {activeTab === 'home' && (
        <div className="hidden lg:flex absolute top-5 right-6 z-30 items-center gap-3">
          {/* AI Companion Toggle */}
          <button 
            onClick={() => setIsAICompanionOpen(true)}
            className={`relative w-10 h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-300 group ${
              theme === 'dark' 
                ? 'bg-black/20 border-white/[0.08] text-white/50 hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 hover:shadow-[0_0_20px_rgba(0,194,255,0.15)]'
                : 'bg-white border-gray-200 text-gray-500 hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-white shadow-sm'
            }`}
          >
            <Sparkles size={18} strokeWidth={1.5} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative w-10 h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-300 group ${
                isNotificationsOpen 
                  ? 'bg-[#00C2FF]/10 border-[#00C2FF]/30 text-[#00C2FF]' 
                  : theme === 'dark' 
                    ? 'bg-black/20 border-white/[0.08] text-white/50 hover:text-white hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 hover:shadow-[0_0_20px_rgba(0,194,255,0.15)]'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-white shadow-sm'
              }`}
            >
              <Bell size={18} strokeWidth={1.5} />
              {notifications.some(n => !n.read) && (
                 <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2FF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]"></span>
                 </span>
              )}
            </button>

            {/* Notification Overlay */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsNotificationsOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 top-full mt-4 w-[380px] border rounded-2xl shadow-2xl z-50 overflow-hidden ${theme === 'dark' ? 'bg-[#0D0D0F] border-[#1F1F23] shadow-black/50' : 'bg-white border-gray-200 shadow-xl'}`}
                  >
                    {/* Header */}
                    <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-[#1F1F23]' : 'border-gray-100'}`}>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                        <span className="px-1.5 py-0.5 rounded-md bg-[#00C2FF]/10 text-[#00C2FF] text-[10px] font-bold">
                            {notifications.filter(n => !n.read).length} NEW
                        </span>
                      </div>
                      <button className={`text-[10px] font-medium transition-colors flex items-center gap-1 ${theme === 'dark' ? 'text-[#8B949E] hover:text-white' : 'text-gray-500 hover:text-[#00C2FF]'}`}>
                        <Check size={12} />
                        Mark all read
                      </button>
                    </div>

                    {/* List */}
                    <div className="max-h-[320px] min-h-[200px] overflow-y-auto custom-scrollbar flex items-center justify-center">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center gap-4 text-center p-6">
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#00C2FF]/10' : 'bg-[#00C2FF]/5'}`}>
                                 <div className="w-6 h-6 text-[#00C2FF]">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                 </div>
                               </div>
                               <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No new messages</span>
                            </div>
                        ) : (
                            <div className="w-full">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="p-4 border-b border-[#1F1F23]">
                                        <div className="font-bold text-sm">{notif.title}</div>
                                        <div className="text-xs text-gray-400">{notif.message}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className={`p-3 border-t text-center ${theme === 'dark' ? 'bg-[#161618]/50 border-[#1F1F23]' : 'bg-gray-50/50 border-gray-100'}`}>
                      <button className={`text-xs font-medium transition-colors ${theme === 'dark' ? 'text-[#8B949E] hover:text-white' : 'text-gray-500 hover:text-[#00C2FF]'}`}>
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <CreditSection credits={credits} theme={theme} onUpgrade={() => setShowPricing(true)} />
        </div>
        )}

        {/* Responsive Header for Mobile */}
        <div className={`lg:hidden h-14 border-b flex items-center px-4 z-30 justify-between ${theme === 'dark' ? 'bg-[#0D0D0F] border-[#1F1F23]' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 -ml-2 transition-colors ${theme === 'dark' ? 'text-[#8B949E] hover:text-[#00C2FF]' : 'text-gray-500 hover:text-[#00C2FF]'}`}
            >
              <Menu size={20} />
            </button>
            <div className="ml-4 text-xs font-black uppercase tracking-[0.2em] arctic-text-gradient">
              Infinall
            </div>
          </div>
          <div className="flex items-center gap-2 scale-90 origin-right">
            <button 
              onClick={() => setIsAICompanionOpen(true)}
              className={`p-2 rounded-full backdrop-blur-md border relative ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/70 hover:text-[#00C2FF]' : 'bg-white border-gray-200 text-gray-700 shadow-sm'}`}
            >
              <Sparkles size={16} />
            </button>
            <button className={`p-2 rounded-full backdrop-blur-md border relative ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/70' : 'bg-white border-gray-200 text-gray-700 shadow-sm'}`}>
              <Bell size={16} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00C2FF] rounded-full border border-black shadow-[0_0_8px_rgba(0,194,255,0.6)]" />
            </button>
            <CreditSection credits={credits} theme={theme} onUpgrade={() => setShowPricing(true)} />
          </div>
        </div>

        {/* Dynamic Background Layout */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          {/* Transition Overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl"
              >
                 <div className="flex flex-col items-center gap-6 max-w-md w-full px-6 text-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-[#00C2FF] border-t-transparent animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={24} className="text-[#00C2FF] animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold text-white tracking-tight">Initializing Project</h3>
                       <p className="text-gray-400 text-sm">Analyzing requirements and scaffolding architecture...</p>
                    </div>

                    <div className="w-full h-1 bg-[#1F1F23] rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: "0%" }}
                         animate={{ width: "100%" }}
                         transition={{ duration: 1.8, ease: "easeInOut" }}
                         className="h-full bg-[#00C2FF] shadow-[0_0_10px_#00C2FF]"
                       />
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'home' && <HomeView username={displayName} theme={theme} setTheme={setTheme} onSend={handleExecution} />}
              {activeTab === 'execution' && <ExecutionPage prompt={executionPrompt} onBack={() => setActiveTab('home')} theme={theme} />}
              {activeTab === 'search' && <SearchView onBack={() => setActiveTab('home')} theme={theme} />}
              {activeTab === 'projects' && <ProjectListView title="All Projects" projects={projects} onBack={() => setActiveTab('home')} theme={theme} />}
              {activeTab === 'starred' && <StarredView projects={recentProjects} onBack={() => setActiveTab('home')} theme={theme} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Settings Overlay */}
        <SettingsOverlay 
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          initialSection={settingsSection}
          theme={theme}
          setTheme={setTheme}
          onLogout={onLogout}
        />
        
        {/* Pricing Overlay */}
        <PricingOverlay isOpen={showPricing} onClose={() => setShowPricing(false)} />

        {/* AI Companion Sidebar */}
        <AICompanion 
          isOpen={isAICompanionOpen} 
          onClose={() => setIsAICompanionOpen(false)} 
          theme={theme}
        />

        {/* Command Palette */}
        <AnimatePresence>
          {isCommandPaletteOpen && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCommandPaletteOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className={`relative w-full max-w-2xl rounded-xl border shadow-2xl overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-[#161618] border-[#27272A]' : 'bg-white border-gray-200'}`}
              >
                <div className={`flex items-center gap-3 px-4 py-3 border-b ${theme === 'dark' ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <Search size={18} className="text-gray-500" />
                  <input 
                    autoFocus
                    placeholder="Type a command or search..."
                    className={`flex-1 bg-transparent border-none outline-none text-sm ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                  />
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-gray-400">ESC</span>
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2">
                   <div className="px-2 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Suggestions</div>
                   <button onClick={() => { setIsCommandPaletteOpen(false); setActiveTab('home'); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'dark' ? 'hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}>
                     <Rocket size={14} />
                     <span>New Project</span>
                   </button>
                   <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'dark' ? 'hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}>
                     <Search size={14} />
                     <span>Search Projects</span>
                   </button>
                   <button onClick={() => { setIsCommandPaletteOpen(false); setTheme(theme === 'dark' ? 'light' : 'dark'); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'dark' ? 'hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}>
                     <Sparkles size={14} />
                     <span>Toggle Theme</span>
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
