import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader, Activity } from 'lucide-react';

interface ProcessingVisualizerProps {
  processingState: { isProcessing: boolean; step: string };
  isHitlEnabled: boolean;
}

export const ProcessingVisualizer: React.FC<ProcessingVisualizerProps> = ({
  processingState,
  isHitlEnabled
}) => {
  return (
    <AnimatePresence>
      {processingState.step !== 'IDLE' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          className="flex flex-col items-center justify-center py-8 overflow-visible relative z-20"
        >
          <div className="bg-[#050505]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] w-full max-w-5xl relative shadow-[0_20px_50px_rgb(0,0,0,0.5)]">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-amber-500/5 animate-pulse rounded-[2rem] pointer-events-none"></div>
            
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-4 relative z-10 w-full">
              {[
                { step: 'ANALYZING_PROMPT', label: 'Analyze', color: 'text-cyan-400', shadow: 'shadow-cyan-500/40', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30' },
                { step: 'ASSEMBLING_AGENTS', label: 'Assemble', color: 'text-purple-400', shadow: 'shadow-purple-500/40', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
                { step: 'AGENTS_WORKING', label: 'Execute', color: 'text-emerald-400', shadow: 'shadow-emerald-500/40', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
                { step: 'AGENTS_CRITIQUING', label: 'Critique', color: 'text-amber-400', shadow: 'shadow-amber-500/40', bg: 'bg-amber-500/20', border: 'border-amber-500/30' },
                ...(isHitlEnabled ? [{ step: 'PAUSED_FOR_REVIEW', label: 'Review', color: 'text-rose-400', shadow: 'shadow-rose-500/40', bg: 'bg-rose-500/20', border: 'border-rose-500/30' }] : []),
                { step: 'SYNTHESIZING', label: 'Synthesize', color: 'text-blue-400', shadow: 'shadow-blue-500/40', bg: 'bg-blue-500/20', border: 'border-blue-500/30' }
              ].map((s, idx, arr) => {
                const isActive = processingState.step === s.step;
                const isPast = arr.findIndex(item => item.step === processingState.step) > idx;
                
                return (
                  <React.Fragment key={s.step}>
                    <motion.div 
                      layout
                      className={`flex items-center gap-3 transition-all duration-700 px-4 py-2.5 rounded-2xl ${isActive ? s.bg + ' ' + s.border + ' border' : 'bg-transparent border border-transparent'} ${isActive ? s.color : isPast ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <div className={`relative w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-700 ${isActive ? `${s.border} bg-[#0a0a0c] shadow-[0_0_20px_rgba(0,0,0,0.5)]` : isPast ? 'border-gray-600 bg-gray-800' : 'border-gray-800 bg-[#0a0a0c]'}`}>
                        {isActive && <div className={`absolute inset-0 rounded-xl ${s.shadow} shadow-lg animate-pulse opacity-50`}></div>}
                        {isPast ? <Check size={14} className="text-gray-300 relative z-10" strokeWidth={3} /> : isActive ? <Activity size={14} className="animate-bounce relative z-10" /> : <span className="opacity-50 font-sans relative z-10">{idx + 1}</span>}
                      </div>
                      <span className={`transition-all duration-500 ${isActive ? 'opacity-100 font-black' : isPast ? 'opacity-70 font-semibold' : 'opacity-40 font-bold'}`}>{s.label}</span>
                    </motion.div>
                    {idx < arr.length - 1 && (
                      <div className="hidden md:flex flex-1 items-center justify-center min-w-[20px]">
                        <div className={`h-[2px] w-full rounded-full transition-all duration-1000 ${isPast ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-gray-800/50'}`}>
                          {isActive && <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className={`h-full w-1/2 bg-gradient-to-r from-transparent via-current to-transparent ${s.color}`}></motion.div>}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
