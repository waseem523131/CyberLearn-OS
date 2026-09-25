import { useState, useEffect, useCallback } from 'react';
import { 
  getStoredProgress, 
  saveStoredProgress, 
  getStoredMistakes, 
  saveMistake, 
  removeMistake,
  getStreak 
} from '../utils/storage';
import { REGEX_QUESTIONS } from '../data/regexQuestions';

export function useProgress() {
  const [progress, setProgress] = useState(getStoredProgress());
  const [mistakes, setMistakes] = useState(getStoredMistakes());
  const [streak, setStreak] = useState(getStreak());

  useEffect(() => {
    // Refresh streak state on mount
    setStreak(getStreak());
  }, []);

  const recordAnswer = useCallback((questionId, selectedOption, isCorrect, topicId) => {
    setProgress(prev => {
      const updatedSolved = {
        ...prev.solvedQuestions,
        [questionId]: {
          status: isCorrect ? 'correct' : 'incorrect',
          selectedOption,
          attempts: (prev.solvedQuestions[questionId]?.attempts || 0) + 1,
          timestamp: Date.now(),
        }
      };

      // Recalculate topic progress
      const topicSolved = Object.keys(updatedSolved).filter(qId => {
        const q = REGEX_QUESTIONS.find(item => item.id === qId);
        return q && q.topic === topicId && updatedSolved[qId].status === 'correct';
      }).length;

      const totalTopicQuestions = REGEX_QUESTIONS.filter(q => q.topic === topicId).length || 1;

      const updatedTopicProgress = {
        ...prev.topicProgress,
        [topicId]: {
          correct: topicSolved,
          total: totalTopicQuestions,
          accuracy: Math.round((topicSolved / totalTopicQuestions) * 100),
        }
      };

      const newProgress = {
        ...prev,
        solvedQuestions: updatedSolved,
        topicProgress: updatedTopicProgress,
      };

      saveStoredProgress(newProgress);
      return newProgress;
    });

    if (!isCorrect) {
      const q = REGEX_QUESTIONS.find(item => item.id === questionId);
      saveMistake(questionId, selectedOption, q ? q.correctAnswer : '', topicId);
      setMistakes(getStoredMistakes());
    } else {
      // If answered correctly, remove from mistakes list
      removeMistake(questionId);
      setMistakes(getStoredMistakes());
    }
  }, []);

  const totalQuestions = REGEX_QUESTIONS.length;
  const solvedCount = Object.keys(progress.solvedQuestions).length;
  const correctCount = Object.values(progress.solvedQuestions).filter(s => s.status === 'correct').length;
  const wrongCount = Object.values(progress.solvedQuestions).filter(s => s.status === 'incorrect').length;
  const overallAccuracy = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;
  const courseCompletionRate = Math.round((correctCount / totalQuestions) * 100);

  return {
    progress,
    mistakes,
    streak: streak.currentStreak,
    solvedCount,
    correctCount,
    wrongCount,
    overallAccuracy,
    courseCompletionRate,
    totalQuestions,
    recordAnswer,
    refreshProgress: () => setProgress(getStoredProgress()),
  };
}
