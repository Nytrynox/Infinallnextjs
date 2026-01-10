'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { CodingAgentGallery } from '@/components/CodingAgentGallery';
import { AgentShowcaseSection } from '@/components/AgentShowcaseSection';
import { WorkflowSection } from '@/components/WorkflowSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FooterSection } from '@/components/FooterSection';
import { Starfield } from '@/components/Starfield';
import { SignupModal } from '@/components/SignupModal';
import { LoginModal } from '@/components/LoginModal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendPrompt = () => {
    // In Next.js, we would persist this to query params or context
    // For now, redirect to dashboard or login
    if (localStorage.getItem('supabase-auth-token')) {
       router.push('/dashboard');
    } else {
       setShowLogin(true);
    }
  };

  return (
    <>
      <Starfield />
      <div className="min-h-screen relative z-10 overflow-x-hidden">
        <Navigation 
          onNavigateToPricing={() => router.push('/pricing')}
          onNavigateToAIAgents={() => router.push('/agents')}
          onNavigateToEnterprise={() => router.push('/enterprise')}
          onNavigateToCommunity={() => router.push('/community')}
          onNavigateToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onNavigateToSignup={() => setShowSignup(true)}
          onNavigateToLogin={() => setShowLogin(true)}
          onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        
        <HeroSection 
          selectedPrompt={selectedPrompt} 
          onPromptChange={setSelectedPrompt} 
          onSendPrompt={handleSendPrompt} 
        />

        {/* Floating Launch Button */}
        <div className="fixed bottom-8 right-8 z-[100]">
          <button 
            onClick={() => router.push('/dashboard')}
            className="group relative flex items-center gap-3 px-6 py-3 bg-[#00C2FF] text-black font-bold rounded-full shadow-2xl shadow-[#00C2FF]/40 hover:scale-105 transition-all"
          >
            <div className="absolute -inset-1 bg-white/20 blur opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
            <span className="relative">Launch Dashboard</span>
            <div className="relative w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
              <span className="text-[10px]">GO</span>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-[100px] -mt-[100px] pb-[100px]">
          <ShowcaseSection onPromptClick={handlePromptClick} />
          <CodingAgentGallery />
          <AgentShowcaseSection />
          <WorkflowSection />
          <HowItWorksSection />
        </div>

        <FooterSection 
          onNavigateToPricing={() => router.push('/pricing')}
          onNavigateToEnterprise={() => router.push('/enterprise')}
          onNavigateToAIAgents={() => router.push('/agents')}
          onNavigateToCommunity={() => router.push('/community')}
        />

        <SignupModal 
          isOpen={showSignup} 
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
          onSignupSuccess={() => { setShowSignup(false); setShowLogin(true); }}
        />
        
        <LoginModal 
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={() => { setShowLogin(false); router.push('/dashboard'); }}
          onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
        />
      </div>
    </>
  );
}
