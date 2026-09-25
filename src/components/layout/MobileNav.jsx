import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Target, 
  AlertOctagon, 
  Terminal,
  Settings
} from 'lucide-react';

const MOBILE_NAV_ITEMS = [
  { path: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { path: '/courses', label: 'الدورات', icon: BookOpen },
  { path: '/courses/regex/questions', label: 'الأسئلة', icon: HelpCircle },
  { path: '/quiz', label: 'اختبارات', icon: Target },
  { path: '/mistakes', label: 'الأخطاء', icon: AlertOctagon },
  { path: '/playground', label: 'المختبر', icon: Terminal },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-slate-800 z-40 bg-slate-950/90 backdrop-blur-lg px-2 py-2">
      <div className="flex items-center justify-around">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl text-[11px] font-medium transition-all ${
                  isActive
                    ? 'text-cyan-400 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
