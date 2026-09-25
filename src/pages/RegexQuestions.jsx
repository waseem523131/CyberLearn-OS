import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuestionCard from '../components/questions/QuestionCard';
import QuestionFilters from '../components/questions/QuestionFilters';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { REGEX_QUESTIONS } from '../data/regexQuestions';
import { useProgress } from '../hooks/useProgress';
import { HelpCircle, RefreshCw, AlertCircle } from 'lucide-react';

export default function RegexQuestions() {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const { progress, recordAnswer } = useProgress();

  useEffect(() => {
    if (searchParams.get('topic')) {
      setSelectedTopic(searchParams.get('topic'));
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search'));
    }
  }, [searchParams]);

  const filteredQuestions = useMemo(() => {
    return REGEX_QUESTIONS.filter((q) => {
      // Search filter
      const matchesSearch = 
        !searchQuery || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.code && q.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.explanation && q.explanation.toLowerCase().includes(searchQuery.toLowerCase()));

      // Topic filter
      const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

      // Status filter
      const qState = progress.solvedQuestions[q.id];
      let matchesStatus = true;
      if (selectedStatus === 'unanswered') matchesStatus = !qState;
      if (selectedStatus === 'correct') matchesStatus = qState?.status === 'correct';
      if (selectedStatus === 'incorrect') matchesStatus = qState?.status === 'incorrect';

      return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty, selectedStatus, progress.solvedQuestions]);

  // Reset index if out of bounds after filtering
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredQuestions.length, currentIndex]);

  const currentQuestion = filteredQuestions[currentIndex] || null;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('all');
    setSelectedDifficulty('all');
    setSelectedStatus('all');
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-cyan-400" />
            بنك أسئلة الـ Regex (Question Bank)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            أسئلة تفاعلية مع توضيح فوري للخيارات، الأخطاء الشائعة، والاستخدام السيبراني.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          المستعرض حالياً: {filteredQuestions.length} أسئلة
        </div>
      </div>

      {/* Filter Bar */}
      <QuestionFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* Main Question Display Area */}
      {filteredQuestions.length === 0 ? (
        /* Empty State */
        <Card hover={false} className="text-center py-16 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-200">لا توجد أسئلة مطابقة للفلاتر الحالية</h3>
            <p className="text-xs text-slate-400">حاول تغيير خيارات البحث أو إعادة ضبط الفلاتر لاستعراض المزيد من الأسئلة.</p>
          </div>
          <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleResetFilters} className="mx-auto">
            إعادة ضبط الفلاتر
          </Button>
        </Card>
      ) : (
        /* Active Question Card */
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          savedState={progress.solvedQuestions[currentQuestion.id]}
          onAnswer={recordAnswer}
          onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1))}
          onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < filteredQuestions.length - 1}
          currentIndex={currentIndex}
          totalQuestions={filteredQuestions.length}
        />
      )}
    </div>
  );
}
