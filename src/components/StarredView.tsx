import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Star,
  Search,
  LayoutGrid,
  List as ListIcon,
  ArrowLeft
} from 'lucide-react';
import { Project } from './ProjectListView';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StarredViewProps {
  projects: Project[];
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function StarredView({ projects, onBack, theme = 'dark' }: StarredViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isDark = theme === 'dark';

  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    time: 'Last edited',
    visibility: 'Any visibility',
    status: 'Any status',
    creator: 'All creators'
  });

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const FilterButton = ({ label, active = false, onClick, icon: Icon }: { label: string, active?: boolean, onClick?: () => void, icon?: any }) => (
    <button 
      onClick={onClick}
      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
        active 
          ? 'bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/20' 
          : (isDark ? 'bg-[#0A0A0A] text-[#71717A] border border-white/5 hover:border-white/10 hover:text-white' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-black')
      }`}
    >
      {Icon && <Icon size={12} strokeWidth={1.5} className={active ? "text-[#00C2FF]" : (isDark ? "text-[#71717A] group-hover:text-white" : "text-gray-500 group-hover:text-black")} />}
      {label}
    </button>
  );

  return (
    <div className={`min-h-full p-6 md:p-12 font-sans overflow-x-hidden ${isDark ? 'text-white' : 'text-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto space-y-12"
      >
        
        {/* Header */}
        <div className={`flex justify-between items-end border-b pb-6 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="space-y-1">
            <h1 className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Starred Projects</h1>
            <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-gray-500'}`}>Quick access to your most critical neural workflows and high-priority deployments.</p>
          </div>
          {onBack && (
            <button 
              onClick={onBack} 
              className={`inline-flex items-center gap-2 transition-colors text-sm group ${isDark ? 'text-[#C5D0DA] hover:text-white' : 'text-gray-400 hover:text-black'}`}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
             <div className="relative flex-1 group">
                <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-[#52525B] group-focus-within:text-[#00C2FF]' : 'text-gray-400 group-focus-within:text-[#00C2FF]'}`} />
                <input 
                  type="text" 
                  placeholder="Search starred projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all ${
                    isDark 
                      ? 'bg-[#050505] border-white/10 text-white placeholder:text-[#52525B]' 
                      : 'bg-white border-gray-200 text-black placeholder:text-gray-400'
                  }`}
                />
             </div>
             
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
               {/* View Toggle Removed */}

               <FilterButton label="Last edited" active={true} onClick={() => {}} />
               <FilterButton label="Any visibility" onClick={() => {}} />
               <FilterButton label="All creators" onClick={() => {}} />
             </div>
          </div>

          <div className={`flex items-center justify-between text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>
             <span>Favorites</span>
             <span>{filteredProjects.length} Items</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
