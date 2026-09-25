import React, { useState } from 'react';
import { Search, Bell, Flame, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';

export default function Header({ streak = 1, onTriggerReminder }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses/regex/questions?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 glass-panel border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-72 hidden sm:block">
        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن مفهوم أو سؤال..."
          className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pr-9 pl-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </form>

      {/* Quick Brand Title on Mobile */}
      <div className="sm:hidden flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-cyan-400" />
        <span className="font-extrabold text-sm text-slate-100 font-mono">CyberLearn OS</span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold shadow-sm">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          <span>{streak} أيام تتابع</span>
        </div>

        {/* Islamic Reminder Quick Trigger */}
        <button
          onClick={onTriggerReminder}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-all cursor-pointer relative"
          title="تذكير بالصلاة على النبي ﷺ"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1 left-1 animate-ping"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-xl">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-xs font-bold text-slate-200">طالب سيبراني</p>
            <p className="text-[10px] text-slate-400">SOC Analyst Track</p>
          </div>
        </div>
      </div>
    </header>
  );
}
