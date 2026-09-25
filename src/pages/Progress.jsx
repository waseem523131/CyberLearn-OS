import React from 'react';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { REGEX_TOPICS } from '../data/topics';
import { getQuizHistory } from '../utils/storage';
import { BarChart3, Target, CheckCircle2, Flame, Award, Clock } from 'lucide-react';

export default function Progress() {
  const { 
    solvedCount, 
    correctCount, 
    wrongCount, 
    overallAccuracy, 
    courseCompletionRate,
    streak,
    progress 
  } = useProgress();

  const quizHistory = getQuizHistory();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-cyan-400" />
          لوحة تحليل التقدم والأداء (Progress Analytics)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          إحصائيات شاملة للأداء الدراسي، مستويات الإتقان لكل موضوع، وتاريخ الاختبارات.
        </p>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover={false} className="space-y-2">
          <span className="text-xs text-slate-400 font-medium">نسبة إنجاز الدورة</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-blue-400 font-mono">{courseCompletionRate}%</span>
            <Badge variant="blue" size="xs">Regex Track</Badge>
          </div>
          <ProgressBar progress={courseCompletionRate} color="blue" height="h-2" />
        </Card>

        <Card hover={false} className="space-y-2">
          <span className="text-xs text-slate-400 font-medium">الأسئلة المحلولة</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">{solvedCount}</span>
            <span className="text-xs text-slate-500 font-mono">من {solvedCount}</span>
          </div>
          <p className="text-[11px] text-slate-400">صحيحة: <span className="text-emerald-400 font-bold">{correctCount}</span> | خاطئة: <span className="text-rose-400 font-bold">{wrongCount}</span></p>
        </Card>

        <Card hover={false} className="space-y-2">
          <span className="text-xs text-slate-400 font-medium">نسبة الدقة العامة</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{overallAccuracy}%</span>
            <Target className="w-5 h-5 text-emerald-400" />
          </div>
          <ProgressBar progress={overallAccuracy} color="green" height="h-2" />
        </Card>

        <Card hover={false} className="space-y-2">
          <span className="text-xs text-slate-400 font-medium">التتابع اليومي (Streak)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{streak} أيام</span>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-[11px] text-slate-400">استمرارية منتظمة في التعلم.</p>
        </Card>
      </div>

      {/* Topics Mastery Progress List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100">معدل الإتقان حسب المواضيع (Topic Mastery):</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REGEX_TOPICS.map((topic) => {
            const topicData = progress.topicProgress[topic.id] || { correct: 0, total: 1, accuracy: 0 };
            const acc = topicData.accuracy || 0;

            return (
              <Card key={topic.id} hover={false} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 dir-rtl line-clamp-1">{topic.title}</h4>
                  <span className="text-xs font-mono font-bold text-cyan-400">{acc}%</span>
                </div>
                <ProgressBar progress={acc} color={acc >= 80 ? 'green' : acc >= 50 ? 'blue' : 'amber'} height="h-2" />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quiz History Table */}
      {quizHistory.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            سجل الاختبارات والامتحانات السابقة:
          </h3>

          <div className="glass-panel rounded-2xl overflow-x-auto border border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="p-3 font-semibold">التاريخ</th>
                  <th className="p-3 font-semibold">النوع</th>
                  <th className="p-3 font-semibold">عدد الأسئلة</th>
                  <th className="p-3 font-semibold">الدرجة</th>
                  <th className="p-3 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {quizHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-mono">{new Date(item.timestamp).toLocaleDateString('ar-EG')}</td>
                    <td className="p-3">{item.isExam ? 'امتحان محاكاة' : 'اختبار تفاعلي'}</td>
                    <td className="p-3 font-mono">{item.totalQuestions}</td>
                    <td className="p-3 font-mono font-bold text-cyan-400">{item.accuracy}%</td>
                    <td className="p-3">
                      <Badge variant={item.accuracy >= 70 ? 'emerald' : 'rose'} size="xs">
                        {item.accuracy >= 70 ? 'ناجح' : 'يحتاج مراجعة'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
