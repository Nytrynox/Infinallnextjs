import React from 'react';
import { Zap, Shield, Smartphone, ArrowUpRight, Search, BarChart3, Layers } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AnalyzerSection() {
  return (
    <section id="section-analyzer" className="space-y-8 scroll-mt-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-xl font-semibold text-white">Competitive Analysis</h1>
            <p className="text-sm text-zinc-500">Benchmark against competitors</p>
        </div>
      </div>

      {/* Simple Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
                type="text" 
                placeholder="Enter target URL (e.g., example.com)..." 
                className="w-full h-10 pl-10 pr-4 bg-zinc-900/50 rounded-lg border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
            />
        </div>
        <button className="px-6 h-10 bg-white text-black font-medium text-sm rounded-lg hover:bg-zinc-200 transition-colors">
            Scan
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
           { icon: Zap, label: 'Performance', value: '98', max: '100', color: 'text-blue-400', bg: 'bg-blue-500/10' },
           { icon: Shield, label: 'Security', value: 'A+', max: null, color: 'text-violet-400', bg: 'bg-violet-500/10' },
           { icon: Smartphone, label: 'Mobile Opt', value: '100%', max: null, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((item, i) => (
           <div key={i} className="p-6 rounded-xl border border-white/10 bg-zinc-900/30">
               <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                     <item.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-zinc-400">{item.label}</span>
               </div>
               
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{item.value}</span>
                  {item.max && <span className="text-sm text-zinc-500">/{item.max}</span>}
               </div>

               {item.max && (
                  <div className="w-full h-1 bg-zinc-800 rounded-full mt-4 overflow-hidden">
                     <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.value}%` }} />
                  </div>
               )}
           </div>
        ))}
      </div>

      {/* Traffic Chart */}
      <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-6">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-medium text-white">Traffic Comparison</h3>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500" />
                   <span className="text-xs text-zinc-400">You</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-zinc-600" />
                   <span className="text-xs text-zinc-400">Target</span>
                </div>
            </div>
        </div>
        
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                    { name: 'Mon', you: 4000, comp: 2400 },
                    { name: 'Tue', you: 3000, comp: 1398 },
                    { name: 'Wed', you: 2000, comp: 9800 },
                    { name: 'Thu', you: 2780, comp: 3908 },
                    { name: 'Fri', you: 1890, comp: 4800 },
                    { name: 'Sat', you: 2390, comp: 3800 },
                    { name: 'Sun', you: 3490, comp: 4300 },
                ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                       itemStyle={{ fontSize: '12px', color: '#e4e4e7' }}
                    />
                    <Area type="monotone" dataKey="you" stroke="#3b82f6" strokeWidth={2} fillOpacity={0.1} fill="#3b82f6" />
                    <Area type="monotone" dataKey="comp" stroke="#52525b" strokeWidth={2} strokeDasharray="4 4" fillOpacity={0} fill="transparent" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-6">
            <h3 className="text-sm font-medium text-white mb-6 flex items-center gap-2">
                <Layers size={16} className="text-zinc-500" />
                Feature Parity
            </h3>
            <div className="space-y-5">
                {[
                    { label: 'Color System', match: 98 },
                    { label: 'Typography', match: 85 },
                    { label: 'Components', match: 92 },
                    { label: 'Motion', match: 100 },
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-400">{item.label}</span>
                            <span className="text-white font-medium">{item.match}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${item.match}%` }} 
                            />
                        </div>
                    </div>
                ))}
            </div>
         </div>

         <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-6">
            <h3 className="text-sm font-medium text-white mb-6">Optimization Tips</h3>
            <div className="space-y-3">
                <RecommendationItem 
                    title="Asset Compression" 
                    desc="Reduce payload by 40% via WebP"
                />
                <RecommendationItem 
                    title="Style Consolidation" 
                    desc="Merge 12 redundant classes"
                />
                <RecommendationItem 
                    title="Accessibility Tags" 
                    desc="Add aria-labels to navigation"
                />
            </div>
         </div>
      </div>
    </section>
  );
}

interface RecommendationItemProps {
    title: string;
    desc: string;
}

function RecommendationItem({ title, desc }: RecommendationItemProps) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group">
            <div>
                <h4 className="text-xs font-medium text-zinc-300">{title}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
            </div>
            <div className="text-zinc-600 group-hover:text-white transition-colors">
                <ArrowUpRight size={14} />
            </div>
        </div>
    );
}
