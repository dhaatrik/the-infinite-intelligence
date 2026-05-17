import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Send, Sparkles, Mic, MicOff, Paperclip, X, AlertTriangle, Square, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

interface InputAreaProps {
  onSend: (prompt: string) => void;
  disabled: boolean;
  isBetaMode?: boolean;
  onExitBeta?: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, disabled, isBetaMode = false, onExitBeta }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{name: string, content: string}[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [angle, setAngle] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setAngle(prev => (prev + 1) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 50 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || attachedFiles.length > 0) && !disabled) {
      let finalPrompt = input;
      if (attachedFiles.length > 0) {
        finalPrompt += '\n\n--- Attached Files ---\n';
        attachedFiles.forEach(f => {
          finalPrompt += `\nFile: ${f.name}\n\`\`\`\n${f.content}\n\`\`\`\n`;
        });
      }
      onSend(finalPrompt);
      setInput('');
      setAttachedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAttachedFiles(prev => [...prev, { name: file.name, content: event.target!.result as string }]);
        }
      };
      reader.readAsText(file);
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleSetInput = (e: Event) => {
      const customEvent = e as CustomEvent;
      setInput(customEvent.detail);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };
    window.addEventListener('set-input-prompt', handleSetInput);
    return () => window.removeEventListener('set-input-prompt', handleSetInput);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8">
      <form 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onSubmit={handleSubmit} 
        className="relative group w-full"
      >
        <motion.div 
          className={`absolute -inset-[2px] rounded-3xl opacity-40 transition-opacity duration-300 blur-xl ${isFocused || input ? 'opacity-80' : 'group-hover:opacity-60'}`}
          style={{
            background: `conic-gradient(from ${angle}deg at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.6), rgba(168,85,247,0.6), rgba(245,158,11,0.6), rgba(6,182,212,0.6))`,
          }}
        ></motion.div>
        
        <div className={`relative bg-[#0a0a0c]/80 backdrop-blur-2xl rounded-[1.4rem] p-3 flex flex-col gap-2 border transition-colors duration-300 shadow-2xl ${isFocused || input ? 'border-white/20' : 'border-white/10'}`}>
            <AnimatePresence>
              {attachedFiles.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 px-2 pt-2 border-b border-white/5 pb-3 mb-1"
                >
                  {attachedFiles.map((file, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-1.5 bg-cyan-900/40 text-cyan-200 text-xs px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-inner group/file"
                    >
                      <Paperclip size={12} className="text-cyan-500/70" />
                      <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                      <button type="button" onClick={() => removeFile(idx)} className="opacity-60 hover:opacity-100 hover:text-red-400 ml-1 transition-all">
                        <X size={12} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-end gap-2 w-full">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                autoFocus
                placeholder={isBetaMode ? "Command your team of experts..." : "Ask the Infinite Intelligence..."}
                style={{ fontFamily: 'Inter, sans-serif' }}
                className={`w-full bg-transparent text-gray-100 placeholder-gray-500/70 text-[15px] leading-relaxed px-4 py-3 min-h-[50px] max-h-[250px] resize-none focus:outline-none scrollbar-hide ${isBetaMode ? 'text-emerald-400' : ''}`}
                rows={1}
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept=".txt,.md,.json,.csv,.js,.ts,.html,.css" 
              />
              
              <div className="flex items-center gap-1.5 pb-1 pr-1 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className="p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent"
                  title="Attach Documents"
                >
                  <Paperclip size={18} />
                </button>
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={disabled}
                  className={`relative p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 border
                    ${isListening 
                      ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                      : 'bg-white/5 text-gray-400 border-transparent hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'
                    }`}
                  title={isListening ? "Stop Listening" : "Voice Input"}
                >
                  {isListening ? (
                    <>
                      <div className="absolute inset-0 bg-red-400/20 rounded-xl animate-ping opacity-75"></div>
                      <Mic size={18} className="animate-pulse" />
                    </>
                  ) : <Mic size={18} />}
                </button>
                <button
                  type="submit"
                  disabled={(!input.trim() && attachedFiles.length === 0) || disabled}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 min-w-[44px]
                    ${(!input.trim() && attachedFiles.length === 0) && !disabled
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed border border-transparent' 
                      : disabled
                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
                        : 'bg-white text-black hover:bg-cyan-50 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 border border-white'
                    }`}
                  title={disabled ? "Processing..." : "Send Message"}
                >
                  {disabled ? (
                     <Square size={16} className="fill-current" />
                  ) : input.trim() || attachedFiles.length > 0 ? (
                    <Send size={18} />
                  ) : (
                    <Sparkles size={18} className="opacity-50" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex flex-col gap-2">
               {/* Quick actions or shortcuts could go here initially */}
            </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between relative px-2">
            <div className="flex items-center gap-3">
              <p className={`text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-2 ${isBetaMode ? 'text-emerald-500 font-mono' : 'text-gray-500'}`}>
                {isBetaMode ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Agent Forge Active</>
                ) : (
                  <><span className="w-1 h-1 rounded-full bg-gray-500"></span> Orchestrated Multi-Agent System</>
                )}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {!isListening && !input && (
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest font-medium opacity-50">
                  <span>Enter</span>
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-sans">↵</kbd>
                  <span className="ml-2">Line</span>
                  <div className="flex items-center gap-0.5">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-sans text-xs">⇧</kbd>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-sans">↵</kbd>
                  </div>
                </div>
              )}
              
              {isBetaMode && onExitBeta && (
                <button 
                  type="button"
                  onClick={() => setShowExitConfirm(true)}
                  className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] uppercase tracking-widest font-black text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all flex items-center gap-1.5 shadow-inner"
                >
                  <X size={12} strokeWidth={3} />
                  Exit Forge
                </button>
              )}
            </div>
        </div>
      </form>

      {createPortal(
        <AnimatePresence>
          {showExitConfirm && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-md bg-[#050505] rounded-3xl border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.15)] overflow-hidden flex flex-col relative backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
                
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <AlertTriangle size={150} className="text-red-500 transform rotate-12 transition-transform duration-1000" />
                </div>

                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

                <div className="p-6 border-b border-white/5 flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    <AlertTriangle size={24} className="animate-pulse" />
                  </div>
                  <div className="pt-1">
                    <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Terminate Forge Session?</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <p className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Override Protocol</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 relative z-10">
                  <div className="mb-6 p-4 rounded-xl bg-black/60 border border-red-500/10 font-mono text-xs text-red-400/70 shadow-inner">
                    <div className="flex justify-between mb-2 opacity-50"><span>SYS.MEM.PURGE</span><span>[AWAITING]</span></div>
                    <div className="flex justify-between mb-2 opacity-50"><span>CTX.PARAMETERS</span><span>[VOLATILE]</span></div>
                    <div className="flex justify-between text-red-400 font-bold"><span>FORGE.STATUS</span><span>[TERMINATION_PENDING]</span></div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    You are about to exit the <span className="text-gray-200">Agent Forge</span>. Your current configuration and context parameters will be purged from the active memory bank, returning you to standard orchestration mode.
                  </p>
                </div>
                <div className="p-5 border-t border-white/5 bg-[#0a0a0c] flex justify-end gap-3 relative z-10">
                  <button 
                    type="button"
                    onClick={() => setShowExitConfirm(false)}
                    className="px-6 py-2.5 rounded-xl hover:bg-white/5 border border-white/5 hover:border-white/10 text-sm font-bold text-gray-400 hover:text-white transition-all shadow-sm"
                  >
                    Abort
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowExitConfirm(false);
                      if (onExitBeta) {
                        onExitBeta();
                      } else {
                        navigate('/home');
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-sm hover:bg-red-500 hover:text-white hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                  >
                    Confirm Termination
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

