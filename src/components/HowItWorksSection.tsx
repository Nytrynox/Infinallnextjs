import { motion } from 'motion/react';
import { HelpCircle, Code2, Megaphone } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: <HelpCircle className="w-6 h-6" />,
      title: 'Brief',
      description: 'Describe your vision in plain text.'
    },
    {
      number: '02',
      icon: <Code2 className="w-6 h-6" />,
      title: 'Build',
      description: 'AI agents code and design.'
    },
    {
      number: '03',
      icon: <Megaphone className="w-6 h-6" />,
      title: 'Launch',
      description: 'Deploy to the cloud instantly.'
    }
  ];

  return (
    <section className="relative py-0 px-6 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl text-white mb-2 font-['Montserrat',sans-serif] font-bold">
            How it works
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-5 transition-all duration-300 hover:border-[#00C2FF]/30 hover:bg-white/[0.04] text-center">
                {/* Number & Icon */}
                <div className="flex flex-col items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#00C2FF]/60 font-bold">
                    Step {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg text-white mb-1 font-['Montserrat',sans-serif] font-semibold">
                  {step.title}
                </h3>
                <p className="text-xs text-white/50 font-['Montserrat',sans-serif] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}