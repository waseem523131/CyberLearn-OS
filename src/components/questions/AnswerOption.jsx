import React from 'react';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';

export default function AnswerOption({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  isWrongChoice,
  onSelect,
}) {
  let stateClasses = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60";
  let icon = <Circle className="w-5 h-5 text-slate-500 shrink-0" />;

  if (isAnswered) {
    if (isCorrect) {
      stateClasses = "bg-emerald-950/40 border-emerald-500/80 text-emerald-200 glow-green font-semibold";
      icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
    } else if (isWrongChoice) {
      stateClasses = "bg-rose-950/40 border-rose-500/80 text-rose-200 glow-red font-semibold";
      icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
    } else {
      stateClasses = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
    }
  } else if (isSelected) {
    stateClasses = "bg-blue-900/30 border-blue-500 text-blue-200 glow-blue font-semibold";
    icon = <Circle className="w-5 h-5 text-blue-400 fill-blue-400/20 shrink-0" />;
  }

  return (
    <button
      onClick={onSelect}
      disabled={isAnswered}
      className={`w-full p-4 rounded-xl border text-right transition-all duration-200 flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${stateClasses}`}
    >
      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
        {option.id}
      </span>
      
      <div className="flex-1 text-sm leading-relaxed dir-rtl">
        {option.text}
      </div>

      <div className="mt-0.5">
        {icon}
      </div>
    </button>
  );
}
