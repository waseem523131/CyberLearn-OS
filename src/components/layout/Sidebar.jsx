import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Target, 
  Award, 
  AlertOctagon, 
  BarChart3, 
  Terminal, 
  Settings,
  Shield
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'الرئيسية', labelEn: 'Dashboard', icon: LayoutDashboard },
  { path: '/courses', label: 'الدورات التعليمية', labelEn: 'Courses', icon: BookOpen },
  { path: '/courses/regex/summary', label: 'ملخص Regex', labelEn: 'Summary', icon: Shield },
  { path: '/courses/regex/questions', label: 'بنك الأسئلة', labelEn: 'Questions', icon: HelpCircle },
  { path: '/quiz', label: 'الاختبارات (Quiz)', labelEn: 'Quizzes', icon: Target },
  { path: '/exam', label: 'الامتحان (Exam)', labelEn: 'Exam', icon: Award },
  { path: '/mistakes', label: 'سجل الأخطاء', labelEn: 'Mistakes', icon: AlertOctagon },
  { path: '/progress', label: 'التقدم والأداء', labelEn: 'Progress', icon: BarChart3 },
  { path: '/playground', label: 'مختبر Regex', labelEn: 'Playground', icon: Terminal },
  { path: '/settings', label: 'الإعدادات', labelEn: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 glass-panel border-l border-slate-800 hidden md:flex flex-col h-screen sticky top-0 z-30 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center glow-blue text-white shadow-lg shadow-blue-500/20">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-slate-100 tracking-wide">
            CyberLearn <span className="text-cyan-400 font-mono">OS</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-medium tracking-tight">Learn. Practice. Defend.</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 glow-blue font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Active System Status Footer */}
      <div className="p-4 border-t border-slate-800/80 m-3 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-semibold text-emerald-400">النظام نشط</span>
        </div>
        <p className="text-[11px] text-slate-400 font-mono">Regular Expression v1.0</p>
      </div>
    </aside>
  );
}
