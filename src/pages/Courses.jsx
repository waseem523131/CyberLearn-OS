import React from 'react';
import CourseCard from '../components/dashboard/CourseCard';
import { COURSES } from '../data/courses';
import { useProgress } from '../hooks/useProgress';
import { BookOpen } from 'lucide-react';

export default function Courses() {
  const { courseCompletionRate } = useProgress();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-cyan-400" />
          الدورات التعليمية (Courses Catalog)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          استكشف المسارات التعليمية في مجال الهندسة والأمن السيبراني المصممة مع تمارين تفاعلية.
        </p>
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
  );
}
