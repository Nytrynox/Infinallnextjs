import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, FileText, BarChart3, Globe, Zap, PenTool, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const contentWork = [
  { 
    id: 1, 
    title: "Tech Blog Series", 
    category: "Blogs", 
    image: "https://images.unsplash.com/photo-1654785419449-7f0a9383a4fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "98%", words: "2.4k", score: "9.2" },
    platforms: ["WP", "Medium"]
  },
  { 
    id: 2, 
    title: "Industry Report", 
    category: "Marketing", 
    image: "https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "95%", words: "4.1k", score: "8.9" },
    platforms: ["PDF", "Web"]
  },
  { 
    id: 3, 
    title: "How-to Guides", 
    category: "Long-form", 
    image: "https://images.unsplash.com/photo-1541613569553-332a2574a508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "99%", words: "1.8k", score: "9.5" },
    platforms: ["Ghost"]
  },
  { 
    id: 4, 
    title: "Case Studies", 
    category: "Marketing", 
    image: "https://images.unsplash.com/photo-1689004624325-6edf074228dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "94%", words: "3.2k", score: "9.0" },
    platforms: ["Web", "LinkedIn"]
  },
  { 
    id: 5, 
    title: "Opinion Pieces", 
    category: "Blogs", 
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "92%", words: "1.2k", score: "8.7" },
    platforms: ["Substack"]
  },
  { 
    id: 6, 
    title: "Product Reviews", 
    category: "Marketing", 
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "96%", words: "2.8k", score: "9.3" },
    platforms: ["Amazon", "Web"]
  },
  { 
    id: 7, 
    title: "Interview Articles", 
    category: "Long-form", 
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "91%", words: "5.5k", score: "8.5" },
    platforms: ["Forbes"]
  },
  { 
    id: 8, 
    title: "Listicles", 
    category: "Blogs", 
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    metrics: { seo: "99%", words: "800", score: "9.8" },
    platforms: ["Twitter", "Web"]
  },
];

const categories = ["All", "Blogs", "Marketing", "Social Media", "Email", "Long-form"];

function ContentTiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
        style={{ transform: "translateZ(40px)" }}
        className="w-full h-full"
      >
        {children}
      </div>
      <motion.div 
        style={{
          background: `radial-gradient(circle at center, rgba(255,184,0,0.15) 0%, transparent 70%)`,
          opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 1]),
          transform: "translateZ(50px)",
        }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
      />
    </motion.div>
  );
}

export function AgentShowcaseSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#FFB800]/5 blur-[120px] rounded-full opacity-50" />

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
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,184,0,0.3)" }}
              className="flex items-center gap-2 bg-[#FFB800]/5 border border-[#FFB800]/30 px-4 py-2 rounded-full cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
              </motion.div>
              <span className="text-white text-xs font-bold tracking-tight font-['Montserrat',sans-serif]">Content Agent</span>
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
                    ? 'bg-[#FFB800]/10 border-[#FFB800] text-white' 
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
          {contentWork.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              className="group perspective-1000"
            >
              <ContentTiltCard>
                <div className="relative rounded-2xl bg-[#0A0A0A] border border-white/5 overflow-hidden group-hover:border-[#FFB800]/40 transition-all duration-500 h-full flex flex-col shadow-xl">
                  {/* Top Meta Info */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1">
                        {item.platforms.map((p, i) => (
                          <div key={p} className="w-4 h-4 rounded-full bg-white/10 border border-black flex items-center justify-center">
                            <span className="text-[6px] text-white font-bold">{p[0]}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Published</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-[#FFB800]" />
                      <span className="text-[8px] text-[#FFB800] font-mono">LIVE</span>
                    </div>
                  </div>

                  <div className="aspect-video overflow-hidden relative">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-50 group-hover:opacity-70"
                    />
                    
                    {/* Floating Metrics Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex flex-col gap-1">
                        <span className="text-[7px] text-gray-400 uppercase font-bold tracking-tighter">Word Count</span>
                        <span className="text-xs text-white font-bold font-mono">{item.metrics.words}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[7px] text-[#FFB800] uppercase font-bold tracking-tighter">SEO Score</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: item.metrics.seo }}
                              className="h-full bg-[#FFB800]" 
                            />
                          </div>
                          <span className="text-[10px] text-white font-bold font-mono">{item.metrics.seo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Holographic Glint */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  <div className="p-4 bg-gradient-to-b from-transparent to-white/[0.02] flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1 rounded bg-[#FFB800]/10">
                          <FileText className="w-3 h-3 text-[#FFB800]" />
                        </div>
                        <h3 className="text-sm font-bold text-white font-['Montserrat',sans-serif] tracking-tight truncate">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PenTool className="w-2.5 h-2.5 text-gray-600" />
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{item.category}</span>
                      </div>
                    </div>
                    
                    {/* Share/Action Bar */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3 text-gray-500" />
                          <span className="text-[8px] text-gray-500 font-mono">Impact: {item.metrics.score}</span>
                        </div>
                      </div>
                      <button className="p-1.5 rounded-md hover:bg-white/5 transition-colors">
                        <Share2 className="w-3 h-3 text-white/40" />
                      </button>
                    </div>
                  </div>
                </div>
              </ContentTiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}