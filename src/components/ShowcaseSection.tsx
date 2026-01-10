import { motion } from 'motion/react';

interface ShowcaseSectionProps {
  onPromptClick: (prompt: string) => void;
}

export function ShowcaseSection({ onPromptClick }: ShowcaseSectionProps) {
  const showcaseRows = [
    {
      prompts: [
        "Build a SaaS dashboard with real-time analytics",
        "Create an e-commerce platform with payment integration",
        "Design a social media app for creative professionals",
        "Build a project management tool with Kanban boards",
        "Generate a food delivery app with restaurant listings",
        "Create an AI-powered productivity assistant",
        "Design a fitness tracking app with workout plans",
        "Build a real-time chat application with WebSocket"
      ]
    },
    {
      prompts: [
        "Design a poster for fashion brand launch campaign",
        "Create Instagram carousel content for product launch",
        "Design promotional banners for Black Friday sale",
        "Create YouTube thumbnail designs for tech channel",
        "Generate a marketing video script for tech product",
        "Create infographics explaining blockchain technology",
        "Design email newsletter templates for e-commerce",
        "Generate video ads for social media marketing"
      ]
    }
  ];

  return (
    <section className="relative bg-transparent py-0 overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto px-6 mt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#00C2FF] text-sm tracking-[0.2em] uppercase mb-3 font-['Montserrat',sans-serif] font-semibold"
          >
            Endless Possibilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#FFFFFF] text-4xl md:text-5xl tracking-tight font-['Montserrat',sans-serif] font-bold mb-4"
          >
            See What Infinall Can Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8B949E] text-base"
          >
            From complex web applications to stunning designs—just describe what you need, and watch it come to life
          </motion.p>
        </div>

        {/* Horizontal Scrolling Rows */}
        <div className="space-y-4">
          {showcaseRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative w-full overflow-hidden">
              <div 
                className="flex gap-3 animate-marquee-left will-change-transform"
                style={{
                  animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse'
                }}
              >
                {[...row.prompts, ...row.prompts, ...row.prompts, ...row.prompts].map((prompt, index) => (
                  <button
                    key={`row-${rowIndex}-${index}`}
                    onClick={() => onPromptClick(prompt)}
                    className="flex-shrink-0 px-5 py-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl text-[#C5D0DA] text-sm whitespace-nowrap hover:bg-white/[0.06] hover:border-[#00C2FF]/30 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}