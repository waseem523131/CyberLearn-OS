import React, { useState, useMemo } from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Terminal, Cpu, Info, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

const PRESET_PATTERNS = [
  {
    name: "استخراج عناوين IP (IPv4)",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    flags: "g",
    sample: "192.168.1.1 - - [25/Sep/2026] \"GET /admin HTTP/1.1\" 200 10.0.0.45",
  },
  {
    name: "فحص البريد الإلكتروني (Email)",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    sample: "Contact analyst at user@cyberlearn.os or admin@sec.org for reports.",
  },
  {
    name: "كشف محاولات SQL Injection",
    pattern: "(?i)(union\\s+select|select.*from|<script>)",
    flags: "g",
    sample: "GET /search?q=1%27+UNION+SELECT+1,username,password+FROM+users HTTP/1.1",
  },
  {
    name: "استخراج الأرقام التسلسلية",
    pattern: "SEC-\\d{4}-[A-Z]{3}",
    flags: "g",
    sample: "Incident reports SEC-1042-ALR and SEC-9941-WRN were logged today.",
  }
];

export default function RegexPlayground() {
  const [pattern, setPattern] = useState("\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testText, setTestText] = useState("Server log: Client 192.168.1.50 accessed /api/v1/auth at 14:20. Internal gateway: 10.0.4.1.");
  const [copied, setCopied] = useState(false);

  const flagString = useMemo(() => {
    return Object.keys(flags).filter(f => flags[f]).join('');
  }, [flags]);

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const regex = new RegExp(pattern, flagString);
      const results = [];

      if (flags.g) {
        let match;
        let count = 0;
        // Limit iterations to prevent UI freeze
        while ((match = regex.exec(testText)) !== null && count < 500) {
          results.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1),
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
          count++;
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          results.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1),
          });
        }
      }

      return { matches: results, error: null };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flagString, testText, flags]);

  const handleCopyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${flagString}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyPreset = (preset) => {
    setPattern(preset.pattern);
    setTestText(preset.sample);
    setFlags({
      g: preset.flags.includes('g'),
      i: preset.flags.includes('i'),
      m: preset.flags.includes('m'),
      s: preset.flags.includes('s'),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Terminal className="w-7 h-7 text-cyan-400" />
            مختبر الـ Regex التفاعلي (Regex Playground)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            اختبر الأنماط الرمزية في الوقت الفعلي على سجلات ومدخلات الأمن السيبراني.
          </p>
        </div>
        
        <Badge variant="cyan" size="md" className="font-mono self-start sm:self-auto">
          JavaScript / PCRE Engine
        </Badge>
      </div>

      {/* Engine Notice Alert */}
      <div className="bg-blue-950/30 border border-blue-800/50 rounded-2xl p-4 text-xs text-blue-200 flex items-start gap-3">
        <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-cyan-300">ملاحظة فروقات المحركات (Engine Differences):</span>
          <p className="mt-0.5">
            يعمل هذا المختبر بواسطة محرك متصفح الويب (JavaScript RegExp Engine). تدعم المتصفحات الحديثة معظم ميزات PCRE2 و Python <code className="font-mono text-cyan-300">re</code> مثل Lookbehinds، ولكن قد تختلف التعبيرات الذرية (Atomic Groups <code className="font-mono text-cyan-300">(?&gt;...)</code>) الصريحة في بعض البيئات القديمة.
          </p>
        </div>
      </div>

      {/* Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-400 font-medium whitespace-nowrap">أنماط جاهزة:</span>
        {PRESET_PATTERNS.map((preset, i) => (
          <button
            key={i}
            onClick={() => handleApplyPreset(preset)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 whitespace-nowrap transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Controls Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pattern Input Box */}
          <Card hover={false}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-200">النمط الرمزي (Regex Pattern):</label>
              <button
                onClick={handleCopyPattern}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'تم النسخ!' : 'نسخ النمط'}
              </button>
            </div>

            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono text-cyan-300 focus-within:border-cyan-500 ltr-text shadow-inner">
              <span className="text-slate-600 select-none mr-2">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="ادخل التعبير النمطي..."
                className="flex-1 bg-transparent text-cyan-300 focus:outline-none font-mono text-sm"
              />
              <span className="text-slate-600 select-none ml-2">/{flagString}</span>
            </div>

            {/* Flags Options */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-medium">الشارات (Flags):</span>
              {[
                { key: 'g', label: 'g (Global search)' },
                { key: 'i', label: 'i (Case insensitive)' },
                { key: 'm', label: 'm (Multiline)' },
                { key: 's', label: 's (DotAll)' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-1.5 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flags[key]}
                    onChange={(e) => setFlags({ ...flags, [key]: e.target.checked })}
                    className="accent-cyan-500 rounded cursor-pointer"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mt-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>خطأ في صياغة النمط: {error}</span>
              </div>
            )}
          </Card>

          {/* Test Text Box */}
          <Card hover={false}>
            <label className="text-xs font-bold text-slate-200 mb-2 block">
              نص الاختبار والسجلات (Test Text / Target Logs):
            </label>
            <textarea
              rows={6}
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="ضع نص السجلات أو البيانات للاختبار هنا..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500 ltr-text shadow-inner leading-relaxed"
            />
          </Card>
        </div>

        {/* Results & Matches Sidebar */}
        <div className="space-y-6">
          <Card hover={false} className="h-full flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                نتائج المطابقة (Matches)
              </h3>
              <Badge variant={matches.length > 0 ? 'emerald' : 'slate'} size="sm" className="font-mono">
                {matches.length} مطابقة
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[420px] space-y-2.5 pr-1">
              {matches.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  لا توجد مطابقات للنص الحالي.
                </div>
              ) : (
                matches.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 space-y-1.5 ltr-text"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans border-b border-slate-800 pb-1">
                      <span className="font-bold text-cyan-400">Match #{idx + 1}</span>
                      <span>Index: {m.index}</span>
                    </div>

                    <p className="bg-slate-950 px-2 py-1 rounded text-emerald-400 font-semibold break-all">
                      "{m.text}"
                    </p>

                    {m.groups.length > 0 && (
                      <div className="pt-1 text-[11px] space-y-0.5 font-sans">
                        <span className="text-slate-500 font-bold block">Groups:</span>
                        {m.groups.map((g, gIdx) => (
                          <div key={gIdx} className="text-slate-400 pl-2">
                            Group {gIdx + 1}: <span className="text-cyan-300 font-mono">"{g}"</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
