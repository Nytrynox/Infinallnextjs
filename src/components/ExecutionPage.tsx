import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Monitor, Smartphone, Share2, Rocket, 
  Code2, RefreshCw, CheckCircle2, ChevronRight, Layers, Zap,
  FileText, Folder, X, Sparkles, PanelLeftClose,
  Globe, Github, User, Eraser, Film, Image as LucideImage,
  LineChart, GripVertical, RotateCcw, Plus, MoreHorizontal
} from 'lucide-react';
import { sendMessageToGemini } from '../lib/gemini';
import headerImage from "figma:asset/74a9e054d0d2cce1dbfeb32015eaf5e85f3c29d6.png";
import logoImage from "figma:asset/4fc33435e781483b806c5f2349023d0fed528c67.png";
import sidebarIcon from "figma:asset/59b3d251322c7d4abc0f4aa77252142bc5d939d6.png";
import { OverviewSection } from './dashboard/OverviewSection';
import { AnalyticsSection } from './dashboard/AnalyticsSection';
import { CodeHealthSection } from './dashboard/CodeHealthSection';
import { AssetsSection } from './dashboard/AssetsSection';
import { DesignSystemSection } from './dashboard/DesignSystemSection';
import { AnalyzerSection } from './dashboard/AnalyzerSection';

interface ExecutionPageProps {
  prompt: string;
  onBack: () => void;
  theme?: 'dark' | 'light';
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'thinking' | 'completed';
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  isOpen?: boolean;
  language?: string;
}

const MOCK_FILES: FileNode[] = [
  { name: 'README.md', type: 'file', language: 'markdown', content: '# Project Initialized\n\nWaiting for generation...' },
];

interface Step {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

const LoadingSteps = ({ steps }: { steps: Step[] }) => (
  <div className="flex flex-col gap-3 py-2 w-full">
    {steps.map((step, i) => (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {step.status === 'completed' ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#00C2FF]">
              <CheckCircle2 size={16} />
            </motion.div>
          ) : step.status === 'active' ? (
            <div className="w-4 h-4 rounded-full border-2 border-[#00C2FF] border-t-transparent animate-spin" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-[#27272A]" />
          )}
        </div>
        <span className={`text-xs ${
          step.status === 'active' ? 'text-[#00C2FF] font-medium' : 
          step.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {step.label}
        </span>
      </motion.div>
    ))}
  </div>
);

export function ExecutionPage({ prompt, onBack, theme = 'dark' }: ExecutionPageProps) {
  const isDark = theme === 'dark'; // For now, we enforce dark mode as per "Arctic" aesthetic
  
  // State
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState<Step[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('App.tsx');
  const [files, setFiles] = useState<FileNode[]>(MOCK_FILES);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-manage sidebar visibility based on active tab
  useEffect(() => {
    setShowSidebar(activeTab === 'preview');
  }, [activeTab]);

  // Resize Logic
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Use RAF to throttle updates to screen refresh rate
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        // Calculate new width relative to window
        // Clamp between 240px and 800px
        const newWidth = Math.min(Math.max(e.clientX, 240), 800);
        setSidebarWidth(newWidth);
      });
    };

    const handleMouseUp = () => {
      stopResizing();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isResizing, stopResizing]);

  // Initialize
  useEffect(() => {
    // Initial user message
    setMessages([{
      id: '1',
      role: 'user',
      content: prompt,
      timestamp: new Date()
    }]);

    // Real AI response using Gemini (Proxied via OpenRouter)
    const fetchResponse = async () => {
      // Initialize loading state
      setLoadingSteps([
        { id: '1', label: 'Connecting to Neural Network...', status: 'active' },
      ]);

      try {
        const responseJson = await sendMessageToGemini(prompt);
        
        let parsedData;
        try {
          parsedData = JSON.parse(responseJson);
        } catch (e) {
          console.error("Failed to parse JSON", e);
          parsedData = {
            explanation: "Received raw text instead of structured data.",
            files: []
          };
        }

        const { explanation, files: newFiles } = parsedData;

        // Process files
        if (newFiles && Array.isArray(newFiles)) {
           const rootFiles: FileNode[] = newFiles.map((f: any) => ({
             name: f.name,
             type: 'file',
             language: f.language,
             content: f.content
           }));
           
           setFiles(rootFiles);

           const indexHtml = newFiles.find((f: any) => f.name === 'index.html');
           if (indexHtml) {
             setPreviewHtml(indexHtml.content);
             setSelectedFile('index.html');
           }
        }
        
        setLoadingSteps([
            { id: '1', label: 'Generation Complete', status: 'completed' }
        ]);

        setMessages(prev => [...prev, {
          id: '2',
          role: 'ai',
          content: explanation || "Project initialized.",
          timestamp: new Date(),
          status: 'completed'
        }]);
      } catch (error) {
        setMessages(prev => [...prev, {
          id: '2',
          role: 'ai',
          content: "I encountered an error connecting to the neural network. Please try again.",
          timestamp: new Date(),
          status: 'completed'
        }]);
      } finally {
        setIsPreviewLoading(false);
      }
    };

    fetchResponse();
  }, [prompt]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsPreviewLoading(true);

    // Call Gemini API
    try {
      const responseJson = await sendMessageToGemini(inputValue);
      let parsedData;
      try {
        parsedData = JSON.parse(responseJson);
      } catch (e) {
        parsedData = { explanation: "Failed to parse response.", files: [] };
      }
      
      const { explanation, files: newFiles } = parsedData;

      if (newFiles && Array.isArray(newFiles)) {
           const rootFiles: FileNode[] = newFiles.map((f: any) => ({
             name: f.name,
             type: 'file',
             language: f.language,
             content: f.content
           }));
           setFiles(rootFiles);
           
           const indexHtml = newFiles.find((f: any) => f.name === 'index.html');
           if (indexHtml) {
             setPreviewHtml(indexHtml.content);
             setSelectedFile('index.html');
           }
      }

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: explanation || "Changes applied.",
        timestamp: new Date(),
        status: 'completed'
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I apologize, but I couldn't process that request.",
        timestamp: new Date(),
        status: 'completed'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const toggleFolder = (folderName: string) => {
    const toggle = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.name === folderName && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) };
        }
        return node;
      });
    };
    setFiles(toggle(files));
  };

  // --- UI COMPONENTS ---

  const getFileIcon = (name: string) => {
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileText size={14} className="text-blue-300" />;
    if (name.endsWith('.css')) return <FileText size={14} className="text-sky-300" />;
    if (name.match(/\.(png|jpg|jpeg|svg)$/)) return <LucideImage size={14} className="text-purple-300" />;
    if (name.match(/\.(mp4|webm|mov)$/)) return <Film size={14} className="text-red-300" />;
    return <FileText size={14} className="text-gray-400" />;
  };

  const FileTreeItem = ({ node, depth = 0 }: { node: FileNode; depth?: number }) => (
    <div className="select-none font-mono">
      <div 
        className={`flex items-center gap-2 py-1.5 px-3 cursor-pointer transition-all text-xs ${
          node.name === selectedFile && node.type === 'file'
            ? 'bg-[#00C2FF]/10 text-[#00C2FF] border-r-2 border-[#00C2FF]' 
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${depth * 12 + 16}px` }}
        onClick={() => {
          if (node.type === 'folder') toggleFolder(node.name);
          else setSelectedFile(node.name);
        }}
      >
        {node.type === 'folder' ? (
          <ChevronRight size={12} className={`transition-transform duration-200 ${node.isOpen ? 'rotate-90 text-gray-100' : 'text-gray-500'}`} />
        ) : (
          <div className="w-3" /> 
        )}
        
        {node.type === 'folder' ? (
          <Folder size={14} className={node.isOpen ? 'text-blue-400' : 'text-blue-500/70'} />
        ) : (
          getFileIcon(node.name)
        )}
        <span>{node.name}</span>
      </div>
      
      {node.type === 'folder' && node.isOpen && node.children && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          {node.children.map((child) => (
            <FileTreeItem key={child.name} node={child} depth={depth + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#050505] text-gray-200 font-sans selection:bg-[#00C2FF]/30 selection:text-[#00C2FF]">
      
      {/* --- HEADER (Advanced Futuristic) --- */}
      <div className="h-16 w-full bg-[#050505] border-b border-[#1F1F23] flex items-center justify-between px-6 z-50 select-none backdrop-blur-md bg-opacity-90">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
           <button 
             onClick={onBack} 
             className="group p-2 rounded-full hover:bg-white/5 transition-all duration-300"
           >
              <ArrowLeft size={18} className="text-gray-400 group-hover:text-white transition-colors" />
           </button>
           
           <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center">
                 <img src={logoImage} alt="Infinall Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-base font-bold text-white tracking-wide font-sans">Infinall AI</span>
           </div>
        </div>

        {/* Center: Control Hub */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
           
           {/* Navigation Pill */}
           <div className="flex items-center p-1.5 rounded-2xl bg-[#0A0A0C] border border-[#1F1F23] shadow-2xl shadow-black/50">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeTab === 'preview' 
                    ? 'bg-[#1F1F23] text-white shadow-inner shadow-white/5' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <Globe size={14} />
                <span>Preview</span>
              </button>
              
              <div className="w-[1px] h-5 bg-[#1F1F23] mx-2" />
              
              <div className="flex items-center gap-1">

                 <button 
                   onClick={() => setActiveTab('code')}
                   title="Source Code"
                   className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
                     activeTab === 'code' ? 'text-white bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                   }`}
                 >
                    <Code2 size={16} />
                 </button>
                 <button 
                   onClick={() => setIsDashboardOpen(true)}
                   title="Dashboard"
                   className="p-2 text-gray-500 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center"
                 >
                    <Layers size={16} />
                 </button>

                        






              </div>
           </div>

        </div>

        {/* Right: Actions & Publishing */}
        <div className="flex items-center gap-4">
           
           {/* Address Bar (Moved from Toolbar) */}


           <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1F1F23] bg-[#0A0A0C] text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-300 text-xs font-medium group">
             <Github size={14} className="group-hover:text-white transition-colors" />
             <span>Star</span>
           </button>
           
           <button className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
             <Share2 size={18} />
           </button>
           
           <button 
             onClick={() => setIsDeploying(true)}
             className="group relative overflow-hidden flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-[#00C2FF] text-black text-xs font-bold transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)]"
           >
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             {isDeploying ? <RefreshCw size={14} className="animate-spin relative" /> : <Rocket size={14} className="relative group-hover:-translate-y-0.5 transition-transform" />}
             <span className="relative">Publish</span>
           </button>
        </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT SIDEBAR (CHAT & EXPLORER) --- */}
        <AnimatePresence mode="wait">
          {showSidebar && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: sidebarWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: isResizing ? 0 : 0.3, ease: "easeInOut" }}
              className="flex flex-col border-r border-[#1F1F23] bg-[#09090B] relative"
            >
              {/* Tabs */}
              <div className="flex items-center p-2 border-b border-[#1F1F23] gap-1">
                 <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#161618] border border-[#27272A] text-xs font-medium text-white shadow-sm max-w-[200px]">
                   <div className="w-2 h-2 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF] shrink-0" />
                   <span className="truncate">{prompt || "New Project"}</span>
                 </div>
              </div>

              {/* History Overlay */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    className="absolute top-[53px] bottom-0 left-0 right-0 z-20 bg-[#09090B]/95 backdrop-blur-md border-r border-[#1F1F23] p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold uppercase text-gray-500">Version History</h3>
                      <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-white"><X size={14} /></button>
                    </div>
                    <div className="space-y-2">
                       {['v1.0 - Initial Build'].map((ver, i) => (
                         <div key={i} className={`px-3 py-3 rounded-lg text-xs cursor-pointer border ${
                           i === 0 
                             ? 'bg-[#00C2FF]/10 border-[#00C2FF]/30 text-[#00C2FF]' 
                             : 'bg-[#161618] border-[#27272A] text-gray-400 hover:border-gray-500'
                         }`}>
                           <div className="font-medium">{ver}</div>
                           <div className="text-[10px] opacity-60 mt-1">Edited just now</div>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content Area */}
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {msg.role === 'user' ? (
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#27272A] shadow-sm ring-1 ring-white/5">
                           <img 
                             src="https://images.unsplash.com/photo-1615843423179-bea071facf96?auto=format&fit=crop&w=100&q=80" 
                             alt="User" 
                             className="w-full h-full object-cover"
                           />
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden">
                           <img src={logoImage} alt="Infinall Logo" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                       <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                         msg.role === 'user' 
                           ? 'bg-[#1F1F23] text-gray-100 border border-[#27272A] rounded-tr-sm' 
                           : 'bg-[#0D0D0F] text-gray-300 border border-[#1F1F23] rounded-tl-sm'
                       }`}>
                         {msg.content}
                       </div>
                       <span className="text-[10px] text-gray-600 font-mono">
                         {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                    </div>
                  </div>
                ))}
                
                {isPreviewLoading && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="w-full bg-[#161618] border border-[#27272A] rounded-xl p-4 shadow-lg"
                   >
                     <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#27272A]">
                       <div className="w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center">
                         <RefreshCw size={14} className="text-[#00C2FF] animate-spin" />
                       </div>
                       <span className="text-sm font-medium text-white">Generating Update...</span>
                     </div>
                     <LoadingSteps steps={loadingSteps} />
                   </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#1F1F23] bg-[#09090B]">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00C2FF] to-purple-600 rounded-xl opacity-20 group-focus-within:opacity-50 transition-opacity blur" />
                  <div className="relative flex flex-col gap-2 p-3 bg-[#0D0D0F] rounded-xl border border-[#27272A] group-focus-within:border-[#00C2FF]/50 transition-colors">
                     <textarea
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault();
                           handleSendMessage();
                         }
                       }}
                       placeholder="Describe your next feature..."
                       className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-600 resize-none h-[60px]"
                     />
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-1">
                         <button className="p-1.5 rounded-lg hover:bg-[#1F1F23] text-gray-500 hover:text-gray-300 transition-colors" title="Attach Image">
                           <LucideImage size={14} />
                         </button>
                         <button className="p-1.5 rounded-lg hover:bg-[#1F1F23] text-gray-500 hover:text-gray-300 transition-colors" title="Attach File">
                           <FileText size={14} />
                         </button>
                         <div className="w-[1px] h-4 bg-[#27272A] mx-1" />
                         <button className="p-1.5 rounded-lg hover:bg-[#1F1F23] text-gray-500 hover:text-gray-300 transition-colors" title="Clear Context">
                           <Eraser size={14} />
                         </button>
                       </div>
                       <button 
                         onClick={handleSendMessage}
                         disabled={!inputValue.trim()}
                         className="p-2 rounded-lg bg-[#00C2FF] hover:bg-[#00A0D6] text-black disabled:opacity-50 disabled:bg-[#1F1F23] disabled:text-gray-500 transition-all"
                       >
                         <ArrowLeft size={16} className="rotate-90" />
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resize Handle */}
        {showSidebar && (
          <div
            className="w-4 -ml-2 z-50 cursor-col-resize flex items-center justify-center relative group select-none outline-none"
            onMouseDown={startResizing}
          >
             {/* Visual Line (Glows on Hover) */}
             <div className="w-[1px] h-full bg-transparent group-hover:bg-[#00C2FF] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,194,255,0.6)] opacity-0 group-hover:opacity-100" />
             
             {/* Floating Grip Pill */}
             <div className="absolute top-1/2 -translate-y-1/2 h-12 w-4 bg-[#09090B] border border-[#27272A] rounded-full flex items-center justify-center shadow-2xl group-hover:border-[#00C2FF]/50 group-hover:shadow-[0_0_15px_rgba(0,194,255,0.2)] transition-all duration-300 group-active:scale-95 pointer-events-none">
                <GripVertical size={12} className="text-gray-600 group-hover:text-[#00C2FF] transition-colors duration-300" />
             </div>
          </div>
        )}

        {/* --- RIGHT CONTENT (PREVIEW / CODE) --- */}
        <div className="flex-1 flex flex-col bg-[#050505] relative">
          
          {/* Content Toolbar */}
          <div className="h-10 flex items-center justify-between px-4 border-b border-[#1F1F23] bg-[#09090B]">
             <div className="flex items-center gap-2">
               <button 
                 onClick={() => setShowSidebar(!showSidebar)}
                 className={`p-1.5 rounded-md hover:bg-[#1F1F23] transition-colors ${!showSidebar ? 'text-[#00C2FF]' : 'text-gray-500'}`}
               >
                 <PanelLeftClose size={14} className={!showSidebar ? 'rotate-180' : ''} />
               </button>
             </div>

             {/* Top Bar for Browser Preview */}
             <AnimatePresence>
             {activeTab === 'preview' && (
               <motion.div 
                 initial={{ opacity: 0, y: -5 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -5 }}
                 className="flex-1 flex justify-center px-4"
               >
                 <div className="relative flex items-center gap-3 bg-[#09090B] border border-[#27272A] rounded-full p-1.5 px-4 shadow-xl shadow-black/50 max-w-xl w-full h-9 group transition-all duration-300 hover:border-[#00C2FF]/30 hover:shadow-[0_0_20px_rgba(0,194,255,0.1)]">
                    {/* Security Indicator */}
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500">
                       <CheckCircle2 size={10} strokeWidth={2.5} />
                    </div>

                    {/* Divider */}
                    <div className="h-3 w-[1px] bg-[#27272A]" />

                    {/* Address */}
                    <div className="flex items-center justify-center gap-0.5 flex-1 text-[11px] font-mono truncate tracking-wide">
                      <span className="text-gray-600 select-none">https://</span>
                      <span className="text-[#E0FFFF] group-hover:text-[#00C2FF] transition-colors duration-300">preview-8291.infinall.app</span>
                    </div>

                    {/* Divider */}
                    <div className="h-3 w-[1px] bg-[#27272A]" />

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors" title="Reload">
                        <RotateCcw size={10} />
                      </button>
                      <button className="p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors" title="Open External">
                        <Globe size={10} />
                      </button>
                    </div>
                 </div>
               </motion.div>
             )}
             </AnimatePresence>


             <div className="w-8" />
          </div>

          {/* Main Display Area */}
          <div className="flex-1 overflow-hidden relative flex flex-col p-4">
            
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00C2FF]/5 rounded-full blur-[120px]" />
               <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#7000FF]/5 rounded-full blur-[120px]" />
            </div>

            {activeTab === 'preview' ? (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  width: activeView === 'mobile' ? '375px' : activeView === 'tablet' ? '768px' : '100%'
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="relative flex-1 bg-white rounded-xl shadow-2xl overflow-hidden border border-[#27272A] mx-auto w-full group z-10"
              >
                 {isPreviewLoading && (
                   <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md">
                      <div className="relative w-24 h-24">
                           <div className="absolute inset-0 rounded-full border-2 border-[#27272A]" />
                           <div className="absolute inset-0 rounded-full border-t-2 border-[#00C2FF] animate-spin" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Sparkles size={24} className="text-[#00C2FF] animate-pulse" />
                           </div>
                      </div>
                      <span className="mt-6 text-[#00C2FF] text-xs font-bold tracking-[0.3em] animate-pulse uppercase">Compiling Assets</span>
                   </div>
                 )}
                 <PreviewContent html={previewHtml} />
              </motion.div>
            ) : (
              <div className="w-full h-full flex flex-col rounded-xl border border-[#ffffff]/10 bg-[#0A0A0C]/60 backdrop-blur-2xl overflow-hidden shadow-2xl z-10 ring-1 ring-[#ffffff]/5">
                {/* IDE Layout */}
                <div className="flex-1 flex overflow-hidden">
                   {/* Explorer Panel */}
                   <div className="w-64 border-r border-[#ffffff]/5 bg-[#000000]/20 flex flex-col hidden md:flex">
                      <div className="h-10 px-4 flex items-center justify-between text-[10px] font-bold text-[#888888] tracking-[0.2em] uppercase bg-[#000000]/20">
                        <span>Project</span>
                        <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity">
                           <Plus size={12} className="hover:text-white cursor-pointer" />
                           <MoreHorizontal size={12} className="hover:text-white cursor-pointer" />
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {files.map((f, i) => (
                           <div key={i} className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md cursor-pointer text-xs group transition-all duration-200 ${f.name === selectedFile ? 'bg-[#00C2FF]/10 text-white shadow-[0_0_15px_rgba(0,194,255,0.1)] border border-[#00C2FF]/20' : 'text-[#888888] hover:text-gray-200 hover:bg-[#ffffff]/5 border border-transparent'}`}>
                              {f.type === 'folder' ? <Folder size={14} className={f.name === selectedFile ? 'text-[#00C2FF]' : 'text-gray-600 group-hover:text-gray-400'} /> : <FileText size={14} className={f.name === selectedFile ? 'text-[#00C2FF]' : 'text-gray-600 group-hover:text-gray-400'} />}
                              <span className="truncate font-medium">{f.name}</span>
                              {f.name === selectedFile && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]" />}
                           </div>
                        ))}
                      </div>
                   </div>
                   
                   {/* Editor Area */}
                   <div className="flex-1 flex flex-col bg-transparent relative">
                     {/* Editor Tabs */}
                     <div className="flex items-center overflow-x-auto border-b border-[#ffffff]/5 bg-[#000000]/40">
                       {[selectedFile].map(file => (
                         <div key={file} className="relative flex items-center gap-2 px-5 h-10 bg-[#0A0A0C]/50 border-r border-[#ffffff]/5 min-w-[160px] cursor-pointer group">
                           <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent shadow-[0_0_8px_#00C2FF]" />
                           {getFileIcon(file)}
                           <span className="text-xs text-gray-200 font-medium tracking-wide">{file}</span>
                           <button className="ml-auto text-gray-600 hover:text-white transition-colors">
                              <X size={12} />
                           </button>
                         </div>
                       ))}
                     </div>

                     <div className="flex-1 flex overflow-hidden relative">
                        {/* Line Numbers */}
                        <div className="w-14 flex flex-col items-end py-6 pr-4 text-xs font-mono select-none text-[#444444] bg-[#000000]/10 border-r border-[#ffffff]/5">
                           {[...Array(50)].map((_, i) => (
                             <div key={i} className="leading-6 hover:text-[#666666] transition-colors cursor-pointer">{i + 1}</div>
                           ))}
                        </div>
                        
                        {/* Code Content */}
                        <div className="flex-1 p-6 font-mono text-sm text-[#E0E0E0] overflow-auto custom-scrollbar leading-6 selection:bg-[#00C2FF]/30 selection:text-white">
                           <pre className="outline-none">
                             {files.find(f => f.name === selectedFile || (f.children && f.children.find(c => c.name === selectedFile)))?.content || '// Select a file to view code'}
                           </pre>
                        </div>
                     </div>
                   </div>
                </div>

                {/* Integrated Terminal Panel */}
                <div className="h-48 border-t border-[#ffffff]/10 bg-[#000000]/30 backdrop-blur-md flex flex-col">
                   {/* Terminal Tabs */}
                   <div className="h-9 flex items-center px-4 gap-6 text-[11px] font-medium text-[#666666] border-b border-[#ffffff]/5 bg-[#000000]/20">
                    <button className="flex items-center gap-2 text-white relative h-full px-1 transition-colors group">
                       <Terminal size={12} className="text-[#00C2FF] group-hover:text-[#40D0FF] transition-colors" />
                       <span className="group-hover:text-[#E0E0E0] transition-colors">Terminal</span>
                       <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]" />
                    </button>
                    
                    <div className="ml-auto flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10B981] animate-pulse" />
                          <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Connected</span>
                       </div>
                       <div className="w-[1px] h-3 bg-[#ffffff]/10" />
                       <button className="hover:text-white transition-colors"><Eraser size={12} /></button>
                       <button className="hover:text-white transition-colors"><ChevronDown size={12} /></button>
                    </div>
                  </div>
                  
                  {/* Terminal Output */}
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-[12px] space-y-2 custom-scrollbar">
                     <div className="flex gap-2 items-center opacity-60">
                        <span className="text-gray-500">$</span>
                        <span className="text-gray-300">npm run dev</span>
                     </div>
                     
                     <div className="pl-4 space-y-1.5 border-l border-[#ffffff]/5 my-2">
                        <div className="flex gap-3 text-emerald-400/90">
                            <span className="text-[#00C2FF]">➜</span>
                            <span className="font-bold text-white">Local:</span>
                            <span className="underline decoration-emerald-500/30 underline-offset-4 cursor-pointer hover:text-emerald-300 hover:decoration-emerald-500 transition-all">http://localhost:5173/</span>
                        </div>
                        <div className="flex gap-3 text-gray-500">
                            <span className="text-[#00C2FF]">➜</span>
                            <span className="font-bold text-gray-400">Network:</span>
                            <span>use --host to expose</span>
                        </div>
                     </div>

                     <div className="pt-2 flex items-center gap-2 text-blue-400/80">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/10 border border-blue-500/20 font-bold">INFO</span>
                        <span>[vite] precipitating...</span>
                     </div>
                     
                     <div className="flex items-center gap-2 text-gray-500/80">
                         <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                         <span>[vite] build started...</span>
                     </div>
                     
                     <div className="flex items-center gap-2 text-emerald-400/80">
                         <CheckCircle2 size={12} />
                         <span>[vite] build completed in 42ms.</span>
                     </div>

                     <div className="flex gap-2 pt-2 items-center mt-auto">
                        <span className="text-[#00C2FF] font-bold shadow-blue-glow">➜</span>
                        <span className="w-2.5 h-5 bg-[#00C2FF] animate-pulse shadow-[0_0_10px_#00C2FF]" />
                     </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Terminal Panel - REMOVED (Merged into IDE layout) */}

          </div>
        </div>

      </div>

      {/* --- DASHBOARD MODAL (NEXUS OVERLAY) --- */}
      <AnimatePresence>
        {isDashboardOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDashboardOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#09090B]/90 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-5xl h-[700px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex overflow-hidden relative z-10" 
              onClick={(e) => e.stopPropagation()}
            >
               
               {/* Sidebar (NEXUS style) */}
               <div className="w-64 flex-none border-r border-white/10 bg-black/40 flex flex-col">
                  {/* Header */}
                  <div className="h-16 flex items-center px-5 border-b border-white/10">
                     <span className="font-semibold text-white tracking-wide text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">NEXUS</span>
                     <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#00C2FF]/10 text-[#00C2FF] tracking-wider border border-[#00C2FF]/20 shadow-[0_0_10px_rgba(0,194,255,0.2)]">BETA</span>
                  </div>
                  
                  {/* Navigation List */}
                  <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                     {/* Overview (Active) */}
                     <button onClick={() => document.getElementById('section-overview')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] transition-all shadow-[0_0_10px_rgba(0,194,255,0.1)] border border-[#00C2FF]/20">
                        <Monitor size={18} strokeWidth={2} />
                        <span className="text-sm font-medium">Overview</span>
                     </button>

                     {/* Analytics */}
                     <button onClick={() => document.getElementById('section-analytics')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                        <LineChart size={18} strokeWidth={2} className="group-hover:text-[#00C2FF] transition-colors" />
                        <span className="text-sm font-medium">Analytics</span>
                     </button>

                     {/* Analyzer (New) */}
                     <button onClick={() => document.getElementById('section-analyzer')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap size={18} strokeWidth={2} className="group-hover:text-purple-400 transition-colors" />
                        <span className="text-sm font-medium">Competitor AI</span>
                     </button>

                     {/* Code Health */}
                     <button onClick={() => document.getElementById('section-code-health')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                        <Code2 size={18} strokeWidth={2} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-sm font-medium">Code Health</span>
                     </button>

                     {/* Assets */}
                     <button onClick={() => document.getElementById('section-assets')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                        <LucideImage size={18} strokeWidth={2} className="group-hover:text-pink-400 transition-colors" />
                        <span className="text-sm font-medium">Assets</span>
                     </button>
                     
                     {/* Design */}
                     <button onClick={() => document.getElementById('section-design')?.scrollIntoView({ behavior: 'smooth' })} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group">
                        <Sparkles size={18} strokeWidth={2} className="group-hover:text-amber-400 transition-colors" />
                        <span className="text-sm font-medium">Design System</span>
                     </button>
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-white/10">
                     <button onClick={() => setIsDashboardOpen(false)} className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all text-xs font-medium uppercase tracking-wide">
                        <PanelLeftClose size={14} />
                        Collapse View
                     </button>
                  </div>
               </div>

               {/* Content Area */}
               <div className="flex-1 overflow-y-auto bg-black/60 p-8 scroll-smooth relative">
                  <div className="absolute inset-0 pointer-events-none">
                     <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00C2FF]/5 rounded-full blur-[100px]" />
                     <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[100px]" />
                  </div>
                  <div className="max-w-5xl mx-auto pb-20 relative z-10">
                     
                     {/* Overview Section */}
                     <OverviewSection />

                     <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                     {/* Analytics Section */}
                     <AnalyticsSection />

                     <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                     {/* Analyzer Section */}
                     <AnalyzerSection />

                     <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                     {/* Code Health Section */}
                     <CodeHealthSection />

                     <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                     {/* Assets Section */}
                     <AssetsSection />

                     <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                     {/* Design System Section */}
                     <DesignSystemSection />
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- PREVIEW CONTENT ---
function PreviewContent({ html }: { html?: string }) {
  if (html) {
    return (
      <iframe 
        srcDoc={html}
        className="w-full h-full border-none bg-white"
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#050505] via-[#0A0A0C] to-[#050505] text-white overflow-y-auto flex items-center justify-center p-8">
      
      {/* Empty State / Initial View */}
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#1F1F23] to-[#0A0A0C] border border-[#27272A] flex items-center justify-center shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,194,255,0.1),transparent_70%)]" />
           <div className="relative z-10 w-12 h-12 rounded-xl bg-[#00C2FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Zap size={24} className="text-black fill-current" />
           </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Ready to Execute</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            I'm connected to the neural network. Describe your application requirements, and I'll generate the production architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
           {[
             { label: 'SaaS Dashboard', icon: Layers },
             { label: 'Landing Page', icon: Globe },
             { label: 'E-Commerce', icon: Smartphone },
             { label: 'Portfolio', icon: User },
           ].map((item, i) => (
             <button key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#161618] border border-[#27272A] hover:border-[#00C2FF]/50 hover:bg-[#00C2FF]/5 transition-all group text-left">
               <div className="p-2 rounded-lg bg-[#0A0A0C] text-gray-400 group-hover:text-[#00C2FF] transition-colors">
                 <item.icon size={16} />
               </div>
               <span className="text-xs font-medium text-gray-300 group-hover:text-white">{item.label}</span>
             </button>
           ))}
        </div>
      </div>

    </div>
  );
}