import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  className = '',
  disabled = false,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 glow-blue shadow-lg shadow-blue-500/20 border border-blue-400/30",
    secondary: "bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600",
    cyan: "bg-cyan-600 text-white hover:bg-cyan-500 glow-cyan shadow-lg shadow-cyan-500/20 border border-cyan-400/30",
    success: "bg-emerald-600 text-white hover:bg-emerald-500 glow-green shadow-lg shadow-emerald-500/20 border border-emerald-400/30",
    danger: "bg-rose-600 text-white hover:bg-rose-500 glow-red shadow-lg shadow-rose-500/20 border border-rose-400/30",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:bg-slate-800/50 hover:text-white hover:border-slate-600",
    ghost: "bg-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5 font-semibold"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
}
