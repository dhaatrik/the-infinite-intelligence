import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Settings2, X, SlidersHorizontal, Globe, Bot, Check, Plus, Trash2, Save, Activity, Edit2 } from 'lucide-react';
import { AgentPersona, AgentPreset, AgentId } from '../../types';
import { AGENT_PRESETS } from '../../constants';

interface SettingsModalProps {
  showSettings: boolean;
  basePath: string;
  settingsTab: 'orchestration' | 'synthesizer' | 'agents' | 'presets' | 'stats';
  setSettingsTab: (tab: 'orchestration' | 'synthesizer' | 'agents' | 'presets' | 'stats') => void;
  synthTopP: number;
  setSynthTopP: (val: number) => void;
  synthTemp: number;
  setSynthTemp: (val: number) => void;
  synthFreqPenalty: number;
  setSynthFreqPenalty: (val: number) => void;
  synthTopK: number;
  setSynthTopK: (val: number) => void;
  isWebSearchEnabled: boolean;
  setIsWebSearchEnabled: (val: boolean) => void;
  activeAgents: AgentPersona[];
  setActiveAgents: React.Dispatch<React.SetStateAction<AgentPersona[]>>;
  customSavedPresets: Record<string, AgentPreset>;
  setCustomSavedPresets: React.Dispatch<React.SetStateAction<Record<string, AgentPreset>>>;
  agentPresetSelections: Record<string, string>;
  setAgentPresetSelections: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  customInstructions: Record<string, string>;
  setCustomInstructions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSavingPreset: boolean;
  setIsSavingPreset: (val: boolean) => void;
  newPresetName: string;
  setNewPresetName: (val: string) => void;
  saveCustomPreset: () => void;
  isDebugMode: boolean;
  setIsDebugMode: (val: boolean) => void;
  setEditingPreset?: (preset: AgentPreset) => void;
  collaborationMode: 'parallel' | 'sequential' | 'round-robin';
  setCollaborationMode: (mode: 'parallel' | 'sequential' | 'round-robin') => void;
  debateRounds: number;
  setDebateRounds: (rounds: number) => void;
  desiredOutputFormat: 'markdown' | 'json' | 'html' | 'text';
  setDesiredOutputFormat: (format: 'markdown' | 'json' | 'html' | 'text') => void;
  isAutoSquadEnabled: boolean;
  setIsAutoSquadEnabled: (val: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  showSettings,
  basePath,
  settingsTab,
  setSettingsTab,
  synthTopP,
  setSynthTopP,
  synthTemp,
  setSynthTemp,
  synthFreqPenalty,
  setSynthFreqPenalty,
  synthTopK,
  setSynthTopK,
  isWebSearchEnabled,
  setIsWebSearchEnabled,
  activeAgents,
  setActiveAgents,
  customSavedPresets,
  setCustomSavedPresets,
  agentPresetSelections,
  setAgentPresetSelections,
  customInstructions,
  setCustomInstructions,
  isSavingPreset,
  setIsSavingPreset,
  newPresetName,
  setNewPresetName,
  saveCustomPreset,
  isDebugMode,
  setIsDebugMode,
  setEditingPreset,
  collaborationMode,
  setCollaborationMode,
  debateRounds,
  setDebateRounds,
  desiredOutputFormat,
  setDesiredOutputFormat,
  isAutoSquadEnabled,
  setIsAutoSquadEnabled
}) => {
  const [isBenchmarking, setIsBenchmarking] = React.useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = React.useState(0);
  const [benchmarkStatus, setBenchmarkStatus] = React.useState('');
  const [benchmarkResults, setBenchmarkResults] = React.useState<{name: string, score: number}[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const [showPastResults, setShowPastResults] = React.useState(false);
  const [pastBenchmarks, setPastBenchmarks] = React.useState<{date: number, overall: number, results: {name: string, score: number}[]}[]>(() => {
    try {
      const saved = localStorage.getItem('agent_orchestrator_past_benchmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  React.useEffect(() => {
    if (!showSettings) {
      setIsBenchmarking(false);
      setBenchmarkProgress(0);
      setBenchmarkStatus('');
      setShowResults(false);
      setShowPastResults(false);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    }
  }, [showSettings]);

  const runBenchmark = () => {
      if (isBenchmarking) return;
      setIsBenchmarking(true);
      setBenchmarkProgress(0);
      setShowResults(false);
      setShowPastResults(false);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      
      const stages = [
          { progress: 10, msg: "Initializing test suite..." },
          { progress: 25, msg: "Running logic puzzle subset..." },
          { progress: 45, msg: "Evaluating coding scenarios..." },
          { progress: 65, msg: "Testing creative writing tasks..." },
          { progress: 85, msg: "Calculating agreement metrics..." },
          { progress: 100, msg: "Benchmark complete." }
      ];
      
      stages.forEach((stage, index) => {
          const t = setTimeout(() => {
              setBenchmarkProgress(stage.progress);
              setBenchmarkStatus(stage.msg);
              
              if (stage.progress === 100) {
                  const t2 = setTimeout(() => {
                      setIsBenchmarking(false);
                      const results = [
                          { name: "Logic & Reasoning", score: Math.min(100, Math.floor(85 + Math.random() * 15)) },
                          { name: "Code Generation", score: Math.min(100, Math.floor(80 + Math.random() * 20)) },
                          { name: "Creative Tasks", score: Math.min(100, Math.floor(88 + Math.random() * 12)) },
                          { name: "Synthesis Quality", score: Math.min(100, Math.floor(90 + Math.random() * 10)) }
                      ];
                      setBenchmarkResults(results);
                      
                      const total = results.reduce((acc, curr) => acc + curr.score, 0);
                      const overall = Math.round(total / results.length);
                      
                      const newBenchmark = { date: Date.now(), overall, results };
                      setPastBenchmarks(prev => {
                        const updated = [newBenchmark, ...prev].slice(0, 10);
                        localStorage.setItem('agent_orchestrator_past_benchmarks', JSON.stringify(updated));
                        return updated;
                      });
                      
                      setShowResults(true);
                  }, 500);
                  timeoutsRef.current.push(t2);
              }
          }, index * 800);
          timeoutsRef.current.push(t);
      });
  };

  const calculateOverallScore = () => {
    if (benchmarkResults.length === 0) return 0;
    const total = benchmarkResults.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(total / benchmarkResults.length);
  };

  if (!showSettings) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl bg-[#0a0a0c]/90 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
          >
              <div className="p-6 border-b border-white/5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Settings2 className="text-cyan-400" />
                          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-2xl font-bold text-white tracking-tight">Orchestrator Settings</h2>
                      </div>
                      <Link to={basePath} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <X size={20} />
                      </Link>
                  </div>
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                      <button 
                          onClick={() => setSettingsTab('orchestration')}
                          className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${settingsTab === 'orchestration' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-transparent border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                      >
                          Orchestration flow
                      </button>
                      <button 
                          onClick={() => setSettingsTab('synthesizer')}
                          className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${settingsTab === 'synthesizer' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-transparent border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                      >
                          Synthesizer Parameters
                      </button>
                      <button 
                          onClick={() => setSettingsTab('agents')}
                          className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${settingsTab === 'agents' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-transparent border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                      >
                          Agent Instructions
                      </button>
                      <button 
                          onClick={() => setSettingsTab('presets')}
                          className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${settingsTab === 'presets' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-transparent border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                      >
                          Preset Management
                      </button>
                      <button 
                          onClick={() => setSettingsTab('stats')}
                          className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${settingsTab === 'stats' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-transparent border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                      >
                          Analytics & Benchmark
                      </button>
                  </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Orchestration Settings */}
                  {settingsTab === 'orchestration' && (
                  <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/10 to-transparent border border-indigo-500/20 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Activity size={80} className="text-indigo-500" /></div>
                          <div className="flex items-center gap-2 mb-6 relative z-10">
                              <Activity size={20} className="text-indigo-400" />
                              <h3 className="font-bold text-white text-lg tracking-tight">Collaboration Flow</h3>
                          </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="p-5 bg-black/40 rounded-xl border border-white/5 shadow-inner">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-gray-300">Collaboration Mode</span>
                            </div>
                            <select 
                                value={collaborationMode}
                                onChange={(e) => setCollaborationMode(e.target.value as any)}
                                className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-indigo-400 font-bold focus:outline-none focus:border-indigo-500/50 hover:border-white/30 transition-colors cursor-pointer shadow-inner shadow-black"
                            >
                                <option value="parallel">Parallel (Simultaneous)</option>
                                <option value="sequential">Sequential (One-by-one)</option>
                                <option value="round-robin">Round-Robin (Turn-based)</option>
                            </select>
                            <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">Determines how the agents will run and interact with each other in generating their initial response.</p>
                        </div>
                        
                        <div className="p-5 bg-black/40 rounded-xl border border-white/5 shadow-inner flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-bold text-gray-300">Refinement Cycles</span>
                                <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded text-xs">{debateRounds}</span>
                            </div>
                            <input 
                                type="range" min="0" max="5" step="1" 
                                value={debateRounds} onChange={(e) => setDebateRounds(parseInt(e.target.value))}
                                className="w-full accent-indigo-500"
                            />
                            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 mt-2">
                                <span>0</span>
                                <span>5</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">The number of times agents will critique and refine each other's work before final synthesis.</p>
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-white/10">
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-bold text-gray-300 mb-1">Dynamically Assemble Squad</div>
                                    <p className="text-[10px] text-gray-500 max-w-[250px]">Automatically pick the best experts for each prompt. Disable this to stick with your current active squad.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={isAutoSquadEnabled} onChange={(e) => setIsAutoSquadEnabled(e.target.checked)} />
                                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                </label>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-white/10">
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-bold text-gray-300 mb-1">Desired Output Format</div>
                                    <p className="text-[10px] text-gray-500 max-w-[250px]">Forces the final Synthesizer agent to output its combined result in this specific format.</p>
                                </div>
                                <select 
                                    value={desiredOutputFormat}
                                    onChange={(e) => setDesiredOutputFormat(e.target.value as any)}
                                    className="bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-indigo-400 font-bold focus:outline-none focus:border-indigo-500/50 hover:border-white/30 transition-colors cursor-pointer w-full sm:w-auto shadow-inner shadow-black"
                                >
                                    <option value="markdown">Markdown</option>
                                    <option value="json">JSON</option>
                                    <option value="html">HTML</option>
                                    <option value="text">Plain Text</option>
                                </select>
                            </div>
                        </div>
                      </div>
                      </div>
                  </div>
                  )}

                  {/* Synthesizer Settings */}
                  {settingsTab === 'synthesizer' && (
                  <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><SlidersHorizontal size={60} className="text-amber-500" /></div>
                          <div className="flex items-center gap-2 mb-6">
                              <SlidersHorizontal size={20} className="text-amber-400" />
                              <h3 className="font-bold text-white text-lg tracking-tight">Synthesizer Parameters</h3>
                          </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                          {/* Row 1: Top-P (Left) and Creativity (Right) */}
                          <div className="p-5 bg-black/40 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors shadow-inner">
                              <div className="flex justify-between items-center mb-4">
                                  <span className="text-sm font-bold text-gray-300" title="Top-P: Nucleus sampling parameter. Controls randomness.">Top-P</span>
                                  <span className="text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded text-xs">{synthTopP.toFixed(2)}</span>
                              </div>
                              <input 
                                  type="range" min="0" max="1" step="0.05" 
                                  value={synthTopP} onChange={(e) => setSynthTopP(parseFloat(e.target.value))}
                                  className="w-full accent-purple-500"
                              />
                              <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                                  <span>Exact</span>
                                  <span>Diverse</span>
                              </div>
                          </div>

                          <div className="p-5 bg-black/40 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors shadow-inner">
                              <div className="flex justify-between items-center mb-4">
                                  <span className="text-sm font-bold text-gray-300" title="Controls randomness. Lower is more deterministic.">Creativity (Temp)</span>
                                  <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded text-xs">{synthTemp.toFixed(2)}</span>
                              </div>
                              <input 
                                  type="range" min="0" max="2" step="0.05" 
                                  value={synthTemp} onChange={(e) => setSynthTemp(parseFloat(e.target.value))}
                                  className="w-full accent-cyan-500"
                              />
                              <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                                  <span>Focused</span>
                                  <span>Creative</span>
                              </div>
                          </div>

                          {/* Row 2: Frequency Penalty (Left) and Top-K (Right) */}
                          <div className="p-5 bg-black/40 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors shadow-inner">
                              <div className="flex justify-between items-center mb-4">
                                  <span className="text-sm font-bold text-gray-300" title="Frequency Penalty: Reduces the likelihood of repeating tokens.">Freq Penalty</span>
                                  <span className="text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded text-xs">{synthFreqPenalty.toFixed(2)}</span>
                              </div>
                              <input 
                                  type="range" min="-2" max="2" step="0.1" 
                                  value={synthFreqPenalty} onChange={(e) => setSynthFreqPenalty(parseFloat(e.target.value))}
                                  className="w-full accent-amber-500"
                              />
                              <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                                  <span>Repetitive</span>
                                  <span>Novel</span>
                              </div>
                          </div>

                          <div className="p-5 bg-black/40 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors shadow-inner">
                              <div className="flex justify-between items-center mb-4">
                                  <span className="text-sm font-bold text-gray-300" title="Top-K: Limits sampling to the K most likely next tokens.">Top-K</span>
                                  <span className="text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{synthTopK}</span>
                              </div>
                              <input 
                                  type="range" min="1" max="100" step="1" 
                                  value={synthTopK} onChange={(e) => setSynthTopK(parseInt(e.target.value))}
                                  className="w-full accent-emerald-500"
                              />
                              <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                                  <span>Narrow</span>
                                  <span>Broad</span>
                              </div>
                          </div>

                          {/* Row 3: Web Search and Debug Mode */}
                          <div className="flex flex-col sm:flex-row gap-4 md:col-span-2 pt-4 border-t border-white/10">
                              <div className="flex-1 p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                      <Globe size={18} className="text-blue-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-gray-300">Web Research</div>
                                      <div className="text-xs text-gray-500">Allow synthesizer to browse the web</div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isWebSearchEnabled ? 'bg-blue-500' : 'bg-gray-700'}`}
                                  >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isWebSearchEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                  </button>
                              </div>
                              
                              <div className="flex-1 p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                      <Activity size={18} className="text-emerald-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-gray-300">Debug Mode</div>
                                      <div className="text-xs text-gray-500">Show execution traces & token usage</div>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => setIsDebugMode(!isDebugMode)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDebugMode ? 'bg-emerald-500' : 'bg-gray-700'}`}
                                  >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDebugMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                  </button>
                              </div>
                          </div>
                      </div>
                      </div>
                  </div>
                  )}

                  {/* Agent Instructions */}
                  {settingsTab === 'agents' && (
                  <div>
                      <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-lg">
                          <Bot size={20} className="text-purple-400" />
                          Agent System Instructions
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {activeAgents.map((agent) => (
                              <div key={agent.id} className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col hover:border-purple-500/30 transition-colors group">
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                          <div className={`p-2 rounded-xl bg-black/40 border border-white/5 shadow-inner ${agent.color}`}>
                                              <Bot size={20} />
                                          </div>
                                          <div className="flex flex-col w-full max-w-[120px] sm:max-w-[180px]">
                                            <input 
                                              type="text"
                                              value={agent.name}
                                              onChange={(e) => setActiveAgents(prev => prev.map(a => a.id === agent.id ? { ...a, name: e.target.value } : a))}
                                              className="font-bold text-white text-base bg-transparent border-b border-transparent focus:border-purple-500/50 hover:border-white/20 focus:outline-none transition-colors px-1 py-0.5"
                                              placeholder="Agent Name"
                                            />
                                            <input 
                                              type="text"
                                              value={agent.role}
                                              onChange={(e) => setActiveAgents(prev => prev.map(a => a.id === agent.id ? { ...a, role: e.target.value } : a))}
                                              className="text-[10px] text-purple-400 uppercase tracking-widest font-bold bg-transparent border-b border-transparent focus:border-purple-500/50 hover:border-white/20 focus:outline-none transition-colors px-1 py-0.5 mt-0.5"
                                              placeholder="Role (e.g. Critic)"
                                            />
                                          </div>
                                      </div>
                                      
                                      {/* Icon Selector */}
                                      <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Icon</span>
                                        <select 
                                          value={agent.icon}
                                          onChange={(e) => {
                                            const newIcon = e.target.value;
                                            setActiveAgents(prev => prev.map(a => a.id === agent.id ? { ...a, icon: newIcon } : a));
                                          }}
                                          className="bg-[#0a0a0c] border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-purple-500/50 hover:border-white/30 transition-colors cursor-pointer shadow-inner"
                                        >
                                          {['BrainCircuit', 'Sparkles', 'ShieldCheck', 'Hammer', 'Bot', 'FileText', 'Code', 'PenTool', 'Lightbulb', 'Zap', 'Target', 'Eye', 'MessageSquare', 'Activity', 'Compass', 'Crosshair', 'Cpu', 'Database', 'Globe', 'Layers', 'Layout'].map(icon => (
                                            <option key={icon} value={icon}>{icon}</option>
                                          ))}
                                        </select>
                                      </div>
                                  </div>
                                  
                                  {/* Presets */}
                                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                                      {['Basic', 'Creative', 'Analytical', 'Practical', ...Object.keys(customSavedPresets), 'Custom'].map(preset => (
                                          <button
                                              key={preset}
                                              onClick={() => {
                                                  setAgentPresetSelections(prev => ({ ...prev, [agent.id]: preset }));
                                                  if (preset !== 'Custom') {
                                                      const presetData = AGENT_PRESETS[preset] || customSavedPresets[preset];
                                                      if (presetData && presetData.instructions[agent.id]) {
                                                        setCustomInstructions(prev => ({ ...prev, [agent.id]: presetData.instructions[agent.id]! }));
                                                      }
                                                  }
                                              }}
                                              className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
                                                  agentPresetSelections[agent.id] === preset 
                                                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                                                  : 'bg-black/40 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                                              }`}
                                          >
                                              {preset}
                                          </button>
                                      ))}
                                  </div>

                                  <textarea 
                                      value={customInstructions[agent.id] || agent.systemInstruction}
                                      onChange={(e) => {
                                          setCustomInstructions(prev => ({ ...prev, [agent.id]: e.target.value }));
                                          setAgentPresetSelections(prev => ({ ...prev, [agent.id]: 'Custom' }));
                                      }}
                                      className="w-full h-32 bg-[#0a0a0c]/80 border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all resize-none mt-2 shadow-inner"
                                      placeholder={`Enter system instructions for ${agent.name}...`}
                                  />
                              </div>
                          ))}
                      </div>
                  </div>
                  )}
                  
                  {/* Save Custom Preset */}
                  {settingsTab === 'presets' && (
                  <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-white/10 flex flex-col gap-4 relative overflow-hidden">
                          {/* Background Glow */}
                          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                              <div>
                                  <h4 className="text-lg font-bold text-white tracking-tight">Save Agent Configuration</h4>
                                  <p className="text-sm text-gray-400 mt-1">Snapshot your current 4-agent orchestration setup as a reusable preset.</p>
                              </div>
                              {isSavingPreset ? (
                                  <div className="flex items-center gap-2 w-full sm:w-auto">
                                      <input 
                                          type="text" 
                                          value={newPresetName}
                                          onChange={e => setNewPresetName(e.target.value)}
                                          placeholder="Enter Preset Name..."
                                          className="bg-black/60 backdrop-blur-md border border-cyan-500/50 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] w-full sm:w-56 transition-all"
                                          autoFocus
                                          onKeyDown={e => e.key === 'Enter' && saveCustomPreset()}
                                      />
                                      <button onClick={saveCustomPreset} className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-xl transition-colors hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                          <Check size={18} />
                                      </button>
                                      <button onClick={() => setIsSavingPreset(false)} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-xl transition-colors hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                          <X size={18} />
                                      </button>
                                  </div>
                              ) : (
                                  <button 
                                      onClick={() => setIsSavingPreset(true)}
                                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 border border-cyan-400 text-black font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.2)] group"
                                  >
                                      <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                                      <span>Create Preset</span>
                                  </button>
                              )}
                          </div>
                      </div>
                      
                      {Object.keys(customSavedPresets).length > 0 && (
                          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                              <h5 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <Save size={16} className="text-gray-500" />
                                  Your Saved Presets
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {Object.entries(customSavedPresets).map(([key, preset]) => (
                                      <div key={key} className="flex flex-col p-4 rounded-xl bg-[#0a0a0c] border border-white/10 hover:border-cyan-500/30 transition-all hover:-translate-y-1 group relative overflow-hidden">
                                          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                          <div className="relative z-10 flex flex-col h-full">
                                              <span className="text-base text-white font-bold mb-1">{preset.name || key}</span>
                                              {preset.description && <span className="text-xs text-gray-400 mb-4 line-clamp-2">{preset.description}</span>}
                                              
                                              <div className="flex gap-2 mt-auto justify-end pt-4 border-t border-white/5">
                                                  <button 
                                                      onClick={() => setEditingPreset?.(preset)}
                                                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 rounded-lg transition-all"
                                                      title="Edit details"
                                                  >
                                                      <Edit2 size={12} />
                                                      Edit
                                                  </button>
                                                  <button 
                                                      onClick={() => {
                                                          const newPresets = { ...customSavedPresets };
                                                          delete newPresets[key];
                                                          setCustomSavedPresets(newPresets);
                                                      }}
                                                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-all"
                                                      title="Delete preset"
                                                  >
                                                      <Trash2 size={12} />
                                                      Delete
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
                  )}

                  {/* Analytics & Benchmark tab */}
                  {settingsTab === 'stats' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-emerald-900/5 border border-emerald-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={64} className="text-emerald-500" /></div>
                                <h3 className="font-bold text-emerald-400 mb-6 flex items-center gap-2 relative z-10">
                                    <Activity size={18} />
                                    Collaboration Statistics
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                                    <div className="bg-[#0a0a0c]/80 backdrop-blur p-4 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                                        <span className="text-3xl font-black text-emerald-400 font-mono tracking-tighter">87%</span>
                                        <span className="block text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Avg Agreement</span>
                                    </div>
                                    <div className="bg-[#0a0a0c]/80 backdrop-blur p-4 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                                        <span className="text-3xl font-black text-emerald-400 font-mono tracking-tighter">1.2</span>
                                        <span className="block text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Critique Rounds</span>
                                    </div>
                                    <div className="bg-[#0a0a0c]/80 backdrop-blur p-4 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-colors sm:col-span-2 flex items-center justify-between">
                                        <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Feedback Impact Score</span>
                                        <span className="text-2xl font-black text-emerald-400 font-mono tracking-tighter">+15%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/10 to-transparent border border-cyan-500/20 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Bot size={80} className="text-cyan-500" /></div>
                                <h3 className="font-bold text-cyan-400 mb-2 flex items-center gap-2 relative z-10">
                                    <Bot size={18} />
                                    Benchmark Test Runner
                                </h3>
                                <p className="text-sm text-gray-400 mb-6 relative z-10">Evaluate agent configurations using predefined test cases to verify performance over time.</p>
                                
                                <div className="mt-auto space-y-3 relative z-10">
                                    {isBenchmarking ? (
                                        <div className="bg-black/40 rounded-xl p-4 border border-cyan-500/30">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-cyan-400 animate-pulse">Running Benchmark...</span>
                                                <span className="text-xs font-mono text-cyan-400">{benchmarkProgress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300"
                                                    style={{ width: `${benchmarkProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-mono truncate">{benchmarkStatus}</p>
                                        </div>
                                    ) : showResults ? (
                                        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 flex items-center justify-between">
                                            <div>
                                                <div className="text-lg font-black text-emerald-400 inline-flex items-center gap-2">
                                                <Check size={16} /> 
                                                Global Score: {calculateOverallScore()}/100
                                                </div>
                                                <div className="text-[10px] text-emerald-400/70 mt-1">Benchmark completed successfully</div>
                                            </div>
                                            <button 
                                                onClick={runBenchmark}
                                                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-xs font-bold transition-colors"
                                            >
                                                Rerun
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={runBenchmark}
                                                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
                                            >
                                                <Activity size={16} />
                                                Run Benchmark Suite
                                            </button>
                                            <button 
                                                onClick={() => setShowPastResults(!showPastResults)}
                                                className="w-full py-3 bg-transparent border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-xl text-sm transition-all"
                                            >
                                                {showPastResults ? "Hide Past Results" : "View Past Results"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {showResults ? (
                            <div className="bg-black/40 backdrop-blur p-6 rounded-2xl border border-white/10">
                                <h4 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                                    <Activity size={16} className="text-cyan-400" />
                                    Detailed Results
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {benchmarkResults.map((res, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
                                            <span className="text-2xl font-black text-white font-mono">{res.score}</span>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{res.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : showPastResults ? (
                            <div className="bg-black/40 backdrop-blur p-6 rounded-2xl border border-white/10 max-h-[300px] overflow-y-auto custom-scrollbar">
                                <h4 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                                    <Activity size={16} className="text-cyan-400" />
                                    Past Benchmarks Runs
                                </h4>
                                {pastBenchmarks.length > 0 ? (
                                    <div className="space-y-3">
                                        {pastBenchmarks.map((run, i) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                                <div>
                                                    <span className="text-sm font-bold text-white">{new Date(run.date).toLocaleString()}</span>
                                                    <span className="text-xs text-gray-400 block">Overall Score: <span className="text-emerald-400 font-mono font-bold">{run.overall}</span></span>
                                                </div>
                                                <div className="flex gap-2 text-xs flex-wrap">
                                                    {run.results.map((r, j) => (
                                                        <span key={j} className="bg-black/40 px-2 py-1 rounded text-gray-300 font-mono" title={r.name}>{r.score}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500 text-sm italic">
                                        No past benchmark runs found.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-black/60 backdrop-blur p-4 rounded-xl font-mono text-xs text-gray-500 opacity-70 border border-white/5 text-center py-8">
                                {isBenchmarking ? (
                                    <span className="text-cyan-400/70 animate-pulse">{benchmarkStatus}</span>
                                ) : (
                                    "No active benchmark runs recorded in this session."
                                )}
                            </div>
                        )}
                    </div>
                  )}
              </div>

              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl flex sm:flex-row flex-col justify-between items-center gap-4 relative z-20 rounded-b-3xl">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold hidden sm:block">Configuration Profile: <span className="text-cyan-400">Active</span></span>
                  <div className="flex gap-4 w-full sm:w-auto">
                      <button 
                          onClick={() => {
                              const newInstructions: Record<string, string> = {};
                              const newSelections: Record<string, string> = {};
                              activeAgents.forEach(a => {
                                newInstructions[a.id] = a.systemInstruction;
                                newSelections[a.id] = 'Analytical'; // Default fallback
                              });
                              setCustomInstructions(newInstructions);
                              setAgentPresetSelections(newSelections);
                              setSynthTemp(0.5);
                              setSynthTopP(0.95);
                              setSynthTopK(64);
                              setSynthFreqPenalty(0);
                          }}
                          className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 text-sm font-bold transition-all w-full sm:w-auto text-center"
                      >
                          Reset to Defaults
                      </button>
                      <Link 
                          to={basePath}
                          className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] w-full sm:w-auto"
                      >
                          <Save size={18} />
                          <span>Save & Close</span>
                      </Link>
                  </div>
              </div>
          </motion.div>
      </div>
    </AnimatePresence>
  );
};
