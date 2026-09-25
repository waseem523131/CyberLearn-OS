import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { getStoredSettings, saveStoredSettings, resetAllData } from '../utils/storage';
import { Settings as SettingsIcon, Bell, Volume2, Globe, Trash2, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState(getStoredSettings());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    saveStoredSettings(updated);
  };

  const handleResetConfirm = () => {
    resetAllData();
    setIsModalOpen(false);
    setResetDone(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-cyan-400" />
          إعدادات النظام والتطبيق (Settings)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          تخصيص التنبيهات، تفضيلات التعلم، وإدارة البيانات المحلية.
        </p>
      </div>

      {resetDone && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/60 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>تم إعادة ضبط جميع البيانات بنجاح! يتم الآن إعادة تحميل الصفحة...</span>
        </div>
      )}

      {/* Islamic Reminders Settings */}
      <Card hover={false} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-100">🔔 تذكيرات الصلاة على النبي ﷺ</h3>
              <p className="text-xs text-slate-400">إظهار اشعارات تذكيرية غير مزعجة في أسفل الشاشة أثناء الدراسة.</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.islamicReminders}
              onChange={() => handleToggle('islamicReminders')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full border border-slate-700 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>
      </Card>

      {/* Preferences Settings */}
      <Card hover={false} className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-100">التغذية الراجعة الفورية (Immediate Feedback)</h3>
              <p className="text-xs text-slate-400">عرض التفسيرات والردود التعليمية فور اختيار الإجابة في بنك الأسئلة.</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.immediateFeedback}
              onChange={() => handleToggle('immediateFeedback')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full border border-slate-700 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-100">لغة واجهة المستخدم (Interface Language)</h3>
              <p className="text-xs text-slate-400">اللغة العربية مع المصطلحات التقنية بالأجنبية.</p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            العربية (RTL)
          </span>
        </div>
      </Card>

      {/* Danger Zone: Reset Progress */}
      <Card hover={false} className="bg-rose-950/20 border-rose-900/50 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-rose-400 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> منطقة الخطر: حذف وتصفير التقدم (Reset Progress)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              سيتم مسح سجل الأجوبة، التقدم، الإحصائيات، والأخطاء المخزنة في متصفحك بشكل دائم.
            </p>
          </div>

          <Button variant="danger" size="sm" onClick={() => setIsModalOpen(true)}>
            إعادة ضبط التقدم
          </Button>
        </div>
      </Card>

      {/* Reset Progress Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="تأكيد حذف البيانات"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              إلغاء
            </Button>
            <Button variant="danger" size="sm" onClick={handleResetConfirm}>
              تأكيد الحذف النهائي
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-300 leading-relaxed dir-rtl">
          هل أنت متأكد أنك تريد حذف تقدمك بالكامل؟ لا يمكن التراجع عن هذا الإجراء وسيتم تصفير جميع إحصائياتك وسجل الأخطاء.
        </p>
      </Modal>
    </div>
  );
}
