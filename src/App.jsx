import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import RegexCourse from './pages/RegexCourse';
import RegexSummary from './pages/RegexSummary';
import RegexQuestions from './pages/RegexQuestions';
import Quiz from './pages/Quiz';
import Exam from './pages/Exam';
import Mistakes from './pages/Mistakes';
import Progress from './pages/Progress';
import RegexPlayground from './pages/RegexPlayground';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          
          {/* Regex Course Routes */}
          <Route path="courses/regex" element={<RegexCourse />} />
          <Route path="courses/regex/summary" element={<RegexSummary />} />
          <Route path="courses/regex/questions" element={<RegexQuestions />} />
          <Route path="courses/regex/quiz" element={<Quiz />} />
          <Route path="courses/regex/exam" element={<Exam />} />
          <Route path="courses/regex/playground" element={<RegexPlayground />} />

          {/* Quick Access Top Level Routes */}
          <Route path="quiz" element={<Quiz />} />
          <Route path="exam" element={<Exam />} />
          <Route path="mistakes" element={<Mistakes />} />
          <Route path="progress" element={<Progress />} />
          <Route path="playground" element={<RegexPlayground />} />
          <Route path="settings" element={<Settings />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
