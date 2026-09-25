import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { AlertOctagon, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-16 text-center space-y-6">
      <Card hover={false} className="space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto glow-red">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-100 font-mono">404</h1>
          <h2 className="text-lg font-bold text-slate-200">الصفحة غير موجودة</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            المسار المطلوب غير متاح أو تم نقله في نظام CyberLearn OS.
          </p>
        </div>

        <Link to="/dashboard" className="inline-block w-full">
          <Button variant="primary" size="md" icon={Home} className="w-full">
            العودة للرئيسية
          </Button>
        </Link>
      </Card>
    </div>
  );
}
