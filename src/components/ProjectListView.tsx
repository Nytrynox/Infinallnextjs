import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Plus, 
  Cpu,
  PenTool,
  ArrowUpRight,
  ArrowLeft,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { ProjectDetail } from './ProjectDetail';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Project {
  id: string;
  title: string;
  author: string;
  image: string;
  updatedAt: string;
  type: 'coding' | 'content';
  status: string;
  isPrivate?: boolean;
}

interface ProjectListViewProps {
  title: string;
  projects: Project[];
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function ProjectListView({ title, projects, onBack, theme = 'dark' }: ProjectListViewProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [typeFilter, setTypeFilter] = useState<'all' | 'coding' | 'content'>('all');
  
  const isDark = theme === 'dark';

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} theme={theme} />;
  }

  const FilterTab = ({ label, active, onClick, count }: { label: string, active: boolean, onClick: () => void, count?: number }) => (
    <button 
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        active 
          ? (isDark ? 'text-white' : 'text-black') 
          : (isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600')
      }`}
    >
      <div className="flex items-center gap-2">
         {label}
         {count !== undefined && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
               active 
                 ? (isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black')
                 : (isDark ? 'bg-white/5 text-zinc-600' : 'bg-black/5 text-zinc-400')
            }`}>
               {count}
            </span>
         )}
      </div>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${isDark ? 'bg-[#00C2FF]' : 'bg-black'}`}
        />
      )}
    </button>
  );

  return (
    <div className={`min-h-full font-sans ${isDark ? 'bg-[#050505] text-white' : 'bg-[#FAFAFA] text-black'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1600px] mx-auto px-6 py-8 space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <div className="flex items-center gap-2">
                    {onBack && (
                       <button 
                         onClick={onBack}
                         className={`p-2 rounded-full transition-colors -ml-2 ${isDark ? 'hover:bg-white/5 text-zinc-400 hover:text-white' : 'hover:bg-black/5 text-zinc-500 hover:text-black'}`}
                       >
                          <ArrowLeft size={20} />
                       </button>
                    )}
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                 </div>
                 <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Manage your neural workflows and active deployments.</p>
              </div>
              
              <button className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-lg hover:shadow-xl ${
                 isDark 
                   ? 'bg-[#00C2FF] hover:bg-[#33CFFF] text-black shadow-[#00C2FF]/20' 
                   : 'bg-black hover:bg-[#333] text-white shadow-black/20'
              }`}>
                 <Plus size={18} />
                 <span>New Project</span>
              </button>
           </div>

           {/* Toolbar */}
           <div className={`flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto no-scrollbar">
                 <FilterTab label="All Projects" active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} count={projects.length} />
                 <FilterTab label="Coding" active={typeFilter === 'coding'} onClick={() => setTypeFilter('coding')} count={projects.filter(p => p.type === 'coding').length} />
                 <FilterTab label="Content" active={typeFilter === 'content'} onClick={() => setTypeFilter('content')} count={projects.filter(p => p.type === 'content').length} />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64 group">
                    <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-zinc-600 group-focus-within:text-[#00C2FF]' : 'text-zinc-400 group-focus-within:text-black'}`} />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full h-10 pl-10 pr-4 rounded-xl text-sm border focus:outline-none transition-all ${
                        isDark 
                          ? 'bg-[#0A0A0C] border-white/10 focus:border-[#00C2FF] text-white placeholder:text-zinc-600' 
                          : 'bg-white border-gray-200 focus:border-black text-black placeholder:text-zinc-400'
                      }`}
                    />
                 </div>
                 
                 <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-[#0A0A0C] border-white/5' : 'bg-white border-gray-200'}`}>
                    {/* View Toggle Removed */}
                 </div>
              </div>
           </div>
        </div>

        {/* Grid View */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* New Project Card */}
              <div className="group cursor-pointer">
                <div className={`relative aspect-[16/10] rounded-xl overflow-hidden border border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-solid group-hover:shadow-[0_0_20px_rgba(0,194,255,0.15)] ${
                  isDark 
                    ? 'bg-[#0D0D0F]/50 border-[#1F1F23] group-hover:border-[#00C2FF] group-hover:bg-[#0D0D0F]' 
                    : 'bg-gray-50 border-gray-300 group-hover:border-[#00C2FF] group-hover:bg-white shadow-sm'
                }`}>
                   <div className="w-12 h-12 rounded-full bg-[#00C2FF]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                     <div className="w-6 h-6 text-[#00C2FF]">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                     </div>
                   </div>
                   <span className={`text-sm font-medium ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>Start from scratch</span>
                </div>
              </div>
           </div>
      </motion.div>
    </div>
  );
}
