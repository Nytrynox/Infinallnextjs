import React, { useState, useEffect, useRef } from 'react';
import { Project } from './ProjectListView';
import { 
  ArrowLeft, 
  Search,
  Palette,
  Layout,
  Monitor,
  Database,
  TrendingUp,
  Eye,
  CheckCircle2,
  Globe2,
  Megaphone,
  Smartphone,
  Layers,
  Share2,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  Github,
  FileCode,
  Image as ImageIcon,
  RefreshCw,
  Maximize2,
  Terminal,
  Zap,
  ChevronRight,
  MoreVertical,
  PlayCircle,
  Rocket,
  Send,
  Paperclip,
  Bot,
  User,
  Code2,
  Tablet,
  RefreshCcw,
  MessageSquare,
  Mic,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import boltExample from 'figma:asset/e3cf6ecc62264493220afc9a0bd5dcad42e1143f.png';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  theme?: 'dark' | 'light';
}

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system' | 'step';
  content: string;
  timestamp: string;
  meta?: any;
}

export function ProjectDetail({ project, onBack, theme = 'dark' }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'code' | 'deploy'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(`arctic-preview.run/project/${project.id}`);
  const [messages, setMessages] = useState<Message[]>([]);

  const isDark = theme === 'dark';

  // Initialize Chat History based on "Workflow"
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        type: 'user',
        content: `Initialize project "${project.title}" with a modern tech stack.`,
        timestamp: '10:00 AM'
      },
      {
        id: '2',
        type: 'system',
        content: 'Project initialized. Environment set to Production.',
        timestamp: '10:00 AM'
      },
      {
        id: '3',
        type: 'agent',
        content: "I've started the development server. I'm analyzing the requirements for your new project.",
        timestamp: '10:01 AM'
      },
      {
        id: '4',
        type: 'step',
        content: 'Market Research & Analysis',
        timestamp: '10:02 AM',
        meta: { status: 'complete', icon: Search, details: 'Competitor analysis finished. Found 3 key differentiators.' }
      },
      {
        id: '5',
        type: 'step',
        content: 'Design System & Branding',
        timestamp: '10:03 AM',
        meta: { status: 'complete', icon: Palette, details: 'Generated color palette: Arctic Cyan & Deep Blue.' }
      },
      {
        id: '6',
        type: 'agent',
        content: "I've scaffolded the Next.js application with Tailwind CSS. The database schema is ready for review.",
        timestamp: '10:05 AM'
      },
      {
        id: '7',
        type: 'step',
        content: 'Backend Integration',
        timestamp: '10:06 AM',
        meta: { status: 'current', icon: Database, details: 'Connecting Supabase authentication and storage buckets.' }
      }
    ];
    setMessages(initialMessages);
  }, [project.title]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');

    // Simulate Agent Response
    setTimeout(() => {
      const newAgentMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: "I'm processing that request. Updating the preview now...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAgentMsg]);
    }, 1000);
  };

  return (
    <div className={`w-full h-screen flex flex-col md:flex-row font-['Inter'] overflow-hidden selection:bg-[#00C2FF]/30 ${
      isDark ? 'bg-[#050505] text-white' : 'bg-gray-50 text-black'
    }`}>
      
      {/* LEFT PANEL: Creative Studio / Chat */}
      <div className={`w-full md:w-[420px] lg:w-[480px] flex flex-col border-r relative z-20 shadow-[20px_0_40px_-10px_rgba(0,0,0,0.1)] ${
        isDark ? 'border-white/5 bg-[#09090B]' : 'border-gray-200 bg-white'
      }`}>
         
         {/* Header */}
         <div className={`h-14 px-4 border-b flex items-center justify-between shrink-0 ${
           isDark ? 'border-white/5 bg-[#09090B]' : 'border-gray-200 bg-white'
         }`}>
            <div className="flex items-center gap-3">
               <button 
                  onClick={onBack}
                  className={`p-2 -ml-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/5 text-[#8B949E] hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-black'
                  }`}
               >
                  <ArrowLeft size={18} />
               </button>
               <div>
                  <h1 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                     {project.title}
                     <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse" />
                  </h1>
                  <p className={`text-[10px] ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>Arctic Agent v2.4 • Active</p>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <button className={`p-2 rounded-lg transition-colors ${
                 isDark ? 'hover:bg-white/5 text-[#8B949E]' : 'hover:bg-gray-100 text-gray-500'
               }`} title="Export Code">
                  <FileCode size={16} />
               </button>
               <button className={`p-2 rounded-lg transition-colors ${
                 isDark ? 'hover:bg-white/5 text-[#8B949E]' : 'hover:bg-gray-100 text-gray-500'
               }`} title="Settings">
                  <MoreVertical size={16} />
               </button>
            </div>
         </div>

         {/* Chat Feed */}
         <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative">
            <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b via-transparent to-transparent h-8 z-10 ${
              isDark ? 'from-[#09090B]' : 'from-white'
            }`} />
            
            {messages.map((msg, index) => {
               const isLast = index === messages.length - 1;
               
               if (msg.type === 'system') {
                  return (
                     <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center my-4"
                     >
                        <span className={`text-[10px] border rounded-full px-3 py-1 ${
                          isDark ? 'bg-white/5 border-white/5 text-[#8B949E]' : 'bg-gray-100 border-gray-200 text-gray-500'
                        }`}>
                           {msg.content}
                        </span>
                     </motion.div>
                  );
               }

               if (msg.type === 'step') {
                  const Icon = msg.meta?.icon || CheckCircle2;
                  const isComplete = msg.meta?.status === 'complete';
                  const isCurrent = msg.meta?.status === 'current';
                  
                  return (
                     <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="my-2"
                     >
                        <div className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                           isCurrent 
                              ? 'bg-[#00C2FF]/5 border-[#00C2FF] shadow-[0_0_20px_-10px_rgba(0,194,255,0.3)]' 
                              : (isDark ? 'bg-[#18181B] border-white/5' : 'bg-gray-50 border-gray-200')
                        }`}>
                           <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              isCurrent 
                                ? 'bg-[#00C2FF] text-black' 
                                : (isDark ? 'bg-[#27272A] text-[#8B949E]' : 'bg-gray-200 text-gray-500')
                           }`}>
                              {isCurrent ? <RefreshCw size={12} className="animate-spin" /> : <Icon size={12} />}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                 <h4 className={`text-xs font-semibold ${
                                   isCurrent ? (isDark ? 'text-white' : 'text-black') : (isDark ? 'text-[#D4D4D8]' : 'text-gray-700')
                                 }`}>
                                    {msg.content}
                                 </h4>
                                 <span className={`text-[10px] ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>{msg.timestamp}</span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-gray-500'}`}>
                                 {msg.meta?.details}
                              </p>
                              {isCurrent && (
                                 <div className={`mt-2 h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-[#27272A]' : 'bg-gray-200'}`}>
                                    <div className="h-full bg-[#00C2FF] animate-progress-indeterminate" />
                                 </div>
                              )}
                           </div>
                        </div>
                     </motion.div>
                  );
               }

               return (
                  <motion.div 
                     key={msg.id}
                     initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                     {msg.type === 'agent' && (
                        <div className={`w-8 h-8 rounded-full border border-[#00C2FF] shrink-0 flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
                           <Bot size={14} className="text-[#00C2FF]" />
                        </div>
                     )}
                     {msg.type === 'user' && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          isDark ? 'bg-[#27272A] border-white/10' : 'bg-gray-200 border-gray-300'
                        }`}>
                           <User size={14} className={isDark ? 'text-[#A1A1AA]' : 'text-gray-600'} />
                        </div>
                     )}

                     <div className={`max-w-[85%] space-y-1`}>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                           msg.type === 'user' 
                              ? (isDark ? 'bg-[#27272A] text-white' : 'bg-gray-200 text-gray-900') + ' rounded-tr-none'
                              : (isDark ? 'bg-transparent text-[#D4D4D8]' : 'bg-transparent text-gray-700') + ' pl-0'
                        }`}>
                           {msg.content}
                        </div>
                        {msg.type === 'agent' && (
                           <div className="flex gap-2">
                              <button className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                                isDark 
                                  ? 'bg-[#18181B] border-white/5 hover:border-white/10 text-[#A1A1AA]' 
                                  : 'bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-600'
                              }`}>
                                 <Code2 size={12} />
                                 View Code
                              </button>
                              <button className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                                isDark 
                                  ? 'bg-[#18181B] border-white/5 hover:border-white/10 text-[#A1A1AA]' 
                                  : 'bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-600'
                              }`}>
                                 <RefreshCw size={12} />
                                 Regenerate
                              </button>
                           </div>
                        )}
                     </div>
                  </motion.div>
               );
            })}
            <div ref={messagesEndRef} />
         </div>

         {/* Input Area */}
         <div className={`p-4 border-t shrink-0 z-20 ${isDark ? 'bg-[#09090B] border-white/5' : 'bg-white border-gray-200'}`}>
            <div className="relative group">
               <div className={`relative rounded-xl flex flex-col border group-hover:border-[#00C2FF]/50 focus-within:!border-[#00C2FF] ${
                 isDark ? 'bg-[#121214] border-white/10' : 'bg-gray-50 border-gray-200'
               }`}>
                  <textarea
                     value={inputMessage}
                     onChange={(e) => setInputMessage(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                     placeholder="Ask Infinall to create something..."
                     className={`w-full bg-transparent border-none text-sm p-3 min-h-[50px] max-h-[150px] resize-none focus:ring-0 ${
                       isDark ? 'text-white placeholder-[#52525B]' : 'text-black placeholder-gray-400'
                     }`}
                     rows={1}
                  />
                  
                  <div className="flex items-center justify-between px-2 pb-2">
                     <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-lg hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] transition-all duration-300 group ${
                          isDark ? 'text-white/40' : 'text-gray-400'
                        }`} title="Visual Select">
                           <ScanEye size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className={`p-2 rounded-lg hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] transition-all duration-300 group ${
                          isDark ? 'text-white/40' : 'text-gray-400'
                        }`} title="Add Image">
                           <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button className={`p-2 rounded-lg hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] transition-all duration-300 group ${
                          isDark ? 'text-white/40' : 'text-gray-400'
                        }`} title="Add File">
                           <Paperclip size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                     </div>
                     
                     <div className="flex items-center gap-2">
                         <button 
                           onClick={handleSendMessage}
                           className="relative group p-2 rounded-lg bg-[#00C2FF] hover:bg-white text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                           disabled={!inputMessage.trim()}
                         >
                            <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                         </button>
                     </div>
                  </div>
               </div>
            </div>
            
            <p className={`text-[10px] text-center mt-3 ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>
               Infinall AI can make mistakes. Review generated code.
            </p>
         </div>
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className={`flex-1 flex flex-col relative min-w-0 ${isDark ? 'bg-[#0C0C0E]' : 'bg-gray-100'}`}>
         
         {/* Browser Chrome Header */}
         <div className={`h-14 border-b flex items-center justify-between px-4 shrink-0 ${
           isDark ? 'border-white/5 bg-[#0C0C0E]' : 'border-gray-200 bg-gray-50'
         }`}>
            {/* Left: Device Toggles */}
            <div className="flex items-center gap-1">
               <button className={`p-2 rounded-md transition-colors ${
                 isDark ? 'bg-[#18181B] text-white hover:bg-[#27272A]' : 'bg-white text-black hover:bg-gray-200 shadow-sm'
               }`}>
                  <Monitor size={14} />
               </button>
               <button className={`p-2 rounded-md transition-colors ${
                 isDark ? 'text-[#52525B] hover:text-white hover:bg-[#18181B]' : 'text-gray-400 hover:text-black hover:bg-white'
               }`}>
                  <Tablet size={14} />
               </button>
               <button className={`p-2 rounded-md transition-colors ${
                 isDark ? 'text-[#52525B] hover:text-white hover:bg-[#18181B]' : 'text-gray-400 hover:text-black hover:bg-white'
               }`}>
                  <Smartphone size={14} />
               </button>
            </div>

            {/* Center: Address Bar */}
            <div className="flex-1 max-w-xl mx-4">
               <div className="relative group">
                  <div className={`absolute inset-y-0 left-3 flex items-center pointer-events-none ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>
                     <Lock size={10} />
                  </div>
                  <input 
                     value={previewUrl}
                     readOnly
                     className={`w-full border rounded-lg py-1.5 pl-8 pr-8 text-xs text-center transition-colors focus:outline-none focus:border-[#00C2FF]/30 ${
                       isDark 
                         ? 'bg-[#18181B] border-white/5 text-[#A1A1AA] hover:border-white/10' 
                         : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                     }`}
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center">
                     <button className={`p-1 rounded transition-colors ${
                       isDark ? 'hover:bg-white/5 text-[#52525B] hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'
                     }`}>
                        <RefreshCcw size={10} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
               <button className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-colors ${
                 isDark 
                   ? 'border-white/10 text-white hover:bg-white/5' 
                   : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
               }`}>
                  <Share2 size={12} />
                  Share
               </button>
               <button className="px-3 py-1.5 rounded-lg bg-[#00C2FF] hover:bg-[#00A3D9] text-black text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,194,255,0.2)] transition-colors">
                  <Rocket size={12} />
                  Publish
               </button>
            </div>
         </div>

         {/* Canvas Area */}
         <div className={`flex-1 relative overflow-hidden flex items-center justify-center ${isDark ? 'bg-[#050505]' : 'bg-[#F3F4F6]'}`}>
            {/* Background Grid */}
            <div className={`absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] ${
              isDark 
                ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]' 
                : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
            }`} />

            {/* Preview Container */}
            <motion.div 
               className={`relative w-full h-full shadow-2xl overflow-hidden ${isDark ? 'bg-[#0C0C0E]' : 'bg-white'}`}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
            >
               <ImageWithFallback 
                  src={project.image || boltExample} 
                  alt="Live Preview" 
                  className={`w-full h-full object-contain ${isDark ? 'bg-[#18181B]' : 'bg-gray-50'}`}
               />

               {/* Loading Overlay (simulated) */}
               <AnimatePresence>
                  {messages[messages.length - 1]?.type === 'step' && messages[messages.length - 1]?.meta?.status === 'current' && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                     >
                        <div className={`flex flex-col items-center gap-4 p-6 border rounded-2xl shadow-2xl ${
                          isDark ? 'bg-[#09090B] border-white/10' : 'bg-white border-gray-200'
                        }`}>
                           <div className="relative">
                              <div className="w-12 h-12 rounded-full border-2 border-[#00C2FF] border-t-transparent animate-spin" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <Zap size={16} className="text-[#00C2FF]" />
                              </div>
                           </div>
                           <div className="text-center">
                              <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Updating Preview</h3>
                              <p className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-gray-500'}`}>Syncing changes...</p>
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>
         </div>
      </div>
    </div>
  );
}

// Helper component for the scan eye icon if not in lucide imports
function ScanEye({ size = 24, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="1" />
      <path d="M18.944 12.33a7 7 0 0 0-13.888 0" />
    </svg>
  );
}
