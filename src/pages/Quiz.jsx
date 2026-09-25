import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { REGEX_QUESTIONS } from '../data/regexQuestions';
import { REGEX_TOPICS } from '../data/topics';
import { useQuiz } from '../hooks/useQuiz';
import { Target, Play, RefreshCw, CheckCircle2, XCircle, Award, Clock } from 'lucide-react';

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedCount, setSelectedCount] = useState(5);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleStartQuiz = () => {
    let pool = [...REGEX_QUESTIONS];
    if (selectedTopic !== 'all') {
      pool = pool.filter(q => q.topic === selectedTopic);
    }
    if (selectedDifficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === selectedDifficulty);
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const count = Math.min(parseInt(selectedCount), shuffled.length);
    setQuizQuestions(shuffled.slice(0, count));
    setQuizStarted(true);
  };

  const quiz = useQuiz(quizQuestions, { isExam: false });

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="pb-4 border-b border-slate-800 text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-3 glow-purple">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">وضع الاختبار التفاعلي (Quiz Mode)</h2>
          <p className="text-xs text-slate-400 mt-1">خصص عدد الأسئلة والمستويات ثم ابدأ اختباراً سريعاً لتقييم مستواك.</p>
        </div>

        <Card hover={false} className="space-y-5">
          {/* Topic Setup */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">اختر الموضوح المطلوب:</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="all">جميع المواضيع (All Topics)</option>
              {REGEX_TOPICS.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Setup */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">اختر درجة الصعوبة:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="all">جميع المستويات</option>
              <option value="easy">سهل (Easy)</option>
              <option value="medium">متوسط (Medium)</option>
              <option value="hard">متقدم (Hard)</option>
            </select>
          </div>

          {/* Question Count Setup */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">عدد الأسئلة:</label>
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 15].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedCount(num)}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedCount === num
                      ? 'bg-purple-900/40 border-purple-500 text-purple-300 glow-purple'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {num} أسئلة
                </button>
              ))}
            </div>
          </div>

          <Button variant="primary" size="lg" icon={Play} onClick={handleStartQuiz} className="w-full">
            ابدأ الاختبار الآن
          </Button>
        </Card>
      </div>
    );
  }

  /* Quiz Completion Screen */
  if (quiz.isCompleted && quiz.quizResults) {
    const res = quiz.quizResults;
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Card hover={false} className="text-center py-8 space-y-6 glow-purple border-purple-500/40">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-100">كتمل الاختبار بنجاح! 🎉</h3>
            <p className="text-xs text-slate-400 mt-1">تقرير أداءك النهائي في الاختبار التفاعلي.</p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">الدقة العامة</span>
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">{res.accuracy}%</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">الإجابات الصحيحة</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">{res.correctCount}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">الأخطاء</span>
              <span className="text-2xl font-extrabold text-rose-400 font-mono">{res.wrongCount}</span>
            </div>
          </div>

          <Button variant="secondary" size="md" icon={RefreshCw} onClick={() => setQuizStarted(false)} className="mx-auto">
            إعادة اختبار جديد
          </Button>
        </Card>
      </div>
    );
  }

  /* Active Quiz Screen */
  const q = quiz.currentQuestion;
  const currentAnswer = quiz.userAnswers[q.id];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Progress */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <Badge variant="purple" size="sm" className="font-mono">
          سؤال {quiz.currentIndex + 1} / {quiz.totalQuestions}
        </Badge>
        <ProgressBar progress={Math.round(((quiz.currentIndex + 1) / quiz.totalQuestions) * 100)} height="h-2" className="w-48" />
      </div>

      {/* Question Card */}
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
              onClick={() => quiz.selectAnswer(q.id, opt.id)}
              className={`w-full p-3.5 rounded-xl border text-right transition-all flex items-start gap-3 cursor-pointer ${
                currentAnswer === opt.id
                  ? 'bg-purple-950/40 border-purple-500 text-purple-200 glow-purple font-bold'
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

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={quiz.goToPrevious} disabled={quiz.currentIndex === 0}>
            السابق
          </Button>

          {quiz.currentIndex === quiz.totalQuestions - 1 ? (
            <Button variant="success" size="md" onClick={quiz.submitQuiz}>
              إنهاء الاختبار وتجميع النتائج
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={quiz.goToNext}>
              التالي
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
