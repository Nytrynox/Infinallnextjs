import React from 'react';
import { Image as ImageIcon, Plus, MoreHorizontal, Download, Grid, Box } from 'lucide-react';

export function AssetsSection() {
  return (
    <section id="section-assets" className="space-y-6 scroll-mt-8">
      <div className="flex items-center justify-between">
         <div>
             <h2 className="text-xl font-semibold text-white">Asset Database</h2>
             <p className="text-sm text-zinc-500">Manage project resources</p>
         </div>
         <div className="flex gap-2">
             <button className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white transition-colors">
                 <Grid size={16} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors">
                <Plus size={14} />
                <span>Upload New</span>
             </button>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
         {/* Upload Placehoder */}
         <button className="aspect-square rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all flex flex-col items-center justify-center gap-3 group">
            <div className="p-3 rounded-full bg-zinc-800 text-zinc-500 group-hover:text-white transition-colors">
               <Plus size={20} />
            </div>
            <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300">Add Entry</span>
         </button>

         {[
            { name: 'logo-mark.svg', size: '12KB', type: 'svg', color: 'text-blue-400' },
            { name: 'hero-banner.png', size: '2.4MB', type: 'image', color: 'text-violet-400' },
            { name: 'icon-set.fig', size: '14MB', type: 'file', color: 'text-pink-400' },
            { name: 'social-og.jpg', size: '840KB', type: 'image', color: 'text-emerald-400' },
         ].map((asset, i) => (
            <div key={i} className="group relative aspect-square rounded-xl border border-white/5 bg-zinc-900/30 hover:border-white/10 transition-all overflow-hidden">
               {/* Content Preview */}
               <div className="absolute inset-0 flex items-center justify-center p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                  {asset.type === 'image' || asset.type === 'svg' ? (
                     <ImageIcon size={32} className={`${asset.color}`} />
                  ) : (
                     <Box size={32} className={`${asset.color}`} />
                  )}
               </div>

               {/* Overlay Actions */}
               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="p-1.5 rounded-md bg-black/50 hover:bg-black text-white transition-colors backdrop-blur-sm">
                     <Download size={12} />
                  </button>
                  <button className="p-1.5 rounded-md bg-black/50 hover:bg-black text-white transition-colors backdrop-blur-sm">
                     <MoreHorizontal size={12} />
                  </button>
               </div>

               {/* Footer Info */}
               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pt-8">
                  <p className="text-xs font-medium text-white truncate">{asset.name}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{asset.size}</p>
               </div>
            </div>
         ))}
      </div>
    </section>
  );
}
