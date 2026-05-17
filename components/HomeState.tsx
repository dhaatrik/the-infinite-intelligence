import React from 'react';
import { motion } from 'motion/react';
import { Infinity, Sparkles, Brain, Heart, ShieldCheck, Hammer, ArrowRight } from 'lucide-react';

interface HomeStateProps {
  handleNavigateWithTransition: (targetPath: string) => void;
}

export const HomeState: React.FC<HomeStateProps> = ({ handleNavigateWithTransition }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  } as const;

  const samplePrompts = [
    "Design a scalable microservices architecture",
    "Analyze the ethical implications of AI agents",
    "Draft a marketing strategy for a quantum computer",
    "Explain string theory to a high schooler"
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-32 pt-12">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>

      <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center text-center"
      >
          {/* Badge & Logo */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
              <div className="relative mb-6 group cursor-pointer" onClick={() => handleNavigateWithTransition('/beta')}>
                  <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                  <div className="relative w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-[360deg]">
                      <Infinity size={40} className="text-cyan-400" />
                  </div>
              </div>
              <span className="px-3 py-1 text-[10px] uppercase tracking-[0.3em] font-bold bg-white/5 border border-white/10 rounded-full text-cyan-400 backdrop-blur-md">
                Protocol v4.0 Active
              </span>
          </motion.div>
          
          {/* Hero Typography */}
          <motion.div variants={itemVariants} className="mb-8 max-w-4xl">
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] flex flex-col mb-6">
                <span className="opacity-90">Orchestrate The</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 py-2">
                  Infinite Squad
                </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-xl font-medium leading-relaxed">
                A multi-agent intelligence layer designed for high-stakes synthesis. 
                <span className="text-white"> Analyze. Assemble. Execute. Critique.</span>
            </p>
          </motion.div>

          {/* Quick Prompts */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 max-w-3xl mb-16">
            {samplePrompts.map((prompt, i) => (
              <button 
                key={i} 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('set-input-prompt', { detail: prompt }));
                }}
                className="text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full px-4 py-2 transition-all flex items-center gap-2 group"
              >
                {prompt}
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 -ml-2 group-hover:ml-0" />
              </button>
            ))}
          </motion.div>
          
          {/* Agent Bento Grid */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Logos', role: 'The Analyst', desc: 'Logic, reason, and structured problem-solving.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Brain },
              { label: 'Pathos', role: 'The Empath', desc: 'Emotion, values, and human-centric perspective.', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Heart },
              { label: 'Ethos', role: 'The Guardian', desc: 'Ethics, authority, and safety alignment.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: ShieldCheck },
              { label: 'Praxis', role: 'The Builder', desc: 'Action, utility, and practical application.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Hammer }
            ].map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border ${agent.border} flex flex-col items-center justify-center text-center gap-4 transition-colors hover:${agent.bg} relative overflow-hidden group`}
                >
                  <div className={`p-3 rounded-xl ${agent.bg} ${agent.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className={`text-lg font-bold ${agent.color}`}>{agent.label}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">{agent.role}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{agent.desc}</p>
                  </div>
                  
                  {/* Decorative faint icon in bg */}
                  <Icon size={120} className={`absolute -bottom-6 -right-6 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-500 ${agent.color}`} />
                </motion.div>
              )
            })}
          </motion.div>



      </motion.div>
    </div>
  );
};
