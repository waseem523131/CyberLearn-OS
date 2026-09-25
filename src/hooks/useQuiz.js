import { useState, useEffect, useCallback } from 'react';
import { saveQuizResult } from '../utils/storage';

export function useQuiz(questions = [], options = {}) {
  const { isExam = false, timeLimitMinutes = 15 } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: 'A' }
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    if (isCompleted || !isExam || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExam, isCompleted, timeLeft]);

  const selectAnswer = (questionId, optionId) => {
    if (isCompleted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const submitQuiz = useCallback(() => {
    if (isCompleted) return;

    let correctCount = 0;
    let wrongCount = 0;
    const topicBreakdown = {};

    questions.forEach(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;

      if (isCorrect) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }

      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { correct: 0, total: 0 };
      }
      topicBreakdown[q.topic].total += 1;
      if (isCorrect) {
        topicBreakdown[q.topic].correct += 1;
      }
    });

    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const timeSpent = isExam ? (timeLimitMinutes * 60) - timeLeft : 0;

    const results = {
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      unansweredCount: questions.length - Object.keys(userAnswers).length,
      accuracy,
      timeSpent,
      topicBreakdown,
      isExam,
    };

    setQuizResults(results);
    setIsCompleted(true);
    saveQuizResult(results);
  }, [isCompleted, questions, userAnswers, isExam, timeLimitMinutes, timeLeft]);

  return {
    currentQuestion: questions[currentIndex] || null,
    currentIndex,
    totalQuestions: questions.length,
    userAnswers,
    flaggedQuestions,
    timeLeft,
    isCompleted,
    quizResults,
    selectAnswer,
    toggleFlag,
    goToNext,
    goToPrevious,
    goToIndex: (index) => setCurrentIndex(index),
    submitQuiz,
  };
}
