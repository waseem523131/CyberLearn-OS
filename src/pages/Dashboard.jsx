import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import CourseCard from '../components/dashboard/CourseCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useProgress } from '../hooks/useProgress';
import { COURSES } from '../data/courses';
import { 
  BookOpen, 
  HelpCircle, 
  Target, 
  Flame, 
  ArrowLeft, 
  ShieldCheck, 
  AlertOctagon,
  Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const { 
    solvedCount, 
    correctCount, 
    overallAccuracy, 
    streak, 
    courseCompletionRate,
    mistakes 
  } = useProgress();

  const regexCourse = COURSES[0];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden border border-slate-800 glow-blue">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>نظام تعليم الأمن السيبراني المحترف</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            مرحباً بك في <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">CyberLearn OS</span> 👋
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            منصة متخصصة في تأهيل محللي الأمن السيبراني واستجابة الحوادث عبر التمارين التفاعلية، الشروحات الدقيقة، والتطبيق العملي.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/courses/regex">
              <Button variant="primary" size="md" icon={ArrowLeft}>
                ابدأ تعلم Regex
              </Button>
            </Link>
            <Link to="/courses/regex/summary">
              <Button variant="secondary" size="md">
                تصفح ملخص المفاهيم
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-transparent"></div>
        </div>
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="الدورات المتاحة"
          value="01"
          subtitle="Regular Expression Track"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="الأسئلة المحلولة"
          value={solvedCount}
          subtitle={`إجابات صحيحة: ${correctCount}`}
          icon={HelpCircle}
          color="cyan"
        />
        <StatCard
          title="نسبة الدقة العامة"
          value={`${overallAccuracy}%`}
          subtitle="معدل الأجوبة الصحيحة"
          icon={Target}
          color="green"
        />
        <StatCard
          title="تتابع الدراسة"
          value={`${streak} أيام`}
          subtitle="استمرارية يومية"
          icon={Flame}
          color="amber"
        />
      </div>

      {/* Quick Action Alerts (e.g. Mistakes Review) */}
      {mistakes.length > 0 && (
        <Card hover={false} className="bg-rose-950/20 border-rose-800/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-300">لديك أسئلة تحتاج المراجعة</h4>
              <p className="text-xs text-slate-400">توجد {mistakes.length} أخطاء مسجلة في سجلك تحتاج لإعادة المحاولة ومراجعة المفاهيم.</p>
            </div>
          </div>
          <Link to="/mistakes" className="shrink-0">
            <Button variant="danger" size="sm" icon={ArrowLeft}>
              مراجعة الأخطاء
            </Button>
          </Link>
        </Card>
      )}

      {/* Courses Catalog Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            الدورات التعليمية الحالية
          </h2>
          <Link to="/courses" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">
            عرض كافة المسارات ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              completionRate={course.id === 'regex' ? courseCompletionRate : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
