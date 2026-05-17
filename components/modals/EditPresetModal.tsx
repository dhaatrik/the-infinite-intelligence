import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit2, Save, Sparkles, Info, Settings2, ShieldAlert, Zap } from 'lucide-react';
import { AgentPreset, AgentId } from '../../types';
import { AGENTS } from '../../constants';

interface EditPresetModalProps {
  editingPreset: AgentPreset | null;
  setEditingPreset: React.Dispatch<React.SetStateAction<AgentPreset | null>>;
  setCustomSavedPresets: React.Dispatch<React.SetStateAction<Record<string, AgentPreset>>>;
}

export const EditPresetModal: React.FC<EditPresetModalProps> = ({
  editingPreset,
  setEditingPreset,
  setCustomSavedPresets
}) => {
  return (
    <AnimatePresence>
      {editingPreset && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#030508]/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-5xl bg-[#06080e] rounded-3xl border border-amber-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_50px_rgba(245,158,11,0.1)] overflow-hidden flex flex-col max-h-[90vh] relative"
          >
            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Settings2 className="text-amber-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Configure Agent Preset
                  </h2>
                  <p className="text-xs text-amber-500/50 font-medium">Fine-tune your customized multi-agent squad</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingPreset(null)} 
                className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar relative">
              {/* Core Preset Info */}
              <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-transparent p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Core Metadata</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Preset Title</label>
                    <input 
                      type="text" 
                      value={editingPreset.name || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, name: e.target.value })}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-lg focus:outline-none focus:border-amber-500/50 hover:border-white/20 transition-all shadow-inner"
                      placeholder="e.g. Master Researcher"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    />
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 pl-1"><Info size={10} /> Display name in your library</p>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
                    <textarea 
                      value={editingPreset.description || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, description: e.target.value })}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-amber-500/50 hover:border-white/20 transition-all min-h-[80px] resize-none text-sm shadow-inner"
                      placeholder="Describe what this preset excels at..."
                    />
                     <p className="text-[10px] text-gray-500 flex items-center gap-1 pl-1"><Info size={10} /> Helps you remember the squad's purpose</p>
                  </div>
                </div>
              </div>

              {/* Agent Grid */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Squad Assembly</h3>
                  </div>
                  <div className="text-[10px] text-amber-500/70 bg-amber-500/10 px-3 py-1.5 rounded-full font-bold tracking-widest uppercase flex items-center gap-2">
                    <ShieldAlert size={12} /> Modifying base instructions
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[AgentId.DYNAMIC_1, AgentId.DYNAMIC_2, AgentId.DYNAMIC_3, AgentId.DYNAMIC_4].map((agentId, idx) => {
                    const defaultAgent = AGENTS[agentId];
                    const agentName = editingPreset.agents?.[agentId] || defaultAgent.name;
                    
                    return (
                    <div key={agentId} className="flex flex-col space-y-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:border-amber-500/30 transition-all group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${defaultAgent.color.replace('text-', 'bg-').replace('text-', 'shadow-')}`}></div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded-md border border-white/5">Slot 0{idx + 1}</span>
                            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/10 ${defaultAgent.color}`}>{defaultAgent.role}</span>
                          </div>
                          
                          <label className="flex items-center gap-2 cursor-text mt-2 group/input">
                            <input
                              type="text"
                              value={agentName}
                              onChange={(e) => {
                                const newAgents = { ...(editingPreset.agents || {}) };
                                newAgents[agentId] = e.target.value;
                                setEditingPreset({ ...editingPreset, agents: newAgents });
                              }}
                              className={`font-black text-lg bg-transparent border-b-2 border-transparent hover:border-white/10 focus:border-amber-500 focus:outline-none transition-colors px-1 py-0.5 w-full ${defaultAgent.color}`}
                              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                              placeholder="Agent Name..."
                            />
                            <Edit2 size={14} className="text-gray-600 opacity-0 group-hover/input:opacity-100 transition-opacity" />
                          </label>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <textarea 
                          value={editingPreset.instructions?.[agentId] || ''}
                          onChange={(e) => {
                            const newInstructions = { ...editingPreset.instructions };
                            newInstructions[agentId] = e.target.value;
                            setEditingPreset({ ...editingPreset, instructions: newInstructions });
                          }}
                          className="w-full bg-[#030508] border border-white/10 rounded-xl px-4 py-3 text-[13px] text-gray-300 focus:outline-none focus:border-amber-500/50 hover:border-white/20 transition-colors min-h-[140px] font-mono leading-relaxed shadow-inner custom-scrollbar"
                          placeholder={`Enter custom instructions for ${agentName}...`}
                        />
                        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-600 bg-black/80 px-2 py-1 rounded backdrop-blur border border-white/5 pointer-events-none">
                          System Prompt
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-[#030508] flex items-center justify-between rounded-b-3xl">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Changes are saved locally to your presets.
              </span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setEditingPreset(null)}
                  className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold text-gray-300 transition-all hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (editingPreset.id) {
                      setCustomSavedPresets(prev => ({
                        ...prev,
                        [editingPreset.id!]: editingPreset
                      }));
                      setEditingPreset(null);
                    }
                  }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-sm uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
