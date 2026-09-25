import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { ArrowLeft, BookOpen, Code2, ShieldAlert, Network, FileSearch } from 'lucide-react';

const ICON_MAP = {
  Code2: Code2,
  Network: Network,
  ShieldAlert: ShieldAlert,
  FileSearch: FileSearch,
};

export default function CourseCard({ course, completionRate = 0 }) {
  const IconComponent = ICON_MAP[course.icon] || BookOpen;
  const isActive = course.status === 'active';

  return (
    <Card className="flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Top Banner & Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          <Badge variant={isActive ? 'blue' : 'slate'} size="sm">
            {course.badge}
          </Badge>
        </div>

        {/* Course Info */}
        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
          {course.categoryAr}
        </span>
        <h3 className="text-lg font-extrabold text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors">
          {course.titleAr || course.title}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-3">{course.subtitle}</p>
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-6">
          {course.description}
        </p>
      </div>

      {/* Progress & Actions Footer */}
      <div className="pt-4 border-t border-slate-800/80 space-y-4">
        {isActive ? (
          <>
            <ProgressBar progress={completionRate} showText color="blue" />

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>📚 {course.totalTopics} درساً</span>
              <span>📝 {course.totalQuestions} سؤلااً</span>
              <span>⏱️ {course.estimatedHours} ساعات</span>
            </div>

            <Link to={course.path} className="block w-full">
              <Button variant="primary" size="md" className="w-full" icon={ArrowLeft}>
                متابعة الدراسة
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">متاح ضمن التحديثات القادمة</span>
            <Button variant="secondary" size="sm" disabled>
              قريباً
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
