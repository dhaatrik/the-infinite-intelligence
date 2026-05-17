import React, { useState, useEffect } from 'react';
import { Infinity, Github, Twitter, Menu, X, Settings2, History, Bot, Save, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  turnsCount?: number;
  betaHistoryCount?: number;
  customSavedPresetsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  turnsCount = 0, 
  betaHistoryCount = 0, 
  customSavedPresetsCount = 0 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isBetaMode = location.pathname === '/beta';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-b border-transparent py-2'
      } h-16 flex items-center justify-between px-6`}
    >
      <Link to="/home" className="flex items-center gap-3 group">
        <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-60 transition-opacity animate-pulse text-cyan-400"></div>
            <Infinity className="relative text-cyan-400 group-hover:rotate-180 transition-transform duration-700 ease-in-out" size={24} />
        </div>
        <div className="flex flex-col">
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif" }} className="text-xl font-black tracking-tight text-white leading-none">
            The Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Intelligence</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] uppercase tracking-widest text-emerald-500/80 font-bold">System Status: Nominal</span>
          </div>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-4 text-xs font-bold text-gray-400">
         <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner">
           <Link to="/settings" className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors group">
             <Settings2 size={16} className="text-gray-400 group-hover:text-cyan-400 group-hover:rotate-90 transition-all duration-500" />
             <span className="text-gray-400 group-hover:text-cyan-400 font-bold uppercase tracking-widest text-[10px] hidden lg:inline">Settings</span>
           </Link>
           <div className="w-px h-4 bg-white/10 mx-1 self-center"></div>
           <Link to="/history" className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors group">
             <History size={16} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
             <span className="text-gray-400 group-hover:text-purple-400 font-bold uppercase tracking-widest text-[10px] hidden lg:inline">
               History <span className="ml-1 text-purple-500/50">[{turnsCount}]</span>
             </span>
           </Link>
           <div className="w-px h-4 bg-white/10 mx-1 self-center"></div>
           <Link to="/agent-history" className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors group">
             <Bot size={16} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
             <span className="text-gray-400 group-hover:text-emerald-400 font-bold uppercase tracking-widest text-[10px] hidden lg:inline">
               Agents <span className="ml-1 text-emerald-500/50">[{betaHistoryCount}]</span>
             </span>
           </Link>
           <div className="w-px h-4 bg-white/10 mx-1 self-center"></div>
           <Link to="/agent-presets" className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors group">
             <Save size={16} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
             <span className="text-gray-400 group-hover:text-amber-400 font-bold uppercase tracking-widest text-[10px] hidden lg:inline">
               Presets <span className="ml-1 text-amber-500/50">[{customSavedPresetsCount}]</span>
             </span>
           </Link>
         </div>
         
         <div className="h-6 w-px bg-white/10 mx-2"></div>
         
         <div className="flex items-center gap-2">
           {!isBetaMode && (
             <Link to="/beta" className="flex items-center gap-1.5 px-3 py-1.5 mr-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:scale-105 border border-indigo-500/20 hover:border-indigo-500/40 transition-all font-bold group shadow-[0_0_15px_rgba(99,102,241,0.1)]">
               <Sparkles size={14} className="group-hover:animate-pulse" />
               <span className="uppercase tracking-widest text-[10px]">Beta Mode</span>
             </Link>
           )}
         </div>
      </div>
      
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative z-50"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-16 left-0 right-0 bg-[#030712]/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl p-4 flex flex-col gap-2 md:hidden"
          >
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors group">
              <Settings2 size={18} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-sm font-bold text-gray-300 group-hover:text-cyan-400">Settings</span>
            </Link>
            
            <Link to="/history" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors group">
              <History size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
              <span className="text-sm font-bold text-gray-300 group-hover:text-purple-400">
                History <span className="ml-2 text-purple-500/50 text-xs">[{turnsCount}]</span>
              </span>
            </Link>
            
            <Link to="/agent-history" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors group">
              <Bot size={18} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-sm font-bold text-gray-300 group-hover:text-emerald-400">
                Agents <span className="ml-2 text-emerald-500/50 text-xs">[{betaHistoryCount}]</span>
              </span>
            </Link>
            
            <Link to="/agent-presets" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors group">
              <Save size={18} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
              <span className="text-sm font-bold text-gray-300 group-hover:text-amber-400">
                Presets <span className="ml-2 text-amber-500/50 text-xs">[{customSavedPresetsCount}]</span>
              </span>
            </Link>
            
            {!isBetaMode && (
              <div className="pt-2 mt-2 border-t border-white/5">
                <Link to="/beta" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all font-bold group">
                  <Sparkles size={16} className="group-hover:animate-pulse" />
                  <span className="uppercase tracking-widest text-xs">Enter Beta Mode</span>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
};
