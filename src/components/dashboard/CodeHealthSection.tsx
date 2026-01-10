import React from 'react';
import { GitBranch, ShieldCheck, Activity } from 'lucide-react';

export function CodeHealthSection() {
  return (
    <section id="section-code-health" className="space-y-6 scroll-mt-8">
      <div className="flex items-center justify-between">
         <div>
             <h2 className="text-xl font-semibold text-white">Repository Status</h2>
             <p className="text-sm text-zinc-500">Code quality and security metrics</p>
         </div>
         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Contribution Stream */}
         <div className="lg:col-span-2 rounded-xl border border-white/10 bg-zinc-900/30 p-6">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                     <GitBranch size={18} />
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-white">Commit Activity</h3>
                     <p className="text-xs text-zinc-500">Main Branch • Last 30 Days</p>
                  </div>
               </div>
            </div>

            {/* Simple Grid Map */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(12px,1fr))] gap-1 h-32 content-start">
               {Array.from({ length: 180 }).map((_, i) => {
                  const level = Math.random();
                  let colorClass = 'bg-zinc-800/50'; 
                  
                  if (level > 0.9) colorClass = 'bg-emerald-400';
                  else if (level > 0.6) colorClass = 'bg-emerald-600';
                  else if (level > 0.3) colorClass = 'bg-emerald-900';
                  
                  return (
                     <div key={i} className={`aspect-square rounded-[2px] ${colorClass}`} />
                  );
               })}
            </div>
         </div>

         {/* Health Score */}
         <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
               <div>
                  <h3 className="text-sm font-medium text-white">System Health</h3>
                  <p className="text-xs text-zinc-500 mt-1">Last scan: 2m ago</p>
               </div>
               <Activity size={18} className="text-zinc-500" />
            </div>

            <div className="flex items-center gap-4 my-6">
               <div className="text-5xl font-bold text-white tracking-tight">A+</div>
               <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-500">
                     <ShieldCheck size={14} />
                     <span>Secure</span>
                  </div>
                  <div className="text-xs text-zinc-500">Latency: 2ms</div>
               </div>
            </div>

            <div className="space-y-4">
               {[
                  { label: 'Security', score: '100%', status: 'success' },
                  { label: 'Integrity', score: '98%', status: 'success' },
                  { label: 'Coverage', score: '92%', status: 'warning' },
               ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                     <span className="text-zinc-400">{item.label}</span>
                     <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                           <div 
                              className={`h-full rounded-full ${item.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                              style={{ width: item.score }} 
                           />
                        </div>
                        <span className="text-white w-8 text-right font-medium">{item.score}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
}
