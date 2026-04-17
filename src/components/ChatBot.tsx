import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, ChevronRight, Bot, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getChatResponse } from '../lib/gemini';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  suggestions?: string[];
}

// ─── Component ───────────────────────────────────────────────────────────────

let msgId = 0;
const id = () => ++msgId;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
      {
      id: id(),
      role: 'bot',
      text: "👋 Welcome to VAG Leicester! I'm your AI assistant specialising in VAG group coding, retrofits and diagnostics. I can help with CarPlay/Android Auto, Virtual Cockpits, hidden feature activations, reverse cameras, diagnostics and more. How can I help today?",
      suggestions: ['What services do you offer?', 'Is my car compatible?', 'How much does it cost?', 'How do I book?']
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: id(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const responseText = await getChatResponse(text, []);
      setMessages((m) => [...m, { id: id(), role: 'bot', text: responseText }]);
    } catch (error) {
      setMessages((m) => [...m, { id: id(), role: 'bot', text: "I'm sorry, I'm having trouble connecting. Please try again or call us!" }]);
    } finally {
      setTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Handle bold
      const parts = line.split(/\*\*(.+?)\*\*/g);
      return (
        <span key={i} className="block mb-1">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </span>
      );
    });
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand shadow-[0_0_24px_rgba(0,210,255,0.4)] flex items-center justify-center text-white"
      >
        <AnimatePresence mode="wait">
          {open ? <X key="x" className="w-6 h-6" /> : <MessageSquare key="m" className="w-6 h-6" />}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-vw-blue/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-vw-blue dark:bg-black/40 px-6 py-4 flex items-center gap-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-brand" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">VAG AI Assistant</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  Online
                </p>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                    msg.role === 'bot' ? "bg-brand/10 border-brand/20" : "bg-vw-blue/5 dark:bg-white/5 border-transparent"
                  )}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4 text-brand" /> : <User className="w-4 h-4 text-black/40 dark:text-white/40" />}
                  </div>
                  <div className={cn("flex flex-col gap-2 max-w-[85%]", msg.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                      msg.role === 'bot' 
                        ? "bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-tl-sm border border-black/5 dark:border-white/5" 
                        : "bg-brand text-white rounded-tr-sm"
                    )}>
                      {renderText(msg.text)}
                    </div>
                    {msg.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.suggestions.map(s => (
                          <button key={s} onClick={() => sendMessage(s)}                           className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:border-brand hover:text-brand transition-all text-black/40 dark:text-white/40 bg-white dark:bg-transparent">
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-brand animate-spin" />
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm border border-black/5 dark:border-white/5">
                    <span className="text-[11px] font-bold text-brand uppercase tracking-widest animate-pulse">Assistant is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-black/5 dark:bg-black/20 border-t border-black/10 dark:border-white/10 flex gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your car or a service..."
                className="flex-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand transition-all dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 shadow-inner"
              />
              <button disabled={!input.trim() || typing} className="w-12 h-12 rounded-2xl bg-brand hover:bg-brand-accent text-white flex items-center justify-center transition-all shadow-lg shadow-brand/20 disabled:opacity-50 active:scale-95">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
