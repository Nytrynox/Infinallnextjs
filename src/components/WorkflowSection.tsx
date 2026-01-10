import { motion } from 'motion/react';
import { 
  Code2, 
  Megaphone, 
  Database, 
  Layout, 
  Rocket, 
  Search, 
  PenTool, 
  Video, 
  CalendarClock,
  Globe,
  Smartphone,
  Sparkles
} from 'lucide-react';

export function WorkflowSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-12 px-6 bg-black overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2FF] opacity-[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00C2FF] opacity-[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-['Montserrat',sans-serif] font-bold text-white mb-6">
            Infinall<span className="text-[#00C2FF]">.ai</span> Ecosystem
          </h2>
          <p className="text-lg text-white/60 font-['Montserrat',sans-serif] max-w-2xl mx-auto">
            From autonomous coding to content agents.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* 1. Coding Agent */}
          <motion.div variants={item} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm overflow-hidden hover:border-[#00C2FF]/30">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <Code2 className="w-24 h-24 text-white" />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/10 flex items-center justify-center text-[#00C2FF]">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-['Montserrat',sans-serif] font-bold text-white">Coding Agent</h3>
              </div>

              <div className="space-y-6 relative z-10">
                <p className="text-white/60 text-sm">App & Web Development with Multi-Stack support.</p>
                
                <div className="space-y-4">
                  {[
                    { icon: Search, text: "Research & Requirements" },
                    { icon: Layout, text: "Logo & UI Generation" },
                    { icon: Code2, text: "Full-Stack Build (Front + Back)" },
                    { icon: Globe, text: "SEO & Analytics Integration" },
                    { icon: Smartphone, text: "Testing & Preview" },
                    { icon: Rocket, text: "Live Deployment" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <step.icon className="w-4 h-4 text-[#00C2FF]" />
                      </div>
                      <span className="font-['Montserrat',sans-serif] text-sm">{step.text}</span>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#00C2FF]" />
                    <p className="text-xs text-[#00C2FF] font-semibold">
                      Auto-prompts Content Agent on completion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Content Agent */}
          <motion.div variants={item} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm overflow-hidden hover:border-[#00C2FF]/30">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <Megaphone className="w-24 h-24 text-white" />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/10 flex items-center justify-center text-[#00C2FF]">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-['Montserrat',sans-serif] font-bold text-white">Content Agent</h3>
              </div>

              <div className="space-y-6 relative z-10">
                <p className="text-white/60 text-sm">Automated marketing campaigns & content creation.</p>

                <div className="space-y-4">
                  {[
                    { icon: Search, text: "Marketing Research" },
                    { icon: PenTool, text: "Brand & Logo Identity" },
                    { icon: Layout, text: "Posters & Blogs (WP)" },
                    { icon: Video, text: "Long-form Video (YouTube)" },
                    { icon: Smartphone, text: "Shorts (Reels/Shorts)" },
                    { icon: CalendarClock, text: "Auto-Schedule & Publish" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <step.icon className="w-4 h-4 text-[#00C2FF]" />
                      </div>
                      <span className="font-['Montserrat',sans-serif] text-sm">{step.text}</span>
                    </div>
                  ))}

                  <div className="mt-4 p-3 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center gap-2">
                    <CalendarClock className="w-3 h-3 text-[#00C2FF]" />
                    <p className="text-xs text-[#00C2FF] font-semibold">
                      Smart Scheduling (2-3 day gaps)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
