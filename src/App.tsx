import React, { useState } from 'react';
import { SignupModal } from './components/SignupModal';
import { LoginModal } from './components/LoginModal';
import { OTPModal } from './components/OTPModal';
import { Dashboard } from './components/Dashboard';
import { Starfield } from './components/Starfield';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { WorkflowSection } from './components/WorkflowSection';
import { AgentShowcaseSection } from './components/AgentShowcaseSection';
import { CodingAgentGallery } from './components/CodingAgentGallery';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FooterSection } from './components/FooterSection';
import { PricingPage } from './pages/PricingPage';
import { AIAgentsPage } from './pages/AIAgentsPage';
import { CodingAgentPage } from './pages/CodingAgentPage';
import { ContentAgentPage } from './pages/ContentAgentPage';
import { EnterprisePage } from './pages/EnterprisePage';
import { CommunityPage } from './pages/CommunityPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TerminalPrompt } from './components/TerminalPrompt';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'ai-agents' | 'coding-agent' | 'content-agent' | 'enterprise' | 'community' | 'dashboard'>('home');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [username, setUsername] = useState('');
  const [forceDashboardInAgents, setForceDashboardInAgents] = useState(false);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    // Scroll to top to show the input
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPricing = () => {
    setCurrentPage('pricing');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToAIAgents = () => {
    setCurrentPage('ai-agents');
    setForceDashboardInAgents(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToTestDashboard = () => {
    setCurrentPage('ai-agents');
    setForceDashboardInAgents(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToCodingAgent = () => {
    setCurrentPage('coding-agent');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToContentAgent = () => {
    setCurrentPage('content-agent');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToEnterprise = () => {
    setCurrentPage('enterprise');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToCommunity = () => {
    setCurrentPage('community');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateToSignup = () => {
    setShowSignupModal(true);
  };

  const handleNavigateToLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModals = () => {
    setShowSignupModal(false);
    setShowLoginModal(false);
    setShowOTPModal(false);
  };

  const handleSignupSuccess = (email: string) => {
    setSignupEmail(email);
    setShowSignupModal(false);
    setShowOTPModal(true);
  };

  const handleOTPVerified = () => {
    // Extract username from email
    const userName = signupEmail.split('@')[0];
    setUsername(userName);
    setShowOTPModal(false);
    setCurrentPage('dashboard');
  };

  const handleLogin = (email: string) => {
    // Extract username from email (part before @)
    const userName = email.split('@')[0];
    setUsername(userName);
    setShowLoginModal(false);
    setCurrentPage('dashboard');
  };

  const handleSendPrompt = () => {
    if (selectedPrompt.trim()) {
      if (!username) {
        // User not logged in - save prompt and show login modal
        setPendingPrompt(selectedPrompt);
        setShowLoginModal(true);
      } else {
        // User logged in - go to dashboard
        setPendingPrompt(selectedPrompt);
        setCurrentPage('dashboard');
      }
    }
  };

  const handleLogout = () => {
    setUsername('');
    setCurrentPage('home');
    setSelectedPrompt(''); // Clear the prompt from landing page
    setPendingPrompt(''); // Clear any pending prompt
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAgents = () => {
    setCurrentPage('ai-agents');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (currentPage === 'dashboard') {
    return <Dashboard username={username} onLogout={handleLogout} initialPrompt={pendingPrompt} />;
  }

  if (currentPage === 'pricing') {
    return (
      <>
        <PricingPage 
          onBackToHome={handleBackToHome} 
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
        />
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleNavigateToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onLogin={handleLogin}
          onSwitchToSignup={handleNavigateToSignup}
        />
        <OTPModal 
          isOpen={showOTPModal}
          onClose={handleCloseModals}
          email={signupEmail}
          onVerifySuccess={handleOTPVerified}
        />
      </>
    );
  }

  if (currentPage === 'ai-agents') {
    return (
      <>
        <AIAgentsPage 
          onBackToHome={handleBackToHome} 
          onNavigateToCodingAgent={handleNavigateToCodingAgent}
          onNavigateToContentAgent={handleNavigateToContentAgent}
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
          initialShowDashboard={forceDashboardInAgents}
        />
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleNavigateToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onLogin={handleLogin}
          onSwitchToSignup={handleNavigateToSignup}
        />
        <OTPModal 
          isOpen={showOTPModal}
          onClose={handleCloseModals}
          email={signupEmail}
          onVerifySuccess={handleOTPVerified}
        />
      </>
    );
  }

  if (currentPage === 'coding-agent') {
    return (
      <>
        <CodingAgentPage 
          onBackToHome={handleBackToHome} 
          onBackToAgents={handleBackToAgents}
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
        />
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleNavigateToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onLogin={handleLogin}
          onSwitchToSignup={handleNavigateToSignup}
        />
        <OTPModal 
          isOpen={showOTPModal}
          onClose={handleCloseModals}
          email={signupEmail}
          onVerifySuccess={handleOTPVerified}
        />
      </>
    );
  }

  if (currentPage === 'content-agent') {
    return (
      <>
        <ContentAgentPage 
          onBackToHome={handleBackToHome} 
          onBackToAgents={handleBackToAgents}
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
        />
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleNavigateToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onLogin={handleLogin}
          onSwitchToSignup={handleNavigateToSignup}
        />
        <OTPModal 
          isOpen={showOTPModal}
          onClose={handleCloseModals}
          email={signupEmail}
          onVerifySuccess={handleOTPVerified}
        />
      </>
    );
  }

  if (currentPage === 'enterprise') {
    return (
      <>
        <EnterprisePage 
          onBackToHome={handleBackToHome}
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
        />
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleNavigateToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onLogin={handleLogin}
          onSwitchToSignup={handleNavigateToSignup}
        />
        <OTPModal 
          isOpen={showOTPModal}
          onClose={handleCloseModals}
          email={signupEmail}
          onVerifySuccess={handleOTPVerified}
        />
      </>
    );
  }

  if (currentPage === 'community') {
    return (
      <>
        <CommunityPage 
          onBackToHome={handleBackToHome}
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
          onNavigateToSignup={handleNavigateToSignup}
        />
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleNavigateToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onLogin={handleLogin}
          onSwitchToSignup={handleNavigateToSignup}
        />
        <OTPModal 
          isOpen={showOTPModal}
          onClose={handleCloseModals}
          email={signupEmail}
          onVerifySuccess={handleOTPVerified}
        />
      </>
    );
  }

  return (
    <>
      <Starfield />
      <div className="min-h-screen overflow-y-auto bg-transparent relative z-10">
        <Navigation 
          onNavigateToPricing={handleNavigateToPricing} 
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToCommunity={handleNavigateToCommunity}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToSignup={handleNavigateToSignup}
          onNavigateToLogin={handleNavigateToLogin}
          onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        />
        <HeroSection selectedPrompt={selectedPrompt} onPromptChange={setSelectedPrompt} onSendPrompt={handleSendPrompt} />
        
        {/* Launch Dashboard Button */}
        <div className="fixed bottom-8 right-8 z-[100]">
          <button 
            onClick={handleNavigateToTestDashboard}
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
          onNavigateToPricing={handleNavigateToPricing}
          onNavigateToEnterprise={handleNavigateToEnterprise}
          onNavigateToAIAgents={handleNavigateToAIAgents}
          onNavigateToCommunity={handleNavigateToCommunity}
        />
      </div>
      <SignupModal 
        isOpen={showSignupModal}
        onClose={handleCloseModals}
        onSwitchToLogin={handleNavigateToLogin}
        onSignupSuccess={handleSignupSuccess}
      />
      <LoginModal 
        isOpen={showLoginModal}
        onClose={handleCloseModals}
        onLogin={handleLogin}
        onSwitchToSignup={handleNavigateToSignup}
      />
      <OTPModal 
        isOpen={showOTPModal}
        onClose={handleCloseModals}
        email={signupEmail}
        onVerifySuccess={handleOTPVerified}
      />
    </>
  );
}