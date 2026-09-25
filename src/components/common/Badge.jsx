import React from 'react';

export default function Badge({ children, variant = 'blue', size = 'sm', className = '' }) {
  const variants = {
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
    rose: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    slate: "bg-slate-800 text-slate-300 border border-slate-700"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
