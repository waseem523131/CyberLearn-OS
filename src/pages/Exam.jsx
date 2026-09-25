import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { REGEX_QUESTIONS } from '../data/regexQuestions';
import { useQuiz } from '../hooks/useQuiz';
import { Award, Clock, Bookmark, CheckCircle2, AlertTriangle, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Exam() {
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);

  const handleStartExam = () => {
    // Pick 15 comprehensive questions spanning easy, medium, hard
    const shuffled = [...REGEX_QUESTIONS].sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled.slice(0, 15));
    setExamStarted(true);
  };

  const exam = useQuiz(examQuestions, { isExam: true, timeLimitMinutes: 15 });

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="pb-4 border-b border-slate-800 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-amber-500/20">
            <Award className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">امتحان محاكاة التقييم (Exam Simulation Mode)</h2>
          <p className="text-xs text-slate-400 mt-1">محاكاة حقيقية لاختبارات شهادات الأمن السيبراني مع مؤقت وتدقيق أداء شامل.</p>
        </div>

        <Card hover={false} className="space-y-6">
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-b border-slate-800 pb-4">
            <h4 className="font-bold text-amber-400 text-sm">قواعد ومواصفات الامتحان:</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>عدد الأسئلة: 15 سؤلاً شاملة لمختلف المفاهيم.</li>
              <li>الزمن المحدد: 15 دقيقة (عداد تنازلي في الأعلى).</li>
              <li>يمكنك تقديم الإجابات، تعليم الأسئلة للمراجعة، والتنقل بحرية.</li>
              <li>تظهر النتيجة المكتملة وتفسير الأخطاء بعد الاعتماد والتسليم النهائي.</li>
            </ul>
          </div>

          <Button variant="cyan" size="lg" icon={Clock} onClick={handleStartExam} className="w-full">
            بدء الامتحان الرسمي (15 دقيقة)
          </Button>
        </Card>
      </div>
    );
  }

  /* Exam Completion Summary */
  if (exam.isCompleted && exam.quizResults) {
    const res = exam.quizResults;
    const isPassed = res.accuracy >= 70;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Card hover={false} className={`text-center py-8 space-y-6 ${isPassed ? 'glow-green border-emerald-500/40' : 'glow-red border-rose-500/40'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {isPassed ? <CheckCircle2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-100">
              {isPassed ? '🎉 تهانينا! لقد اجتزت الامتحان بنجاح' : '⚠️ لم تجتز الامتحان هذه المرة'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              درجة الاجتياز المطلوبة: 70% | الدرجة المحققة: <span className="font-bold font-mono text-cyan-400">{res.accuracy}%</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-center font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">الدرجة</span>
              <span className="text-xl font-bold text-cyan-400">{res.accuracy}%</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">صحيحة</span>
              <span className="text-xl font-bold text-emerald-400">{res.correctCount}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">خاطئة</span>
              <span className="text-xl font-bold text-rose-400">{res.wrongCount}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">غير مجابة</span>
              <span className="text-xl font-bold text-amber-400">{res.unansweredCount}</span>
            </div>
          </div>

          <Button variant="secondary" size="md" icon={RefreshCw} onClick={() => setExamStarted(false)} className="mx-auto">
            إعادة امتحان آخر
          </Button>
        </Card>
      </div>
    );
  }

  /* Active Timed Exam Screen */
  const q = exam.currentQuestion;
  const currentAnswer = exam.userAnswers[q.id];
  const isFlagged = exam.flaggedQuestions[q.id];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Controls Header */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="amber" size="sm" className="font-mono">
            سؤال {exam.currentIndex + 1} / {exam.totalQuestions}
          </Badge>
          <button
            onClick={() => exam.toggleFlag(q.id)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
              isFlagged ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isFlagged ? 'تم التعليم للمراجعة' : 'تعليم للمراجعة'}</span>
          </button>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-2 font-mono text-sm font-bold text-amber-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>{formatTimer(exam.timeLeft)}</span>
        </div>

        <Button variant="danger" size="sm" onClick={exam.submitQuiz}>
          إنهاء وتسليم الامتحان
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-3">
          <Card hover={false} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-100 leading-relaxed dir-rtl">
              {q.question}
            </h3>

            {q.code && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 ltr-text">
                <code>{q.code}</code>
              </div>
            )}

            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => exam.selectAnswer(q.id, opt.id)}
                  className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                    currentAnswer === opt.id
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 glow-cyan font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="w-6 h-6 rounded bg-slate-800 text-xs font-mono font-bold flex items-center justify-center text-slate-300 shrink-0">
                    {opt.id}
                  </span>
                  <span className="text-sm dir-rtl">{opt.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button variant="outline" size="sm" icon={ArrowRight} onClick={exam.goToPrevious} disabled={exam.currentIndex === 0}>
                السابق
              </Button>
              <Button variant="primary" size="sm" icon={ArrowLeft} onClick={exam.goToNext} disabled={exam.currentIndex === exam.totalQuestions - 1}>
                التالي
              </Button>
            </div>
          </Card>
        </div>

        {/* Question Navigation Map Grid */}
        <div>
          <Card hover={false} className="space-y-4">
            <h4 className="text-xs font-bold text-slate-200 pb-2 border-b border-slate-800">خارطة الأسئلة:</h4>
            <div className="grid grid-cols-4 gap-2">
              {examQuestions.map((question, idx) => {
                const isAns = Boolean(exam.userAnswers[question.id]);
                const isFlg = Boolean(exam.flaggedQuestions[question.id]);
                const isCurr = idx === exam.currentIndex;

                return (
                  <button
                    key={question.id}
                    onClick={() => exam.goToIndex(idx)}
                    className={`h-9 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer relative ${
                      isCurr
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 glow-cyan ring-2 ring-cyan-500/30'
                        : isAns
                        ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {idx + 1}
                    {isFlg && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
