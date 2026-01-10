import { motion } from 'motion/react';
import { ArrowLeft, Building2, Users, Shield, Zap, HeadphonesIcon, Globe, CheckCircle, ArrowRight, Mail, Phone, Calendar, BarChart3, Database, FileText, Server } from 'lucide-react';
import { Navigation } from '../Navigation';
import { FooterSection } from '../FooterSection';
import { Starfield } from '../Starfield';
import infinallLogo from 'figma:asset/40920a779287009a943ac68f085b12b54d225f97.png';
import orimindLogo from 'figma:asset/16acd745d2993ef3bf6619f4127e36944a601fff.png';

interface EnterprisePageProps {
  onBackToHome: () => void;
  onNavigateToPricing: () => void;
  onNavigateToAIAgents: () => void;
  onNavigateToEnterprise: () => void;
  onNavigateToCommunity?: () => void;
}

export function EnterprisePage({ onBackToHome, onNavigateToPricing, onNavigateToAIAgents, onNavigateToEnterprise, onNavigateToCommunity }: EnterprisePageProps) {

  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Custom Solutions",
      description: "Tailored AI agents designed specifically for your organization's workflows and requirements"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dedicated Support",
      description: "Priority support with dedicated account management and technical assistance"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Advanced security controls with SSO, custom data retention policies, and compliance features"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Unlimited Scale",
      description: "No limits on usage, team members, or AI generations with guaranteed uptime"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "Onboarding & Training",
      description: "Comprehensive onboarding program with training sessions for your entire team"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Region Deployment",
      description: "Deploy across multiple regions with data residency options for compliance"
    }
  ];

  return (
    <>
      <Starfield />
      <div className="min-h-screen bg-transparent relative overflow-hidden z-10">
        <Navigation onNavigateToPricing={onNavigateToPricing} onNavigateToAIAgents={onNavigateToAIAgents} onNavigateToEnterprise={onNavigateToEnterprise} onLogoClick={onBackToHome} onNavigateToLogin={undefined} onNavigateToSignup={undefined} />

        {/* Back Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[#C5D0DA] hover:text-white transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </motion.button>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-full px-4 py-2 mb-8">
                <Building2 className="w-4 h-4 text-[#00C2FF]" />
                <span className="text-[#00C2FF] text-sm">Enterprise Solutions</span>
              </div>
              <h1 className="text-[#FFFFFF] text-6xl md:text-7xl lg:text-8xl tracking-tight mb-8 font-['Montserrat',sans-serif]">
                Built for scale.<br />Designed for enterprise.
              </h1>
              <p className="text-[#C5D0DA] text-xl md:text-2xl leading-relaxed">
                Infinall provides enterprise-grade AI execution with custom solutions, dedicated support, and advanced security for organizations at scale.
              </p>
            </motion.div>

            {/* Right: OriMind Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#00C2FF]/10 rounded-full blur-3xl animate-pulse"></div>
                <img 
                  src={orimindLogo} 
                  alt="OriMind - One Mind. Infinite Intelligence" 
                  className="relative w-full max-w-md object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4 font-['Montserrat',sans-serif]">
              Enterprise features
            </h2>
            <p className="text-[#C5D0DA] text-lg max-w-2xl">
              Everything you need to deploy AI agents across your organization with confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-[#00C2FF]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-6 text-[#00C2FF] group-hover:bg-[#00C2FF]/10 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What's Included Section */}
        <div className="relative z-10 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4 font-['Montserrat',sans-serif]">
                What's included
              </h2>
              <p className="text-[#C5D0DA] text-lg max-w-2xl mx-auto">
                Enterprise plans come with everything in our standard plans, plus dedicated resources and custom configurations.
              </p>
            </motion.div>

            {/* Benefits Grid - Full Width */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { title: 'Unlimited AI agent executions', icon: <Zap className="w-4 h-4" /> },
                { title: 'Custom workflow integrations', icon: <Building2 className="w-4 h-4" /> },
                { title: 'Dedicated account manager', icon: <Users className="w-4 h-4" /> },
                { title: 'Priority support', icon: <HeadphonesIcon className="w-4 h-4" /> },
                { title: 'Custom training sessions', icon: <Users className="w-4 h-4" /> },
                { title: 'Advanced analytics', icon: <BarChart3 className="w-4 h-4" /> },
                { title: 'SSO & SAML authentication', icon: <Shield className="w-4 h-4" /> },
                { title: 'Custom data retention', icon: <Database className="w-4 h-4" /> },
                { title: 'Multi-region deployment', icon: <Globe className="w-4 h-4" /> },
                { title: 'Service level agreements', icon: <FileText className="w-4 h-4" /> },
                { title: 'Private deployment options', icon: <Server className="w-4 h-4" /> },
                { title: 'API rate customization', icon: <Zap className="w-4 h-4" /> }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-4 border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#00C2FF] flex-shrink-0 group-hover:bg-[#00C2FF]/10 transition-colors">
                      {item.icon}
                    </div>
                    <p className="text-white text-base leading-relaxed pt-1">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="relative z-10 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl text-white mb-4 font-['Montserrat',sans-serif]">
                  Let's talk
                </h2>
                <p className="text-[#C5D0DA] text-lg">
                  Ready to transform your organization? Our team is here to help.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/[0.08]">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/80 text-sm mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2">Work Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
                        placeholder="Company Inc."
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2">Company Size</label>
                      <select
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
                      >
                        <option value="" className="bg-black">Select company size</option>
                        <option value="1-50" className="bg-black">1-50 employees</option>
                        <option value="51-200" className="bg-black">51-200 employees</option>
                        <option value="201-1000" className="bg-black">201-1000 employees</option>
                        <option value="1000+" className="bg-black">1000+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C2FF]/50 transition-colors resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#00C2FF] hover:bg-[#72D4FF] text-black font-bold px-6 py-4 rounded-lg transition-all shadow-lg shadow-[#00C2FF]/20 hover:shadow-[#00C2FF]/40 flex items-center justify-center gap-2 group"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="relative z-10 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl text-white mb-3">
                  Other ways to reach us
                </h3>
                <p className="text-white/60">
                  Choose the method that works best for you
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] text-center hover:border-white/[0.15] transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <h4 className="text-white mb-2">Email</h4>
                  <a href="mailto:enterprise@infinall.ai" className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors text-sm">
                    enterprise@infinall.ai
                  </a>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] text-center hover:border-white/[0.15] transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <h4 className="text-white mb-2">Phone</h4>
                  <a href="tel:+1-555-INFINALL" className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors text-sm">
                    +1 (555) INFINALL
                  </a>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] text-center hover:border-white/[0.15] transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-[#00C2FF]" />
                  </div>
                  <h4 className="text-white mb-2">Schedule</h4>
                  <a href="#schedule" className="text-[#00C2FF] hover:text-[#72D4FF] transition-colors text-sm">
                    Book a demo call
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
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
