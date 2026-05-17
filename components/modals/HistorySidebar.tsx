import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, History, Plus, Search, Edit2, Archive, ArchiveRestore, Trash2, Check, MessageSquare, Compass, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OrchestrationTurn } from '../../types';

interface HistorySidebarProps {
  showHistory: boolean;
  basePath: string;
  historyTab: 'active' | 'archived';
  setHistoryTab: React.Dispatch<React.SetStateAction<'active' | 'archived'>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  turns: OrchestrationTurn[];
  currentSessionId: string | null;
  setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>;
  editingTurnId: string | null;
  setEditingTurnId: React.Dispatch<React.SetStateAction<string | null>>;
  editingTitle: string;
  setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
  saveTurnTitle: (sessionId: string, newTitle: string) => void;
  toggleArchiveSession: (e: React.MouseEvent, sessionId: string) => void;
  setTurns: React.Dispatch<React.SetStateAction<OrchestrationTurn[]>>;
  startNewChat: () => void;
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

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  showHistory,
  basePath,
  historyTab,
  setHistoryTab,
  searchQuery,
  setSearchQuery,
  turns,
  currentSessionId,
  setCurrentSessionId,
  editingTurnId,
  setEditingTurnId,
  editingTitle,
  setEditingTitle,
  saveTurnTitle,
  toggleArchiveSession,
  setTurns,
  startNewChat
}) => {
  const navigate = useNavigate();
  const [deletingSessionId, setDeletingSessionId] = React.useState<string | null>(null);

  return (
    <AnimatePresence>
      {showHistory && (
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
              <History size={160} className="text-cyan-500 transform rotate-12" />
            </div>

            <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-inner">
                  <Compass size={20} />
                </div>
                <h2 style={{ fontFamily: "Space Grotesk, sans-serif" }} className="text-xl font-black text-white tracking-tight">Conversations</h2>
              </div>
              <Link to={basePath} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} className="text-gray-400" />
              </Link>
            </div>

            <div className="p-4 border-b border-white/5 relative z-10">
              <Link 
                to="/newchat"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-black font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-cyan-400 hover:-translate-y-0.5"
              >
                <Plus size={20} />
                <span>Start New Mission</span>
              </Link>
            </div>

            <div className="flex px-4 pt-4 border-b border-white/5 relative z-10">
              <button 
                onClick={() => setHistoryTab('active')}
                className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 relative ${historyTab === 'active' ? 'text-cyan-400 border-cyan-400' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
              >
                Active Quests
                {historyTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 blur-sm"></div>}
              </button>
              <button 
                onClick={() => setHistoryTab('archived')}
                className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 relative ${historyTab === 'archived' ? 'text-purple-400 border-purple-400' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
              >
                Archives
                {historyTab === 'archived' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-purple-400 blur-sm"></div>}
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-white/5 relative z-10">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search transmitions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 hover:border-white/20 transition-colors shadow-inner"
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

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar relative z-10">
              {Array.from(new Set(turns.map(t => t.sessionId || 'default')))
                .map(sessionId => {
                  const sessionTurns = turns.filter(t => (t.sessionId || 'default') === sessionId);
                  const maxTimestamp = Math.max(...sessionTurns.map(t => t.timestamp || 0));
                  return { sessionId, maxTimestamp };
                })
                .sort((a, b) => b.maxTimestamp - a.maxTimestamp)
                .map(({ sessionId }, index) => {
                const sessionTurns = turns.filter(t => {
                  const isSessionMatch = (t.sessionId || 'default') === sessionId;
                  if (!isSessionMatch) return false;
                  if (historyTab === 'active' && t.archived) return false;
                  if (historyTab === 'archived' && !t.archived) return false;
                  return true;
                });
                if (sessionTurns.length === 0) return null;
                const firstTurn = sessionTurns[0];
                
                if (searchQuery) {
                  const query = searchQuery.toLowerCase();
                  const matches = sessionTurns.some(t => 
                    t.prompt.toLowerCase().includes(query) || 
                    t.finalOutput.toLowerCase().includes(query) ||
                    (t.title && t.title.toLowerCase().includes(query))
                  );
                  if (!matches) return null;
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={sessionId}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group flex flex-col gap-3 relative cursor-pointer overflow-hidden ${currentSessionId === sessionId ? 'bg-gradient-to-br from-cyan-900/20 to-transparent border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-black/40 hover:bg-white/5 border-white/5 hover:border-white/10'}`}
                    onClick={() => {
                      setCurrentSessionId(sessionId);
                      navigate(basePath);
                    }}
                  >
                    {currentSessionId === sessionId && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <MessageSquare size={10} className={currentSessionId === sessionId ? "text-cyan-400" : ""} />
                        {formatRelativeTime(firstTurn.timestamp)}
                      </span>
                      <div className={`flex items-center gap-1 transition-opacity bg-black/60 backdrop-blur px-1.5 py-1 rounded-lg border border-white/5 ${deletingSessionId === sessionId ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {deletingSessionId === sessionId ? (
                          <>
                            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider mx-1">Delete?</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setTurns(prev => prev.filter(t => (t.sessionId || 'default') !== sessionId));
                                if (currentSessionId === sessionId) {
                                  startNewChat();
                                }
                                setDeletingSessionId(null);
                              }}
                              className="p-1 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                              title="Confirm Delete"
                            >
                              <Check size={12} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingSessionId(null);
                              }}
                              className="p-1 hover:bg-gray-500/20 text-gray-400 rounded-md transition-colors"
                              title="Cancel"
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTurnId(sessionId);
                                setEditingTitle(firstTurn.title || firstTurn.prompt);
                              }}
                              className="p-1 hover:bg-cyan-500/20 text-cyan-400 rounded-md transition-colors"
                              title="Edit Title"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button 
                              onClick={(e) => toggleArchiveSession(e, sessionId)}
                              className={`p-1 rounded-md transition-colors ${historyTab === 'active' ? 'hover:bg-purple-500/20 text-purple-400' : 'hover:bg-green-500/20 text-green-400'}`}
                              title={historyTab === 'active' ? "Archive Chat" : "Restore Chat"}
                            >
                              {historyTab === 'active' ? <Archive size={12} /> : <ArchiveRestore size={12} />}
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingSessionId(sessionId);
                              }}
                              className="p-1 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                              title="Delete Chat"
                            >
                              <Trash2 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {editingTurnId === sessionId ? (
                      <div className="flex items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="text" 
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="flex-1 bg-black/80 border border-cyan-500/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none shadow-[0_0_10px_rgba(34,211,238,0.2)] font-bold"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTurnTitle(sessionId, editingTitle);
                            if (e.key === 'Escape') setEditingTurnId(null);
                          }}
                        />
                        <button 
                          onClick={() => saveTurnTitle(sessionId, editingTitle)}
                          className="p-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors"
                        >
                          <Check size={14} />
                        </button>
                        <button 
                          onClick={() => setEditingTurnId(null)}
                          className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <h3 className={`text-sm font-bold line-clamp-2 leading-relaxed ${currentSessionId === sessionId ? "text-cyan-100" : "text-gray-300"}`}>
                        {firstTurn.title || firstTurn.prompt}
                      </h3>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-gray-500 font-mono">
                        {sessionTurns.length} turn{sessionTurns.length !== 1 ? 's' : ''}
                      </p>
                      {currentSessionId === sessionId && (
                        <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                          <Sparkles size={8} /> Active
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              {turns.length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 mt-8 border border-white/5 rounded-3xl bg-black/40 border-dashed">
                  <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <History size={32} className="opacity-40" />
                  </div>
                  <p className="text-sm font-bold text-gray-400">No transmissions found</p>
                  <p className="text-xs mt-1 text-center max-w-[200px] leading-relaxed">Start a new mission to begin recording history.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

