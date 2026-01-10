import { motion } from 'motion/react';
import { Navigation } from '../Navigation';
import { FooterSection } from '../FooterSection';
import { Starfield } from '../Starfield';
import { Users, MessageSquare, Calendar, Trophy, BookOpen, Code2, Sparkles, Award, Target, Zap, Globe, ChevronRight, Lightbulb, Rocket, GitBranch, Share2, ArrowLeft } from 'lucide-react';

interface CommunityPageProps {
  onBackToHome: () => void;
  onNavigateToPricing: () => void;
  onNavigateToAIAgents: () => void;
  onNavigateToEnterprise: () => void;
  onNavigateToCommunity: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function CommunityPage({
  onBackToHome,
  onNavigateToPricing,
  onNavigateToAIAgents,
  onNavigateToEnterprise,
  onNavigateToCommunity,
  onNavigateToLogin,
  onNavigateToSignup
}: CommunityPageProps) {
  const handleJoinCommunity = () => {
    window.open('https://discord.gg/JEVmMQuy', '_blank');
  };

  const communityFeatures = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Global Network',
      description: 'Connect with developers, creators, and innovators from around the world building with AI agents'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Active Discussions',
      description: 'Participate in conversations about AI development, share insights, and get help from the community'
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Project Collaboration',
      description: 'Collaborate on projects, share your builds, and learn from what others are creating'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Live Events',
      description: 'Join workshops, webinars, and community calls to learn and connect with other members'
    }
  ];

  const communityBenefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Learning Resources',
      description: 'Access tutorials, guides, and documentation to master Infinall AI agents'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Expert Support',
      description: 'Get help from experienced community members and the Infinall team'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Challenges & Contests',
      description: 'Participate in community challenges to showcase your skills and win recognition'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Early Access',
      description: 'Be the first to try new features and provide feedback on upcoming releases'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognition',
      description: 'Get featured for outstanding contributions, projects, and community involvement'
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'Share & Showcase',
      description: 'Present your projects to the community and gain valuable feedback'
    }
  ];

  const whatYouCanDo = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Ask Questions',
      description: 'Get answers from community experts and Infinall team members'
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Share Projects',
      description: 'Showcase what you have built with Infinall AI agents'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Join Discussions',
      description: 'Engage in conversations about AI, development, and best practices'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Collaborate',
      description: 'Find partners for your next project or join existing initiatives'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Learn & Grow',
      description: 'Access educational content and improve your AI development skills'
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'Contribute',
      description: 'Help others, share knowledge, and make the community stronger'
    }
  ];

  const platformChannels = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'General Chat',
      description: 'Main discussion channel for community conversations and announcements'
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Coding Agent',
      description: 'Dedicated channel for discussing coding agent features and development'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Content Agent',
      description: 'Share content creation strategies and content agent tips'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Ideas & Feedback',
      description: 'Suggest new features and share your thoughts on improvements'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Showcase',
      description: 'Display your completed projects and get feedback from the community'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Help & Support',
      description: 'Get assistance with technical issues and platform questions'
    }
  ];

  return (
    <>
      <Starfield />
      <div className="min-h-screen bg-transparent relative z-10">
        <Navigation 
          onNavigateToPricing={onNavigateToPricing}
          onNavigateToAIAgents={onNavigateToAIAgents}
          onNavigateToEnterprise={onNavigateToEnterprise}
          onNavigateToCommunity={onNavigateToCommunity}
          onNavigateToLogin={onNavigateToLogin}
          onNavigateToSignup={onNavigateToSignup}
          onLogoClick={onBackToHome}
        />

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
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[800px] bg-[#00C2FF] opacity-[0.05] blur-[200px] rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-full px-6 py-2.5 shadow-2xl">
                <p className="text-[#00C2FF] tracking-widest font-['Montserrat',sans-serif] font-semibold" style={{ fontSize: '11px' }}>
                  JOIN THE INFINALL COMMUNITY
                </p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white mb-6 font-['Montserrat',sans-serif] font-bold"
              style={{ fontSize: '72px', lineHeight: '1.1' }}
            >
              Welcome to the <br />
              <span className="text-[#00C2FF]">
                Infinall Community
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#C5D0DA] text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-['Montserrat',sans-serif]"
            >
              Connect with creators, share your executions, and shape the future of autonomous creation.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={handleJoinCommunity}
              className="group relative bg-[#00C2FF] hover:bg-[#72D4FF] text-[#0A0F14] px-12 py-5 rounded-full transition-all duration-300 shadow-2xl shadow-[#00C2FF]/30 hover:shadow-[#00C2FF]/50 hover:scale-105 font-['Montserrat',sans-serif] font-bold text-lg"
            >
              Join Community
            </motion.button>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4">
                Community Highlights
              </h2>
              <p className="text-white/70 text-lg">
                What makes our community special
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#00C2FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#00C2FF] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl text-white mb-3 text-center">{feature.title}</h3>
                  <p className="text-white/70 text-center leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4">
                What You Can Do
              </h2>
              <p className="text-white/70 text-lg">
                Engage with the community in meaningful ways
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatYouCanDo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#00C2FF]/10 rounded-xl flex items-center justify-center mb-4 text-[#00C2FF] group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Channels */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4">
                Community Channels
              </h2>
              <p className="text-white/70 text-lg">
                Organized spaces for different topics and discussions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformChannels.map((channel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00C2FF]/10 rounded-xl flex items-center justify-center text-[#00C2FF] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {channel.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                        {channel.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">{channel.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Benefits */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4">
                Member Benefits
              </h2>
              <p className="text-white/70 text-lg">
                Everything you get as part of the Infinall community
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-[#00C2FF]/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#00C2FF]/10 rounded-xl flex items-center justify-center mb-4 text-[#00C2FF] group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl text-white mb-4">
                Getting Started
              </h2>
              <p className="text-white/70 text-lg">
                Join and start participating in just a few steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-20 h-20 bg-[#00C2FF] rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl shadow-lg shadow-[#00C2FF]/30">
                  1
                </div>
                <h3 className="text-xl text-white mb-3">Join</h3>
                <p className="text-[#C5D0DA]/70">Enter our community on Discord and GitHub</p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 bg-[#00C2FF] rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl shadow-lg shadow-[#00C2FF]/30">
                  2
                </div>
                <h3 className="text-xl text-white mb-3">Learn</h3>
                <p className="text-[#C5D0DA]/70">Master autonomous execution with top creators</p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 bg-[#00C2FF] rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-2xl shadow-lg shadow-[#00C2FF]/30">
                  3
                </div>
                <h3 className="text-xl text-white mb-3">Collaborate</h3>
                <p className="text-[#C5D0DA]/70">Build together and share your amazing results</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0D1117] backdrop-blur-xl rounded-3xl p-12 border border-[#00C2FF]/30 shadow-[0_0_60px_rgba(0,194,255,0.3)]"
            >
              <div className="text-center max-w-3xl mx-auto">
                <Sparkles className="w-12 h-12 text-[#00C2FF] mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl text-white mb-6">
                  Ready to Join?
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Connect with innovators, learn from experts, and build the future with AI agents. Your journey starts here.
                </p>
                <button
                  onClick={handleJoinCommunity}
                  className="group relative bg-[#00C2FF] hover:bg-[#72D4FF] text-[#0A0F14] px-12 py-5 rounded-full transition-all duration-300 shadow-2xl shadow-[#00C2FF]/30 hover:shadow-[#00C2FF]/50 hover:scale-105 font-['Montserrat',sans-serif] font-bold text-lg inline-flex items-center gap-2"
                >
                  Join Infinall Community
                </button>
              </div>
            </motion.div>
          </div>
        </section>

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
