import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Cpu,
  Layers,
  ArrowUpRight,
  ArrowLeft
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Reusing Project interface for consistency in card display
interface SearchResult {
  id: string;
  title: string;
  author: string;
  image: string;
  updatedAt: string;
  type: 'coding' | 'content' | 'asset';
  status: string;
  category: string;
}

const MOCK_RESULTS: SearchResult[] = [
  { 
    id: '1', 
    title: 'Arctic Terminal UI', 
    author: 'Alex River', 
    image: 'https://images.unsplash.com/photo-1762278804729-13d330fad71a?auto=format&fit=crop&q=80&w=800', 
    updatedAt: '2h ago', 
    type: 'coding',
    status: 'Live Deployment',
    category: 'Project'
  },
  { 
    id: '2', 
    title: 'Neural Engine v2', 
    author: 'Alex River', 
    image: 'https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?auto=format&fit=crop&q=80&w=800', 
    updatedAt: '5h ago', 
    type: 'coding',
    status: 'Frontend',
    category: 'Project'
  },
  { 
    id: '6', 
    title: 'Tech Review Series', 
    author: 'Content Bot', 
    image: 'https://images.unsplash.com/photo-1758873272540-439a105db676?auto=format&fit=crop&q=80&w=800', 
    updatedAt: '1w ago', 
    type: 'content',
    status: 'Published',
    category: 'Content'
  },
  { 
    id: '8', 
    title: 'Q1 Marketing Assets', 
    author: 'Marketing Team', 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800', 
    updatedAt: '1d ago', 
    type: 'asset',
    status: 'Ready',
    category: 'Asset'
  },
  { 
    id: '9', 
    title: 'Authentication Flow', 
    author: 'System', 
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800', 
    updatedAt: '3d ago', 
    type: 'coding',
    status: 'Snippet',
    category: 'Component'
  },
];

interface SearchViewProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

export function SearchView({ onBack, theme = 'dark' }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'project' | 'asset'>('all');

  const isDark = theme === 'dark';

  const filteredResults = MOCK_RESULTS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'project' && (item.type === 'coding' || item.type === 'content')) ||
                         (filter === 'asset' && item.type === 'asset');
    return matchesSearch && matchesFilter;
  });

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
            <h1 className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Global Search</h1>
            <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-gray-500'}`}>Find projects, assets, and documentation across your workspace.</p>
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
                  placeholder="Search workspace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className={`w-full border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all ${
                    isDark 
                      ? 'bg-[#050505] border-white/10 text-white placeholder:text-[#52525B]' 
                      : 'bg-white border-gray-200 text-black placeholder:text-gray-400'
                  }`}
                />
             </div>
             
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
               <div className={`flex items-center rounded-lg p-1 border mr-2 opacity-50 pointer-events-none ${isDark ? 'bg-[#050505] border-white/10' : 'bg-white border-gray-200'}`}>
                 <button 
                   className={`p-1.5 rounded transition-colors ${
                     isDark ? 'bg-[#27272A] text-white' : 'bg-gray-100 text-black'
                   }`}
                 >
                   <LayoutGrid size={14} strokeWidth={1.5} />
                 </button>
               </div>

               <FilterButton label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
               <FilterButton label="Projects" icon={Cpu} active={filter === 'project'} onClick={() => setFilter('project')} />
               <FilterButton label="Assets" icon={Layers} active={filter === 'asset'} onClick={() => setFilter('asset')} />
             </div>
          </div>

          <div className={`flex items-center justify-between text-xs uppercase tracking-wider font-medium ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>
             <span>Results</span>
             <span>{filteredResults.length} Found</span>
          </div>
        </div>

        {/* Results Area */}
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
