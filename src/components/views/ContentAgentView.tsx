import { motion } from 'motion/react';
import { ArrowLeft, FileText, Image, Megaphone, TrendingUp, Sparkles, CheckCircle2, PenTool, ChevronDown, Upload, Video, Globe } from 'lucide-react';
import { Navigation } from '../Navigation';
import { FooterSection } from '../FooterSection';
import { Starfield } from '../Starfield';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

interface ContentAgentPageProps {
  onBackToHome: () => void;
  onBackToAgents: () => void;
  onNavigateToPricing: () => void;
  onNavigateToAIAgents: () => void;
  onNavigateToEnterprise?: () => void;
  onNavigateToCommunity?: () => void;
}

export function ContentAgentPage({ onBackToHome, onBackToAgents, onNavigateToPricing, onNavigateToAIAgents, onNavigateToEnterprise, onNavigateToCommunity }: ContentAgentPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of content can the Content Agent create?",
      answer: "The Content Agent creates blog posts, articles, landing page copy, email campaigns, social media content, ad copy, product descriptions, marketing campaigns, and all accompanying visuals. It handles everything from research to publishing."
    },
    {
      question: "How does the Content Agent ensure SEO optimization?",
      answer: "The agent performs keyword research, implements on-page SEO best practices, optimizes meta descriptions and headers, creates SEO-friendly URLs, and ensures proper content structure with natural keyword integration for maximum search visibility."
    },
    {
      question: "Can the Content Agent publish content directly to my platforms?",
      answer: "Yes, the Content Agent can auto-publish to WordPress, Medium, Ghost, Webflow, and major social media platforms. It can also schedule posts and handle multi-platform distribution automatically."
    },
    {
      question: "Can it maintain my brand voice and style?",
      answer: "Absolutely. The Content Agent learns your brand voice, tone, and style guidelines. It maintains consistency across all content while adapting to different platforms and content types as needed."
    },
    {
      question: "Does it create images and graphics too?",
      answer: "Yes, the Content Agent generates custom hero images, infographics, social media graphics, and branded illustrations. All visuals are optimized for their intended platform and purpose."
    },
    {
      question: "How long does it take to create and publish content?",
      answer: "Blog posts typically take 10-15 minutes from request to published article with visuals. Complete marketing campaigns with multiple assets take 15-25 minutes depending on complexity."
    }
  ];

  const capabilities = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Blog & Article Creation",
      description: "SEO-optimized long-form content with research and citations"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Visual Generation",
      description: "AI-generated images, graphics, and branded visuals"
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Marketing Campaigns",
      description: "Complete campaigns from copy to creative assets"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Keyword research and on-page SEO implementation"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Copywriting",
      description: "Compelling headlines, CTAs, and conversion copy"
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Auto-Publishing",
      description: "Direct publishing to CMS, social media, or websites"
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "You Request",
      description: "Describe the content or campaign you need"
    },
    {
      step: "02",
      title: "Research Phase",
      description: "Agent researches topic, trends, and keywords"
    },
    {
      step: "03",
      title: "Content Creation",
      description: "Writes compelling, SEO-optimized copy"
    },
    {
      step: "04",
      title: "Visual Generation",
      description: "Creates matching images and graphics"
    },
    {
      step: "05",
      title: "Optimization",
      description: "Refines for engagement and conversions"
    },
    {
      step: "06",
      title: "Publishing",
      description: "Auto-publishes to your chosen platforms"
    }
  ];

  const contentTypes = [
    {
      title: "Blog Posts",
      items: ["Long-form articles", "Listicles", "How-to guides", "Case studies"]
    },
    {
      title: "Marketing Content",
      items: ["Landing pages", "Email campaigns", "Ad copy", "Product descriptions"]
    },
    {
      title: "Social Media",
      items: ["Post captions", "Thread content", "Carousel designs", "Video scripts"]
    },
    {
      title: "Visual Assets",
      items: ["Hero images", "Infographics", "Social graphics", "Brand illustrations"]
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#72D4FF]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B7E9FF]/5 rounded-full blur-[150px]"></div>
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
          <div className="mb-12 rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-[#00C2FF]/20">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1762330467151-7f009206db90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjB3cml0aW5nfGVufDF8fHx8MTc2NDQxNDcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Content Creation"
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-[#00C2FF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00C2FF]/30">
                <FileText className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-[#FFFFFF] mb-6">
              Content Agent
            </h1>
            <p className="text-[#C5D0DA] text-xl max-w-3xl mx-auto leading-relaxed mb-4">
              Creates and publishes complete content — from blogs to campaigns
            </p>
            <p className="text-[#00C2FF] text-lg">
              "Write a blog about AI trends" → Published article with visuals in minutes
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
            What the Content Agent Does
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
              End-to-End Content Execution
            </h2>
          </div>

          {/* Right Side - Scrolling Cards */}
          <div className="flex-1 space-y-6">
            {workflow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
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

        {/* Content Types Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-32"
        >
          <h2 className="text-3xl text-[#FFFFFF] text-center mb-16">
            Content Types We Create
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentTypes.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-[#0A0F14] backdrop-blur-xl rounded-2xl p-6 border border-[#00C2FF]/20"
              >
                <h4 className="text-[#00C2FF] mb-2">{category.title}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#72D4FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Example Use Case */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="bg-[#0A0F14] backdrop-blur-xl rounded-3xl overflow-hidden border border-[#00C2FF]/30">
              {/* Campaign Preview Image */}
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1664245649021-93888371306b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwbWFya2V0aW5nJTIwdWl8ZW58MXx8fHwxNjc0MjI1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Infinall Content Dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              
              <div className="p-12">
                <h2 className="text-3xl text-[#FFFFFF] text-center mb-12">
                  Example: Launch a Product Campaign
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-xl text-[#00C2FF] mb-6">Your Command:</h3>
                    <div className="bg-[#0A0F14]/50 rounded-xl p-6 border border-[#00C2FF]/20 mb-6">
                      <code className="text-[#B7E9FF] text-sm">
                        "Create a product launch campaign for my new SaaS tool 
                        including landing page copy, blog announcement, social posts, 
                        and email sequence"
                      </code>
                    </div>
                  </div>
                <div>
                  <h3 className="text-xl text-[#00C2FF] mb-6">Content Agent Delivers:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Conversion-optimized landing page copy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">SEO-optimized blog announcement (1500+ words)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">10 social media posts with graphics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">5-email drip campaign sequence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">Custom hero images and visuals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                      <span className="text-[#C5D0DA]">All content published and scheduled</span>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-[#72D4FF] text-lg">
                    ⏱️ Average completion time: <span className="text-[#00C2FF]">15-20 minutes</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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
                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
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
          transition={{ duration: 0.6, delay: 2.0 }}
          className="text-center"
        >
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/[0.08]">
            <h3 className="text-2xl text-[#FFFFFF] mb-4">
              Stop Writing. Start Publishing.
            </h3>
            <p className="text-[#C5D0DA] max-w-2xl mx-auto mb-8">
              The Content Agent doesn't just generate text — it creates complete, 
              SEO-optimized content with visuals, published and ready to engage your audience.
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
