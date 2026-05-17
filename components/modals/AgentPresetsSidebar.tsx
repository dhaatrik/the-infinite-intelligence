import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus, Trash2, Edit2, Search, LogIn, Sparkles, ChevronDown, ChevronUp, Bot, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AgentPreset, AgentId, Agent } from '../../types';
import { AGENTS } from '../../constants';

interface AgentPresetsSidebarProps {
  showAgentPresets: boolean;
  basePath: string;
  setEditingPreset: React.Dispatch<React.SetStateAction<AgentPreset | null>>;
  customSavedPresets: Record<string, AgentPreset>;
  setCustomSavedPresets: React.Dispatch<React.SetStateAction<Record<string, AgentPreset>>>;
  setActiveAgents: React.Dispatch<React.SetStateAction<AgentPersona[]>>;
  setIsAutoSquadEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const PresetCard = ({ 
  preset, 
  onEdit, 
  onApply, 
  onDelete 
}: { 
  preset: AgentPreset; 
  onEdit: () => void;
  onApply: () => void;
  onDelete: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const configuredAgentsCount = Object.keys(preset.agents || {}).filter(k => preset.agents?.[k as AgentId]).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 border border-white/5 hover:border-amber-500/30 rounded-2xl p-5 hover:bg-white/5 transition-all duration-300 group shadow-inner relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
        <Sparkles size={40} className="text-amber-500" />
      </div>

      <div className="flex justify-between items-start mb-3 relative z-10 gap-2">
        <h3 className="text-sm font-bold text-amber-400 flex-1">{preset.name}</h3>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur px-1.5 py-1 rounded-lg border border-white/5 flex-shrink-0">
           <button 
             onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
             className="p-1 hover:bg-white/10 text-gray-400 rounded-md transition-colors"
             title={expanded ? "Collapse" : "Expand"}
           >
             {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
           </button>
           <button 
             onClick={onEdit}
             className="p-1 hover:bg-amber-500/20 text-amber-400 rounded-md transition-colors"
             title="Edit Preset"
           >
             <Edit2 size={12} />
           </button>
           <button 
             onClick={onDelete}
             className="p-1 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
             title="Delete Preset"
           >
             <Trash2 size={12} />
           </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 relative z-10">
        <Users size={10} />
        {configuredAgentsCount} Configured Agents
      </div>

      <p className={`text-xs text-gray-300 relative z-10 leading-relaxed mb-4 ${expanded ? '' : 'line-clamp-2'}`}>
        {preset.description || "No description provided."}
      </p>

      {expanded && preset.agents && (
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
           {Object.entries(preset.agents).map(([id, name]) => {
             if (!name) return null;
             const baseAgent = AGENTS[id as AgentId];
             return (
               <span key={id} className={`text-[10px] px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 shadow-inner ${baseAgent?.color || 'text-gray-400'} font-bold flex items-center gap-1`}>
                 <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
                 {name}
               </span>
             );
           })}
        </div>
      )}

      <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10 pt-3 border-t border-white/5">
        <button 
          onClick={onApply}
          className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 text-xs font-bold rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors flex items-center justify-center gap-2 shadow-inner"
        >
          <LogIn size={14} />
          Deploy Preset
        </button>
      </div>
    </motion.div>
  );
};

export const AgentPresetsSidebar: React.FC<AgentPresetsSidebarProps> = ({
  showAgentPresets,
  basePath,
  setEditingPreset,
  customSavedPresets,
  setCustomSavedPresets,
  setActiveAgents,
  setIsAutoSquadEnabled
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPresets = useMemo(() => {
    let presets = Object.values(customSavedPresets);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      presets = presets.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }
    // Sort alphabetically by default
    return presets.sort((a, b) => a.name.localeCompare(b.name));
  }, [customSavedPresets, searchQuery]);

  return (
    <AnimatePresence>
      {showAgentPresets && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => navigate(basePath)}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-80 sm:w-96 bg-[#0a0a0c]/95 backdrop-blur-2xl border-r border-white/10 z-[100] shadow-[30px_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Save size={160} className="text-amber-500 transform rotate-12" />
            </div>

            <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
                  <Save size={20} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "Space Grotesk, sans-serif" }} className="text-xl font-black text-white tracking-tight">Agent Presets</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">Saved Configurations</p>
                </div>
              </div>
              <Link to={basePath} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} className="text-gray-400" />
              </Link>
            </div>

            <div className="p-4 border-b border-white/5 relative z-10">
              <button 
                onClick={() => setEditingPreset({ 
                  id: 'preset_' + Date.now(), 
                  name: '', 
                  description: '', 
                  instructions: {
                    [AgentId.DYNAMIC_1]: '',
                    [AgentId.DYNAMIC_2]: '',
                    [AgentId.DYNAMIC_3]: '',
                    [AgentId.DYNAMIC_4]: ''
                  },
                  agents: {
                    [AgentId.DYNAMIC_1]: 'Expert 1',
                    [AgentId.DYNAMIC_2]: 'Expert 2',
                    [AgentId.DYNAMIC_3]: 'Expert 3',
                    [AgentId.DYNAMIC_4]: 'Expert 4'
                  }
                })}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-black font-bold transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:bg-amber-400 hover:-translate-y-0.5"
              >
                <Plus size={20} />
                <span>Create New Preset</span>
              </button>
            </div>

            {Object.keys(customSavedPresets).length > 0 && (
              <div className="p-4 border-b border-white/5 relative z-10">
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-400 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search presets..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 hover:border-white/20 transition-colors shadow-inner"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 p-1 rounded-md transition-colors"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10">
              {filteredPresets.map((preset) => (
                <PresetCard 
                  key={preset.id}
                  preset={preset}
                  onEdit={() => setEditingPreset({ ...preset })}
                  onDelete={() => {
                    if (window.confirm(`Are you sure you want to delete preset "${preset.name}"?`)) {
                      const newPresets = { ...customSavedPresets };
                      if (preset.id) {
                        delete newPresets[preset.id];
                        setCustomSavedPresets(newPresets);
                      }
                    }
                  }}
                  onApply={() => {
                    const newAgents = [AgentId.DYNAMIC_1, AgentId.DYNAMIC_2, AgentId.DYNAMIC_3, AgentId.DYNAMIC_4].map(agentId => {
                      const baseAgent = AGENTS[agentId];
                      return {
                        ...baseAgent,
                        name: preset.agents?.[agentId] || baseAgent.name,
                        systemInstruction: preset.instructions?.[agentId] || baseAgent.systemInstruction
                      };
                    });
                    setActiveAgents(newAgents);
                    setIsAutoSquadEnabled(false);
                    navigate(basePath);
                  }}
                />
              ))}

              {Object.keys(customSavedPresets).length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 mt-8 border border-white/5 rounded-3xl bg-black/40 border-dashed">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Save size={32} className="opacity-80" />
                  </div>
                  <p className="text-sm font-bold text-gray-300">No Presets Saved</p>
                  <p className="text-xs mt-1 text-center max-w-[200px] leading-relaxed">Create a custom preset to quickly load your favorite agent configurations.</p>
                </div>
              )}

              {Object.keys(customSavedPresets).length > 0 && filteredPresets.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500 mt-8">
                  <p className="text-sm font-bold text-gray-400">No matching presets found.</p>
                  <p className="text-xs mt-1">Try a different search term.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
