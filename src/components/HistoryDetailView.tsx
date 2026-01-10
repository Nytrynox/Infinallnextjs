import React, { useState, useEffect, useRef } from 'react';
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
  Plus,
  Clock,
  Calendar,
  FileText,
  Download,
  Trash2,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  content: string;
  category: string;
  author: string;
}

interface HistoryDetailViewProps {
  item: HistoryItem;
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

export function HistoryDetailView({ item, onBack, theme = 'dark' }: HistoryDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'doc'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const isDark = theme === 'dark';

  // Initialize Chat History based on the History Item
  useEffect(() => {
    // Simulate a past conversation that led to this history item
    const initialMessages: Message[] = [
      {
        id: '1',
        type: 'user',
        content: `Run analysis for: ${item.title}`,
        timestamp: item.timestamp.split('•')[1]?.trim() || '10:00 AM'
      },
      {
        id: '2',
        type: 'system',
        content: 'Accessing Archives...',
        timestamp: '10:00 AM'
      },
      {
        id: '3',
        type: 'agent',
        content: `I've retrieved the ${item.category.toLowerCase()} data you requested. Here is the context for ${item.title}.`,
        timestamp: '10:01 AM'
      },
      {
        id: '4',
        type: 'step',
        content: 'Data Retrieval',
        timestamp: '10:01 AM',
        meta: { status: 'complete', icon: Database, details: 'Fetched 142 records from encrypted storage.' }
      },
      {
        id: '5',
        type: 'step',
        content: 'Processing & Formatting',
        timestamp: '10:02 AM',
        meta: { status: 'complete', icon: FileText, details: 'Applied standard Arctic formatting protocols.' }
      },
      {
        id: '6',
        type: 'agent',
        content: "Here is the summary of the archived session.",
        timestamp: '10:02 AM'
      }
    ];
    setMessages(initialMessages);
  }, [item]);

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
        content: "This is an archived session. Starting a new context...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAgentMsg]);
    }, 1000);
  };

  return (
    <div className={`w-full h-full flex flex-col md:flex-row font-['Inter'] overflow-hidden selection:bg-[#00C2FF]/30 ${
      isDark ? 'bg-[#050505] text-white' : 'bg-gray-50 text-black'
    }`}>
      
      {/* LEFT PANEL: Chat History */}
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
                     {item.title}
                     <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${isDark ? 'bg-white/10 text-[#8B949E]' : 'bg-gray-100 text-gray-500'}`}>
                        Archived
                     </span>
                  </h1>
                  <p className={`text-[10px] ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>
                    {item.timestamp} • {item.author}
                  </p>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <button className={`p-2 rounded-lg transition-colors ${
                 isDark ? 'hover:bg-white/5 text-[#8B949E]' : 'hover:bg-gray-100 text-gray-500'
               }`} title="Export">
                  <Download size={16} />
               </button>
               <button className={`p-2 rounded-lg transition-colors ${
                 isDark ? 'hover:bg-white/5 text-[#8B949E]' : 'hover:bg-gray-100 text-gray-500'
               }`} title="Delete">
                  <Trash2 size={16} />
               </button>
            </div>
         </div>

         {/* Chat Feed */}
         <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative">
            <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b via-transparent to-transparent h-8 z-10 ${
              isDark ? 'from-[#09090B]' : 'from-white'
            }`} />
            
            {messages.map((msg, index) => {
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
                  
                  return (
                     <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="my-2"
                     >
                        <div className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                           isDark ? 'bg-[#18181B] border-white/5' : 'bg-gray-50 border-gray-200'
                        }`}>
                           <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              isDark ? 'bg-[#27272A] text-[#8B949E]' : 'bg-gray-200 text-gray-500'
                           }`}>
                              <Icon size={12} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                 <h4 className={`text-xs font-semibold ${isDark ? 'text-[#D4D4D8]' : 'text-gray-700'}`}>
                                    {msg.content}
                                 </h4>
                                 <span className={`text-[10px] ${isDark ? 'text-[#52525B]' : 'text-gray-400'}`}>{msg.timestamp}</span>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-gray-500'}`}>
                                 {msg.meta?.details}
                              </p>
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
                           <History size={14} className="text-[#00C2FF]" />
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
                     </div>
                  </motion.div>
               );
            })}
            <div ref={messagesEndRef} />
         </div>

         {/* Input Area (Read-Only/Follow-up) */}
         <div className={`p-4 border-t shrink-0 z-20 ${isDark ? 'bg-[#09090B] border-white/5' : 'bg-white border-gray-200'}`}>
            <div className="relative group opacity-80 hover:opacity-100 transition-opacity">
               <div className={`relative rounded-xl flex flex-col border transition-colors duration-300 focus-within:!border-[#00C2FF] ${
                 isDark ? 'bg-[#121214] border-white/10' : 'bg-gray-50 border-gray-200'
               }`}>
                  <textarea
                     value={inputMessage}
                     onChange={(e) => setInputMessage(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                     placeholder="Add a note or follow up..."
                     className={`w-full bg-transparent border-none text-sm p-3 min-h-[50px] max-h-[150px] resize-none focus:ring-0 ${
                       isDark ? 'text-white placeholder-[#52525B]' : 'text-black placeholder-gray-400'
                     }`}
                     rows={1}
                  />
                  
                  <div className="flex items-center justify-between px-2 pb-2">
                     <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-lg hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] transition-all duration-300 group ${
                          isDark ? 'text-white/40' : 'text-gray-400'
                        }`} title="Attach">
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
         </div>
      </div>

      {/* RIGHT PANEL: History Details / Document View */}
      <div className={`flex-1 flex flex-col relative min-w-0 ${isDark ? 'bg-[#0C0C0E]' : 'bg-gray-100'}`}>
         
         {/* Document Toolbar */}
         <div className={`h-14 border-b flex items-center justify-between px-4 shrink-0 ${
           isDark ? 'border-white/5 bg-[#0C0C0E]' : 'border-gray-200 bg-gray-50'
         }`}>
            {/* Left: Metadata */}
            <div className="flex items-center gap-3">
               <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                 isDark ? 'bg-[#18181B] border-white/10 text-white' : 'bg-white border-gray-200 text-black'
               }`}>
                  {item.category}
               </div>
               <div className={`h-4 w-px ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
               <span className={`text-xs ${isDark ? 'text-[#8B949E]' : 'text-gray-500'}`}>Read-only Mode</span>
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
               <button className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-colors ${
                 isDark 
                   ? 'border-white/10 text-white hover:bg-white/5' 
                   : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
               }`}>
                  <Maximize2 size={12} />
                  Full Screen
               </button>
            </div>
         </div>

         {/* Document Canvas */}
         <div className={`flex-1 relative overflow-hidden flex items-center justify-center p-8 ${isDark ? 'bg-[#050505]' : 'bg-[#F3F4F6]'}`}>
            {/* Background Grid */}
            <div className={`absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] ${
              isDark 
                ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]' 
                : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
            }`} />

            {/* Document Paper */}
            <motion.div 
               className={`relative w-full max-w-3xl h-full shadow-2xl overflow-y-auto rounded-xl border ${
                 isDark ? 'bg-[#09090B] border-white/10' : 'bg-white border-gray-200'
               }`}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
            >
               <div className="p-10 md:p-16 space-y-8">
                  {/* Doc Header */}
                  <div className="border-b pb-8 border-dashed border-gray-700/20">
                    <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                      {item.title}
                    </h1>
                    <div className="flex items-center gap-4 text-xs font-mono opacity-60">
                      <span>ID: {item.id.toUpperCase()}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>
                  </div>

                  {/* Doc Content */}
                  <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.content}
                    </p>
                    
                    <div className={`mt-8 p-6 rounded-lg border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                      <h3 className={`text-sm font-bold uppercase tracking-wide mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                        Executive Summary
                      </h3>
                      <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] mt-1.5 shrink-0" />
                           <span>Analysis completed successfully with 99.9% data integrity.</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] mt-1.5 shrink-0" />
                           <span>Key performance indicators show a positive trend.</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] mt-1.5 shrink-0" />
                           <span>Recommended actions have been queued for approval.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
               </div>
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
