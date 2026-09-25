import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Lightbulb } from 'lucide-react';
import Badge from '../common/Badge';

export default function ExplanationCard({ question, selectedOption, isCorrect }) {
  if (!selectedOption) return null;

  const correctOptObj = question.options.find(o => o.id === question.correctAnswer);
  const selectedOptObj = question.options.find(o => o.id === selectedOption);
  const selectedExplanation = question.optionExplanations?.[selectedOption];

  return (
    <div className={`mt-6 p-6 rounded-2xl border transition-all animate-fade-in ${
      isCorrect 
        ? 'bg-emerald-950/20 border-emerald-500/40 glow-green' 
        : 'bg-rose-950/20 border-rose-500/40 glow-red'
    }`}>
      {/* Header Banner */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80 mb-4">
        {isCorrect ? (
          <>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-emerald-400">🟢 إجابة صحيحة!</h4>
              <p className="text-xs text-emerald-300/80 font-medium">أحسنت! إجابتك دقيقة ومطابقة للمفاهيم السيبرانية.</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-rose-400">🔴 إجابة خاطئة</h4>
              <p className="text-xs text-slate-300 font-medium">
                الإجابة الصحيحة هي: <span className="font-bold text-emerald-400 font-mono">[{question.correctAnswer}] — {correctOptObj?.text}</span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Explanation Grid */}
      <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
        {/* Why Correct Explanation */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1.5 text-xs">
            <Lightbulb className="w-4 h-4" />
            <span>لماذا الإجابة الصحيحة هي [{question.correctAnswer}]؟</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">{question.explanation}</p>
        </div>

        {/* Why Selected Option Was Wrong (If Wrong) */}
        {!isCorrect && selectedExplanation && (
          <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-900/50">
            <div className="flex items-center gap-2 text-rose-400 font-bold mb-1.5 text-xs">
              <XCircle className="w-4 h-4" />
              <span>لماذا اختيارك [{selectedOption}] كان خطأ؟</span>
            </div>
            <p className="text-rose-200/90 text-xs sm:text-sm">{selectedExplanation}</p>
          </div>
        )}

        {/* Common Mistake Alert */}
        {question.commonMistake && (
          <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5 text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>⚠️ خطأ شائع يجب تجنبه</span>
            </div>
            <p className="text-amber-200/90 text-xs sm:text-sm">{question.commonMistake}</p>
          </div>
        )}

        {/* Cybersecurity Application Context */}
        {question.cyberSecurityUseCase && (
          <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-900/40">
            <div className="flex items-center gap-2 text-blue-400 font-bold mb-1.5 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>🛡️ الاستخدام في الأمن السيبراني (Cybersecurity Use Case)</span>
            </div>
            <p className="text-blue-200/90 text-xs sm:text-sm">{question.cyberSecurityUseCase}</p>
          </div>
        )}

        {/* Concept Badges */}
        {question.concepts && (
          <div className="flex flex-wrap gap-2 pt-2 items-center">
            <span className="text-xs text-slate-400 font-medium">المفاهيم:</span>
            {question.concepts.map((concept, idx) => (
              <Badge key={idx} variant="cyan" size="xs">
                {concept}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
