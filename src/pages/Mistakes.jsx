import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import QuestionCard from '../components/questions/QuestionCard';
import { useProgress } from '../hooks/useProgress';
import { REGEX_QUESTIONS } from '../data/regexQuestions';
import { AlertOctagon, CheckCircle, RefreshCw, ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';

export default function Mistakes() {
  const { mistakes, recordAnswer, progress } = useProgress();
  const [reviewQuestionId, setReviewQuestionId] = useState(null);

  // Group mistakes by topic to detect weak concepts
  const weakTopics = {};
  mistakes.forEach(m => {
    if (!weakTopics[m.topicId]) {
      weakTopics[m.topicId] = 0;
    }
    weakTopics[m.topicId] += 1;
  });

  const activeReviewQuestion = reviewQuestionId 
    ? REGEX_QUESTIONS.find(q => q.id === reviewQuestionId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <AlertOctagon className="w-7 h-7 text-rose-400" />
            سجل الأخطاء والمراجعة الذكية (Mistake Tracker)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            متابعة دقيقة لكافة الأسئلة التي تم إجابتها بشكل خاطئ لتفادي التكرار وتعزيز الفهم.
          </p>
        </div>

        <Badge variant={mistakes.length > 0 ? 'rose' : 'emerald'} size="md" className="font-mono">
          {mistakes.length} أخطاء مسجلة
        </Badge>
      </div>

      {/* Weak Concepts Warning Alert */}
      {Object.keys(weakTopics).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">مفاهيم تتطلب المراجعة:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(weakTopics).map(([topicId, count]) => (
              <Card key={topicId} hover={false} className="bg-amber-950/20 border-amber-900/50 p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>مفهوم يحتاج تقوية: [{topicId}]</span>
                  </div>
                  <p className="text-xs text-slate-400">تكررت فيه الأخطاء {count} مرات.</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/courses/regex/summary?topic=${topicId}`}>
                    <Button variant="outline" size="sm" icon={BookOpen}>
                      مراجعة المفهوم
                    </Button>
                  </Link>
                  <Link to={`/courses/regex/questions?topic=${topicId}`}>
                    <Button variant="primary" size="sm" icon={ArrowLeft}>
                      تدرب مجدداً
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Review Modal / Panel */}
      {activeReviewQuestion && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-200">وضع إعادة محاولة السؤال:</span>
            <Button variant="ghost" size="sm" onClick={() => setReviewQuestionId(null)}>
              إغلاق المراجعة ✕
            </Button>
          </div>

          <QuestionCard
            question={activeReviewQuestion}
            savedState={progress.solvedQuestions[activeReviewQuestion.id]}
            onAnswer={recordAnswer}
            onNext={() => setReviewQuestionId(null)}
            onPrevious={() => setReviewQuestionId(null)}
            hasPrevious={false}
            hasNext={false}
            currentIndex={0}
            totalQuestions={1}
          />
        </div>
      )}

      {/* Mistakes List */}
      {mistakes.length === 0 ? (
        <Card hover={false} className="text-center py-16 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-100">🎉 ممتاز! لا توجد أخطاء للمراجعة حالياً</h3>
            <p className="text-xs text-slate-400">إجاباتك متقنة وجميع الأخطاء السابقة تم تصحيحها وحذفها من السجل.</p>
          </div>
          <Link to="/courses/regex/questions" className="inline-block">
            <Button variant="primary" size="md" icon={ArrowLeft}>
              الانتقال لبنك الأسئلة
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300">قائمة الأسئلة المسجلة للأخطاء:</h3>
          <div className="grid grid-cols-1 gap-4">
            {mistakes.map((mistake) => {
              const q = REGEX_QUESTIONS.find(item => item.id === mistake.questionId);
              if (!q) return null;

              return (
                <Card key={mistake.questionId} hover={false} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <Badge variant="rose" size="xs">خطأ سابق</Badge>
                      <Badge variant="purple" size="xs">{q.topic}</Badge>
                      <span className="text-[11px] text-slate-500 font-mono">
                        محاولات: {mistake.attemptsCount || 1}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-200 dir-rtl line-clamp-2">
                      {q.question}
                    </h4>

                    <p className="text-xs text-slate-400 dir-rtl">
                      اختيارك السابق: <span className="font-mono text-rose-400 font-bold">[{mistake.selectedOption}]</span> | الإجابة الصحيحة: <span className="font-mono text-emerald-400 font-bold">[{q.correctAnswer}]</span>
                    </p>
                  </div>

                  <Button 
                    variant="primary" 
                    size="sm" 
                    icon={RefreshCw} 
                    onClick={() => setReviewQuestionId(q.id)}
                    className="shrink-0"
                  >
                    إعادة المحاولة (Review)
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
