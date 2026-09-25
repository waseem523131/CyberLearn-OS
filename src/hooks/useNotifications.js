import { useState, useEffect, useCallback } from 'react';
import { getStoredSettings, saveStoredSettings } from '../utils/storage';
import { ISLAMIC_REMINDERS } from '../data/islamicReminders';

export function useNotifications() {
  const [settings, setSettings] = useState(getStoredSettings());
  const [currentReminder, setCurrentReminder] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const triggerRandomReminder = useCallback(() => {
    if (!settings.islamicReminders) return;
    
    const randomIndex = Math.floor(Math.random() * ISLAMIC_REMINDERS.length);
    setCurrentReminder(ISLAMIC_REMINDERS[randomIndex]);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [settings.islamicReminders]);

  useEffect(() => {
    // Show a polite reminder shortly after entering session if enabled
    if (settings.islamicReminders) {
      const initialTimer = setTimeout(() => {
        triggerRandomReminder();
      }, 3000);

      // Subsequent respectful interval (every 6 minutes)
      const interval = setInterval(() => {
        triggerRandomReminder();
      }, 360000);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(interval);
      };
    }
  }, [settings.islamicReminders, triggerRandomReminder]);

  const toggleReminders = (enabled) => {
    const updated = { ...settings, islamicReminders: enabled };
    setSettings(updated);
    saveStoredSettings(updated);
    if (!enabled) {
      setIsVisible(false);
    }
  };

  return {
    currentReminder,
    isVisible,
    remindersEnabled: settings.islamicReminders,
    toggleReminders,
    dismissReminder: () => setIsVisible(false),
    triggerRandomReminder,
  };
}
