import React, { useState } from 'react';
import { Bell, Coins, Search, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TopBar() {
  return (
    <header className="h-10 border-b border-[#30363D]/20 bg-black sticky top-0 z-50 overflow-hidden">
      {/* Subtle Background Detail */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent animate-scanline" />
      </div>
    </header>
  );
}