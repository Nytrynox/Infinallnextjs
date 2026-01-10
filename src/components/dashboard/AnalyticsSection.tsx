import React from 'react';
import { BarChart3, PieChart as PieChartIcon, Download, Sliders } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export function AnalyticsSection() {
  return (
    <section id="section-analytics" className="space-y-6 scroll-mt-8">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-xl font-semibold text-white">Data Intelligence</h2>
            <p className="text-sm text-zinc-500">Usage metrics and device breakdown</p>
         </div>
         <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white transition-colors">
                <Sliders size={16} />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white transition-colors text-xs font-medium">
                <Download size={14} /> Export
            </button>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* User Retention Chart */}
         <div className="md:col-span-2 rounded-xl border border-white/10 bg-zinc-900/30 p-6">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-medium text-white">Retention Metrics</h3>
               <div className="flex gap-1">
                   {['D', 'W', 'M', 'Y'].map(period => (
                       <button key={period} className={`px-2 py-1 rounded text-xs transition-colors ${
                           period === 'W' 
                           ? 'bg-white/10 text-white' 
                           : 'text-zinc-500 hover:text-zinc-300'
                       }`}>
                           {period}
                       </button>
                   ))}
               </div>
            </div>
            
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                     { name: 'Mon', active: 4000, new: 2400 },
                     { name: 'Tue', active: 3000, new: 1398 },
                     { name: 'Wed', active: 2000, new: 9800 },
                     { name: 'Thu', active: 2780, new: 3908 },
                     { name: 'Fri', active: 1890, new: 4800 },
                     { name: 'Sat', active: 2390, new: 3800 },
                     { name: 'Sun', active: 3490, new: 4300 },
                  ]} barGap={4}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                     <XAxis dataKey="name" stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                     <YAxis stroke="#52525B" fontSize={12} tickLine={false} axisLine={false} />
                     <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                        itemStyle={{ fontSize: '12px', color: '#e4e4e7' }}
                        labelStyle={{ color: '#a1a1aa', fontSize: '12px', marginBottom: '8px' }}
                     />
                     <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px', color: '#A1A1AA' }} />
                     <Bar dataKey="active" name="Active Users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                     <Bar dataKey="new" name="New Signups" fill="#27272a" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
         
         {/* Device Breakdown */}
         <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-6 flex flex-col">
            <h3 className="text-sm font-medium text-white mb-6">Device Split</h3>

            <div className="flex-1 min-h-[200px] w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={[{ name: 'Desktop', value: 65 }, { name: 'Mobile', value: 25 }, { name: 'Tablet', value: 10 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                     >
                        {[
                           { color: '#3b82f6' }, 
                           { color: '#8b5cf6' }, 
                           { color: '#27272a' }
                        ].map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <RechartsTooltip 
                         contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} 
                         itemStyle={{ color: '#fff', fontSize: '12px' }} 
                     />
                  </PieChart>
               </ResponsiveContainer>
               
               <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-3xl font-bold text-white">65%</span>
                  <span className="text-xs text-zinc-500 mt-1">Desktop</span>
               </div>
            </div>

            <div className="mt-6 space-y-3">
               {[{ label: 'Desktop', val: '65%', color: 'bg-blue-500' }, { label: 'Mobile', val: '25%', color: 'bg-violet-500' }, { label: 'Tablet', val: '10%', color: 'bg-zinc-700' }].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-zinc-400">{item.label}</span>
                     </div>
                     <span className="text-white font-medium">{item.val}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
}
