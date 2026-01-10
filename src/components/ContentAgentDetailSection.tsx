import { motion } from 'motion/react';
import { FileText, Users, Target, TrendingUp, Lightbulb, Image, FileCheck, CheckCircle, ArrowRight, Sparkles, Briefcase, Calendar, Video, Newspaper, Share2, Palette, Search, Instagram, Youtube } from 'lucide-react';

export function ContentAgentDetailSection() {
  const imageGeneration = {
    title: 'Image Generation',
    steps: [
      { text: '2-5 images based on prompt', default: '(Default: 3 images)' }
    ]
  };

  const marketingCampaign = {
    title: 'Marketing Campaign',
    steps: [
      { icon: <Search className="w-5 h-5" />, title: 'Research', desc: 'Market & audience analysis' },
      { icon: <Palette className="w-5 h-5" />, title: 'Brand Assets', desc: 'Logo & brand name generation' },
      { icon: <Instagram className="w-5 h-5" />, title: 'Social Posts', desc: '3 product posters with text' },
      { icon: <Newspaper className="w-5 h-5" />, title: 'Blog Content', desc: '1 full blog with images' },
      { icon: <Youtube className="w-5 h-5" />, title: 'Long Video', desc: '1-3 min video + thumbnail' },
      { icon: <Video className="w-5 h-5" />, title: 'Short Videos', desc: '3 videos (15-30 seconds)' },
      { icon: <Calendar className="w-5 h-5" />, title: 'Auto-Schedule', desc: '2-3 day gaps between posts' }
    ]
  };

  const platforms = [
    { name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'X (Twitter)', color: 'bg-black' },
    { name: 'YouTube', color: 'bg-red-600' },
    { name: 'TikTok', color: 'bg-black' },
    { name: 'WordPress', color: 'bg-blue-500' }
  ];

  const outputs = [
    '3 Social media posts (ready to publish)',
    '1 SEO-optimized blog article',
    '1 Long-form video (1-3 min)',
    '3 Short videos (15-30 sec)',
    'Auto-scheduled across platforms'
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
            <FileText className="w-6 h-6 text-black" />
            <span className="text-black text-lg font-bold">Core Agent #2</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl text-white mb-4"
          >
            Content Agent
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl text-[#00C2FF] mb-6"
          >
            (AI Content Studio)
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Complete marketing campaigns or custom images — auto-published across all platforms.
          </motion.p>
        </motion.div>

        {/* Two Modes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image Generation Mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1] hover:border-[#00C2FF]/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#00C2FF] rounded-xl flex items-center justify-center">
                <Image className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl text-white">Mode 1: Images</h3>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white/[0.05] rounded-xl p-6 border border-white/[0.08]"
            >
              <p className="text-white text-lg mb-2">{imageGeneration.steps[0].text}</p>
              <p className="text-[#00C2FF] text-sm">{imageGeneration.steps[0].default}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 text-white/60 text-sm text-center"
            >
              Perfect for quick visual content needs
            </motion.div>
          </motion.div>

          {/* Marketing Campaign Mode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#0D1117] backdrop-blur-xl rounded-3xl p-8 border border-[#00C2FF]/30 shadow-[0_0_40px_rgba(0,194,255,0.2)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#00C2FF] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl text-white">Mode 2: Campaign</h3>
            </div>
            <div className="space-y-3">
              {marketingCampaign.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 bg-white/[0.05] rounded-lg p-3 hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  <div className="text-[#00C2FF]">{step.icon}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{step.title}</p>
                    <p className="text-white/50 text-xs">{step.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#00C2FF]/50" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Publishing Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1] mb-16"
        >
          <h3 className="text-2xl text-white mb-6 text-center flex items-center justify-center gap-3">
            <Share2 className="w-7 h-7 text-[#00C2FF]" />
            Auto-Publish to All Platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/[0.05] rounded-xl p-4 border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all text-center cursor-pointer"
              >
                <div className={`w-10 h-10 ${platform.color} rounded-lg mx-auto mb-3`}></div>
                <p className="text-white text-sm">{platform.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You Get */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Deliverables */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1]"
          >
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-[#00C2FF]" />
              What You Receive
            </h3>
            <div className="space-y-4">
              {outputs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-[#00C2FF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                  <span className="text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scheduling Control */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0D1117] backdrop-blur-xl rounded-3xl p-8 border border-[#00C2FF]/30 shadow-[0_0_40px_rgba(0,194,255,0.2)]"
          >
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-[#00C2FF]" />
              Smart Scheduling
            </h3>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white/[0.05] rounded-xl p-5 border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#00C2FF] rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white font-medium">Default Schedule</span>
                </div>
                <p className="text-white/70 text-sm">Posts published every 2-3 days automatically</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white/[0.05] rounded-xl p-5 border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#00C2FF] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white font-medium">Full Control</span>
                </div>
                <p className="text-white/70 text-sm">Adjust date & time for any scheduled post</p>
              </motion.div>
            </div>
          </motion.div>
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
            Complete content creation and distribution — fully automated
          </p>
          <div className="inline-flex items-center gap-2 text-[#00C2FF]">
            <span className="text-sm">From research to publication in minutes</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
