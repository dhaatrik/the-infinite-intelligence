import React from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Copy, Check, Volume2, VolumeX, Download, FileText, Code, FileJson, GitFork, Trash2, Edit2, History, Bot, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConversationTurn, AgentId, AgentStatus, AgentResult, Artifact, ProcessingState } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { AgentCard } from './AgentCard';
import { AgentFlowVisualization } from './AgentFlowVisualization';

interface ChatTurnProps {
  turn: ConversationTurn;
  turns: ConversationTurn[];
  agentResults: Record<AgentId, AgentResult>;
  processingState: ProcessingState;
  setProcessingState: (state: ProcessingState) => void;
  isHitlEnabled: boolean;
  activeAgentTab: string;
  setActiveAgentTab: (id: string) => void;
  agentViewMode: 'grid' | 'tabs';
  handleFeedback: (agentId: AgentId, feedback: 'up' | 'down', turnId?: string) => void;
  handleFinalFeedback: (turnId: string, feedback: 'up' | 'down') => void;
  handleActiveFinalFeedback: (feedback: 'up' | 'down') => void;
  handleFinalScore?: (turnId: string, score: number) => void;
  handleActiveFinalScore?: (score: number) => void;
  handleFinalFeedbackText?: (turnId: string, text: string) => void;
  handleActiveFinalFeedbackText?: (text: string) => void;
  finalOutput: string;
  isFinalOutputStreaming: boolean;
  activeFinalFeedback?: 'up' | 'down';
  activeFinalScore?: number;
  activeFinalFeedbackText?: string;
  finalCopied: boolean;
  setFinalCopied: (val: boolean) => void;
  isSpeaking: boolean;
  toggleSpeech: (text: string) => void;
  exportToPDF: () => void;
  exportToMarkdown: () => void;
  exportToJSON: () => void;
  branchConversation: (turnId: string) => void;
  setViewingTurn: (turn: ConversationTurn) => void;
  setEditingTurnId: (id: string | null) => void;
  setEditingTitle: (title: string) => void;
  editingTurnId: string | null;
  editingTitle: string;
  saveTurnTitle: (sessionId: string, title: string) => void;
  resumeSynthesis: () => void;
  finalRef: React.RefObject<HTMLDivElement>;
  reportRef: React.RefObject<HTMLDivElement>;
  isDebugMode?: boolean;
}

export const ChatTurn: React.FC<ChatTurnProps> = ({
  turn,
  turns,
  agentResults,
  processingState,
  setProcessingState,
  isHitlEnabled,
  activeAgentTab,
  setActiveAgentTab,
  agentViewMode,
  handleFeedback,
  handleFinalFeedback,
  handleActiveFinalFeedback,
  handleFinalScore,
  handleActiveFinalScore,
  handleFinalFeedbackText,
  handleActiveFinalFeedbackText,
  finalOutput,
  isFinalOutputStreaming,
  activeFinalFeedback,
  activeFinalScore,
  activeFinalFeedbackText,
  finalCopied,
  setFinalCopied,
  isSpeaking,
  toggleSpeech,
  exportToPDF,
  exportToMarkdown,
  exportToJSON,
  branchConversation,
  setViewingTurn,
  setEditingTurnId,
  setEditingTitle,
  editingTurnId,
  editingTitle,
  saveTurnTitle,
  resumeSynthesis,
  finalRef,
  reportRef,
  isDebugMode
}) => {
  // This component will be used for both past turns and the active turn
  // If turn is null, it's the active turn
  
  const isPastTurn = !!turn;
  const currentTurn = turn || {
    id: 'active',
    prompt: '', // Should be handled by parent if needed
    analyzedPrompt: '',
    dynamicAgents: [],
    agentOutputs: agentResults,
    finalOutput: finalOutput,
    finalFeedback: activeFinalFeedback,
    finalScore: activeFinalScore,
    finalFeedbackText: activeFinalFeedbackText,
    timestamp: Date.now(),
    artifacts: []
  };

  return (
    <div className="flex flex-col gap-6" ref={!isPastTurn ? reportRef : null}>
      {/* User Prompt */}
      {isPastTurn && (
        <div className="self-end bg-cyan-950/40 border border-cyan-500/30 text-cyan-50 px-6 py-4 rounded-3xl rounded-tr-sm max-w-3xl shadow-[0_10px_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
          <p className="whitespace-pre-wrap leading-relaxed">{currentTurn.prompt}</p>
        </div>
      )}

      {/* Analyzed Prompt */}
      {currentTurn.analyzedPrompt && (
        <motion.div 
          initial={isPastTurn ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="self-end bg-[#0a0a0c]/80 border border-purple-500/20 text-purple-50 px-6 py-5 rounded-3xl rounded-tr-sm max-w-3xl shadow-[0_10px_40px_rgba(168,85,247,0.1)] backdrop-blur-xl relative overflow-hidden mt-2"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-3 text-purple-400 relative z-10">
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Sparkles size={14} className="text-purple-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">First Principles Analysis</span>
          </div>
          <div className="text-sm opacity-90 relative z-10 leading-relaxed font-medium">
            <MarkdownRenderer content={currentTurn.analyzedPrompt} compact={true} />
          </div>
        </motion.div>
      )}

      {/* Agents Grid/Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentTurn.dynamicAgents.map((agent) => (
          <div key={agent.id} className={`h-64 md:h-80 lg:h-96 ${isPastTurn ? 'opacity-80 hover:opacity-100 transition-opacity' : ''}`}>
              <AgentCard 
                agent={agent}
                status={currentTurn.agentOutputs[agent.id]?.status || AgentStatus.IDLE}
                content={currentTurn.agentOutputs[agent.id]?.content || ''}
                critique={currentTurn.agentOutputs[agent.id]?.critique}
                error={currentTurn.agentOutputs[agent.id]?.error}
                feedback={currentTurn.agentOutputs[agent.id]?.feedback}
                onFeedback={(f) => handleFeedback(agent.id as AgentId, f, isPastTurn ? currentTurn.id : undefined)}
                sessionHistory={turns.map(t => t.agentOutputs[agent.id]).filter(Boolean)}
                isDebugMode={isDebugMode}
                result={currentTurn.agentOutputs[agent.id]}
              />
          </div>
        ))}
      </div>

      {/* Final Output */}
      {(currentTurn.finalOutput || (isFinalOutputStreaming && !isPastTurn)) && (
        <motion.div 
          initial={isPastTurn ? {} : { opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="bg-[#050505]/90 backdrop-blur-2xl border border-white/20 hover:border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group transition-colors duration-500"
          ref={!isPastTurn ? finalRef : null}
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none opacity-50"></div>
          
          <div className="px-8 py-5 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 relative">
                <div className="absolute inset-0 rounded-2xl bg-white/20 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Sparkles className="text-white relative z-10" size={24} />
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Synthesized Intelligence</h3>
                <p className="text-[10px] text-cyan-400/80 font-mono font-bold mt-1 tracking-widest uppercase">Consolidated Multi-Agent Output</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
                {(currentTurn.totalTokens || 0) > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 mr-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Tokens:</span>
                    <span className="font-mono text-xs text-yellow-500/80">{currentTurn.totalTokens?.toLocaleString()}</span>
                  </div>
                )}
                <button 
                  onClick={() => toggleSpeech(currentTurn.finalOutput)}
                  className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-gray-400'}`}
                  title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
                >
                  {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(currentTurn.finalOutput);
                    if (!isPastTurn) setFinalCopied(true);
                    setTimeout(() => { if (!isPastTurn) setFinalCopied(false); }, 2000);
                  }}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"
                  title="Copy to Clipboard"
                >
                  {finalCopied && !isPastTurn ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
                {isPastTurn && (
                  <button 
                    onClick={() => branchConversation(currentTurn.id)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"
                    title="Branch Conversation"
                  >
                    <GitFork size={18} />
                  </button>
                )}
            </div>
          </div>

          <div className="p-8 prose prose-invert prose-cyan max-w-none font-sans leading-relaxed text-gray-300">
            <MarkdownRenderer content={currentTurn.finalOutput} />
            {isFinalOutputStreaming && !isPastTurn && (
              <span className="inline-block w-2 h-5 bg-cyan-500 animate-pulse ml-1 align-middle"></span>
            )}
          </div>

          <div className="px-8 py-4 bg-black/20 border-t border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mr-2">Rate Synthesis:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => {
                        if (isPastTurn) {
                           handleFinalScore?.(currentTurn.id, star);
                        } else {
                           handleActiveFinalScore?.(star);
                        }
                      }}
                      className="p-1 rounded-full transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        size={18} 
                        className={
                          (currentTurn.finalScore || 0) >= star 
                            ? "text-amber-400" 
                            : "text-gray-600 hover:text-amber-400/50"
                        } 
                        fill={(currentTurn.finalScore || 0) >= star ? "currentColor" : "none"} 
                      />
                    </button>
                  ))}
                </div>
                
                {currentTurn.artifacts && currentTurn.artifacts.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-2">Artifacts:</span>
                    {currentTurn.artifacts.map((art, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-gray-400">
                        {art.type === 'code' ? <Code size={12} /> : art.type === 'json' ? <FileJson size={12} /> : <FileText size={12} />}
                        <span>{art.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={exportToPDF}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-500 transition-colors"
                  title="Export as PDF"
                >
                  <Download size={18} />
                </button>
                <button 
                  onClick={exportToMarkdown}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-500 transition-colors"
                  title="Export as Markdown"
                >
                  <FileText size={18} />
                </button>
                <button 
                  onClick={exportToJSON}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-500 transition-colors"
                  title="Export as JSON"
                >
                  <FileJson size={18} />
                </button>
                <button 
                  onClick={() => setViewingTurn(currentTurn)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Inspect Turn
                </button>
              </div>
            </div>

            {/* Optional written feedback */}
            {((currentTurn.finalScore && currentTurn.finalScore > 0) || currentTurn.finalFeedbackText) && (
              <div className="w-full mt-2 animate-in fade-in slide-in-from-top-2">
                <input
                  type="text"
                  placeholder="Optional feedback for this synthesis..."
                  value={currentTurn.finalFeedbackText || ''}
                  onChange={(e) => {
                    if (isPastTurn) {
                      handleFinalFeedbackText?.(currentTurn.id, e.target.value);
                    } else {
                      handleActiveFinalFeedbackText?.(e.target.value);
                    }
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* HITL Review Actions */}
      {processingState.step === 'PAUSED_FOR_REVIEW' && !isPastTurn && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20"
        >
          <div className="flex items-center gap-3 text-rose-400 mb-2">
            <Bot size={24} className="animate-bounce" />
            <h3 className="text-lg font-black uppercase tracking-widest">Human-In-The-Loop Review</h3>
          </div>
          <p className="text-gray-400 text-sm text-center max-w-xl mb-4">
            The agents have completed their work. You can now review their outputs, edit them if necessary, or provide additional feedback before the final synthesis.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={resumeSynthesis}
              className="px-8 py-4 rounded-2xl bg-rose-500 text-white font-black uppercase tracking-[0.2em] hover:bg-rose-400 hover:scale-105 transition-all shadow-lg shadow-rose-500/20 flex items-center gap-3"
            >
              <Sparkles size={20} />
              Proceed to Synthesis
            </button>
            <button 
              onClick={() => setProcessingState({ isProcessing: false, step: 'IDLE' })}
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
