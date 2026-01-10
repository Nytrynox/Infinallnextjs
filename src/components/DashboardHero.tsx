import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Paperclip, Palette, Mic, ArrowUp, MessageSquare, ChevronDown, FileText, Image as ImageIcon, Github, Code, PenTool } from 'lucide-react';

interface DashboardHeroProps {
  username: string;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
  onSend?: (prompt: string) => void;
}

export function DashboardHero({ username, theme = 'dark', setTheme, onSend }: DashboardHeroProps) {
  const [prompt, setPrompt] = useState('');
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const plusRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (plusRef.current && !plusRef.current.contains(event.target as Node)) {
        setIsPlusOpen(false);
      }
      if (agentRef.current && !agentRef.current.contains(event.target as Node)) {
        setIsAgentOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Announcement Pill - Blue Theme */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 mb-8 px-4 py-1.5 rounded-full border flex items-center gap-2 text-[13px] transition-all shadow-[0_0_20px_rgba(0,194,255,0.1)] ${
          isDark 
            ? 'bg-[#0D0D0F] border-[#00C2FF]/30 text-[#E6EDF3] hover:border-[#00C2FF]/60' 
            : 'bg-white border-[#00C2FF]/40 text-gray-900 shadow-sm hover:border-[#00C2FF]/80'
        }`}
      >
        <span>Our <span className="font-bold text-[#00C2FF]">MVP</span> is officially live</span>
        <span className="text-[#00C2FF]">→</span>
      </motion.button>

      {/* Greeting */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`relative z-10 text-4xl md:text-5xl font-bold mb-10 text-center tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        What's on your mind, {username.split(' ')[0]}?
      </motion.h1>

      {/* Neural Command Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 w-full max-w-[760px] px-4"
      >
        <div className={`relative border rounded-[24px] p-2 flex flex-col gap-2 shadow-xl transition-all duration-300 overflow-hidden group ${
          isDark 
            ? 'bg-[#0D0D0F] border-[#1F1F23] shadow-[0_0_40px_rgba(0,0,0,0.5)] focus-within:border-[#00C2FF]/50 focus-within:shadow-[0_0_30px_rgba(0,194,255,0.15)]' 
            : 'bg-white border-gray-200 shadow-gray-200/50 focus-within:border-[#00C2FF]/50 focus-within:shadow-[0_0_20px_rgba(0,194,255,0.1)]'
        }`}>
          {isListening ? (
            <div className="w-full min-h-[80px] flex flex-col items-center justify-center gap-3 px-4 py-2 bg-black/5 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-1 h-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [4, 16, 4],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-[#00C2FF] rounded-full shadow-[0_0_10px_#00C2FF]"
                  />
                ))}
              </div>
              <span className={`text-[15px] font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Listening...
              </span>
            </div>
          ) : (
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (prompt.trim()) {
                    // Integrated Qwen2.5-VL 7B Instruct (Free) API
                    fetch("https://openrouter.ai/api/v1/chat/completions", {
                      method: "POST",
                      headers: {
                        "Authorization": "Bearer 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",
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.href, // Optional, for including your app on OpenRouter rankings.
                        "X-Title": "Infinall Dashboard", // Optional. Shows in rankings on OpenRouter.
                      },
                      body: JSON.stringify({
                        "model": "qwen/qwen-2.5-vl-7b-instruct:free",
                        "messages": [
                          {
                            "role": "user",
                            "content": prompt
                          }
                        ]
                      })
                    })
                    .then(response => response.json())
                    .then(data => {
                      console.log("Qwen Response:", data);
                      // In a real implementation, we would handle the response here
                    })
                    .catch(error => console.error("Qwen API Error:", error));

                    onSend?.(prompt);
                  }
                }
              }}
              placeholder="Ask Infinall to build, execute or analyze..."
              className={`w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none min-h-[80px] px-4 py-2 text-[17px] font-normal leading-relaxed selection:bg-[#00C2FF]/20 z-10 ${
                isDark ? 'text-white placeholder-[#484F58]' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
          )}
          
          <div className="flex items-center justify-between px-2 pb-1 z-10">
            <div className="flex items-center gap-4">
              <div className="relative" ref={plusRef}>
                <button 
                  onClick={() => setIsPlusOpen(!isPlusOpen)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none outline-none ${
                    isPlusOpen 
                      ? 'bg-[#00C2FF] text-black' 
                      : (isDark ? 'text-[#8B949E] hover:text-[#00C2FF] border border-[#30363D] hover:border-[#00C2FF]/50' : 'text-gray-400 hover:text-[#00C2FF] border border-gray-200 hover:border-[#00C2FF]/50')
                  }`}
                >
                  <Plus size={18} className={`transition-transform duration-200 ${isPlusOpen ? 'rotate-45' : ''}`} />
                </button>

                <AnimatePresence>
                  {isPlusOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      style={{
                        position: 'fixed',
                        top: (plusRef.current?.getBoundingClientRect().bottom || 0) + 8,
                        left: (plusRef.current?.getBoundingClientRect().left || 0)
                      }}
                      className={`w-40 border rounded-lg overflow-hidden shadow-2xl z-50 backdrop-blur-xl ${
                        isDark ? 'bg-[#1C1C1F]/95 border-[#30363D]' : 'bg-white/95 border-gray-200 shadow-xl'
                      }`}
                    >
                      <div className="p-1 space-y-0.5">
                        <button className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] rounded-md transition-all ${isDark ? 'text-[#E6EDF3]' : 'text-gray-700'}`}>
                          <FileText size={14} />
                          <span>Upload File</span>
                        </button>
                        <button className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] rounded-md transition-all ${isDark ? 'text-[#E6EDF3]' : 'text-gray-700'}`}>
                          <ImageIcon size={14} />
                          <span>Upload Image</span>
                        </button>
                        <button className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] rounded-md transition-all border-t mt-1 pt-1.5 ${isDark ? 'text-[#E6EDF3] border-[#30363D]' : 'text-gray-700 border-gray-100'}`}>
                          <Github size={14} />
                          <span>Import Repo</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="relative" ref={agentRef}>
                <button 
                  onClick={() => setIsAgentOpen(!isAgentOpen)}
                  className={`flex items-center gap-2 transition-all duration-200 group px-2 py-1 rounded-lg focus:outline-none outline-none ${
                    isAgentOpen 
                      ? 'text-[#00C2FF] bg-[#00C2FF]/5' 
                      : (isDark ? 'text-[#8B949E] hover:text-[#00C2FF]' : 'text-gray-500 hover:text-[#00C2FF]')
                  }`}
                >
                  <span className="text-[15px] font-medium">Auto Agent</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isAgentOpen ? 'rotate-180 opacity-100' : 'opacity-40 group-hover:opacity-100'}`} />
                </button>

                <AnimatePresence>
                  {isAgentOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      style={{
                        position: 'fixed',
                        top: (agentRef.current?.getBoundingClientRect().bottom || 0) + 8,
                        left: (agentRef.current?.getBoundingClientRect().left || 0)
                      }}
                      className={`w-48 border rounded-lg overflow-hidden shadow-2xl z-50 backdrop-blur-xl ${
                        isDark ? 'bg-[#1C1C1F]/95 border-[#30363D]' : 'bg-white/95 border-gray-200 shadow-xl'
                      }`}
                    >
                      <div className="p-1 space-y-0.5">
                        <button className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] rounded-md transition-all ${isDark ? 'text-[#E6EDF3]' : 'text-gray-700'}`}>
                          <Code size={14} />
                          <span>Coding Agent</span>
                        </button>
                        <button className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] rounded-md transition-all ${isDark ? 'text-[#E6EDF3]' : 'text-gray-700'}`}>
                          <PenTool size={14} />
                          <span>Creative Agent</span>
                        </button>
                        <button className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-[#00C2FF]/10 hover:text-[#00C2FF] rounded-md transition-all border-t mt-1 pt-1.5 ${isDark ? 'text-[#E6EDF3] border-[#30363D]' : 'text-gray-700 border-gray-100'}`}>
                          <ImageIcon size={14} />
                          <span>Gen Images</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <AnimatePresence>
                  {isListening && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.5, scale: 1 }}
                          animate={{ opacity: 0, scale: 2.5 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut"
                          }}
                          className="absolute inset-0 rounded-full bg-[#00C2FF]/30 pointer-events-none"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
                <button 
                  onClick={() => setIsListening(!isListening)}
                  className={`relative z-10 p-2 rounded-full transition-all focus:outline-none outline-none ${
                    isListening 
                      ? 'bg-[#00C2FF] text-white shadow-[0_0_15px_rgba(0,194,255,0.5)]'
                      : (isDark ? 'text-[#8B949E] hover:text-[#00C2FF] hover:bg-[#00C2FF]/5' : 'text-gray-400 hover:text-[#00C2FF] hover:bg-[#00C2FF]/5')
                  }`}
                >
                  <motion.div
                    animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Mic size={20} />
                  </motion.div>
                </button>
              </div>
                <button 
                  onClick={() => {
                    if (prompt.trim()) {
                      // Integrated Qwen2.5-VL 7B Instruct (Free) API
                      fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                          "Authorization": "Bearer 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",
                          "Content-Type": "application/json",
                          "HTTP-Referer": window.location.href, // Optional, for including your app on OpenRouter rankings.
                          "X-Title": "Infinall Dashboard", // Optional. Shows in rankings on OpenRouter.
                        },
                        body: JSON.stringify({
                          "model": "qwen/qwen-2.5-vl-7b-instruct:free",
                          "messages": [
                            {
                              "role": "user",
                              "content": prompt
                            }
                          ]
                        })
                      })
                      .then(response => response.json())
                      .then(data => {
                        console.log("Qwen Response:", data);
                        // In a real implementation, we would handle the response here
                      })
                      .catch(error => console.error("Qwen API Error:", error));

                      onSend?.(prompt);
                    }
                  }}
                  className={`p-2 rounded-full hover:bg-[#00C2FF] hover:text-white transition-all focus:outline-none outline-none ${
                    isDark ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                <ArrowUp size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {['Portfolio Website', 'SaaS Dashboard', 'E-commerce Store', 'Landing Page'].map((chip, i) => (
            <motion.button
              key={chip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              onClick={() => setPrompt(`Build a modern ${chip.toLowerCase()} with dark mode and...`)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isDark 
                  ? 'bg-[#161618] border-[#30363D] text-[#8B949E] hover:border-[#00C2FF]/50 hover:text-[#E6EDF3]' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-[#00C2FF]/50 hover:text-gray-900'
              }`}
            >
              {chip}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
