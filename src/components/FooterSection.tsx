import { Linkedin, Youtube, X, Facebook, Instagram, MessageCircle, Heart, Github } from 'lucide-react';
import infinallLogo from 'figma:asset/d47165bf868e16ebdf467ee13c9dfc29a66a0c10.png';

interface FooterSectionProps {
  darkMode?: boolean;
  onNavigateToPricing?: () => void;
  onNavigateToEnterprise?: () => void;
  onNavigateToAIAgents?: () => void;
  onNavigateToCommunity?: () => void;
}

export function FooterSection({ darkMode = false, onNavigateToPricing, onNavigateToEnterprise, onNavigateToAIAgents, onNavigateToCommunity }: FooterSectionProps) {
  const handleProductClick = (linkName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    switch(linkName) {
      case 'Pricing':
        onNavigateToPricing?.();
        break;
      case 'Enterprise':
        onNavigateToEnterprise?.();
        break;
      case 'Top Features':
        onNavigateToAIAgents?.();
        break;
      case 'Docs':
        onNavigateToCommunity?.();
        break;
      default:
        break;
    }
  };

  const footerLinks = {
    product: [
      { name: 'Pricing', href: '#pricing' },
      { name: 'Enterprise', href: '#enterprise' },
      { name: 'Docs', href: '#docs' },
      { name: 'Top Features', href: '#features' }
    ],
    company: [
      { name: 'Orimind Info', href: '#orimind' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blogs', href: '#blogs' }
    ],
    legal: [
      { name: 'Terms of Policy', href: '#terms' },
      { name: 'Partnerships', href: '#partnerships' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/orimindhq/", label: 'Instagram' },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578083282125", label: 'Facebook' },
    { icon: X, href: "https://x.com/orimindhq", label: 'X' },
    { icon: Youtube, href: "https://www.youtube.com/@orimindhq", label: 'YouTube' },
    { icon: Github, href: "https://github.com/Orimindtech", label: 'GitHub' },
    { icon: Linkedin, href: "https://www.linkedin.com/company/orimind/", label: 'LinkedIn' }
  ];

  return (
    <footer className={`relative ${darkMode ? 'bg-black' : 'bg-transparent'} border-t border-[#00C2FF]/20 overflow-hidden`}>
      {/* Background Effects */}
      {!darkMode && (
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#00C2FF] opacity-[0.03] blur-[200px] rounded-full"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#72D4FF] opacity-[0.02] blur-[150px] rounded-full"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-16 py-20">
        {/* Top Section - Logo & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Description Column */}
          <div className="lg:col-span-2">
            <img 
              src={infinallLogo} 
              alt="Infinall - You Imagine. It's Done." 
              className="w-full max-w-xs mb-8 drop-shadow-[0_0_15px_rgba(0,194,255,0.4)]"
            />
            <p className="text-[#C5D0DA] leading-relaxed mb-8 max-w-sm">
              Transform your ideas into reality with AI-powered creation. 
              From imagination to deployment, we make it seamless.
            </p>
            
            {/* Newsletter Signup */}
            <div className="max-w-md">
              <p className="text-[#00C2FF] text-sm tracking-wide mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/[0.03] backdrop-blur-xl border border-[#00C2FF]/30 rounded-xl text-[#FFFFFF] placeholder:text-[#C5D0DA]/50 focus:outline-none focus:border-[#00C2FF]/60 focus:shadow-[0_0_20px_rgba(0,194,255,0.2)] transition-all"
                />
                <button className="px-6 py-3 bg-[#00C2FF] hover:bg-[#72D4FF] rounded-xl text-black font-bold hover:shadow-[0_0_25px_rgba(0,194,255,0.5)] transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-[#FFFFFF] mb-6 tracking-wide">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleProductClick(link.name, e)}
                    className="text-[#C5D0DA] hover:text-[#00C2FF] flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-[#00C2FF] group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-[#FFFFFF] mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#C5D0DA] hover:text-[#00C2FF] flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-[#00C2FF] group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-[#FFFFFF] mb-6 tracking-wide">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-[#C5D0DA] hover:text-[#00C2FF] flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-[#00C2FF] group-hover:w-3 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="relative mb-12">
          <div className="h-[1px] bg-[#30363D]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-[3px] bg-[#00C2FF] rounded-full shadow-[0_0_15px_rgba(0,194,255,0.6)]"></div>
        </div>

        {/* Bottom Section - Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <p className="text-[#C5D0DA] text-sm mr-2">Connect with us:</p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/[0.03] backdrop-blur-xl border border-[#00C2FF]/30 flex items-center justify-center text-[#C5D0DA] hover:text-[#00C2FF] hover:border-[#00C2FF]/60 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-[#C5D0DA] text-sm text-center md:text-right">
            <p>© {new Date().getFullYear()} Infinall. All rights reserved.</p>
            <p className="text-[#C5D0DA]/60 text-xs mt-1">Powered by Orimind Technologies</p>
          </div>
        </div>

        {/* Made with Love - Centered Bottom */}
        <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[#00C2FF]/10">
          <p className="text-[#C5D0DA] text-sm">
            © 2025 OriMind. Made with{' '}
            <Heart size={16} className="inline text-[#FF1744] fill-[#FF1744] animate-pulse" />{' '}
            for infinite possibilities.
          </p>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00C2FF]/30"></div>
    </footer>
  );
}