import { motion } from 'motion/react';
import { ArrowLeft, Code, Zap, Globe, Terminal, CheckCircle2, Sparkles, ChevronDown } from 'lucide-react';
import { Navigation } from '../Navigation';
import { FooterSection } from '../FooterSection';
import { Starfield } from '../Starfield';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

interface CodingAgentPageProps {
  onBackToHome: () => void;
  onBackToAgents: () => void;
  onNavigateToPricing: () => void;
  onNavigateToAIAgents: () => void;
  onNavigateToEnterprise?: () => void;
  onNavigateToCommunity?: () => void;
}

export function CodingAgentPage({ onBackToHome, onBackToAgents, onNavigateToPricing, onNavigateToAIAgents, onNavigateToEnterprise, onNavigateToCommunity }: CodingAgentPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of applications can the Coding Agent build?",
      answer: "The Coding Agent can build full-stack web applications including SaaS platforms, e-commerce sites, portfolio websites, dashboards, landing pages, and more. It handles both frontend (React, Next.js) and backend (Node.js, APIs, databases) development."
    },
    {
      question: "How long does it take to build and deploy an application?",
      answer: "Most applications are built and deployed live within 8-15 minutes. Simple landing pages take 5-8 minutes, while complex applications with databases and authentication take 12-15 minutes."
    },
    {
      question: "Do I need coding knowledge to use the Coding Agent?",
      answer: "No coding knowledge required. Simply describe what you want in natural language, and the Coding Agent handles all the technical implementation, deployment, and hosting automatically."
    },
    {
      question: "Can the Coding Agent integrate databases?",
      answer: "Yes, the Coding Agent automatically sets up and configures databases (PostgreSQL, MongoDB, etc.), creates schemas, and implements all necessary CRUD operations with proper authentication and security."
    },
    {
      question: "Is the generated code production-ready?",
      answer: "Absolutely. All code is optimized, follows best practices, includes error handling, and is deployed with SSL certificates. The applications are immediately ready for real users and can scale as needed."
    },
    {
      question: "Can I modify the code after the Coding Agent builds it?",
      answer: "Yes, you receive full access to the source code. You can modify, extend, or customize any part of the application. The code is clean, well-structured, and documented for easy modifications."
    }
  ];

  const capabilities = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "Generates frontend + backend code with modern frameworks"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Designs beautiful, responsive interfaces automatically"
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Database Integration",
      description: "Connects and configures databases seamlessly"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Auto-Deployment",
      description: "Deploys live on Vercel with custom domain linking"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Execution",
      description: "Watch your app being built in real-time"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Production Ready",
      description: "Optimized, tested, and ready to scale"
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "You Command",
      description: "Simply describe what you want to build"
    },
    {
      step: "02",
      title: "Agent Designs",
      description: "Creates UI mockups and architecture"
    },
    {
      step: "03",
      title: "Code Generation",
      description: "Writes production-ready frontend & backend"
    },
    {
      step: "04",
      title: "Database Setup",
      description: "Configures and connects your database"
    },
    {
      step: "05",
      title: "Live Deployment",
      description: "Deploys to Vercel with SSL and CDN"
    },
    {
      step: "06",
      title: "You Receive",
      description: "Live link ready to share in minutes"
    }
  ];

  return (
    <>
      <Starfield />
      <div className="min-h-screen bg-transparent relative overflow-hidden z-10">
        {/* Navigation */}
        <Navigation onNavigateToPricing={onNavigateToPricing} onNavigateToAIAgents={onNavigateToAIAgents} onNavigateToEnterprise={onNavigateToEnterprise} onNavigateToCommunity={onNavigateToCommunity} onLogoClick={onBackToHome} onNavigateToLogin={undefined} onNavigateToSignup={undefined} />

        {/* Back Button - Top Only */}
        <div className="relative z-10 pt-32 px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onBackToAgents}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.02] backdrop-blur-xl rounded-full border border-white/[0.08] hover:border-[#00C2FF]/50 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.2)]"
          >
            <ArrowLeft className="w-5 h-5 text-[#00C2FF] group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-[#C5D0DA] group-hover:text-[#00C2FF]">
              Back to Agents
            </span>
          </motion.button>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#007DBE]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#005B8F]/5 rounded-full blur-[150px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-32">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            {/* Hero Image */}
            <div className="mb-12 rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-[#007DBE]/20">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQzOTY0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Coding Development"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-[#00C2FF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00C2FF]/30">
                  <Code className="w-8 h-8 text-black" />
                </div>
              </div>
              <h1 className="text-[#FFFFFF] mb-6">
                Coding Agent
              </h1>
              <p className="text-[#C5D0DA] text-xl max-w-3xl mx-auto leading-relaxed mb-4">
                Builds, deploys, and hosts live applications from a single command
              </p>
              <p className="text-[#00C2FF] text-lg">
                "Build me a portfolio website" → Get a live link in minutes
              </p>
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-32"
          >
            <h2 className="text-3xl text-[#FFFFFF] text-center mb-16">
              What the Coding Agent Does
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#00C2FF]/10 rounded-xl flex items-center justify-center mb-4 text-[#00C2FF] group-hover:scale-110 transition-transform duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-xl text-[#FFFFFF] mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-[#C5D0DA] leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Workflow Timeline - Split Layout with Internal Scrolling */}
          <div className="flex gap-12 mb-32 h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Left Side - Fixed Title */}
            <div className="w-[400px] flex-shrink-0 sticky top-0 h-fit flex items-center">
              <h2 className="text-5xl text-[#FFFFFF] leading-tight">
                End-to-End Execution Flow
              </h2>
            </div>

            {/* Right Side - Scrolling Cards */}
            <div className="flex-1 space-y-6">
              {workflow.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-[#0D1117] backdrop-blur-xl rounded-2xl p-8 border border-[#00C2FF]/10 hover:border-[#00C2FF]/30 transition-all duration-300">
                    <div className="text-6xl text-[#00C2FF]/20 mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl text-[#FFFFFF] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#C5D0DA] text-lg leading-relaxed">
                      {item.description}
                    </p>
                    <CheckCircle2 className="absolute top-8 right-8 w-6 h-6 text-[#00C2FF]/50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Example Use Case */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="bg-[#0A0F14] backdrop-blur-xl rounded-3xl overflow-hidden border border-[#00C2FF]/20">
              {/* Dashboard Preview Image */}
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1664382953518-4a664ab8a8c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB1aSUyMGNvZGluZ3xlbnwxfHx8fDE3NjczNzg4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Infinall Dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              
              <div className="p-12">
                <h2 className="text-3xl text-[#FFFFFF] text-center mb-12">
                  Example: Build a SaaS Dashboard
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-xl text-[#00C2FF] mb-6">Your Command:</h3>
                    <div className="bg-[#0A0F14]/50 rounded-xl p-6 border border-[#00C2FF]/20 mb-6">
                      <code className="text-[#B7E9FF] text-sm">
                        "Build me a SaaS analytics dashboard with user authentication, 
                        real-time charts, and database integration"
                      </code>
                    </div>
                  </div>
                <div>
                  <h3 className="text-xl text-[#00C2FF] mb-6">Coding Agent Delivers:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Next.js frontend with Tailwind CSS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Authentication with JWT & sessions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">PostgreSQL database configured</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Real-time charts with Recharts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Deployed live on Vercel with SSL</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Custom domain connected</span>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-[#72D4FF] text-lg">
                    ⏱️ Average completion time: <span className="text-[#00C2FF]">8-12 minutes</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mb-32"
          >
            <h2 className="text-3xl text-[#FFFFFF] text-center mb-16">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <span className="text-[#FFFFFF] text-lg">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#00C2FF] shrink-0 transition-transform duration-300 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === index ? 'auto' : 0,
                      opacity: openFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-[#C5D0DA] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="text-center"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/[0.08]">
              <h3 className="text-2xl text-[#FFFFFF] mb-4">
                Stop Building. Start Delegating.
              </h3>
              <p className="text-[#C5D0DA] max-w-2xl mx-auto mb-8">
                The Coding Agent doesn't just generate code snippets — it delivers complete, 
                production-ready applications deployed and ready to use.
              </p>
              <button 
                onClick={onBackToHome}
                className="bg-[#00C2FF] hover:bg-[#72D4FF] text-black font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-[#00C2FF]/30 hover:shadow-[#00C2FF]/50"
              >
                Try Infinall Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
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
