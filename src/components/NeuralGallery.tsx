import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, MoreHorizontal, User, Clock, Layout, FolderOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  author: string;
  image: string;
  type: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Unleash Your Inner Power - Fitness Landing Page',
    author: 'Alex River',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    type: 'Recently viewed'
  },
  {
    id: '2',
    title: 'Cyberpunk E-commerce Platform',
    author: 'Alex River',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800',
    type: 'Recently viewed'
  },
  {
    id: '3',
    title: 'Fintech Dashboard - Dark Mode',
    author: 'Alex River',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda5366a71?auto=format&fit=crop&q=80&w=800',
    type: 'My projects'
  },
  {
    id: '4',
    title: 'SaaS Analytics Template',
    author: 'Infinall Team',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    type: 'Templates'
  }
];

interface NeuralGalleryProps {
  theme?: 'dark' | 'light';
  onProjectClick?: (project: Project) => void;
}

export function NeuralGallery({ theme = 'dark', onProjectClick }: NeuralGalleryProps) {
  const [activeTab, setActiveTab] = useState('Recently viewed');
  const tabs = ['Recently viewed', 'My projects', 'Templates'];
  
  const isDark = theme === 'dark';

  return (
    <div className={`mx-6 mb-6 mt-6 border p-6 rounded-3xl ${isDark ? 'bg-black border-[#1F1F23]' : 'bg-white border-gray-200 shadow-sm'}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* New Project Card */}
          <div className="group cursor-pointer" onClick={() => onProjectClick?.({ id: 'new', title: 'New Project', author: 'You', image: '', type: 'new' })}>
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
      </div>
    </div>
  );
}
