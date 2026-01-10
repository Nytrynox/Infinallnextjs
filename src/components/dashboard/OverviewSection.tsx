import React from 'react';
import { Globe, Activity, Terminal, Wifi } from 'lucide-react';

export function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-xl font-semibold text-white">System Overview</h1>
            <p className="text-sm text-zinc-500">Real-time system performance and logs</p>
         </div>
         
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-500">System Online</span>
            </div>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
         {/* Website Preview */}
         <div className="lg:col-span-2 rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden flex flex-col h-full">
            {/* Simple Browser Bar */}
            <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-3">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
               </div>
               <div className="flex-1 h-6 bg-black/20 rounded flex items-center px-3">
                  <span className="text-xs text-zinc-500 truncate">nexus-dashboard.app</span>
               </div>
            </div>
            
            {/* Preview Placeholder */}
            <div className="flex-1 bg-black/20 flex items-center justify-center p-8">
               <div className="w-full max-w-md space-y-4 opacity-50">
                  <div className="w-16 h-16 rounded-xl bg-zinc-800 mx-auto mb-6" />
                  <div className="h-4 w-3/4 bg-zinc-800 rounded mx-auto" />
                  <div className="h-4 w-1/2 bg-zinc-800 rounded mx-auto" />
                  <div className="grid grid-cols-3 gap-4 mt-8">
                     <div className="h-24 rounded bg-zinc-800" />
                     <div className="h-24 rounded bg-zinc-800" />
                     <div className="h-24 rounded bg-zinc-800" />
                  </div>
               </div>
            </div>
         </div>

         {/* Simple Logs */}
         <div className="rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden flex flex-col h-full">
            <div className="h-10 flex items-center px-4 border-b border-white/5 bg-white/5">
               <span className="text-xs font-medium text-zinc-400">System Logs</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               {[
                  { time: '10:42', msg: 'System kernel loaded', type: 'info' },
                  { time: '10:43', msg: 'Network link established', type: 'success' },
                  { time: '10:43', msg: 'User authentication verified', type: 'success' },
                  { time: '10:44', msg: 'Data stream active', type: 'info' },
                  { time: '10:45', msg: 'Minor latency detected', type: 'warning' },
                  { time: '10:46', msg: 'Garbage collection finished', type: 'info' },
                  { time: '10:48', msg: 'API gateway responding', type: 'success' },
               ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                     <span className="text-zinc-600 font-mono">{log.time}</span>
                     <span className={`${
                        log.type === 'success' ? 'text-emerald-500' : 
                        log.type === 'warning' ? 'text-amber-500' : 'text-zinc-400'
                     }`}>
                        {log.msg}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
