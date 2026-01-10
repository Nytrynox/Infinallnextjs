'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIAgentsPage } from '@/components/views/AIAgentsView';
import { SignupModal } from '@/components/SignupModal';
import { LoginModal } from '@/components/LoginModal';
import { OTPModal } from '@/components/OTPModal';

export default function Agents() {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');

  return (
    <>
      <AIAgentsPage
        onBackToHome={() => router.push('/')}
        onNavigateToCodingAgent={() => router.push('/agents/coding')}
        onNavigateToContentAgent={() => router.push('/agents/content')}
        onNavigateToPricing={() => router.push('/pricing')}
        onNavigateToAIAgents={() => {}}
        onNavigateToEnterprise={() => router.push('/enterprise')}
        onNavigateToCommunity={() => router.push('/community')}
        initialShowDashboard={false}
      />
      <SignupModal 
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
        onSignupSuccess={(email) => { 
          setSignupEmail(email); 
          setShowSignup(false); 
          setShowOTP(true); 
        }}
      />
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={() => { setShowLogin(false); router.push('/dashboard'); }}
        onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
      />
      <OTPModal 
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        email={signupEmail}
        onVerifySuccess={() => { setShowOTP(false); router.push('/dashboard'); }}
      />
    </>
  );
}
