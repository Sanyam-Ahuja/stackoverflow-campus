import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { 
  HelpCircle, 
  Search, 
  PlusCircle, 
  Award, 
  Tag, 
  Bookmark, 
  RotateCcw, 
  Flame, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    searchQuery, 
    setSearchQuery, 
    currentUser, 
    resetDemoData, 
    questions 
  } = useCampusOverflowStore();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const bookmarkedCount = questions.filter((q) => q.isBookmarked).length;

  return (
    <header className="border-b border-slate-800 bg-[#0F1115]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer flex-shrink-0"
            onClick={() => {
              setSearchQuery('');
              setActiveView('feed');
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shadow-lg shadow-orange-500/10">
              <HelpCircle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white font-mono">
                  Stack<span className="text-orange-500">Campus</span>
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono">
                  Q&A NETWORK
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">University Technical Knowledge Base</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search algorithms, kernel bugs, networks, courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'feed') setActiveView('feed');
              }}
              className="w-full pl-9 pr-4 py-2 bg-[#16181D] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Nav Items */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveView('feed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeView === 'feed' || activeView === 'question_detail'
                  ? 'bg-slate-800 text-orange-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Questions</span>
            </button>

            <button
              onClick={() => setActiveView('tags')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeView === 'tags'
                  ? 'bg-slate-800 text-orange-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tags</span>
            </button>

            <button
              onClick={() => setActiveView('leaderboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeView === 'leaderboard'
                  ? 'bg-slate-800 text-orange-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Reputation</span>
            </button>

            <button
              onClick={() => setActiveView('bookmarks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeView === 'bookmarks'
                  ? 'bg-slate-800 text-orange-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Saved ({bookmarkedCount})</span>
            </button>
          </nav>

          {/* Right Action & User Karma */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-[#16181D] border border-slate-800 text-xs font-mono">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-4 h-4 rounded-full object-cover" />
              <span className="text-orange-400 font-bold">{currentUser.reputation}</span>
              <span className="text-[10px] text-slate-500">KARMA</span>
            </div>

            <button
              onClick={() => setActiveView('ask')}
              className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs shadow-md shadow-orange-600/30 flex items-center space-x-1.5 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Question</span>
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all"
              title="Reset seeded simulation data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16181D] border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-bold text-white">Reset Q&A Network?</h3>
            <p className="text-xs text-slate-400 mt-2">
              This will restore all questions, upvotes, and accepted answers back to seeded defaults.
            </p>
            <div className="mt-5 flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 rounded-lg text-xs bg-orange-600 hover:bg-orange-500 text-white font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
