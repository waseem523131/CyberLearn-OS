import React from 'react';
import { X, Sparkles } from 'lucide-react';

export default function ReminderToast({ message, isVisible, onClose }) {
  if (!isVisible || !message) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-bounce-short">
      <div className="glass-panel border border-cyan-500/40 rounded-2xl px-5 py-3 shadow-2xl glow-cyan flex items-center gap-3 bg-[#0d1527]/90 text-slate-100 max-w-md">
        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        
        <p className="text-sm font-medium text-cyan-200 tracking-wide dir-rtl">
          {message}
        </p>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800/60 transition-colors mr-auto"
          title="إغلاق التذكير"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
