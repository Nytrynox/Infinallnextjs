'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/components/Dashboard';
import { api } from '@/utils/api';
import { createClient } from '@supabase/supabase-js';

// We need a client-side wrapper to handle the auth check for Next.js
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth on mount
    async function checkUser() {
      const profile = await api.getProfile();
      if (!profile) {
        // Not logged in, redirect to home
        router.push('/');
      } else {
        setUser(profile);
      }
      setLoading(false);
    }
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#00C2FF]">
        Loading Environment...
      </div>
    );
  }

  if (!user) return null;

  return (
    <Dashboard 
      username={user.displayName || user.email?.split('@')[0]} 
      onLogout={() => {
        // Sign out logic
        router.push('/');
      }}
    />
  );
}
