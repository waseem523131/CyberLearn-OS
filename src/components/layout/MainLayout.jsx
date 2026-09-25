import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import CyberGridBg from '../common/CyberGridBg';
import ReminderToast from '../notifications/ReminderToast';
import { useNotifications } from '../../hooks/useNotifications';
import { useProgress } from '../../hooks/useProgress';

export default function MainLayout() {
  const { currentReminder, isVisible, dismissReminder, triggerRandomReminder } = useNotifications();
  const { streak } = useProgress();

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col md:flex-row relative overflow-x-hidden font-sans">
      {/* Background Cyber Effect */}
      <CyberGridBg />

      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 z-10 pb-20 md:pb-6">
        <Header streak={streak} onTriggerReminder={triggerRandomReminder} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Islamic Reminder Notification Toast */}
      <ReminderToast 
        message={currentReminder} 
        isVisible={isVisible} 
        onClose={dismissReminder} 
      />
    </div>
  );
}
