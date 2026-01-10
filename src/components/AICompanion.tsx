import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Sparkles, Terminal, Cpu } from 'lucide-react';

interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AICompanionProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export function AICompanion({ isOpen, onClose, theme }: AICompanionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Neural Link established. I am ready to assist with code generation, debugging, or system architecture. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock response delay
    setTimeout(() => {
      const responses = [
        "Analyzing request parameters...",
        "I've updated the context window with your new requirements.",
        "Scanning codebase for optimization opportunities...",
        "Generating potential solutions based on Arctic Design System patterns.",
        "That's a valid query. Processing now."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[50] lg:hidden"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed inset-y-0 right-0 z-[60] w-full md:w-[400px] shadow-2xl flex flex-col border-l backdrop-blur-xl ${
              theme === 'dark' 
                ? 'bg-[#0D0D0F]/95 border-[#1F1F23]' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
              theme === 'dark' ? 'border-[#1F1F23]' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-[#00C2FF]/10 text-[#00C2FF]' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Infinall</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${
                      theme === 'dark' ? 'text-[#8B949E]' : 'text-gray-500'
                    }`}>Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-[#8B949E] hover:text-white hover:bg-white/10' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user' 
                      ? (theme === 'dark' ? 'bg-[#27272A] text-white' : 'bg-gray-200 text-gray-700')
                      : (theme === 'dark' ? 'bg-[#00C2FF]/10 text-[#00C2FF]' : 'bg-blue-100 text-blue-600')
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  
                  <div className={`max-w-[80%] space-y-1`}>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? (theme === 'dark' ? 'bg-[#27272A] text-white rounded-tr-sm' : 'bg-gray-100 text-gray-900 rounded-tr-sm')
                        : (theme === 'dark' ? 'bg-[#00C2FF]/5 text-[#E0FFFF] border border-[#00C2FF]/20 rounded-tl-sm' : 'bg-blue-50 text-blue-900 border border-blue-100 rounded-tl-sm')
                    }`}>
                      {msg.content}
                    </div>
                    <div className={`text-[10px] ${
                      msg.role === 'user' ? 'text-right' : 'text-left'
                    } ${theme === 'dark' ? 'text-[#8B949E]' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    theme === 'dark' ? 'bg-[#00C2FF]/10 text-[#00C2FF]' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Cpu size={14} className="animate-pulse" />
                  </div>
                  <div className={`p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center ${
                    theme === 'dark' ? 'bg-[#00C2FF]/5 border border-[#00C2FF]/20' : 'bg-blue-50 border border-blue-100'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${
              theme === 'dark' ? 'border-[#1F1F23] bg-[#0D0D0F]' : 'border-gray-200 bg-white'
            }`}>
              <div className={`flex items-center gap-2 p-2 rounded-xl border transition-colors ${
                theme === 'dark' 
                  ? 'bg-[#18181B] border-[#27272A] focus-within:border-[#00C2FF]/50' 
                  : 'bg-gray-50 border-gray-200 focus-within:border-blue-400'
              }`}>
                <div className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'text-[#8B949E]' : 'text-gray-400'
                }`}>
                  <Terminal size={18} />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Neural Link..."
                  className={`flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium ${
                    theme === 'dark' ? 'text-white placeholder:text-[#52525B]' : 'text-black placeholder:text-gray-400'
                  }`}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-lg transition-all ${
                    inputValue.trim()
                      ? 'bg-[#00C2FF] text-black hover:bg-[#33CEFF]'
                      : (theme === 'dark' ? 'bg-[#27272A] text-[#52525B]' : 'bg-gray-200 text-gray-400')
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 text-center">
                <p className={`text-[10px] ${
                  theme === 'dark' ? 'text-[#52525B]' : 'text-gray-400'
                }`}>
                  AI can make mistakes. Verify critical code.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
