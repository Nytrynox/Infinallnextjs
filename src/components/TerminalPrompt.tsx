import React, { useState, useRef, useEffect } from 'react';
import { Plus, Paperclip, MessageSquare, Mic, ArrowUp, ChevronDown, Image, Globe, Code, File, FileText, Wand2, Github, Check, Bot, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TerminalPromptProps {
  username: string;
  initialPrompt?: string;
}

export function TerminalPrompt({ username, initialPrompt = '' }: TerminalPromptProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Gemini 3');

  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const agentButtonRef = useRef<HTMLButtonElement>(null);
  const modelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (plusButtonRef.current && !plusButtonRef.current.contains(event.target as Node)) {
        setShowPlusDropdown(false);
      }
      if (agentButtonRef.current && !agentButtonRef.current.contains(event.target as Node)) {
        setShowAgentDropdown(false);
      }
      if (modelButtonRef.current && !modelButtonRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickActions = [
    { 
      icon: Image, 
      label: 'Generate Visuals', 
      description: 'Create high-fidelity assets',
      command: 'Generate a high-fidelity series of isometric 3D illustrations for a premium fintech dashboard using the Arctic Cyan palette.'
    },
    { 
      icon: Globe, 
      label: 'Search Web', 
      description: 'Query real-time global data',
      command: 'Analyze real-time market sentiment and technical indicators for emerging AI infrastructure providers in the Q1 2026 window.'
    },
    { 
      icon: Code, 
      label: 'Execute Logic', 
      description: 'Deploy algorithmic workflows',
      command: 'Draft and simulate a high-performance Rust-based execution engine for processing asynchronous telemetry data from edge nodes.'
    },
    { 
      icon: MessageSquare, 
      label: 'Draft Strategy', 
      description: 'Formulate executive plans',
      command: 'Develop a comprehensive enterprise GTM strategy for an autonomous execution ecosystem targeting Fortune 500 logistics firms.'
    },
  ];

  return (
    <div className="max-w-3xl mx-auto w-full pt-8 pb-10 flex flex-col items-center">
      {/* Dynamic Greeting */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 leading-[1.1]">
          Execute <span className="arctic-text-gradient">visionary</span> <br />
          <span className="arctic-text-gradient">strategies</span> today.
        </h2>
      </div>

      <div className="w-full bg-[#0D1117] border border-[#30363D]/50 rounded-[24px] overflow-visible shadow-2xl shadow-black/20 focus-within:border-[#00C2FF]/40 transition-all duration-300">
        <div className="px-6 pt-5 pb-2 relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Infinall to build, execute or analyze..."
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-[#444] resize-none min-h-[60px] text-base font-light tracking-wide leading-relaxed selection:bg-[#00C2FF]/30 transition-all duration-300"
          />
        </div>
        
        <div className="flex items-center justify-between px-5 pb-4 pt-1">
          <div className="flex items-center gap-3">
            {/* Plus Dropdown */}
            <div className="relative">
              <button 
                ref={plusButtonRef}
                onClick={() => setShowPlusDropdown(!showPlusDropdown)}
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                  showPlusDropdown 
                    ? 'text-[#00C2FF] border-[#00C2FF]/50 bg-[#00C2FF]/5' 
                    : 'text-[#8B949E] border-[#30363D] hover:text-[#00C2FF] hover:border-[#00C2FF]/50 hover:bg-[#00C2FF]/5'
                }`}
              >
                <Plus size={14} />
              </button>
              <AnimatePresence>
                {showPlusDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 bottom-full mb-4 w-56 bg-[#161B22]/95 backdrop-blur-xl border border-[#30363D] rounded-xl shadow-2xl overflow-hidden z-[100]"
                  >
                    <div className="py-1.5">
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm">
                        <File className="w-4 h-4 text-[#00C2FF]" />
                        <span>Files</span>
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm">
                        <Image className="w-4 h-4 text-[#00C2FF]" />
                        <span>Photos</span>
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm">
                        <Github className="w-4 h-4 text-[#00C2FF]" />
                        <span>GitHub</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auto Agent Dropdown */}
            <div className="relative">
              <button 
                ref={agentButtonRef}
                onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                className={`flex items-center gap-1.5 transition-all duration-200 ${
                  showAgentDropdown ? 'text-white' : 'text-[#8B949E] hover:text-[#00C2FF]'
                }`}
              >
                <span className="text-xs font-medium">Auto Agent</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${showAgentDropdown ? 'rotate-180 opacity-100' : 'opacity-40'}`} />
              </button>
              <AnimatePresence>
                {showAgentDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 bottom-full mb-4 w-56 bg-[#161B22]/95 backdrop-blur-xl border border-[#30363D] rounded-xl shadow-2xl overflow-hidden z-[100]"
                  >
                    <div className="py-1.5">
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm">
                        <Code className="w-4 h-4 text-[#00C2FF]" />
                        <span>Coding Agent</span>
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm">
                        <FileText className="w-4 h-4 text-[#00C2FF]" />
                        <span>Content Agent</span>
                      </button>
                      <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm">
                        <Wand2 className="w-4 h-4 text-[#00C2FF]" />
                        <span>Generate Image</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] bg-[#161B22] hover:bg-[#1C2128] transition-all duration-200">
              <Mic size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C2FF] hover:bg-[#00A8E0] text-white font-semibold text-xs transition-all duration-200 shadow-[0_0_15px_rgba(0,194,255,0.2)] active:scale-95">
              <Send size={14} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Predefined Commands */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-8">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => setPrompt(action.command)}
            className="flex flex-col items-start gap-3 p-4 bg-[#0D1117] border border-[#30363D]/30 rounded-2xl hover:border-[#00C2FF]/40 hover:bg-[#161B22] transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#161B22] border border-[#30363D] flex items-center justify-center text-[#8B949E] group-hover:text-[#00C2FF] group-hover:border-[#00C2FF]/30 transition-all">
              <action.icon size={16} />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-black uppercase tracking-widest text-white group-hover:text-[#00C2FF] transition-colors">
                {action.label}
              </div>
              <div className="text-[10px] text-[#484F58] font-medium leading-tight">
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}