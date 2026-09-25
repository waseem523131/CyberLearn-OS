import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import AnswerOption from './AnswerOption';
import ExplanationCard from './ExplanationCard';
import { ArrowLeft, ArrowRight, Shield, Code, CheckCircle, HelpCircle } from 'lucide-react';

export default function QuestionCard({
  question,
  savedState,
  onAnswer,
  onNext,
  onPrevious,
  hasPrevious,
  hasNext,
  currentIndex,
  totalQuestions,
}) {
  const [selectedOption, setSelectedOption] = useState(savedState?.selectedOption || null);
  const isAnswered = Boolean(savedState || selectedOption);
  const activeAnswer = savedState?.selectedOption || selectedOption;
  const isCorrect = activeAnswer === question.correctAnswer;

  const handleSelectOption = (optionId) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    const correct = optionId === question.correctAnswer;
    onAnswer(question.id, optionId, correct, question.topic);
  };

  const difficultyColors = {
    easy: 'emerald',
    medium: 'amber',
    hard: 'rose',
  };

  const difficultyText = {
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'متقدم',
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Question Header & Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="blue" size="sm" className="font-mono">
            سؤال {currentIndex + 1} / {totalQuestions}
          </Badge>
          <Badge variant={difficultyColors[question.difficulty]} size="sm">
            {difficultyText[question.difficulty]}
          </Badge>
          <Badge variant="purple" size="sm">
            {question.topic}
          </Badge>
        </div>

        {savedState && (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {savedState.status === 'correct' ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> تمت الإجابة بنجاح
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <HelpCircle className="w-4 h-4" /> إجابة سابقة غير صحيحة
              </span>
            )}
          </div>
        )}
      </div>

      {/* Question Statement */}
      <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-4 leading-relaxed dir-rtl">
        {question.question}
      </h3>

      {/* Code Snippet Box (If Available) */}
      {question.code && (
        <div className="mb-6 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-cyan-300 relative overflow-x-auto ltr-text shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-slate-900 font-sans dir-rtl">
            <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5 text-cyan-400" /> Pattern / Log Snippet</span>
            <span className="font-mono text-slate-600">Regex Engine</span>
          </div>
          <code>{question.code}</code>
        </div>
      )}

      {/* MCQ Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = activeAnswer === option.id;
          const isWrong = isAnswered && isSelected && !isCorrect;
          const isRightOpt = isAnswered && option.id === question.correctAnswer;

          return (
            <AnswerOption
              key={option.id}
              option={option}
              isSelected={isSelected}
              isAnswered={isAnswered}
              isCorrect={isRightOpt}
              isWrongChoice={isWrong}
              onSelect={() => handleSelectOption(option.id)}
            />
          );
        })}
      </div>

      {/* Immediate Educational Explanation Panel */}
      {isAnswered && (
        <ExplanationCard
          question={question}
          selectedOption={activeAnswer}
          isCorrect={isCorrect}
        />
      )}

      {/* Question Navigation Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
        <Button
          variant="outline"
          size="md"
          icon={ArrowRight}
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          السؤال السابق
        </Button>

        <Button
          variant="primary"
          size="md"
          icon={ArrowLeft}
          onClick={onNext}
          disabled={!hasNext}
        >
          السؤال التالي
        </Button>
      </div>
    </Card>
  );
}
