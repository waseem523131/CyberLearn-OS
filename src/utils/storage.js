/**
 * CyberLearn OS - LocalStorage Utility Manager
 * Handles user progress, mistake history, settings, quiz results, and streaks safely.
 */

const STORAGE_KEYS = {
  PROGRESS: 'cyberlearn_progress',
  MISTAKES: 'cyberlearn_mistakes',
  SETTINGS: 'cyberlearn_settings',
  QUIZ_HISTORY: 'cyberlearn_quiz_history',
  EXAM_HISTORY: 'cyberlearn_exam_history',
  STREAK: 'cyberlearn_streak',
};

const DEFAULT_SETTINGS = {
  islamicReminders: true,
  soundEffects: true,
  immediateFeedback: true,
  language: 'ar',
};

const DEFAULT_PROGRESS = {
  solvedQuestions: {}, // { questionId: { status: 'correct'|'incorrect', attempts: number, lastAnswer: 'A', timestamp: number } }
  topicProgress: {},   // { topicId: { correct: number, total: number } }
  coursesCompleted: [],
  totalTimeSpent: 0,   // seconds
};

const DEFAULT_STREAK = {
  currentStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export const getStoredSettings = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return item ? { ...DEFAULT_SETTINGS, ...JSON.parse(item) } : DEFAULT_SETTINGS;
  } catch (e) {
    console.error('Failed to load settings:', e);
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};

export const getStoredProgress = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return item ? { ...DEFAULT_PROGRESS, ...JSON.parse(item) } : DEFAULT_PROGRESS;
  } catch (e) {
    console.error('Failed to load progress:', e);
    return DEFAULT_PROGRESS;
  }
};

export const saveStoredProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

export const getStoredMistakes = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error('Failed to load mistakes:', e);
    return [];
  }
};

export const saveMistake = (questionId, selectedOption, correctAnswer, topicId) => {
  try {
    const mistakes = getStoredMistakes();
    const existingIndex = mistakes.findIndex(m => m.questionId === questionId);
    
    const newEntry = {
      questionId,
      selectedOption,
      correctAnswer,
      topicId,
      date: new Date().toISOString(),
      attemptsCount: existingIndex >= 0 ? (mistakes[existingIndex].attemptsCount || 1) + 1 : 1,
    };

    if (existingIndex >= 0) {
      mistakes[existingIndex] = newEntry;
    } else {
      mistakes.push(newEntry);
    }

    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  } catch (e) {
    console.error('Failed to save mistake:', e);
  }
};

export const removeMistake = (questionId) => {
  try {
    const mistakes = getStoredMistakes().filter(m => m.questionId !== questionId);
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  } catch (e) {
    console.error('Failed to remove mistake:', e);
  }
};

export const getQuizHistory = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error('Failed to load quiz history:', e);
    return [];
  }
};

export const saveQuizResult = (quizData) => {
  try {
    const history = getQuizHistory();
    history.unshift({
      id: `quiz-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...quizData,
    });
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save quiz result:', e);
  }
};

export const getStreak = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!item) return DEFAULT_STREAK;
    const streak = JSON.parse(item);
    const today = new Date().toISOString().split('T')[0];
    const lastDate = new Date(streak.lastActiveDate);
    const currentDate = new Date(today);
    
    const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Continued streak today
      streak.currentStreak += 1;
      streak.lastActiveDate = today;
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
    } else if (diffDays > 1) {
      // Streak broken
      streak.currentStreak = 1;
      streak.lastActiveDate = today;
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
    }
    return streak;
  } catch (e) {
    console.error('Failed to load streak:', e);
    return DEFAULT_STREAK;
  }
};

export const resetAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to reset stored data:', e);
  }
};
