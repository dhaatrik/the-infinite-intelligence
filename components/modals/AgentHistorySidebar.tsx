import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bot, Sparkles, Clock, LogIn, Search, Trash2, Copy, Check, ChevronDown, ChevronUp, Users, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Agent } from '../../types';

interface AgentHistoryItem {
  prompt: string;
  timestamp: number;
  agents: Agent[];
}

interface AgentHistorySidebarProps {
  showAgentHistory: boolean;
  basePath: string;
  betaHistory: AgentHistoryItem[];
  setBetaHistory: React.Dispatch<React.SetStateAction<AgentHistoryItem[]>>;
  setActiveAgents: React.Dispatch<React.SetStateAction<AgentPersona[]>>;
  setIsAutoSquadEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const formatRelativeTime = (timestamp: number) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round((timestamp - Date.now()) / (1000 * 60 * 60 * 24));
  
  if (daysDifference === 0) {
    return 'Today';
  } else if (daysDifference === -1) {
    return 'Yesterday';
  } else if (daysDifference > -7) {
    return rtf.format(daysDifference, 'day');
  } else {
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

const HistoryItemCard = ({ 
  item, 
  idx, 
  onLoad, 
  onDelete 
}: { 
  item: AgentHistoryItem; 
  idx: number; 
  onLoad: () => void;
  onDelete: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dataToCopy = {
      prompt: item.prompt,
      agents: item.agents.map(a => ({ name: a.name, role: a.role, systemPrompt: a.systemPrompt }))
    };
    navigator.clipboard.writeText(JSON.stringify(dataToCopy, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-black/40 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-5 hover:bg-white/5 transition-all duration-300 group shadow-inner relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
        <Sparkles size={40} className="text-emerald-500" />
      </div>

      <div className="flex justify-between items-start mb-3 relative z-10 gap-2">
        <p className={`text-sm font-bold text-gray-200 leading-relaxed flex-1 pr-2 ${expanded ? '' : 'line-clamp-2'}`}>
          {item.prompt}
        </p>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur px-1.5 py-1 rounded-lg border border-white/5 flex-shrink-0">
           <button 
             onClick={handleCopy}
             className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded-md transition-colors"
             title="Copy Configuration"
           >
             {copied ? <Check size={12} /> : <Copy size={12} />}
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
             className="p-1 hover:bg-white/10 text-gray-400 rounded-md transition-colors"
             title={expanded ? "Collapse" : "Expand"}
           >
             {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onDelete(); }}
             className="p-1 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
             title="Delete Log"
           >
             <Trash2 size={12} />
           </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 relative z-10">
        <Clock size={10} />
        {formatRelativeTime(item.timestamp)}
        <span className="mx-1 opacity-30">•</span>
        <Users size={10} />
        {item.agents.length} Agents
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2 relative z-10">
        {item.agents.slice(0, expanded ? item.agents.length : 5).map(a => (
          <span key={a.id} className={`text-[10px] px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 shadow-inner ${a.color} font-bold flex items-center gap-1`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></div>
            {a.name}
          </span>
        ))}
        {!expanded && item.agents.length > 5 && (
          <span className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-bold">
            +{item.agents.length - 5}
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10 pt-3 border-t border-white/5">
        <button 
          onClick={onLoad}
          className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors flex items-center justify-center gap-2 shadow-inner"
        >
          <LogIn size={14} />
          Load Squad
        </button>
      </div>
    </motion.div>
  );
};

export const AgentHistorySidebar: React.FC<AgentHistorySidebarProps> = ({
  showAgentHistory,
  basePath,
  betaHistory,
  setBetaHistory,
  setActiveAgents,
  setIsAutoSquadEnabled
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredAndSortedHistory = useMemo(() => {
    let result = [...betaHistory];
    
    // Apply Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.prompt.toLowerCase().includes(q) || 
        item.agents.some(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q))
      );
    }
    
    // Apply Sort
    result.sort((a, b) => {
      if (sortOrder === 'newest') return b.timestamp - a.timestamp;
      return a.timestamp - b.timestamp;
    });
    
    return result;
  }, [betaHistory, searchQuery, sortOrder]);

  const handleDeleteItem = (indexToDelete: number) => {
    setBetaHistory(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all Agent History?")) {
      setBetaHistory([]);
    }
  };

  return (
    <AnimatePresence>
      {showAgentHistory && (
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
              <Bot size={160} className="text-emerald-500 transform rotate-12" />
            </div>

            <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
                  <Bot size={20} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "Space Grotesk, sans-serif" }} className="text-xl font-black text-white tracking-tight">Agent Genesis</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">Configuration Log</p>
                </div>
              </div>
              <Link to={basePath} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} className="text-gray-400" />
              </Link>
            </div>

            <div className="p-4 border-b border-white/5 relative z-10 flex flex-col gap-3">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search logs & agents..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 hover:border-white/20 transition-colors shadow-inner"
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
              <div className="flex items-center justify-between px-1">
                <button 
                  onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                  className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {sortOrder === 'newest' ? "Newest First" : "Oldest First"} 
                  {sortOrder === 'newest' ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
                
                {betaHistory.length > 0 && (
                  <button 
                    onClick={handleClearAll}
                    className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10">
              {filteredAndSortedHistory.map((item, idx) => (
                <HistoryItemCard 
                  key={idx}
                  item={item}
                  idx={idx}
                  onLoad={() => {
                    setActiveAgents(item.agents);
                    setIsAutoSquadEnabled(false);
                    navigate(basePath);
                  }}
                  onDelete={() => {
                    // Match by timestamp and prompt to delete
                    const actualIndex = betaHistory.findIndex(hi => hi.timestamp === item.timestamp && hi.prompt === item.prompt);
                    if (actualIndex !== -1) handleDeleteItem(actualIndex);
                  }}
                />
              ))}
              
              {betaHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 mt-8 border border-white/5 rounded-3xl bg-black/40 border-dashed">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Bot size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-300">Genesis Log is Empty</p>
                  <p className="text-xs mt-2 text-center max-w-[200px] leading-relaxed">No agent configurations have been forged yet.</p>
                  
                  <Link 
                    to="/beta"
                    className="mt-6 px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg text-xs hover:bg-emerald-400 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    Enter Agent Forge <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {betaHistory.length > 0 && filteredAndSortedHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500 mt-8">
                  <p className="text-sm font-bold text-gray-400">No matching logs found.</p>
                  <p className="text-xs mt-1">Try refining your search query.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
