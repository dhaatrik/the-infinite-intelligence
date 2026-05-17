import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Sparkles, Search, BrainCircuit, Save, Network, Lightbulb, Zap } from 'lucide-react';

export const BetaModeState: React.FC = () => {
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
    "Assemble a squad to analyze Q4 financial reports",
    "Forge a team of cyberpunk world builders",
    "Create a committee to review security architecture"
  ];

  const handlePromptClick = (prompt: string) => {
    const input = document.querySelector('textarea');
    if (input) {
      input.value = prompt;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
      nativeInputValueSetter?.call(input, prompt);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-32 pt-12">
      {/* Background Orbs & Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center justify-center text-center"
      >
          {/* Logo Animation */}
          <motion.div variants={itemVariants} className="relative mb-8 group mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-rose-500 blur-3xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-500"></div>
              <div className="relative w-24 h-24 rounded-3xl bg-[#0a0a0c]/90 backdrop-blur-xl border border-fuchsia-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.2)] rotate-45 group-hover:rotate-90 transition-transform duration-700 ease-in-out">
                  <Cpu size={40} className="text-fuchsia-400 -rotate-45 group-hover:-rotate-90 transition-transform duration-700 ease-in-out" />
              </div>
          </motion.div>
          
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(217,70,239,0.15)]">
              <Sparkles size={14} className="text-rose-400" />
              Agent Forge / Beta
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-4 mb-8 max-w-4xl">
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-fuchsia-200 to-rose-400 tracking-tighter leading-[0.95]">
                Architect Custom Swarms
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-xl font-medium leading-relaxed mt-4">
                Define your high-stakes objective. The orchestration engine will analyze your requirements and dynamically forge a specialized squad of AI experts.
            </p>
          </motion.div>
          
          {/* Sample Prompts */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 max-w-4xl mb-16">
            {samplePrompts.map((prompt, i) => (
              <button 
                key={i} 
                onClick={() => handlePromptClick(prompt)}
                className="text-sm font-medium text-fuchsia-100/80 bg-gradient-to-br from-fuchsia-500/10 to-rose-500/5 hover:from-fuchsia-500/20 hover:to-rose-500/10 border border-fuchsia-500/20 hover:border-fuchsia-500/40 rounded-xl px-5 py-3 transition-all flex items-center gap-3 group shadow-[0_4px_20px_rgba(217,70,239,0.05)] hover:shadow-[0_4px_30px_rgba(217,70,239,0.15)] hover:-translate-y-1"
              >
                <div className="p-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 group-hover:bg-fuchsia-500/20 transition-colors">
                  <Lightbulb size={16} />
                </div>
                {prompt}
              </button>
            ))}
          </motion.div>
          
          {/* Bento Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-12 text-left">
            {[
              { title: 'Deconstruct Intent', desc: 'Analyzes your prompt using first principles to dismantle assumptions and identify the specialized expertise required for accurate orchestration.', icon: Search, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', step: '01', span: 'md:col-span-2' },
              { title: 'Formulate Personas', desc: 'Generates bespoke roles for each agent.', icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', step: '02', span: 'md:col-span-1' },
              { title: 'Persist Configuration', desc: 'Automatically saves generated swarms for rapid deployment.', icon: Save, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', step: '03', span: 'md:col-span-1' },
              { title: 'Dynamic Evaluation', desc: 'Synthesizes agent outputs through sequential logic flows, multi-agent peer critique, and stringent validation protocols to yield comprehensive answers.', icon: Network, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', step: '04', span: 'md:col-span-2' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border ${feature.border} flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden group ${feature.span}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center justify-between z-10 relative">
                    <div className={`p-4 rounded-2xl ${feature.bg} ${feature.color} shadow-inner`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-3xl font-black text-white/5 font-mono select-none">{feature.step}</span>
                  </div>
                  <div className="z-10 relative mt-4">
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                  {/* Decorative Icon */}
                  <Icon size={160} className={`absolute -bottom-8 -right-8 opacity-[0.02] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none ${feature.color}`} />
                </motion.div>
              )
            })}
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-sm text-gray-500 border border-white/5 bg-black/40 px-6 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-sm shadow-inner group">
            <Zap size={16} className="text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Pro-tip: You can export your generated Agent Swarm directly to the <span className="text-gray-300 font-bold">Presets</span> menu.</span>
          </motion.div>
      </motion.div>
    </div>
  );
};
