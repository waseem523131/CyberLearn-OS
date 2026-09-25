import React from 'react';

export default function ProgressBar({ progress = 0, color = 'blue', showText = false, height = 'h-2.5', className = '' }) {
  const colors = {
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-500/50',
    green: 'bg-gradient-to-r from-emerald-600 to-teal-400 shadow-emerald-500/50',
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-500 shadow-purple-500/50',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-amber-500/50',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5">
          <span>التقدم</span>
          <span className="font-mono text-blue-400">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 ${height}`}>
        <div
          className={`${height} ${colors[color]} rounded-full transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
