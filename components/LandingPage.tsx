import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Network, Brain, MessageSquare, ArrowRight, Shield, Infinity, Sparkles, Activity, Mouse, Zap, Cpu, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
      >
        <h4 className="text-lg font-bold text-white flex items-center justify-between">
           {question}
           <div className="flex items-center gap-3">
             <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
           </div>
        </h4>
        <motion.div 
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? 16 : 0 }}
          className="overflow-hidden"
        >
          <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const LandingPage: React.FC<{ onInitialize?: () => void }> = ({ onInitialize }) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  } as const;

  // Custom Logo Component
  const Logo = () => (
    <div className="relative flex items-center justify-center p-1 rounded-xl bg-black border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
      <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <img 
        src="/logo.png" 
        alt="The Infinite Intelligence Logo" 
        className="relative w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-500" 
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* 1. Premium Background Animations & Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y }} className="w-full h-full">
          <motion.div
             animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0], scale: [1, 1.2, 1] }}
             transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
             className="absolute top-[-10%] right-[10%] w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div
             animate={{ x: [0, -150, 150, 0], y: [0, 150, -150, 0], scale: [1, 1.5, 1] }}
             transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
             className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" 
          />
        </motion.div>
      </div>

      {/* 2. Polished Sticky Navigation */}
      <motion.div style={{ scaleX: scrollYProgress, transformOrigin: '0%' }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-[100]" />
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo />
            <span className="text-lg font-black tracking-tighter text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>The Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Intelligence</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase border-b border-transparent hover:border-cyan-400 pb-1">Features</a>
            <a href="#how-it-works" className="text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase border-b border-transparent hover:border-cyan-400 pb-1">Methodology</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/home" onClick={onInitialize} className="hidden md:flex flex items-center px-6 py-2.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-50 hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              Access System
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col min-h-screen pt-32">
        {/* 3. Enhanced Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center mt-6 pb-20 relative">
          
          {/* Floating UI Elements */}
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }} className="absolute top-1/4 left-0 md:left-10 w-16 h-16 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center opacity-40 hidden md:flex hover:opacity-100 hover:scale-110 transition-all">
             <Cpu size={24} className="text-cyan-400" />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }} className="absolute top-1/3 right-0 md:right-10 w-12 h-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center opacity-40 hidden md:flex hover:opacity-100 hover:scale-110 transition-all">
             <Zap size={20} className="text-purple-400" />
          </motion.div>
          {/* Floating Tech Badges */}
          <div className="absolute top-[15%] left-[20%] hidden lg:block opacity-50 animate-[bounce_8s_infinite]">
             <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono text-cyan-400">M-Agents</div>
          </div>
          <div className="absolute top-[25%] right-[20%] hidden lg:block opacity-50 animate-[bounce_7s_infinite]">
             <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono text-purple-400">Logic-Swarm</div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl mb-10 shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            <div className="relative flex items-center justify-center">
              <span className="absolute w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
              <span className="relative w-2 h-2 rounded-full bg-cyan-400"></span>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">Multi-Agent Protocol Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Beyond Single <br className="hidden md:block"/> 
            {/* Premium Text-Clip Gradient */}
            <span className="relative inline-block mt-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              Prompting.
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-indigo-400/20 to-purple-400/20 blur-2xl -z-10 rounded-full"></div>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mt-8 text-lg md:text-xl text-gray-400 font-medium leading-relaxed"
          >
            Deploy synchronized squads of specialized AI agents. They analyze, debate, and synthesize solutions—transforming a single prompt into comprehensive intelligence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/home" onClick={onInitialize} className="h-14 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-sm uppercase tracking-[0.15em] hover:from-cyan-400 hover:to-blue-400 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] flex items-center justify-center gap-3 group w-full sm:w-auto relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">Initialize System <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" /></span>
            </Link>
            <Link to="/beta" onClick={onInitialize} className="h-14 px-8 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-sm uppercase tracking-[0.15em] hover:bg-white/10 hover:border-purple-500/40 transition-all flex items-center justify-center gap-3 w-full sm:w-auto backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <Sparkles size={18} className="text-purple-400" /> Enter Agent Forge
            </Link>
          </motion.div>
          
          {/* Scroll Down Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: 'smooth' })}
          >
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</p>
             <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}>
               <Mouse size={20} />
             </motion.div>
          </motion.div>

        </main>

        {/* Pre-features: Stats & Terminal */}
        <div className="w-full max-w-5xl mx-auto py-20 relative z-10 border-t border-white/5 text-center flex flex-col items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full mb-20">
                {[ {label: "Agents Configured", val: "50k+"}, {label: "Tokens Managed", val: "1.2B+"}, {label: "Avg Synthesis", val: "2.5s"}, {label: "Uptime", val: "99.9%"} ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center group">
                        <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-500">{stat.val}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2 font-bold">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
            
            <div className="w-full max-w-3xl mx-auto bg-[#0a0a0c] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] text-left hover:border-cyan-500/30 transition-colors duration-500">
                <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-[10px] text-gray-500 font-mono">agent-terminal ~ root</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
                    <p className="mb-2"><span className="text-emerald-400">$</span> initialize_squad --task "Analyze market trends"</p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}><span className="text-blue-400">[System]</span> Recruiting Analyst_Agent...</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.0 }}><span className="text-purple-400">[System]</span> Recruiting Critic_Agent...</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }}><span className="text-yellow-400">[Analyst]</span> Synthesizing data points...</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 }}><span className="text-rose-400">[Critic]</span> Identifying counter-arguments in dataset...</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5 }} className="text-cyan-400 font-bold mt-2">✓ Consensus reached. Final synthesis generated in 2.4s.</motion.p>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }} className="inline-block w-2 h-4 bg-white mt-1"></motion.span>
                </div>
            </div>
        </div>

      </div>

      {/* 5. Improved Feature Section: Bento Layout */}
      <div id="features" className="w-full bg-[#050505] relative z-10 py-32 border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={fadeInUp} 
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              A Framework For <span className="text-cyan-400">Deep Reasoning</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Our infrastructure separates complex workflows into logical domains, allowing models to cross-examine and validate findings before presenting them.
            </p>
          </motion.div>

          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Feature 1 (Large) */}
            <motion.div variants={fadeInUp} className="md:col-span-2 p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group overflow-hidden relative drop-shadow-md hover:drop-shadow-xl backdrop-blur-sm hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                <Brain size={180} className="text-cyan-400" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all relative z-10">
                <Brain size={28} className="text-cyan-400" />
              </div>
              <h3 className="text-3xl font-black mb-3 text-white tracking-tight relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Specialized Personas</h3>
              <p className="text-gray-400 leading-relaxed text-base max-w-md relative z-10">Assign custom scopes to individual agents (Analyst, Ethicist, Creative, Critic) for multi-dimensional problem solving. Break down monolithic prompts into modular expertise.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeInUp} className="p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm hover:-translate-y-1">
               <div className="absolute top-0 -right-10 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                <Network size={120} className="text-purple-400" />
              </div>
               <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all relative z-10">
                <Network size={28} className="text-purple-400" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white tracking-tight relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Dynamic Flow</h3>
              <p className="text-gray-400 leading-relaxed text-sm relative z-10">Automatic or manual routing of sub-tasks via parallel, sequential, or competitive generation.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeInUp} className="p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-indigo-500/40 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm hover:-translate-y-1">
               <div className="absolute top-0 -right-10 p-8 opacity-5 group-hover:opacity-10 group-hover:-translate-y-4 transition-all duration-700 pointer-events-none">
                <MessageSquare size={120} className="text-indigo-400" />
              </div>
               <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all relative z-10">
                <MessageSquare size={28} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-white tracking-tight relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Live Debates</h3>
              <p className="text-gray-400 leading-relaxed text-sm relative z-10">Watch agents iteratively refine their outputs based on real-time critiques from peers.</p>
            </motion.div>

            {/* Feature 4 (Large) */}
            <motion.div variants={fadeInUp} className="md:col-span-2 p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-rose-500/40 transition-all duration-300 group overflow-hidden relative backdrop-blur-sm hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                <Shield size={180} className="text-rose-400" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(244,63,94,0.2)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all relative z-10">
                <Shield size={28} className="text-rose-400" />
              </div>
              <h3 className="text-3xl font-black mb-3 text-white tracking-tight relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Human-in-the-Loop</h3>
              <p className="text-gray-400 leading-relaxed text-base max-w-md relative z-10">Pause synthetic pipelines and interject manual guidance. Steer the conversation, override agent conclusions, or provide missing context before final synthesis occurs.</p>
            </motion.div>

            {/* Feature 5 (Full Width Token Tracking) */}
            <motion.div variants={fadeInUp} className="md:col-span-3 p-10 rounded-[2rem] bg-gradient-to-br from-[#0a0a0c] to-[#050505] border border-white/10 hover:border-yellow-500/40 transition-all duration-300 group overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]">
               <div className="absolute -right-20 -bottom-20 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-[15deg] transition-all duration-700 pointer-events-none">
                <Activity size={300} className="text-yellow-500" />
               </div>
               <div className="relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all">
                   <Activity size={28} className="text-yellow-500" />
                 </div>
                 <h3 className="text-3xl font-black mb-3 text-white tracking-tight relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Real-Time Token Tracking</h3>
                 <p className="text-gray-400 leading-relaxed text-base max-w-xl relative z-10">Absolute transparency in resource consumption. The system precisely calculates and exposes token usage for every agent interaction, prompt analysis, and final synthesis across the entire orchestration pipeline.</p>
               </div>
               
               <div className="relative z-10 w-full md:w-auto p-6 rounded-2xl bg-black border border-white/10 font-mono flex flex-col gap-3 min-w-[280px] shadow-2xl group-hover:border-yellow-500/30 transition-colors">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Analyst Agent</span>
                    <span className="text-yellow-500/80">342</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Critic Agent</span>
                    <span className="text-yellow-500/80">128</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Synthesis</span>
                    <span className="text-yellow-500/80">456</span>
                 </div>
                 <div className="w-full h-px bg-white/10 my-3"></div>
                 <div className="flex justify-between items-center font-bold text-lg">
                    <span className="text-white">Total Tokens</span>
                    <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">926</span>
                 </div>
               </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 6. Abstract Scroll/Timeline for Methodology */}
      <div id="how-it-works" className="w-full bg-[#030712] relative z-10 border-t border-white/5 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              How The <span className="text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">System</span> Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
              We orchestrate multiple AI agents in a structured workflow to deliver mathematically sound synthesized intelligence.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-0 relative">
            {/* Center line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-indigo-500 via-purple-500/50 to-transparent -translate-x-1/2 z-0"></div>
            
            {/* Left line (Mobile) */}
            <div className="md:hidden absolute left-[39px] top-12 bottom-12 w-px bg-gradient-to-b from-indigo-500 via-purple-500/50 to-transparent z-0"></div>

            {[
              { step: '01', title: 'First Principles Analysis', desc: 'Every query is first decomposed to its core truths. We strip away assumptions to understand the fundamental components of the problem.' },
              { step: '02', title: 'Dynamic Agent Assembly', desc: 'Based on the analysis, the system recruits a specialized squad of agents with tailored personas and scopes to tackle different facets of the problem.' },
              { step: '03', title: 'Independent Execution', desc: 'Agents work in parallel, researching and drafting solutions from their unique perspectives without initial cross-contamination.' },
              { step: '04', title: 'Peer Critique & Refinement', desc: 'Initial drafts undergo rigorous cross-examination by dedicated critic agents to identify logical flaws, biases, and omissions.' },
              { step: '05', title: 'Final Synthesis', desc: 'A master orchestration agent synthesizes the refined inputs into a cohesive, comprehensive, and highly-accurate final response.' }
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={i} 
                className={`relative z-10 flex flex-col md:flex-row items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'} gap-8 lg:gap-16`}
              >
                
                {/* Mobile Number/Icon */}
                <div className="md:hidden absolute left-4 top-8 w-12 h-12 rounded-2xl bg-black border border-indigo-500/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <span className="font-mono text-indigo-400 font-bold text-lg">{i + 1}</span>
                </div>

                {/* Content wrapper */}
                <div className={`w-full md:w-1/2 pl-[88px] md:pl-0 ${i % 2 === 0 ? 'md:pr-12 lg:pr-16 md:text-right' : 'md:pl-12 lg:pl-16 text-left'} py-4 md:py-12`}>
                  <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-8 md:p-10 rounded-[2rem] hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all duration-300 shadow-xl group relative overflow-hidden backdrop-blur-md hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                    <div className={`absolute top-0 ${i % 2 === 0 ? 'md:right-0 left-0 md:left-auto' : 'left-0'} w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                    
                    <div className={`flex flex-col gap-4 ${i % 2 === 0 ? 'md:items-end items-start' : 'items-start'} relative z-10`}>
                        <span className="font-mono text-indigo-400 font-bold text-xs border border-indigo-500/40 px-4 py-2 rounded-full bg-indigo-500/10 tracking-[0.2em] uppercase shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]">Phase {item.step}</span>
                        <h3 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.title}</h3>
                        <p className="text-gray-400 text-base leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Node */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-black border-[2px] border-indigo-500/50 items-center justify-center z-10 shadow-[0_0_30px_rgba(99,102,241,0.4)] relative group cursor-default hover:border-indigo-400 transition-colors">
                  <div className="absolute inset-0 bg-indigo-500/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="font-mono text-indigo-400 font-bold text-xl relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>0{i + 1}</span>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-1/2"></div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. FAQ Section */}
      <div className="w-full bg-[#030712] relative z-10 border-t border-white/5 py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-4 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Inquiries</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
             {[
               { q: "What makes this different from standard AI prompts?", a: "Instead of a single zero-shot response, our system decomposes your prompt, assigns sub-tasks to specialized agent personas, and synthesizes a reviewed final output." },
               { q: "Which models power the underlying infrastructure?", a: "The system utilizes advanced Gemini models with varying context windows, dynamically selected based on the complexity of the assigned agent role." },
               { q: "Can I monitor the agents as they work?", a: "Yes. You have full transparency into the multi-agent workflow. You can observe the data gathering, peer critique, and token usage in real-time." },
               { q: "Is my data used to train the models?", a: "No. Everything is stored locally on your device. We do not collect any data or use your proprietary workflows to train any models." }
             ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
             ))}
          </div>
        </div>
      </div>

      {/* 10. Powerful Footer CTA Box & Testimonial */}
      <div className="w-full bg-[#050505] relative z-10 border-t border-white/5 pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">


            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 text-white relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
               Ready to upgrade your intelligence?
            </h2>
            <Link to="/home" onClick={onInitialize} className="inline-flex h-16 xl:h-20 px-10 xl:px-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-sm xl:text-base uppercase tracking-[0.2em] hover:from-cyan-400 hover:to-blue-400 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative z-10 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)]">
              Start Orchestrating <ArrowRight size={20} />
            </Link>
        </div>
      </div>
      
      <Footer />

    </div>
  );
};
