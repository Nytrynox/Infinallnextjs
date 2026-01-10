import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Folder, 
  File, 
  Code, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  ExternalLink, 
  Github, 
  Layout, 
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Download,
  Share2,
  Trash2,
  Eye,
  Settings,
  Activity,
  Zap,
  Box,
  Globe,
  QrCode,
  BookOpen,
  CheckCircle2,
  Calendar,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Play,
  Pause,
  Clock,
  Server,
  Database,
  Lock,
  Search,
  Type,
  Palette,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  PenTool,
  BarChart3,
  PieChart
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectDetailViewProps {
  project: any;
  onBack: () => void;
}

// --- Mock Data Generators ---

const generateCodingData = (project: any) => ({
  ...project,
  techStack: project.techStack || ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  deployment: {
    url: 'https://neurosync.app',
    platform: 'Vercel',
    status: 'Live',
    uptime: '99.99%',
    lastDeploy: '10m ago',
    performance: { lighthouse: 98, loadTime: '0.8s', seo: 100 }
  },
  fileStructure: [
    { name: 'public', type: 'folder', children: [
        { name: 'vite.svg', type: 'file', icon: 'image' },
        { name: 'robots.txt', type: 'file', icon: 'text' }
    ]},
    { name: 'src', type: 'folder', children: [
        { name: 'components', type: 'folder', children: [
            { name: 'Dashboard.tsx', type: 'file', icon: 'code' },
            { name: 'Sidebar.tsx', type: 'file', icon: 'code' },
            { name: 'Chart.tsx', type: 'file', icon: 'code' },
            { name: 'AuthModal.tsx', type: 'file', icon: 'code' }
        ]},
        { name: 'hooks', type: 'folder', children: [
            { name: 'useAuth.ts', type: 'file', icon: 'code' },
            { name: 'useData.ts', type: 'file', icon: 'code' }
        ]},
        { name: 'App.tsx', type: 'file', icon: 'code' },
        { name: 'main.tsx', type: 'file', icon: 'code' },
        { name: 'index.css', type: 'file', icon: 'style' }
    ]},
    { name: 'package.json', type: 'file', icon: 'config' },
    { name: 'tsconfig.json', type: 'file', icon: 'config' },
    { name: 'README.md', type: 'file', icon: 'doc' },
  ],
  media: {
    screenshots: [
      { id: 1, title: 'Dashboard Overview', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', device: 'Desktop' },
      { id: 2, title: 'Mobile Analytics', url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80', device: 'Mobile' },
      { id: 3, title: 'Settings Panel', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', device: 'Tablet' }
    ],
    videos: [
      { id: 1, title: 'Feature Walkthrough', duration: '2:15', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80' }
    ]
  },
  specs: {
    frontend: 'React 18, Tailwind CSS, Framer Motion',
    backend: 'Node.js, Express, Prisma ORM',
    database: 'PostgreSQL (Supabase)',
    security: 'JWT Auth, AES-256 Encryption',
    integrations: ['Stripe', 'SendGrid', 'Google Analytics']
  }
});

const generateContentData = (project: any) => ({
  ...project,
  campaign: {
    goals: 'Increase brand awareness by 25% and drive 5k signups.',
    duration: 'Sep 1 - Nov 30, 2024',
    status: project.status || 'Active',
    platforms: ['Instagram', 'LinkedIn', 'YouTube', 'Blog']
  },
  brandIdentity: {
    colors: ['#00C2FF', '#0F1115', '#FFFFFF', '#FF4D4D'],
    fonts: { heading: 'Inter', body: 'Roboto' },
    logos: [
      { type: 'Primary', url: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=400&q=80' },
      { type: 'Monochrome', url: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&q=80' }
    ]
  },
  contentLibrary: [
    { id: 1, type: 'Blog', title: 'The Future of AI in 2025', platform: 'WordPress', status: 'Published', date: 'Oct 12', metric: '4.2k Reads', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
    { id: 2, type: 'Graphic', title: 'Q4 Roadmap Infographic', platform: 'LinkedIn', status: 'Published', date: 'Oct 15', metric: '850 Likes', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
    { id: 3, type: 'Video', title: 'Product Launch Trailer', platform: 'YouTube', status: 'Published', date: 'Oct 20', metric: '12k Views', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80' },
    { id: 4, type: 'Reel', title: 'Behind the Scenes', platform: 'Instagram', status: 'Scheduled', date: 'Nov 02', metric: '-', image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80' },
    { id: 5, type: 'Graphic', title: 'Customer Testimonial', platform: 'Instagram', status: 'Draft', date: 'Nov 05', metric: '-', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80' }
  ],
  schedule: [
    { date: 1, status: 'posted', type: 'Blog' },
    { date: 4, status: 'posted', type: 'Video' },
    { date: 7, status: 'posted', type: 'Graphic' },
    { date: 10, status: 'scheduled', type: 'Reel' },
    { date: 14, status: 'scheduled', type: 'Blog' },
  ],
  analytics: {
    reach: '125.4k',
    engagement: '4.8%',
    clicks: '3,420',
    topPlatform: 'LinkedIn'
  }
});

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  const isCoding = project.agent === 'coding';
  const fullData = isCoding ? generateCodingData(project) : generateContentData(project);
  
  const [activeTab, setActiveTab] = useState(isCoding ? 'Overview' : 'Campaign');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src', 'components']);
  
  // --- Shared Components ---

  const Badge = ({ children, color = 'blue' }: { children: React.ReactNode, color?: string }) => {
    const colors: any = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      gray: 'bg-white/10 text-white/60 border-white/10'
    };
    return (
      <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${colors[color] || colors.gray}`}>
        {children}
      </span>
    );
  };

  const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
      {Icon && <Icon className="w-4 h-4 text-[#00C2FF]" />}
      {children}
    </h3>
  );

  // --- Layouts ---

  const renderCodingLayout = () => {
    const data = fullData; // Type assertion could be used here

    const renderFileTree = (items: any[], depth = 0) => (
      items.map((item) => (
        <div key={item.name} className="flex flex-col">
          <div 
            onClick={() => item.type === 'folder' && setExpandedFolders(prev => prev.includes(item.name) ? prev.filter(f => f !== item.name) : [...prev, item.name])}
            className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors group ${item.type === 'folder' ? 'hover:bg-white/5' : 'hover:bg-[#00C2FF]/10'}`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            {item.type === 'folder' ? (
              <div className="flex items-center gap-2 text-white/60 group-hover:text-white">
                {expandedFolders.includes(item.name) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <Folder className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span className="text-xs font-mono">{item.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white/40 group-hover:text-white">
                <Code className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{item.name}</span>
              </div>
            )}
          </div>
          {item.type === 'folder' && expandedFolders.includes(item.name) && (
            <div className="flex flex-col">{renderFileTree(item.children, depth + 1)}</div>
          )}
        </div>
      ))
    );

    return (
      <div className="space-y-8">
        {/* 1. Overview Card */}
        <div className="p-6 bg-[#0D0D0D] border border-white/5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter mb-2">{data.title}</h1>
                <p className="text-white/60 max-w-2xl leading-relaxed">{data.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge color={data.status === 'Live' ? 'green' : 'blue'}>{data.status}</Badge>
                <span className="text-xs text-white/30 font-mono">Last updated: {data.date}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.techStack.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/80 flex items-center gap-2">
                  <Code className="w-3 h-3" /> {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. File Structure */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Project Files</span>
                <span className="text-xs text-white/30 font-mono">1.2 MB</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {renderFileTree(data.fileStructure)}
              </div>
            </div>
            
            {/* 6. Documentation */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6">
              <SectionTitle icon={BookOpen}>Documentation</SectionTitle>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <span className="text-xs font-bold text-white">README.md</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <span className="text-xs font-bold text-white">API Reference</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <span className="text-xs font-bold text-white">Setup Guide</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* 4. Live Deployment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-[#00C2FF]/10 to-blue-600/5 border border-[#00C2FF]/20 rounded-2xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Globe className="w-6 h-6 text-[#00C2FF]" />
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Live Deployment</h3>
                  <a href={data.deployment.url} target="_blank" rel="noreferrer" className="text-xs text-[#00C2FF] hover:underline truncate block">
                    {data.deployment.url}
                  </a>
                </div>
                <button className="mt-6 w-full py-3 bg-[#00C2FF] hover:bg-[#33CEFF] text-black font-bold rounded-xl text-xs uppercase tracking-wide transition-colors flex items-center justify-center gap-2">
                  View Live Site <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 bg-[#0D0D0D] border border-white/5 rounded-2xl">
                <SectionTitle icon={Activity}>Performance</SectionTitle>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Lighthouse Score</span>
                    <span className="text-sm font-bold text-green-400">{data.deployment.performance.lighthouse}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[98%]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Load Time</span>
                      <span className="text-sm font-bold text-white">{data.deployment.performance.loadTime}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Uptime</span>
                      <span className="text-sm font-bold text-white">{data.deployment.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Visual Media Gallery */}
            <div>
              <SectionTitle icon={ImageIcon}>Project Gallery</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.media.screenshots.map((shot: any) => (
                  <div key={shot.id} className="group relative aspect-video bg-[#0D0D0D] border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <ImageWithFallback src={shot.url} alt={shot.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <Maximize2 className="w-6 h-6 text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{shot.device} View</span>
                    </div>
                  </div>
                ))}
                {data.media.videos.map((vid: any) => (
                  <div key={vid.id} className="group relative aspect-video bg-[#0D0D0D] border border-white/5 rounded-xl overflow-hidden cursor-pointer">
                    <ImageWithFallback src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-bold text-white">
                      {vid.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Technical Specs */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6">
              <SectionTitle icon={Server}>Technical Specifications</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">Frontend</span>
                  <p className="text-xs text-white/70 leading-relaxed">{data.specs.frontend}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">Backend</span>
                  <p className="text-xs text-white/70 leading-relaxed">{data.specs.backend}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">Database</span>
                  <p className="text-xs text-white/70 leading-relaxed">{data.specs.database}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">Integrations</span>
                  <div className="flex flex-wrap gap-2">
                    {data.specs.integrations.map((item: string) => (
                      <span key={item} className="px-2 py-1 rounded bg-white/5 text-[10px] font-medium text-white">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContentLayout = () => {
    const data = fullData;

    return (
      <div className="space-y-8">
        {/* 1. Campaign Overview */}
        <div className="p-6 bg-[#0D0D0D] border border-white/5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter mb-2">{data.title}</h1>
                <p className="text-white/60 max-w-2xl leading-relaxed">{data.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge color={data.status === 'Active' ? 'green' : 'orange'}>{data.status}</Badge>
                <div className="flex gap-2 mt-2">
                  {data.campaign.platforms.map((p: string) => (
                    <div key={p} className="p-1.5 bg-white/5 rounded-lg text-white/60" title={p}>
                      {p === 'Instagram' && <Instagram className="w-3.5 h-3.5" />}
                      {p === 'LinkedIn' && <Linkedin className="w-3.5 h-3.5" />}
                      {p === 'YouTube' && <Youtube className="w-3.5 h-3.5" />}
                      {p === 'Twitter' && <Twitter className="w-3.5 h-3.5" />}
                      {p === 'Blog' && <FileText className="w-3.5 h-3.5" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Goal</span>
                <span className="text-xs font-bold text-white">{data.campaign.goals}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Duration</span>
                <span className="text-xs font-bold text-white">{data.campaign.duration}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Total Assets</span>
                <span className="text-xs font-bold text-white">{data.content - 5 || 42} items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 3. Content Library */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <SectionTitle icon={Layout}>Content Library</SectionTitle>
                <div className="flex gap-2">
                  {['All', 'Blogs', 'Graphics', 'Videos'].map(filter => (
                    <button key={filter} className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.contentLibrary.map((item: any) => (
                  <div key={item.id} className="group bg-[#0D0D0D] border border-white/5 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all cursor-pointer">
                    <div className="aspect-[4/5] relative">
                      <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase">
                        {item.type}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                        <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[9px] text-white/50">{item.platform}</span>
                          <span className="text-[9px] text-orange-400 font-bold">{item.metric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Performance Analytics */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6">
              <SectionTitle icon={BarChart3}>Performance Analytics</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Reach', value: data.analytics.reach, change: '+12%' },
                  { label: 'Engagement', value: data.analytics.engagement, change: '+2.4%' },
                  { label: 'Link Clicks', value: data.analytics.clicks, change: '+8%' },
                  { label: 'Top Platform', value: data.analytics.topPlatform, change: '-' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{stat.label}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-white">{stat.value}</span>
                      <span className="text-[10px] font-bold text-green-500 mb-1">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-48 w-full bg-white/5 rounded-xl flex items-end justify-between px-4 pb-4 pt-8 gap-2">
                {[40, 60, 45, 70, 50, 80, 65, 55, 85, 75, 90, 60].map((h, i) => (
                  <div key={i} className="w-full bg-orange-500/20 hover:bg-orange-500/50 rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[9px] px-2 py-1 rounded pointer-events-none">
                      {h * 100}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* 2. Brand Identity */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6">
              <SectionTitle icon={Palette}>Brand Identity</SectionTitle>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-3">Logos</span>
                  <div className="grid grid-cols-2 gap-3">
                    {data.brandIdentity.logos.map((logo: any, i: number) => (
                      <div key={i} className="aspect-square bg-white/5 rounded-xl flex items-center justify-center p-4 border border-white/5 hover:border-orange-500/30 transition-colors cursor-pointer group relative">
                        <ImageWithFallback src={logo.url} alt="Logo" className="w-full h-full object-contain opacity-80 group-hover:opacity-100" />
                        <Download className="absolute bottom-2 right-2 w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-3">Colors</span>
                  <div className="flex gap-2">
                    {data.brandIdentity.colors.map((color: string) => (
                      <div key={color} className="w-8 h-8 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: color }} title={color} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-3">Typography</span>
                  <div className="space-y-2">
                    <div className="p-3 bg-white/5 rounded-lg border-l-2 border-orange-500">
                      <span className="text-xs text-white/40 block mb-1">Heading</span>
                      <span className="text-lg font-bold text-white">{data.brandIdentity.fonts.heading}</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border-l-2 border-white/20">
                      <span className="text-xs text-white/40 block mb-1">Body</span>
                      <span className="text-sm text-white/80">{data.brandIdentity.fonts.body}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Publishing Schedule */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6">
              <SectionTitle icon={Calendar}>Schedule</SectionTitle>
              <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <span key={i} className="text-[10px] text-white/30 font-bold">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const event = data.schedule.find((s: any) => s.date === day);
                  return (
                    <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] relative group ${
                      event 
                        ? (event.status === 'posted' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400') 
                        : 'bg-white/5 text-white/20'
                    }`}>
                      {day}
                      {event && (
                        <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-current" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] text-white/50">Posted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-white/50">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Header Navigation */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{project.title}</h2>
            <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono mt-0.5">
              <span className={`w-2 h-2 rounded-full ${project.status === 'Live' || project.status === 'Active' ? 'bg-green-500' : 'bg-blue-500'}`} />
              {project.status} • {project.agent === 'coding' ? 'Full-Stack Build' : 'Marketing Campaign'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {project.agent === 'coding' && (
             <button className="flex items-center gap-2 px-4 py-2 bg-[#00C2FF] text-black rounded-lg text-xs font-bold hover:bg-[#33CEFF] transition-all">
               <Globe className="w-3.5 h-3.5" />
               Visit Live
             </button>
          )}
          <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-all">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pb-12">
        {isCoding ? renderCodingLayout() : renderContentLayout()}
      </div>
    </motion.div>
  );
}
