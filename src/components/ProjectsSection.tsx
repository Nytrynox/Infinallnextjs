import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Code, FileText, Instagram, Youtube, Linkedin, Facebook, Twitter, ExternalLink, Globe } from 'lucide-react';

interface AgentProject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

export function ProjectsSection() {
  const [activeAgent, setActiveAgent] = useState<'coding' | 'content'>('coding');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 1.2; // Significantly slower for better readability
    let animationFrameId: number;

    const scroll = () => {
      if (container) {
        scrollPosition += scrollSpeed;
        
        // Calculate the width of one set of projects (1/3 of total since we tripled)
        const singleSetWidth = container.scrollWidth / 3;
        
        // Reset to start when we've scrolled through one complete set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollPosition;
        }
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeAgent]); // Re-run when agent changes

  // Coding Agent Projects
  const codingAgentProjects: AgentProject[] & { metrics: string, tech: string[] }[] = [
    {
      id: 'c1',
      name: 'E-commerce Platform',
      description: 'Full-stack shopping platform with payment integration',
      imageUrl: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMG9ubGluZXxlbnwxfHx8fDE3Njc0NDA3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: 'Deployed in 4.2s',
      tech: ['React', 'Node.js', 'Stripe']
    },
    {
      id: 'c2',
      name: 'Task Management App',
      description: 'Real-time collaboration tool with drag-and-drop',
      imageUrl: 'https://images.unsplash.com/photo-1699570044128-b61ef113b72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMHByb2R1Y3Rpdml0eXxlbnwxfHx8fDE3NjczNzg4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: '8.4k lines of code',
      tech: ['TypeScript', 'Tailwind', 'DND']
    },
    {
      id: 'c3',
      name: 'Portfolio Website',
      description: 'Responsive portfolio with smooth animations',
      imageUrl: 'https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2NzQyMDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: '100 Lighthouse score',
      tech: ['Motion', 'Figma', 'Next.js']
    },
    {
      id: 'c4',
      name: 'Analytics Dashboard',
      description: 'Data visualization dashboard with charts',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzY3NDIwNDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: 'Real-time sync',
      tech: ['Recharts', 'Supabase']
    }
  ];

  // Content Agent Projects
  const contentAgentProjects: AgentProject[] & { metrics: string, tech: string[] }[] = [
    {
      id: 't1',
      name: 'Brand Identity Video',
      description: 'Animated brand story with motion graphics',
      imageUrl: 'https://images.unsplash.com/photo-1683090986234-15a7d0a8ac3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBicmFuZHxlbnwxfHx8fDE3Njc0MjA0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: '4K Rendered',
      tech: ['After Effects', 'AI Voice']
    },
    {
      id: 't2',
      name: 'Product Showcase',
      description: 'High-quality product photography and editing',
      imageUrl: 'https://images.unsplash.com/photo-1615987130805-d0c61fb2274e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBzaG93Y2FzZXxlbnwxfHx8fDE3Njc0MjA0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: 'HDR Enhanced',
      tech: ['Photoshop', 'Midjourney']
    },
    {
      id: 't3',
      name: 'Marketing Campaign',
      description: 'Social media content bundle with templates',
      imageUrl: 'https://images.unsplash.com/photo-1542744174-a35e40ade835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBjYW1wYWlnbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2NzMzNzM4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '#',
      metrics: '24+ Assets created',
      tech: ['Figma', 'Copy.ai']
    }
  ];

  const currentProjects = activeAgent === 'coding' ? codingAgentProjects : contentAgentProjects;

  // Triple the projects for seamless infinite scroll
  const duplicatedProjects = [...currentProjects, ...currentProjects, ...currentProjects];

  return (
    <section 
      id="what-we-built" 
      className="relative bg-transparent py-0 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#00C2FF]/5 border border-[#00C2FF]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
            <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-[0.3em]">Execution Gallery</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl tracking-[-0.02em] mb-6 font-black font-['Montserrat',sans-serif]">
            What we built
          </h2>
          <p className="text-[#8B949E] text-base max-w-xl mx-auto leading-relaxed">
            Real deployments. Real results. Powered by autonomous AI execution.
          </p>
        </motion.div>

        {/* Minimal Agent Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex p-1.5 bg-black/40 backdrop-blur-2xl border border-[#00C2FF]/20 rounded-2xl">
            <button
              onClick={() => setActiveAgent('coding')}
              className={`relative z-10 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${
                activeAgent === 'coding' 
                  ? 'text-black' 
                  : 'text-[#8B949E] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Code className="w-4 h-4" />
              <span className="tracking-wide">Coding Agent</span>
              {activeAgent === 'coding' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#00C2FF] rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveAgent('content')}
              className={`relative z-10 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${
                activeAgent === 'content' 
                  ? 'text-black' 
                  : 'text-[#8B949E] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="tracking-wide">Content Agent</span>
              {activeAgent === 'content' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#00C2FF] rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Gallery */}
        <div className="relative -mx-6">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          <div 
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-8 pt-2 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="group relative flex-shrink-0 w-[340px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              >
                {/* Card Container */}
                <div className="relative h-[440px] bg-[#0A0A0A] rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#00C2FF]/30 hover:shadow-[0_8px_32px_rgba(0,194,255,0.12)]">
                  
                  {/* Image Section */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img 
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    
                    {/* Floating Metric Badge */}
                    <div className="absolute top-5 right-5">
                      <div className="px-3 py-1.5 bg-[#00C2FF] rounded-lg text-black text-[9px] font-black uppercase tracking-wider">
                        {project.metrics}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="absolute bottom-5 left-5 flex gap-2">
                      {project.tech?.map((t, i) => (
                        <div key={i} className="px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg text-[9px] font-bold text-white/70 uppercase tracking-wide">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col h-[220px]">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
                      <span className="text-[#00C2FF] text-[9px] font-bold uppercase tracking-[0.25em]">
                        {activeAgent === 'coding' ? 'Live Deployment' : 'Auto-Publish Ready'}
                      </span>
                    </div>

                    {/* Project Name */}
                    <h4 className="text-white text-xl font-bold font-['Montserrat',sans-serif] mb-2 tracking-tight group-hover:text-[#00C2FF]">
                      {project.name}
                    </h4>

                    {/* Description */}
                    <p className="text-[#8B949E] text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Action Area - Fixed at bottom */}
                    <div className="mt-auto">
                      {activeAgent === 'coding' ? (
                        <a 
                          href={project.link}
                          className="inline-flex items-center gap-2.5 text-white text-sm font-bold group/btn"
                        >
                          <span className="relative">
                            View Project
                            <div className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#00C2FF] transition-all duration-300 group-hover/btn:w-full" />
                          </span>
                          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover/btn:bg-[#00C2FF] transition-all duration-300">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </a>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-[#00C2FF] text-[9px] font-bold uppercase tracking-[0.25em]">Publish to:</p>
                          <div className="flex items-center gap-2.5">
                            <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 transition-all duration-300" title="Auto-publish to X">
                              <Twitter className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 transition-all duration-300" title="Auto-publish to Instagram">
                              <Instagram className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 transition-all duration-300" title="Auto-publish to Facebook">
                              <Facebook className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 transition-all duration-300" title="Auto-publish to YouTube">
                              <Youtube className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#00C2FF] hover:border-[#00C2FF]/30 hover:bg-[#00C2FF]/5 transition-all duration-300" title="Auto-publish to LinkedIn">
                              <Linkedin className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00C2FF]/0 group-hover:bg-[#00C2FF]/50 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-0.5 h-12 bg-white/5 rounded-full relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 right-0 h-4 bg-[#00C2FF]/50 blur-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}