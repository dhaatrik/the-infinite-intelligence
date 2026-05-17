import React, { useState } from 'react';
import { Infinity, Github, Linkedin, Shield, Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (e: React.MouseEvent, title: string, content: React.ReactNode) => {
    e.preventDefault();
    setActiveModal({ title, content });
  };

  return (
    <>
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-white/5 bg-[#030712]/50 backdrop-blur-xl relative overflow-hidden shrink-0"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            
            {/* Brand Col */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <Link to="/home" className="flex items-center gap-2 group inline-flex">
                <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-60 transition-opacity"></div>
                    <Infinity className="relative text-cyan-400 group-hover:rotate-180 transition-transform duration-700 ease-in-out" size={20} />
                </div>
                <h2 style={{ fontFamily: "Space Grotesk, sans-serif" }} className="text-lg font-black tracking-tight text-white leading-none">
                  The Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Intelligence</span>
                </h2>
              </Link>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                Forging the future of human-AI collaboration through autonomous agents, modular thinking architectures, and real-time synthesis.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://x.com/dhaatrik" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-lg text-gray-400 hover:text-cyan-400 transition-all flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://github.com/dhaatrik" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 rounded-lg text-gray-400 hover:text-purple-400 transition-all flex items-center justify-center">
                  <Github size={16} />
                </a>
                <a href="https://www.linkedin.com/in/dhaatrik/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/30 rounded-lg text-gray-400 hover:text-blue-400 transition-all flex items-center justify-center">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Links Col */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Platform</h3>
              <ul className="space-y-2.5">
                <li><Link to="/home" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Mission Control</Link></li>
                <li><a href="#" onClick={(e) => openModal(e, 'Documentation', <div className="space-y-3"><p><strong>Getting Started:</strong> Initialize operations using Mission Control.</p><p><strong>Agent Forge:</strong> Create Custom specialized personas to handle different tasks.</p><p><strong>Orchestration:</strong> The Multi-agent framework runs agents automatically and synthesizes results.</p></div>)} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" onClick={(e) => openModal(e, 'API Reference', <div className="space-y-3"><p>Rest API Endpoints for agent operations are currently restricted to beta users.</p><p>Stay tuned for public access keys.</p></div>)} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">API Reference</a></li>
              </ul>
            </div>

            {/* Legal/Status Col */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">System</h3>
              <ul className="space-y-2.5">
                <li>
                  <div onClick={(e) => openModal(e, 'System Status', <div className="space-y-4"><div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"><span className="text-white">Orchestration Engine</span><span className="text-emerald-400 text-sm font-bold">Operational</span></div><div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"><span className="text-white">Agent Inference API</span><span className="text-emerald-400 text-sm font-bold">Operational</span></div><div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"><span className="text-white">Vector Database</span><span className="text-emerald-400 text-sm font-bold">Operational</span></div></div>)} className="flex items-center gap-2 group cursor-pointer">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute opacity-70 group-hover:opacity-100"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 relative"></div>
                    </div>
                    <span className="text-sm text-gray-500 group-hover:text-white transition-colors">All Systems Operational</span>
                  </div>
                </li>
                <li><a href="#" onClick={(e) => openModal(e, 'Privacy & Terms', <div className="space-y-3"><p className="text-sm">We value your privacy. All prompt intelligence processing is secured and not used to train global base models without explicit opt-in.</p><p className="text-sm">Our Terms of Service require ethical use of autonomous swarm systems.</p></div>)} className="text-sm text-gray-500 hover:text-white flex items-center gap-2 transition-colors"><Shield size={14} /> Privacy & terms</a></li>
                <li><a href="#" onClick={(e) => openModal(e, 'Changelog', <div className="space-y-4"><div className="border-l-2 border-cyan-500 pl-4 py-1"><h4 className="text-white font-bold text-sm">v1.2.0 • Today</h4><p className="text-sm text-gray-400 mt-1">Added custom agent preset support. Improved synthesis engine reasoning speed by 15%.</p></div><div className="border-l-2 border-white/10 pl-4 py-1"><h4 className="text-gray-300 font-bold text-sm">v1.1.0 • Last Week</h4><p className="text-sm text-gray-400 mt-1">Introduced Beta Mode for direct agent conversation overriding.</p></div></div>)} className="text-sm text-gray-500 hover:text-white flex items-center gap-2 transition-colors"><Activity size={14} /> Changelog</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 font-medium">
              © {currentYear} The Infinite Intelligence. All rights reserved.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 shadow-inner">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Powered by</span>
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Gemini 3 Flash</span>
            </div>
          </div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 mb-12 sm:mb-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#050505] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h3 className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {activeModal.title}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 text-gray-400 leading-relaxed font-medium">
                {activeModal.content}
              </div>
              
              <div className="px-6 py-4 border-t border-white/5 bg-white/5 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
