import { motion } from 'motion/react';
import { Code2, Users, Lightbulb, Layers, Database, TestTube, Globe, CheckCircle, ArrowRight, Sparkles, Lock, Unlock, Search, Palette, Server, Shield, BarChart3, Eye, RefreshCw, FileCode } from 'lucide-react';

export function CodingAgentDetailSection() {
  const workflowSteps = [
    { 
      icon: <Search className="w-6 h-6" />, 
      title: 'Research', 
      description: 'Analyzes requirements',
      detail: 'Understands your app vision and technical needs'
    },
    { 
      icon: <Palette className="w-6 h-6" />, 
      title: 'Logo Generation', 
      description: 'Creates brand identity',
      detail: 'Generates custom logo for your project'
    },
    { 
      icon: <Code2 className="w-6 h-6" />, 
      title: 'Frontend Build', 
      description: 'Designs interface',
      detail: 'Builds responsive UI with logo & images'
    },
    { 
      icon: <Server className="w-6 h-6" />, 
      title: 'Backend Setup', 
      description: 'Powers functionality',
      detail: 'Creates database & authentication system'
    },
    { 
      icon: <BarChart3 className="w-6 h-6" />, 
      title: 'SEO & Analytics', 
      description: 'Optimizes visibility',
      detail: 'Adds SEO tags & Google Analytics tracking'
    },
    { 
      icon: <TestTube className="w-6 h-6" />, 
      title: 'Testing', 
      description: 'Quality assurance',
      detail: 'Self-tests all features automatically'
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      title: 'Live Deployment', 
      description: 'Goes live',
      detail: 'Deploys to custom domain instantly'
    }
  ];

  const features = [
    { icon: <RefreshCw className="w-5 h-5" />, text: 'Update via follow-up prompts', color: 'text-[#00C2FF]' },
    { icon: <Eye className="w-5 h-5" />, text: 'Live preview before deploy', color: 'text-[#00C2FF]' },
    { icon: <FileCode className="w-5 h-5" />, text: 'Full-stack web development', color: 'text-[#00C2FF]' },
    { icon: <Shield className="w-5 h-5" />, text: 'Built-in authentication', color: 'text-[#00C2FF]' }
  ];

  const projectVisibility = [
    { icon: <Unlock className="w-5 h-5" />, text: 'Free: Public by default', type: 'Free' },
    { icon: <Lock className="w-5 h-5" />, text: 'Pro: Private by default (adjustable)', type: 'Pro' }
  ];

  return (
    <section className="relative py-0 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#00C2FF]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-[#00C2FF] rounded-full px-6 py-3 mb-8"
          >
            <Code2 className="w-6 h-6 text-black" />
            <span className="text-black text-lg font-bold">Core Agent #1</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl text-white mb-4"
          >
            Coding Agent
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl text-[#00C2FF] mb-6"
          >
            (Vibe Coding + Agentic Mode)
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            From concept to live deployment — complete web applications with database, auth, and custom domains.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Workflow Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1]"
          >
            <h3 className="text-3xl text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#00C2FF]" />
              7-Step Workflow
            </h3>
            
            <div className="space-y-5">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4 group relative"
                >
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute left-[27px] top-[56px] w-[2px] h-[32px] bg-[#00C2FF]/30" />
                  )}
                  
                  {/* Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 bg-[#00C2FF] rounded-xl flex items-center justify-center text-black flex-shrink-0 shadow-lg shadow-[#00C2FF]/30"
                  >
                    {step.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h4 className="text-lg text-white mb-1 flex items-center gap-2">
                      {step.title}
                      <ArrowRight className="w-4 h-4 text-[#00C2FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-white/60 text-sm mb-0.5">{step.description}</p>
                    <p className="text-white/80 text-sm">{step.detail}</p>
                  </div>
                  
                  {/* Step Number */}
                  <div className="text-[#00C2FF]/30 text-xl mt-2 font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Features & Visibility */}
          <div className="space-y-6">
            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1] hover:border-[#00C2FF]/50 transition-all duration-300"
            >
              <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-[#00C2FF]" />
                Key Features
              </h3>
              <div className="space-y-4">
                {features.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 bg-white/[0.03] rounded-xl p-4 hover:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    <div className={item.color}>{item.icon}</div>
                    <span className="text-white">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Visibility */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0D1117] backdrop-blur-xl rounded-3xl p-8 border border-[#00C2FF]/30 shadow-[0_0_40px_rgba(0,194,255,0.2)]"
            >
              <h3 className="text-2xl text-white mb-6">Project Visibility</h3>
              <div className="space-y-4">
                {projectVisibility.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/[0.05] rounded-xl hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-6 h-6 bg-[#00C2FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-white block mb-1">{item.text}</span>
                      <span className="text-[#00C2FF] text-xs">{item.type} Plan</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] text-center"
            >
              <div className="inline-flex items-center gap-2 bg-[#00C2FF]/20 rounded-full px-4 py-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#00C2FF]" />
                <span className="text-[#00C2FF] text-sm font-bold">Coming Soon</span>
              </div>
              <p className="text-white/70 text-sm">App Development & Multi-Stack Support</p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white/[0.03] rounded-2xl p-8 border border-white/[0.08]"
        >
          <p className="text-white/60 text-lg mb-3">
            <span className="text-[#00C2FF] font-bold">Bonus:</span> Auto-generates a marketing prompt for the Content Agent
          </p>
          <div className="inline-flex items-center gap-2 text-[#00C2FF]">
            <span className="text-sm">Update anytime with follow-up prompts</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
