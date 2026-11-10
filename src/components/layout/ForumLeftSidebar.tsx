import React from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { 
  Globe, 
  MessageSquare, 
  Tag, 
  Award, 
  Bookmark, 
  BookOpen, 
  Hash, 
  FolderGit2, 
  GraduationCap
} from 'lucide-react';

const COURSES = [
  { code: 'CS 401', name: 'Operating Systems' },
  { code: 'CS 405', name: 'Distributed Systems' },
  { code: 'CS 350', name: 'Algorithms' },
  { code: 'CS 301', name: 'Database Systems' },
  { code: 'CS 210', name: 'Architecture' },
];

export const ForumLeftSidebar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    selectedCourse, 
    setSelectedCourse, 
    questions 
  } = useCampusOverflowStore();

  const bookmarkedCount = questions.filter((q) => q.isBookmarked).length;

  return (
    <aside className="w-52 flex-shrink-0 hidden md:block select-none text-xs border-r border-[#272932] pr-2 py-4">
      <nav className="space-y-4">
        {/* Home */}
        <div>
          <button
            onClick={() => {
              setSelectedCourse('all');
              setActiveView('feed');
            }}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded font-medium text-left transition-colors ${
              activeView === 'feed' && selectedCourse === 'all'
                ? 'bg-[#282a36] text-white font-bold border-r-2 border-[#f48225]'
                : 'text-slate-400 hover:text-white hover:bg-[#20222b]'
            }`}
          >
            <Globe className="w-4 h-4 text-slate-400" />
            <span>Home Feed</span>
          </button>
        </div>

        {/* Public Section */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            PUBLIC
          </div>
          <button
            onClick={() => setActiveView('feed')}
            className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded transition-colors ${
              activeView === 'feed' || activeView === 'question_detail'
                ? 'bg-[#262833] text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#20222b]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#f48225]" />
            <span>Questions</span>
          </button>

          <button
            onClick={() => setActiveView('tags')}
            className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded transition-colors ${
              activeView === 'tags'
                ? 'bg-[#262833] text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#20222b]'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>Tags Catalog</span>
          </button>

          <button
            onClick={() => setActiveView('leaderboard')}
            className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded transition-colors ${
              activeView === 'leaderboard'
                ? 'bg-[#262833] text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#20222b]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Solvers & Karma</span>
          </button>

          <button
            onClick={() => setActiveView('bookmarks')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded transition-colors ${
              activeView === 'bookmarks'
                ? 'bg-[#262833] text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-[#20222b]'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
              <span>Saved Items</span>
            </div>
            {bookmarkedCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#333745] text-slate-300 font-mono">
                {bookmarkedCount}
              </span>
            )}
          </button>
        </div>

        {/* Academic Collectives / Courses */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
            <span>COLLECTIVES</span>
            <GraduationCap className="w-3 h-3 text-slate-500" />
          </div>
          {COURSES.map((course) => {
            const isSelected = selectedCourse === course.code;
            return (
              <button
                key={course.code}
                onClick={() => {
                  setSelectedCourse(course.code);
                  setActiveView('feed');
                }}
                className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded text-left transition-colors ${
                  isSelected
                    ? 'bg-[#282a36] text-[#f48225] font-semibold border-l-2 border-[#f48225]'
                    : 'text-slate-400 hover:text-white hover:bg-[#20222b]'
                }`}
              >
                <span className="font-mono text-[10px] font-bold text-slate-500">{course.code}</span>
                <span className="truncate">{course.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
