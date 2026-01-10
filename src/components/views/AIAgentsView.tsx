import { motion } from 'motion/react';
import { ArrowLeft, Code, FileText, ArrowRight, ExternalLink, Brain, Server, CheckCircle, Search, BarChart3, PenTool, Layout, Globe, Database, Network, Sparkles, Zap, GitBranch, Cpu, Eye, Package, ShieldCheck } from 'lucide-react';
import { Navigation } from '../Navigation';
import { FooterSection } from '../FooterSection';
import { Starfield } from '../Starfield';
import { Dashboard } from '../Dashboard';
import React from 'react';

interface AIAgentsPageProps {
  onBackToHome: () => void;
  onNavigateToCodingAgent: () => void;
  onNavigateToContentAgent: () => void;
  onNavigateToPricing: () => void;
  onNavigateToAIAgents: () => void;
  onNavigateToEnterprise: () => void;
  onNavigateToCommunity: () => void;
  initialShowDashboard?: boolean;
}

export function AIAgentsPage({ 
  onBackToHome, 
  onNavigateToCodingAgent, 
  onNavigateToContentAgent, 
  onNavigateToPricing, 
  onNavigateToAIAgents, 
  onNavigateToEnterprise, 
  onNavigateToCommunity,
  initialShowDashboard = false
}: AIAgentsPageProps) {
  const [showDashboard, setShowDashboard] = React.useState(initialShowDashboard);
  const [taskInput, setTaskInput] = React.useState('');

  const handleSend = () => {
    if (taskInput.trim()) {
      setShowDashboard(true);
    }
  };

  if (showDashboard) {
    return (
      <Dashboard 
        username="" 
        onLogout={() => {
          setShowDashboard(false);
          onBackToHome();
        }} 
        initialPrompt={taskInput} 
      />
    );
  }

  return (
    <>
      <Starfield />
      <div className="min-h-screen bg-black relative overflow-hidden z-10 font-sans">
        <Navigation onNavigateToPricing={onNavigateToPricing} onNavigateToAIAgents={onNavigateToAIAgents} onNavigateToEnterprise={onNavigateToEnterprise} onNavigateToCommunity={onNavigateToCommunity} onLogoClick={onBackToHome} onNavigateToLogin={undefined} onNavigateToSignup={undefined} />

        {/* Back Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[#C5D0DA] hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
        </div>

        {/* Professional Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 mb-6">
                <span className="text-[#00C2FF] text-[10px] font-bold tracking-[0.2em] uppercase">The Autonomous Pipeline</span>
              </div>
              <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05]">
                From autonomous coding<br />to content execution.
              </h1>
              
              {/* Task Input Field */}
              <div className="relative max-w-2xl mb-12 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00C2FF] to-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex items-center bg-[#0A0A0A] rounded-2xl p-2 border border-white/10">
                  <input 
                    type="text" 
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Describe a project (e.g. 'SaaS dashboard with Dark Mode')..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-4 placeholder:text-white/20 font-medium"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    className="px-8 py-4 bg-[#00C2FF] text-black font-bold rounded-xl hover:bg-[#72D4FF] transition-all flex items-center gap-2 group/btn"
                  >
                    <span>Send Task</span>
                    <Zap className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              <p className="text-[#C5D0DA]/60 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                Infinall's ecosystem is built on a "Build-to-Market" engine. Watch how our agents transform a single prompt into a live, marketed product.
              </p>
            </motion.div>
          </div>
        </div>

        {/* The Workflow Section - Human Made Editorial Style */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          {/* Added Collaboration Header */}
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block"
            >
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF]">
                  <Code className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-12 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  <Zap className="w-5 h-5 text-white/40 animate-pulse" />
                  <div className="w-12 h-px bg-gradient-to-l from-white/20 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center text-orange-400">
                  <PenTool className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-3xl text-white font-bold mb-4">Inter-Agent Intelligence</h2>
              <p className="text-white/40 max-w-lg mx-auto leading-relaxed">
                Our agents share a unified context layer, allowing technical changes in the codebase to automatically update marketing narratives in real-time.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative">
            {/* Added a connecting line between columns for visual continuity */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/5 via-white/10 to-transparent -translate-x-1/2" />
            
            {/* Coding Agent Pipeline */}
            <div className="space-y-16">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF]">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-white font-bold tracking-tight">Coding Agent</h2>
                    <p className="text-[#00C2FF] text-xs font-bold tracking-widest uppercase mt-1">App & Web Development (Multi-Stack)</p>
                  </div>
                </div>

                <div className="relative pl-8 border-l border-white/5 space-y-12">
                  {[
                    { title: "Research & Requirements", desc: "Automated logic mapping and technical specification gathering.", icon: <Search className="w-4 h-4" /> },
                    { title: "Logo & UI Generation", desc: "Design system creation and responsive component architecture.", icon: <Layout className="w-4 h-4" /> },
                    { title: "Full-Stack Build", desc: "Front + Back end execution with secure API integration.", icon: <GitBranch className="w-4 h-4" /> },
                    { title: "SEO & Analytics Integration", desc: "Performance tracking and visibility optimization pre-baked.", icon: <BarChart3 className="w-4 h-4" /> },
                    { title: "Testing & Preview", desc: "Automated QA, unit testing, and sandbox staging.", icon: <Eye className="w-4 h-4" /> },
                    { title: "Live Deployment", desc: "Production release with zero-downtime orchestration.", icon: <Globe className="w-4 h-4" /> }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-black border-2 border-white/10 group-hover:border-[#00C2FF] transition-colors" />
                      <div className="flex gap-4">
                        <div className="mt-1 text-white/30 group-hover:text-[#00C2FF] transition-colors">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-bold mb-2 group-hover:text-[#00C2FF] transition-colors">{step.title}</h3>
                          <p className="text-white/40 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Bridge Element */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="pt-12"
                  >
                    <div className="p-6 rounded-2xl bg-[#00C2FF]/5 border border-[#00C2FF]/10 flex items-center gap-4">
                      <Zap className="w-6 h-6 text-[#00C2FF] animate-pulse" />
                      <div>
                        <p className="text-white text-sm font-bold">Auto-Handoff Trigger</p>
                        <p className="text-[#00C2FF]/60 text-xs font-medium">Prompts Content Agent on deployment completion</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Agent Pipeline */}
            <div className="space-y-16">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center text-orange-400">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-white font-bold tracking-tight">Content Agent</h2>
                    <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mt-1">Automated Marketing & Media</p>
                  </div>
                </div>

                <div className="relative pl-8 border-l border-white/5 space-y-12">
                  {[
                    { title: "Marketing Research", desc: "Trend tracking and audience persona identification.", icon: <Brain className="w-4 h-4" /> },
                    { title: "Brand & Logo Identity", desc: "Cohesive visual language across all campaign assets.", icon: <Sparkles className="w-4 h-4" /> },
                    { title: "Posters & Blogs (WP)", desc: "High-conversion long-form and static visual content.", icon: <FileText className="w-4 h-4" /> },
                    { title: "Long-form Video (YouTube)", desc: "Scripting, editing, and thumbnail generation.", icon: <Package className="w-4 h-4" /> },
                    { title: "Shorts (Reels/Shorts)", desc: "Viral-optimized vertical video production.", icon: <Zap className="w-4 h-4" /> },
                    { title: "Auto-Schedule & Publish", desc: "Multi-channel distribution without manual intervention.", icon: <GitBranch className="w-4 h-4" /> },
                    { title: "Smart Scheduling", desc: "Algorithmic 2-3 day gaps to maximize engagement.", icon: <CheckCircle className="w-4 h-4" /> }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-black border-2 border-white/10 group-hover:border-orange-400 transition-colors" />
                      <div className="flex gap-4">
                        <div className="mt-1 text-white/30 group-hover:text-orange-400 transition-colors">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-bold mb-2 group-hover:text-orange-400 transition-colors">{step.title}</h3>
                          <p className="text-white/40 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Added: Live Execution Stream Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#00C2FF]/5 blur-[150px] -translate-x-1/2 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl text-white font-bold mb-8 leading-tight">
                Live Autonomous<br />Execution Stream
              </h2>
              <p className="text-[#C5D0DA]/50 text-lg leading-relaxed mb-12">
                Monitor the cognitive overhead and task progression in real-time. Infinall provides complete transparency into how every line of code and every pixel of content is decided.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {[
                  { val: "24ms", label: "Latency" },
                  { val: "99.2%", label: "Accuracy" },
                  { val: "1.2M", label: "Operations/Hr" },
                  { val: "0", label: "Downtime" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl text-white font-bold mb-1">{stat.val}</div>
                    <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-[#0A0A0A] border border-white/10 p-1 overflow-hidden shadow-2xl shadow-black">
                <div className="bg-[#111] rounded-[22px] p-6 font-mono text-sm h-[400px] overflow-hidden relative">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-[#00C2FF] font-bold">[ENGINE]</span>
                      <span className="text-white/60">Initializing multi-stack environment...</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#00C2FF] font-bold">[CODING]</span>
                      <span className="text-white/80">Scanning requirements.json [100%]</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-orange-400 font-bold">[CONTENT]</span>
                      <span className="text-white/60">Waiting for handoff trigger (build_id: 8821)</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#00C2FF] font-bold">[CODING]</span>
                      <span className="text-green-400">Deployed to production: infinall-app-v2.main</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-orange-400 font-bold">[CONTENT]</span>
                      <span className="text-white/80">Trigger received. Generating YouTube script...</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-white/40">...</span>
                      <span className="text-white/20 italic">Awaiting next instruction</span>
                    </div>
                    {/* Repeat for visual density */}
                    <div className="flex gap-4 opacity-50">
                      <span className="text-[#00C2FF] font-bold">[CODING]</span>
                      <span className="text-white/60">Auto-scaling cluster (node-4 active)</span>
                    </div>
                    <div className="flex gap-4 opacity-30">
                      <span className="text-orange-400 font-bold">[CONTENT]</span>
                      <span className="text-white/60">Analyzing sentiment on Twitter for SEO adjustments</span>
                    </div>
                  </div>
                  
                  {/* Glass Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Floating Data Nodes */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 -top-8 p-6 rounded-2xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 backdrop-blur-xl"
              >
                <Database className="w-8 h-8 text-[#00C2FF]" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Capability Matrix Section */}
        <div className="relative z-10 bg-[#080808] py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl text-white font-bold mb-6">Capability Matrix</h2>
                <p className="text-[#C5D0DA]/50 text-lg leading-relaxed">
                  A structured breakdown of autonomous capabilities across our executive workforce.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Coding Agent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Content Agent</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Architecture", desc: "Automated schema design, microservice orchestration, and cloud infrastructure provisioning.", agent: "coding" },
                { title: "Narrative", desc: "Brand voice alignment, high-fidelity storytelling, and conversion-optimized copywriting.", agent: "content" },
                { title: "Governance", desc: "Real-time compliance monitoring, security patching, and automated documentation.", agent: "coding" },
                { title: "Researh", desc: "Predictive trend analysis, competitor mapping, and sentiment tracking.", agent: "content" },
                { title: "Deployment", desc: "Zero-downtime CI/CD pipelines and automated canary releases for high availability.", agent: "coding" },
                { title: "Visuals", desc: "4K asset generation, automated brand kits, and multi-format social media packaging.", agent: "content" }
              ].map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className={`w-1 h-8 rounded-full mb-6 ${cap.agent === 'coding' ? 'bg-[#00C2FF]' : 'bg-orange-400'}`} />
                  <h3 className="text-xl text-white font-bold mb-3">{cap.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Trust Pillars */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-48">
          <div className="grid md:grid-cols-3 gap-20">
            {[
              { icon: <ShieldCheck className="w-10 h-10" />, title: "Secure Operations", desc: "Encryption-at-rest, secure vaulting for API keys, and private infrastructure by default." },
              { icon: <Database className="w-10 h-10" />, title: "Data Sovereignty", desc: "You own 100% of the generated output. No vendor lock-in, no shared training data." },
              { icon: <Globe className="w-10 h-10" />, title: "Global Scale", desc: "Deploy to multi-region cloud clusters with automated load balancing and latency optimization." }
            ].map((pillar, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 text-[#00C2FF] mb-8">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">{pillar.title}</h3>
                <p className="text-[#C5D0DA]/50 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-48">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 md:p-24 rounded-[40px] bg-gradient-to-br from-[#111] to-black border border-white/10 text-center relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2FF]/5 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl text-white font-bold mb-8 leading-tight relative z-10">
              Transform your roadmap<br />into a series of results.
            </h2>
            <p className="text-[#C5D0DA]/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium relative z-10">
              Stop hiring for skills. Start deploying outcomes. Join the ecosystem of high-performance teams using Infinall.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button
                onClick={onNavigateToCodingAgent}
                className="px-10 py-5 bg-[#00C2FF] text-black font-bold rounded-2xl hover:bg-[#72D4FF] transition-all shadow-xl shadow-[#00C2FF]/10 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                Initialize Coding Agent <Zap className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateToContentAgent}
                className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                Activate Content Agent <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <FooterSection 
          onNavigateToPricing={onNavigateToPricing}
          onNavigateToEnterprise={onNavigateToEnterprise}
          onNavigateToAIAgents={onNavigateToAIAgents}
          onNavigateToCommunity={onNavigateToCommunity}
        />
      </div>
    </>
  );
}
