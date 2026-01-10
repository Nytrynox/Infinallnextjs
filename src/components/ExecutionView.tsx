import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Cloud, 
  Palette, 
  Code2, 
  BarChart3, 
  Plus, 
  ChevronRight, 
  Share2, 
  Github, 
  Zap, 
  Rocket, 
  Monitor, 
  Smartphone, 
  RotateCcw,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  ArrowUpRight,
  Settings,
  X,
  Cpu,
  Workflow,
  Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExecutionViewProps {
  initialPrompt: string;
  onBack: () => void;
}

function LiveCodeEditor({ prompt }: { prompt: string }) {
  const [code, setCode] = useState('');
  const [line, setLine] = useState(1);

  const fullCode = `import React from 'react';
import { motion } from 'framer-motion';

// Mission Payload: ${prompt}
// Initializing specialized component architecture...

export const GeneratedPlatform = () => {
  return (
    <div className="min-h-screen bg-black text-white p-20">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-40"
      >
        <div className="text-2xl font-black tracking-tighter">INF-SYNTH</div>
        <div className="flex gap-8 text-sm font-medium text-white/40">
          <span>FEATURES</span>
          <span>ECOSYSTEM</span>
          <span>PRICING</span>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-8xl font-black tracking-tighter leading-tight"
        >
          THE FUTURE IS <span className="text-[#00C2FF]">AUTONOMOUS</span>.
        </motion.h1>
        <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
          Experience the next generation of neural execution. 
          Powered by the Infinall Core Engine.
        </p>
      </div>
    </div>
  );
};`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCode(fullCode.slice(0, i));
      setLine(fullCode.slice(0, i).split('\n').length);
      i += 3;
      if (i > fullCode.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [fullCode]);

  return (
    <div className="flex-1 bg-[#0D0D0F] font-mono text-[13px] overflow-hidden flex">
      <div className="w-12 border-r border-white/5 bg-black/20 flex flex-col items-center py-6 text-white/10 select-none">
        {[...Array(Math.max(line, 40))].map((_, i) => (
          <div key={i} className="h-6 flex items-center">{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <pre className="text-white/80 leading-6">
          {code}
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="inline-block w-2 h-4 bg-[#00C2FF] align-middle ml-1"
          />
        </pre>
      </div>
    </div>
  );
}

function AssetsGallery() {
  const assets = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?w=800&q=80', label: 'Primary Hero Render' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1755963969538-00dfa22a7c0b?w=800&q=80', label: 'Eco-System Background' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', label: 'Circuit Infrastructure' },
    { type: 'video', url: 'https://cdn.pixabay.com/video/2023/11/04/187768-880922485_tiny.mp4', label: 'Neural Network Loop' },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar grid grid-cols-2 gap-6">
      {assets.map((asset, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative bg-[#0D0D0F] border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="aspect-video relative">
            {asset.type === 'video' ? (
              <video src={asset.url} autoPlay loop muted className="w-full h-full object-cover" />
            ) : (
              <ImageWithFallback src={asset.url} alt={asset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                Download Raw
              </button>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-t border-white/5">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{asset.label}</span>
            <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-bold text-white/20 uppercase">
              {asset.type}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function LivePreview({ prompt }: { prompt: string }) {
  return (
    <div className="flex-1 bg-black overflow-hidden flex flex-col relative">
      {/* Real Website Mockup */}
      <div className="flex-1 flex flex-col items-center justify-center p-20 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-3xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[10px] font-black text-[#00C2FF] uppercase tracking-widest mb-4">
            Autonomous Deployment Ready
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter leading-none uppercase">
            {prompt.split(' ').slice(0, 4).join(' ') || 'Elevate Your Vision'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-purple-500">
              {prompt.split(' ').slice(4, 7).join(' ') || 'With Infinall'}
            </span>
          </h1>
          <p className="text-xl text-white/40 leading-relaxed max-w-xl mx-auto">
            Our agents have synthesized a complete architecture for {prompt || 'your next big project'}. High-fidelity assets and optimized logic are ready for handoff.
          </p>
          <div className="flex items-center justify-center gap-6 pt-8">
            <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all">
              Launch Mission
            </button>
            <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-all">
              Documentation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Futuristic Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,194,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
      </div>
    </div>
  );
}

export function ExecutionView({ initialPrompt, onBack }: ExecutionViewProps) {
  const [activeMode, setActiveMode] = useState<'preview' | 'code' | 'assets'>('preview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [chatInput, setChatInput] = useState('');
  
  // Categorize prompt for more relevant "questions"
  const isFitness = initialPrompt.toLowerCase().includes('fit') || initialPrompt.toLowerCase().includes('gym');
  const isEcommerce = initialPrompt.toLowerCase().includes('shop') || initialPrompt.toLowerCase().includes('store') || initialPrompt.toLowerCase().includes('ecom');
  const isSaaS = initialPrompt.toLowerCase().includes('saas') || initialPrompt.toLowerCase().includes('platform') || initialPrompt.toLowerCase().includes('tool');

  const getDynamicOptions = () => {
    if (isFitness) return ["Gym Landing Page", "Workout Tracker", "Coaching Portal", "Exercise Library"];
    if (isEcommerce) return ["Fashion Store", "Tech Marketplace", "Subscription Box", "Digital Goods Store"];
    if (isSaaS) return ["Analytics Dashboard", "CRM Platform", "Project Management", "AI Content Tool"];
    return ["Marketing Site", "Web Application", "Portfolio Gallery", "Community Portal"];
  };

  const [messages, setMessages] = useState<any[]>([
    { id: '1', role: 'user', content: initialPrompt },
    { id: '2', role: 'assistant', content: `Initializing specialized build for: ${initialPrompt}. I've architected a neural plan for your project. Synchronizing core components and generating visual identity...`, type: 'thought' }
  ]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col font-['Inter',sans-serif]"
    >
      {/* Top Header - Glassmorphic Redesign */}
      <header className="h-[64px] bg-black/80 backdrop-blur-2xl flex items-center justify-between px-6 shrink-0 border-b border-white/10 z-50 relative">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack} 
            className="group p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
          >
            <X className="size-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          <div className="h-8 w-px bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-[#00C2FF] shadow-[0_0_20px_rgba(0,194,255,0.2)] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Zap className="size-5 text-black fill-current relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-white tracking-wide leading-none mb-1">Mission Preview</span>
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-[#00C2FF] animate-pulse shadow-[0_0_8px_#00C2FF]" />
                <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Live Environment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Tabs - Floating Pill */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-black/40 border border-white/10 backdrop-blur-md rounded-full p-1.5 gap-1 shadow-2xl">
          {[
            { id: 'preview', icon: <Globe className="size-4" />, label: 'Preview' },
            { id: 'code', icon: <Code2 className="size-4" />, label: 'Code' },
            { id: 'assets', icon: <Palette className="size-4" />, label: 'Assets' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id as any)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-[12px] font-bold transition-all duration-300 overflow-hidden ${
                activeMode === tab.id 
                  ? 'text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeMode === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#1F1F21] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all">
            <Plus className="size-5" />
          </button>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 pr-3 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="size-8 rounded-full border border-white/10 overflow-hidden">
              <ImageWithFallback src="https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik" alt="User" />
            </div>
            <Settings className="size-4 text-white/40 group-hover:text-white transition-colors ml-1" />
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[12px] font-bold text-white transition-all group">
              <Share2 className="size-4 text-white/60 group-hover:text-white transition-colors" />
              Share
            </button>
            <button className="group relative px-6 py-2.5 bg-[#00C2FF] text-black rounded-full text-[12px] font-black transition-all hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="size-4" />
                Publish
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Chat - Redesigned for Cleanliness */}
        <div className="w-[440px] border-r border-white/[0.03] bg-[#050505] flex flex-col shrink-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
            {/* Thought/Processing Status */}
            <div className="flex items-center gap-2 text-white/20">
              <div className="size-1 rounded-full bg-white/20" />
              <span className="text-[12px] font-medium tracking-wide uppercase">Processing build core...</span>
            </div>

            {/* Chat Messages */}
            <div className="space-y-10">
              {messages.map((msg, i) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'user' ? (
                    <div className="bg-[#111113] border border-white/[0.05] rounded-[24px] px-6 py-4 max-w-[90%]">
                      <p className="text-[14px] text-white/80 leading-relaxed font-medium">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="space-y-6 w-full">
                      <p className="text-[15px] text-white/60 leading-relaxed font-normal">
                        {msg.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Chat Bar */}
          <div className="p-8 pt-0">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Message your agent..." 
                className="w-full bg-[#0F0F11] border border-white/[0.05] rounded-[24px] py-4 px-6 pr-14 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/10 transition-all shadow-xl"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-[#00C2FF] rounded-full flex items-center justify-center text-black shadow-lg hover:brightness-110 transition-all">
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Preview & Canvas */}
        <div className="flex-1 bg-[#050505] relative flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activeMode === 'preview' && (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center p-8 bg-[#0F0F11]"
              >
                <div 
                  className={`transition-all duration-500 ease-in-out bg-black overflow-hidden shadow-2xl relative ${
                    viewMode === 'mobile' 
                      ? 'w-[375px] h-[667px] rounded-[40px] border-[8px] border-[#1F1F21]' 
                      : 'w-full h-full rounded-2xl border border-white/5'
                  }`}
                >
                  {viewMode === 'mobile' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1F1F21] rounded-b-2xl z-30 flex items-center justify-center">
                      <div className="w-10 h-1 bg-white/10 rounded-full" />
                    </div>
                  )}
                  <LivePreview prompt={initialPrompt} />
                </div>
              </motion.div>
            )}
            {activeMode === 'code' && (
              <motion.div 
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <LiveCodeEditor prompt={initialPrompt} />
              </motion.div>
            )}
            {activeMode === 'assets' && (
              <motion.div 
                key="assets"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <AssetsGallery />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Device Controls (Only in Preview) */}
          {activeMode === 'preview' && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-6 z-20">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_10px_#22C55E]" />
                <span className="text-[10px] font-bold text-white/80 uppercase">Preview Active</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex gap-3">
                <Smartphone 
                  onClick={() => setViewMode('mobile')}
                  className={`size-4 cursor-pointer transition-colors ${viewMode === 'mobile' ? 'text-[#00C2FF]' : 'text-white/40 hover:text-white'}`} 
                />
                <Monitor 
                  onClick={() => setViewMode('desktop')}
                  className={`size-4 cursor-pointer transition-colors ${viewMode === 'desktop' ? 'text-[#00C2FF]' : 'text-white/40 hover:text-white'}`} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}