import { motion } from 'motion/react';
import { HelpCircle, Code2, Megaphone, ShieldCheck } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      number: '01',
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'How do I start a project?',
      description: 'Simply describe your vision in plain text. Our AI analyzes your needs and assigns the right agents for the job.'
    },
    {
      number: '02',
      icon: <Code2 className="w-8 h-8" />,
      title: 'What can the Coding Agent build?',
      description: 'From landing pages to full-stack apps with databases, authentication, and live deployment on custom domains.'
    },
    {
      number: '03',
      icon: <Megaphone className="w-8 h-8" />,
      title: 'How does the Content Agent help?',
      description: 'It creates logos, blogs, and videos, then auto-schedules your marketing campaigns across social platforms.'
    },
    {
      number: '04',
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Is my data secure & private?',
      description: 'Yes. We support secure authentication, credit-based pricing, and Pro users get private repositories with full control.'
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl text-white font-['Montserrat',sans-serif] font-black tracking-tight">
            FAQ
          </h2>
        </motion.div>

        {/* FAQ Dropdowns */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <details className="group bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden open:bg-white/[0.02] transition-all duration-300">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors select-none">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF] shrink-0">
                      <div className="[&>svg]:w-4 [&>svg]:h-4">
                        {faq.icon}
                      </div>
                    </div>
                    <span className="text-white font-bold font-['Montserrat',sans-serif] text-sm md:text-base">{faq.title}</span>
                  </div>
                  <svg 
                    className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180 group-hover:text-white" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 pt-0 text-gray-400 text-sm leading-relaxed pl-[3.75rem]">
                  {faq.description}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
