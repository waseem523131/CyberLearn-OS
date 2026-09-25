import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { REGEX_SUMMARY_SECTIONS } from '../data/regexSummary';
import { 
  BookOpen, 
  HelpCircle, 
  Code, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  ArrowLeft,
  Search
} from 'lucide-react';

export default function RegexSummary() {
  const [searchParams] = useSearchParams();
  const highlightTopic = searchParams.get('topic');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="pb-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-cyan-400" />
            ملخص مفاهيم Regex الشامل (Comprehensive Guide)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            دليل تدريبي منظم تدريجياً: المبتدئ ← المتوسط ← المتقدم ← تطبيقات الأمن السيبراني.
          </p>
        </div>

        <Link to="/courses/regex/questions">
          <Button variant="cyan" size="md" icon={HelpCircle}>
            الانتقال لكافة الأسئلة
          </Button>
        </Link>
      </div>

      {/* Summary Sections */}
      <div className="space-y-10">
        {REGEX_SUMMARY_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-6">
            <div className="border-r-4 border-cyan-500 pr-4">
              <h3 className="text-xl font-extrabold text-slate-100">{section.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{section.subtitle}</p>
            </div>

            <div className="space-y-6">
              {section.items.map((item) => {
                const isHighlighted = highlightTopic === item.topicId;

                return (
                  <Card 
                    key={item.id} 
                    id={item.topicId}
                    hover={false} 
                    className={`space-y-4 transition-all duration-300 ${
                      isHighlighted ? 'border-cyan-400 glow-cyan bg-cyan-950/20' : ''
                    }`}
                  >
                    {/* Concept Title & Direct Practice Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {item.title}
                      </h4>

                      <Link to={`/courses/regex/questions?topic=${item.topicId}`}>
                        <Button variant="primary" size="sm" icon={ArrowLeft}>
                          تدرب على هذا المفهوم (Practice Questions)
                        </Button>
                      </Link>
                    </div>

                    {/* Definition */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed dir-rtl">
                      {item.definition}
                    </p>

                    {/* Syntax & Example Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 block font-sans">الصياغة (Syntax):</span>
                        <code className="text-xs sm:text-sm text-cyan-300 font-mono block ltr-text">{item.syntax}</code>
                      </div>

                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 block font-sans">مثال (Example):</span>
                        <code className="text-xs sm:text-sm text-emerald-400 font-mono block ltr-text">{item.example}</code>
                      </div>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-200 block mb-1">الشرح والتوضيح:</span>
                      {item.explanation}
                    </div>

                    {/* Engine Specific Note (If Present) */}
                    {item.engineNote && (
                      <div className="bg-blue-950/30 p-3.5 rounded-xl border border-blue-800/50 text-xs text-blue-300 flex items-start gap-2.5">
                        <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-cyan-300">⚠️ تنبيه محركات البحث (Engine Specific):</span>
                          <p className="mt-0.5">{item.engineNote}</p>
                        </div>
                      </div>
                    )}

                    {/* Common Mistake Alert */}
                    {item.commonMistake && (
                      <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-900/40 text-xs text-amber-300 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-400">خطأ شائع يجب تجنبه:</span>
                          <p className="mt-0.5">{item.commonMistake}</p>
                        </div>
                      </div>
                    )}

                    {/* Cybersecurity Use Case */}
                    {item.cyberUseCase && (
                      <div className="bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-900/40 text-xs text-emerald-300 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-400">💡 الاستخدام في الأمن السيبراني:</span>
                          <p className="mt-0.5">{item.cyberUseCase}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
