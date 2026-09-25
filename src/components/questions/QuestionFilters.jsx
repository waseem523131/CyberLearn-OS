import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { REGEX_TOPICS } from '../../data/topics';

export default function QuestionFilters({
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  onResetFilters,
}) {
  return (
    <div className="glass-panel rounded-2xl p-4 mb-6 border border-slate-800 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في بنك الأسئلة..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Topic Selector */}
        <div>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">جميع المواضيع (All Topics)</option>
            {REGEX_TOPICS.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Selector */}
        <div>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">جميع المستويات (All Difficulties)</option>
            <option value="easy">سهل (Easy)</option>
            <option value="medium">متوسط (Medium)</option>
            <option value="hard">متقدم (Hard)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">جميع الحالات (All Status)</option>
            <option value="unanswered">غير مجابة (Unanswered)</option>
            <option value="correct">إجابات صحيحة (Correct)</option>
            <option value="incorrect">أخطاء سابقة (Incorrect)</option>
          </select>
        </div>
      </div>

      {/* Reset Filter Action */}
      <div className="flex justify-end">
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> إعادة ضبط الفلاتر
        </button>
      </div>
    </div>
  );
}
