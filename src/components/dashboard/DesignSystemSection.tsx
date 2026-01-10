import React from 'react';
import { Palette, Type } from 'lucide-react';

export function DesignSystemSection() {
  return (
    <section id="section-design" className="space-y-6 scroll-mt-8 pb-20">
      <div className="flex items-center justify-between">
         <div>
             <h2 className="text-xl font-semibold text-white">Visual System</h2>
             <p className="text-sm text-zinc-500">Core design tokens</p>
         </div>
         <span className="text-xs font-medium text-zinc-500 px-2 py-1 rounded border border-white/10">v2.0.4</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Colors */}
         <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-8">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Palette size={18} />
               </div>
               <h3 className="text-sm font-medium text-white">Color Palette</h3>
            </div>
            
            <div className="space-y-8">
               {/* Primary */}
               <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                     <span className="text-white font-medium">Primary Blue</span>
                     <span className="text-zinc-500">#00C2FF</span>
                  </div>
                  <div className="flex h-10 rounded-lg overflow-hidden">
                     {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                        <div 
                           key={shade} 
                           className="flex-1 bg-blue-500"
                           style={{ opacity: shade / 1000 + 0.1 }} 
                        />
                     ))}
                  </div>
               </div>

               {/* Grayscale */}
               <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                     <span className="text-white font-medium">Neutral</span>
                     <span className="text-zinc-500">#71717A</span>
                  </div>
                  <div className="flex h-10 rounded-lg overflow-hidden">
                     <div className="flex-1 bg-zinc-50"></div>
                     <div className="flex-1 bg-zinc-200"></div>
                     <div className="flex-1 bg-zinc-400"></div>
                     <div className="flex-1 bg-zinc-600"></div>
                     <div className="flex-1 bg-zinc-800"></div>
                     <div className="flex-1 bg-zinc-900"></div>
                     <div className="flex-1 bg-black"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Typography */}
         <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-8">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                  <Type size={18} />
               </div>
               <h3 className="text-sm font-medium text-white">Typography</h3>
            </div>

            <div className="space-y-8">
               <div className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-zinc-500 font-medium">Display</p>
                      <span className="text-xs text-zinc-600">32px</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">The quick brown fox</h1>
               </div>
               
               <div className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-zinc-500 font-medium">Heading</p>
                      <span className="text-xs text-zinc-600">24px</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">Jumps over the lazy dog</h2>
               </div>
               
               <div className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-zinc-500 font-medium">Body</p>
                      <span className="text-xs text-zinc-600">14px</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                     System design is not just visual. It is the architecture of information.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
