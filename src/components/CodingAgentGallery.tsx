import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Terminal, Cpu, Layers, Globe, Code2, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const codingWork = [
  { 
    id: 1, 
    title: "SaaS Dashboard", 
    category: "SaaS", 
    image: "https://images.unsplash.com/photo-1590010358311-55d7c0769a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["React", "Node.js", "PostgreSQL"],
    runtime: "8.4s"
  },
  { 
    id: 2, 
    title: "Neural Logic", 
    category: "AI", 
    image: "https://images.unsplash.com/photo-1677212004257-103cfa6b59d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["Python", "TensorFlow", "API"],
    runtime: "12.1s"
  },
  { 
    id: 3, 
    title: "Mobile Interface", 
    category: "Mobile", 
    image: "https://images.unsplash.com/photo-1663153203126-08bbadc178ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["React Native", "Firebase"],
    runtime: "6.2s"
  },
  { 
    id: 4, 
    title: "E-com Engine", 
    category: "Web", 
    image: "https://images.unsplash.com/photo-1642132652806-8aa09801c2ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["Next.js", "Stripe", "Redis"],
    runtime: "9.5s"
  },
  { 
    id: 5, 
    title: "Admin Portal", 
    category: "SaaS", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["Vue", "Express", "MongoDB"],
    runtime: "7.8s"
  },
  { 
    id: 6, 
    title: "Dev Framework", 
    category: "Backend", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["Rust", "GraphQL", "Docker"],
    runtime: "14.2s"
  },
  { 
    id: 7, 
    title: "API Core", 
    category: "Backend", 
    image: "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBiYWNrZW5kJTIwYXBpJTIwZGF0YSUyMGZsb3d8ZW58MXx8fHwxNzY3NTI0NjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stack: ["Go", "gRPC", "K8s"],
    runtime: "11.0s"
  },
  { 
    id: 8, 
    title: "Cloud Suite", 
    category: "AI", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    stack: ["AWS", "Lambda", "Terraform"],
    runtime: "10.3s"
  },
];

const categories = ["All", "SaaS", "Mobile", "Web", "AI", "Backend"];

function TiltCard({ children, accentColor = "#00C2FF" }: { children: React.ReactNode, accentColor?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-full h-full"
      >
        {children}
      </div>
      {/* Glare Effect */}
      <motion.div 
        style={{
          background: `radial-gradient(circle at center, ${accentColor}33 0%, transparent 70%)`,
          opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.3]),
          transform: "translateZ(60px)",
        }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
      />
    </motion.div>
  );
}

export function CodingAgentGallery() {
  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Animated Star Field */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: '1px',
              height: '1px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Row - More Compact */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,194,255,0.3)" }}
              className="flex items-center gap-2 bg-[#00C2FF]/5 border border-[#00C2FF]/30 px-4 py-2 rounded-full cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-[#00C2FF]" />
              </motion.div>
              <span className="text-white text-xs font-bold tracking-tight font-['Montserrat',sans-serif]">Coding Agent</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, i) => (
              <motion.button 
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  i === 0 
                    ? 'bg-[#00C2FF]/10 border-[#00C2FF] text-white' 
                    : 'border-white/5 text-gray-600 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Compact Grid with Staggered Animation */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {codingWork.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              className="group relative perspective-1000"
            >
              <TiltCard accentColor="#00C2FF">
                <div className="relative rounded-2xl bg-[#0A0A0A] border border-white/5 overflow-hidden group-hover:border-[#00C2FF]/40 transition-all duration-500 h-full flex flex-col shadow-2xl">
                  {/* Top Bar / Metadata */}
                  <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter">{item.runtime} build</span>
                  </div>

                  <div className="aspect-video overflow-hidden relative group-hover:cursor-pointer">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-60"
                    />
                    
                    {/* Floating Tech Badges */}
                    <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {item.stack.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[8px] font-mono text-[#00C2FF] backdrop-blur-md">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00C2FF]/10 to-transparent h-[200%] -translate-y-full group-hover:animate-scanline" />
                    
                    {/* Center Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="p-3 rounded-full bg-[#00C2FF] text-black shadow-[0_0_30px_rgba(0,194,255,0.6)]">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-b from-transparent to-white/[0.02] flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Code2 className="w-3.5 h-3.5 text-[#00C2FF]/70" />
                        <h3 className="text-sm font-bold text-white font-['Montserrat',sans-serif] tracking-tight truncate">
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.03] border border-white/5">
                          <Cpu className="w-3 h-3 text-gray-500" />
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Log Simulation */}
                    <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center gap-2 text-[8px] font-mono text-gray-600">
                        <Terminal className="w-3 h-3" />
                        <span className="animate-pulse">Analyzing dependencies...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}