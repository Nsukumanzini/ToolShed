import React, { useState } from 'react';
import {
  X,
  Send,
  MessageSquare,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { MessageThread } from '../types';

interface MessagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  threads: MessageThread[];
  onSendMessage: (threadId: string, text: string) => void;
  activeThreadId?: string;
  setActiveThreadId: (id: string) => void;
}

export const MessagesDrawer: React.FC<MessagesDrawerProps> = ({
  isOpen,
  onClose,
  threads,
  onSendMessage,
  activeThreadId,
  setActiveThreadId,
}) => {
  if (!isOpen) return null;

  const currentThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentThread) return;
    onSendMessage(currentThread.id, inputText.trim());
    setInputText('');
  };

  const QUICK_REPLIES = [
    'Is delivery available to De Bruin Park?',
    'Can I extend my rental by 1 day?',
    'What fuel/blade does this require?',
    'Is this tool available this weekend?',
    'Where is the exact garage pickup spot?',
    'Just arrived outside for pickup!',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end text-left animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-stone-900 text-white border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">ToolShed Community Messages</h3>
              <p className="text-[11px] text-stone-400">Direct chat with lenders & borrowers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thread selector tabs if multiple threads */}
        {threads.length > 1 && (
          <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto p-2 gap-2">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  currentThread?.id === t.id
                    ? 'bg-stone-900 text-amber-400 shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <img
                  src={t.otherUser.avatar}
                  alt={t.otherUser.name}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{t.otherUser.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Current Active Thread Context Header */}
        {currentThread && (
          <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentThread.toolImage}
                alt={currentThread.toolTitle}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-lg object-cover border border-stone-300 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-bold text-stone-900 truncate">{currentThread.toolTitle}</p>
                <p className="text-[11px] text-stone-500 flex items-center gap-1">
                  Chatting with <strong>{currentThread.otherUser.name}</strong>
                  {currentThread.otherUser.online && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1" />
                  )}
                </p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-full shrink-0">
              Verified Neighbor
            </span>
          </div>
        )}

        {/* Messages Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50">
          {currentThread ? (
            currentThread.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-stone-900 text-white rounded-br-none'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs">No active messages</div>
          )}
        </div>

        {/* Quick Response Chips */}
        <div className="p-2.5 bg-stone-100 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold uppercase text-stone-500 shrink-0 ml-1">Quick:</span>
          {QUICK_REPLIES.map((reply, i) => (
            <button
              key={i}
              onClick={() => setInputText(reply)}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-full border border-stone-300 font-medium transition-colors cursor-pointer"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message to the owner..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold transition-all shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
