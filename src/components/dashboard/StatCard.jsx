import React from 'react';
import Card from '../common/Card';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30 glow-blue',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 glow-green',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 glow-purple',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-amber-500/10',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30 glow-red',
  };

  return (
    <Card className="flex items-center gap-4 relative overflow-hidden">
      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${colorStyles[color]}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium mb-0.5">{title}</p>
        <h3 className="text-2xl font-extrabold text-slate-100 font-mono tracking-tight">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </Card>
  );
}
