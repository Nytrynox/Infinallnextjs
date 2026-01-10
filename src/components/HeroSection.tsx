import { Share2, Send, Sparkles, Plus, ChevronDown, File, Image, Wand2, Code, FileText, AtSign, Bot, Zap, Mic, Github, FileSearch } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/40920a779287009a943ac68f085b12b54d225f97.png';

interface HeroSectionProps {
  selectedPrompt: string;
  onPromptChange: (prompt: string) => void;
  onSendPrompt: () => void;
}

export function HeroSection({ selectedPrompt, onPromptChange, onSendPrompt }: HeroSectionProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [showAtDropdown, setShowAtDropdown] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('Gemini 3');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{text: string, icon: any, insert: string}>>([]);
  const [plusDropdownPos, setPlusDropdownPos] = useState({ top: 0, left: 0 });
  const [atDropdownPos, setAtDropdownPos] = useState({ top: 0, left: 0 });
  const [agentDropdownPos, setAgentDropdownPos] = useState({ top: 0, left: 0 });
  const plusDropdownRef = useRef<HTMLDivElement>(null);
  const agentDropdownRef = useRef<HTMLDivElement>(null);
  const atDropdownRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const atButtonRef = useRef<HTMLButtonElement>(null);
  const agentButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const words = ['Build full-stack websites.', 'Run complete marketing campaigns.'];
  
  useEffect(() => {
    const word = words[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentWord.length < word.length) {
          setCurrentWord(word.slice(0, currentWord.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (currentWord.length > 0) {
          setCurrentWord(currentWord.slice(0, -1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentWord, currentIndex, isDeleting]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (plusDropdownRef.current && !plusDropdownRef.current.contains(event.target as Node) &&
          plusButtonRef.current && !plusButtonRef.current.contains(event.target as Node)) {
        setShowPlusDropdown(false);
      }
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target as Node) &&
          agentButtonRef.current && !agentButtonRef.current.contains(event.target as Node)) {
        setShowAgentDropdown(false);
      }
      if (atDropdownRef.current && !atDropdownRef.current.contains(event.target as Node) &&
          atButtonRef.current && !atButtonRef.current.contains(event.target as Node)) {
        setShowAtDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onPromptChange(value);
    
    // Check for @ mentions for auto-suggestions
    const words = value.split(' ');
    const lastWord = words[words.length - 1].toLowerCase();
    
    if (lastWord.startsWith('@')) {
      const searchTerm = lastWord.substring(1);
      const agentSuggestions = [];
      
      // Check for coding agent matches
      if ('codingagent'.startsWith(searchTerm) || 'codi'.startsWith(searchTerm) || 'coding'.startsWith(searchTerm)) {
        agentSuggestions.push({ text: 'Coding Agent', icon: Code, insert: value.substring(0, value.lastIndexOf('@')) + '@CodingAgent ' });
      }
      
      // Check for content agent matches
      if ('contentagent'.startsWith(searchTerm) || 'con'.startsWith(searchTerm) || 'content'.startsWith(searchTerm)) {
        agentSuggestions.push({ text: 'Content Agent', icon: FileText, insert: value.substring(0, value.lastIndexOf('@')) + '@ContentAgent ' });
      }
      
      // Check for files matches
      if ('files'.startsWith(searchTerm) || 'file'.startsWith(searchTerm)) {
        agentSuggestions.push({ text: 'Files', icon: File, insert: value.substring(0, value.lastIndexOf('@')) + '@Files ' });
      }
      
      // Check for image-related matches
      if ('generateimage'.startsWith(searchTerm) || 'image'.startsWith(searchTerm) || 'img'.startsWith(searchTerm) || 'images'.startsWith(searchTerm) || 'generate'.startsWith(searchTerm)) {
        agentSuggestions.push({ text: 'Generate Image', icon: Image, insert: value.substring(0, value.lastIndexOf('@')) + '@GenerateImage ' });
      }
      
      if (agentSuggestions.length > 0 || searchTerm === '') {
        // If no search term, show all options
        if (searchTerm === '') {
          setSuggestions([
            { text: 'Coding Agent', icon: Code, insert: value + 'CodingAgent ' },
            { text: 'Content Agent', icon: FileText, insert: value + 'ContentAgent ' },
            { text: 'Files', icon: File, insert: value + 'Files ' },
            { text: 'Generate Image', icon: Image, insert: value + 'GenerateImage ' }
          ]);
        } else {
          setSuggestions(agentSuggestions);
        }
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: {text: string, icon: any, insert: string}) => {
    onPromptChange(suggestion.insert);
    setShowSuggestions(false);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const updatePlusDropdownPosition = () => {
    if (plusButtonRef.current) {
      const rect = plusButtonRef.current.getBoundingClientRect();
      setPlusDropdownPos({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  };

  const updateAtDropdownPosition = () => {
    if (atButtonRef.current) {
      const rect = atButtonRef.current.getBoundingClientRect();
      setAtDropdownPos({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  };

  const updateAgentDropdownPosition = () => {
    if (agentButtonRef.current) {
      const rect = agentButtonRef.current.getBoundingClientRect();
      setAgentDropdownPos({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-transparent flex items-center justify-center">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.08] blur-[120px] rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-40">
        {/* Badge - Minimalist */}
        <div className="flex justify-center mb-12 relative">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#00C2FF]/5 border border-[#00C2FF]/20 relative group hover:border-[#00C2FF]/40 transition-all cursor-default shadow-[0_0_20px_rgba(0,194,255,0.05)]">
            <span className="text-[#00C2FF] text-xs font-semibold tracking-wide">
              WORLD’S FIRST END-TO-END AI EXECUTION ECOSYSTEM
            </span>
            <span className="text-[#00C2FF] mx-1">·</span>
            <span className="text-[#00C2FF] text-xs font-bold tracking-wide">
              MVP LIVE
            </span>
          </div>
        </div>

        {/* Hero Title - Clean & Bold */}
        <div className="text-center mb-8 relative">
          <h1 className="text-7xl md:text-8xl tracking-tight mb-4 font-bold">
            <span className="text-white">You Imagine</span>
            <br />
            <span className="text-white">It's Done</span>
          </h1>
        </div>

        {/* Subtitle with Typing Animation */}
        <div className="text-center mb-20">
          <p className="text-xl text-[#8B949E] font-medium">
            From one command.{' '}
            <span className="text-[#00C2FF]">{currentWord}</span>
            <span className="text-[#00C2FF] animate-pulse">|</span>
          </p>
        </div>

        {/* Main Input Container - Professional Design */}
        <div className="relative mb-24">
          {/* Auto-Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full mt-2 w-full bg-[#161B22]/98 backdrop-blur-xl border border-[#30363D] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-[100]"
              >
                <div className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
                    >
                      <suggestion.icon className="w-4 h-4 text-[#00C2FF]" />
                      <span>{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Box - Clean Minimal Design */}
          <div className="relative bg-[#0D1117] rounded-[32px] border border-[#30363D]/50 overflow-visible shadow-2xl shadow-black/20">
            {/* Input Field */}
            <div className="px-8 pt-6 pb-3">
              <input
                type="text"
                placeholder="Type what you want. We build it. Deploy it. Publish it"
                value={selectedPrompt}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent text-white placeholder-[#6E7681] outline-none text-lg font-light tracking-wide"
                ref={inputRef}
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between px-6 pb-5 pt-2">
              {/* Left Actions */}
              <div className="flex items-center gap-3">
                {/* Plus Button - Circular */}
                <div className="relative">
                  <button
                    ref={plusButtonRef}
                    onClick={() => {
                      setShowPlusDropdown(!showPlusDropdown);
                      setShowAgentDropdown(false);
                      setShowAtDropdown(false);
                      updatePlusDropdownPosition();
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] border border-[#30363D] hover:border-[#00C2FF]/50 bg-[#0D1117] hover:bg-[#00C2FF]/5 transition-all duration-200"
                    title="Add attachments"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Attach Button */}
                <div className="relative">
                  <motion.button 
                    ref={atButtonRef}
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowAtDropdown(!showAtDropdown);
                      setShowPlusDropdown(false);
                      setShowAgentDropdown(false);
                      updateAtDropdownPosition();
                    }}
                    className={`flex items-center gap-2 transition-all duration-200 ${showAtDropdown ? 'text-white' : 'text-[#8B949E] hover:text-[#00C2FF]'}`}
                  >
                    <span className="text-sm font-medium">Auto Agent</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-40" />
                  </motion.button>
                </div>

                {/* Removed Infinall Agent div */}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                {/* Voice Button - Circular */}
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] bg-[#161B22] hover:bg-[#1C2128] transition-all duration-200"
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Chat/Send Button - Primary */}
                <button
                  onClick={onSendPrompt}
                  disabled={!selectedPrompt.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C2FF] hover:bg-[#00A8E0] text-white font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#00C2FF] shadow-lg shadow-[#00C2FF]/30"
                  title="Send"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Divider - Elegant */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center gap-6 -mt-[100px] -mb-[220px]">
          {/* Left Line */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#00C2FF]/60 to-[#00C2FF]"></div>
          
          {/* Infinall Logo - Centered */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 blur-xl opacity-40">
              <img src={logoImage} alt="" className="w-64 h-64 object-contain" />
            </div>
            <img src={logoImage} alt="Infinall" className="relative w-64 h-64 object-contain drop-shadow-[0_0_20px_rgba(0,194,255,0.6)]" />
          </div>
          
          {/* Right Line */}
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#00C2FF]/60 to-[#00C2FF]"></div>
        </div>
      </div>

      {/* Fixed Position Dropdowns */}
      <AnimatePresence>
        {showPlusDropdown && (
          <motion.div
            ref={plusDropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: `${plusDropdownPos.top}px`,
              left: `${plusDropdownPos.left}px`,
              zIndex: 9999
            }}
            className="w-56 bg-[#161B22]/98 backdrop-blur-xl border border-[#30363D] rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="py-1.5">
              <button
                onClick={() => setShowPlusDropdown(false)}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
              >
                <File className="w-4 h-4 text-[#00C2FF]" />
                <span>Files</span>
              </button>
              <button
                onClick={() => setShowPlusDropdown(false)}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
              >
                <Image className="w-4 h-4 text-[#00C2FF]" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => {
                  setShowPlusDropdown(false);
                  window.open('https://github.com', '_blank');
                }}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
              >
                <Github className="w-4 h-4 text-[#00C2FF]" />
                <span>GitHub</span>
              </button>
            </div>
          </motion.div>
        )}

        {showAtDropdown && (
          <motion.div
            ref={atDropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: `${atDropdownPos.top}px`,
              left: `${atDropdownPos.left}px`,
              zIndex: 9999
            }}
            className="w-56 bg-[#161B22]/98 backdrop-blur-xl border border-[#30363D] rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="py-1.5">
              <button
                onClick={() => {
                  setShowAtDropdown(false);
                  onPromptChange(selectedPrompt + '@CodingAgent ');
                }}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
              >
                <Code className="w-4 h-4 text-[#00C2FF]" />
                <span>Coding Agent</span>
              </button>
              <button
                onClick={() => {
                  setShowAtDropdown(false);
                  onPromptChange(selectedPrompt + '@ContentAgent ');
                }}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
              >
                <FileText className="w-4 h-4 text-[#00C2FF]" />
                <span>Content Agent</span>
              </button>
              <button
                onClick={() => {
                  setShowAtDropdown(false);
                  onPromptChange(selectedPrompt + '@GenerateImage ');
                }}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-[#8B949E] hover:text-white hover:bg-[#1C2128] transition-all text-sm"
              >
                <Wand2 className="w-4 h-4 text-[#00C2FF]" />
                <span>Generate Image</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Removed showAgentDropdown block */}
      </AnimatePresence>
    </section>
  );
}