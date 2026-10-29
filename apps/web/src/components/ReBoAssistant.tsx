'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'Explore the 6 architectures',
  'How much does a project cost?',
  'Explain BSC 450ms block time',
  'How do RareChars AI NPCs work?',
];

export const ReBoAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **ReBo**, your 24/7 AI Architect and technical guide at Rareware Studio.

I can walk you through our **6 core smart contract architectures**, post-Fermi **450ms BSC & opBNB execution**, non-custodial Safe multisig ownership, indicative pricing from **$3,000**, and scoping.

What are you building today?`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('rebo') === 'open' || window.location.hash === '#rebo') {
        setIsOpen(true);
      }
      const handleOpen = () => setIsOpen(true);
      window.addEventListener('open-rebo', handleOpen);
      return () => window.removeEventListener('open-rebo', handleOpen);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      if (messages.length > 1) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/rebo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('API failed');

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'I am currently processing requests. Please ask again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I encountered a momentary connection interruption. You can ask me about our 6 products or contact founder **Ahmed Riyaz** on Telegram at **@rareware_space**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none flex flex-col items-end">
      {/* ========================================================
          POP-UP CHAT WINDOW (Down Right Corner)
         ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 w-[370px] sm:w-[420px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-160px)] rounded-2xl border border-white/[0.14] bg-[#0A0C12]/95 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-gray-200"
          >
            {/* Header */}
            <div className="p-3.5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-teal/10 border border-teal/30 p-1 shadow-[0_0_20px_rgba(0,245,212,0.25)] shrink-0 overflow-hidden">
                  <Image
                    src="/media/rebo-avatar-head.png"
                    alt="ReBo Avatar"
                    width={36}
                    height={36}
                    className="object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal animate-ping" />
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm tracking-tight text-white">
                      ReBo
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-teal/15 text-teal border border-teal/30">
                      LIVE 24/7
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400">
                    Rareware AI Architect
                  </p>
                </div>
              </div>

              {/* Minimize / Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Close ReBo chat window"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <div className="max-w-[85%] rounded-2xl p-3.5 leading-relaxed bg-teal text-void font-medium shadow-[0_4px_20px_rgba(0,245,212,0.2)]">
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 max-w-[90%]">
                      <div className="h-7 w-7 rounded-lg bg-teal/10 border border-teal/30 p-0.5 shrink-0 mt-0.5 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/media/rebo-avatar-head.png"
                          alt="ReBo"
                          width={24}
                          height={24}
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="flex-1 rounded-2xl p-3.5 leading-relaxed bg-white/[0.05] border border-white/[0.08] text-gray-200">
                        <div className="whitespace-pre-wrap space-y-2">
                          {msg.content.split('\n\n').map((para, i) => (
                            <p key={i}>
                              {para.split('**').map((part, idx) =>
                                idx % 2 === 1 ? (
                                  <strong key={idx} className="text-teal font-semibold">
                                    {part}
                                  </strong>
                                ) : (
                                  part
                                )
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-1 px-1 text-[9px] font-mono text-gray-500">
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 text-xs font-mono text-teal p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
                  <div className="h-5 w-5 rounded-md bg-teal/10 border border-teal/30 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/media/rebo-avatar-head.png"
                      alt="ReBo thinking"
                      width={18}
                      height={18}
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  <span className="h-2 w-2 rounded-full bg-teal animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-teal animate-bounce delay-100" />
                  <span className="h-2 w-2 rounded-full bg-teal animate-bounce delay-200" />
                  <span className="text-[10px] text-gray-400 pl-1">ReBo is reasoning...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.01]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Suggested topics:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 hover:border-teal/50 hover:text-teal hover:bg-teal/5 transition"
                    >
                      {prompt} →
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-white/[0.08] bg-[#0A0C12] space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask ReBo about contracts, 450ms BSC, pricing..."
                  disabled={isLoading}
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal/60 transition disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 rounded-xl bg-teal text-void flex items-center justify-center font-bold hover:bg-teal/90 transition disabled:opacity-30 shadow-[0_0_15px_rgba(0,245,212,0.3)] shrink-0"
                  aria-label="Send message to ReBo"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 px-1">
                <span>Non-custodial safe • 24/7 active</span>
                <a
                  href="https://t.me/rareware_space"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal hover:underline"
                >
                  Telegram: @rareware_space ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          FLOATING REBO CHARACTER (Down Right Corner)
          Faithfully matches the user's pixel robot character
         ======================================================== */}
      <div className="relative flex flex-col items-end">
        {/* Interactive Speech Bubble Prompt (Shown when drawer is closed) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(true)}
              className="mb-2 cursor-pointer relative px-3.5 py-2 rounded-2xl bg-[#0D0F17]/95 border border-teal/40 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex items-center gap-2 group hover:border-teal transition-all"
            >
              {/* Pulsing Green/Teal Online Dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xs tracking-tight text-white group-hover:text-teal transition">
                    Ask ReBo
                  </span>
                  <span className="px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-teal/15 text-teal border border-teal/30">
                    24/7
                  </span>
                </div>
                <span className="text-[9px] font-mono text-gray-400">
                  Rareware AI Architect
                </span>
              </div>

              {/* Little speech bubble tail pointing down to ReBo's antenna */}
              <div className="absolute -bottom-1.5 right-12 w-3 h-3 bg-[#0D0F17] border-r border-b border-teal/40 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Character Entity */}
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Close ReBo Assistant' : 'Open ReBo Assistant'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
        >
          {/* Anti-Gravity Cyan Hover Glow Projection under Pedestal */}
          <motion.div
            animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.35, 0.75, 0.35] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-teal/30 blur-md pointer-events-none"
          />

          {/* Golden Anti-Gravity Pedestal Reflection */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />

          {/* ReBo Pixel Art Character Sprite (Light blue robot on gold disc) */}
          <div
            className={`relative drop-shadow-[0_12px_28px_rgba(0,245,212,0.3)] transition-all duration-300 ${
              isOpen ? 'w-16 sm:w-20' : 'w-24 sm:w-28'
            }`}
          >
            <Image
              src="/media/rebo-character-floating.png"
              alt="Floating ReBo Character"
              width={347}
              height={297}
              priority
              className="w-full h-auto transition-transform duration-300 group-hover:brightness-110"
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Unread Ping Badge on Antenna Tip */}
            {hasUnread && !isOpen && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex h-3.5 w-3.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-80" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal border-2 border-[#0A0C12]" />
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};