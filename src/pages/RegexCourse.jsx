import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import { REGEX_TOPICS } from '../data/topics';
import { useProgress } from '../hooks/useProgress';
import { 
  Code2, 
  BookOpen, 
  HelpCircle, 
  Target, 
  Terminal, 
  ArrowLeft, 
  CheckCircle2,
  Lock,
  ShieldCheck
} from 'lucide-react';

export default function RegexCourse() {
  const { courseCompletionRate, progress } = useProgress();

  const levelCategories = [
    { key: 'beginner', title: 'المستوى المبتدئ (Fundamentals & Basics)', color: 'blue' },
    { key: 'intermediate', title: 'المستوى المتوسط (Quantifiers, Grouping & Anchors)', color: 'cyan' },
    { key: 'advanced', title: 'المستوى المتقدم (Lookarounds & Backreferences)', color: 'purple' },
    { key: 'cybersecurity', title: 'تطبيقات الأمن السيبراني (Log Analysis, YARA & ReDoS)', color: 'emerald' },
  ];

  return (
    <div className="space-y-8">
      {/* Course Banner */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-blue-500/30 glow-blue space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="blue" size="sm">مسار أمن المعلومات</Badge>
              <Badge variant="cyan" size="sm">31 درساً تخصصياً</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              اللغة الرمزية المنظمة (Regular Expression Language)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تعلم كتابة وتحليل أنماط Regex من الصفر وحتى استخدامها المتقدم في فحص السجلات، كشف ثغرات SQLi/XSS، وتأمين حقول المدخلات.
            </p>
          </div>

          <div className="w-full md:w-64 glass-panel p-4 rounded-2xl border border-slate-700/80 space-y-3 bg-slate-900/80 shrink-0">
            <ProgressBar progress={courseCompletionRate} showText color="blue" />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>نسبة الإنجاز:</span>
              <span className="text-cyan-400 font-bold">{courseCompletionRate}%</span>
            </div>
            <Link to="/courses/regex/questions" className="block w-full">
              <Button variant="primary" size="sm" className="w-full" icon={ArrowLeft}>
                متابعة الأسئلة
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
          <Link to="/courses/regex/summary" className="block">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-colors text-center space-y-1">
              <BookOpen className="w-5 h-5 mx-auto text-blue-400" />
              <span className="text-xs font-bold text-slate-200 block">ملخص الشرح</span>
            </div>
          </Link>
          <Link to="/courses/regex/questions" className="block">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-colors text-center space-y-1">
              <HelpCircle className="w-5 h-5 mx-auto text-cyan-400" />
              <span className="text-xs font-bold text-slate-200 block">بنك الأسئلة</span>
            </div>
          </Link>
          <Link to="/quiz" className="block">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-colors text-center space-y-1">
              <Target className="w-5 h-5 mx-auto text-purple-400" />
              <span className="text-xs font-bold text-slate-200 block">الاختبارات</span>
            </div>
          </Link>
          <Link to="/playground" className="block">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors text-center space-y-1">
              <Terminal className="w-5 h-5 mx-auto text-emerald-400" />
              <span className="text-xs font-bold text-slate-200 block">المختبر</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Topics Breakdown by Level */}
      <div className="space-y-8">
        {levelCategories.map(({ key, title, color }) => {
          const categoryTopics = REGEX_TOPICS.filter(t => t.category === key);
          return (
            <div key={key} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-r-4 border-blue-500 pr-3">
                {title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTopics.map((topic) => {
                  const topicProg = progress.topicProgress[topic.id];
                  const accuracy = topicProg?.accuracy || 0;

                  return (
                    <Card key={topic.id} className="flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-cyan-400 font-bold">Topic #{topic.id}</span>
                          {accuracy >= 80 && (
                            <span className="text-emerald-400 text-xs flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-extrabold text-slate-100 leading-snug">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {topic.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <Link to={`/courses/regex/summary?topic=${topic.id}`}>
                          <span className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                            الشرح والمفاهيم ←
                          </span>
                        </Link>
                        <Link to={`/courses/regex/questions?topic=${topic.id}`}>
                          <Button variant="outline" size="sm">
                            تدرب الآن
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
