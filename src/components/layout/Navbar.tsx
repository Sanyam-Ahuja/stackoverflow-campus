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
  BookOpen,
  MessageSquare,
  Users
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
    <header className="border-b border-[#2e303a] bg-[#1d1e24] sticky top-0 z-40 so-header-top select-none">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          {/* Brand */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0"
            onClick={() => {
              setSearchQuery('');
              setActiveView('feed');
            }}
          >
            <div className="w-8 h-8 rounded bg-[#f48225]/15 border border-[#f48225]/40 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#f48225]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base tracking-tight text-white">
                  stack<strong className="text-[#f48225] font-black">campus</strong>
                </span>
                <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-[#f48225]/10 text-[#f48225] border border-[#f48225]/25 font-mono">
                  EDU
                </span>
              </div>
            </div>
          </div>

          {/* Search Box with Ctrl+K badge */}
          <div className="flex-1 max-w-xl relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search all questions, algorithms, tags, course codes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'feed') setActiveView('feed');
              }}
              className="w-full pl-8 pr-12 py-1.5 bg-[#141519] border border-[#343743] rounded text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#f48225] transition-colors"
            />
            <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-500 bg-[#21232b] px-1 py-0.2 rounded border border-[#2e313d] hidden sm:inline">
              /
            </span>
          </div>

          {/* Right Controls: User Profile & Ask Button */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* User Reputation Badge */}
            <div 
              onClick={() => setActiveView('leaderboard')}
              className="hidden sm:flex items-center space-x-1.5 px-2 py-1 rounded bg-[#252731] border border-[#343743] cursor-pointer hover:border-[#f48225]/50 transition-all text-xs"
              title="Your Campus Reputation"
            >
              <Award className="w-3.5 h-3.5 text-[#f48225]" />
              <span className="font-bold text-slate-200 font-mono">{currentUser.reputation.toLocaleString()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            {/* Ask Question button */}
            <button
              onClick={() => setActiveView('ask')}
              className="px-3 py-1.5 rounded bg-[#0a95ff] hover:bg-[#0074cc] text-white text-xs font-semibold flex items-center space-x-1 transition-all shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Question</span>
            </button>

            {/* Reset Demo button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-1.5 rounded bg-[#252731] hover:bg-[#2e323e] border border-[#343743] text-slate-400 hover:text-white transition-all"
              title="Reset to Seeded Demo Knowledge Base"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1f2026] border border-[#363a48] rounded-xl max-w-sm w-full p-5 shadow-2xl font-sans text-slate-200">
            <div className="flex items-center space-x-2.5 text-[#f48225] mb-3">
              <RotateCcw className="w-5 h-5" />
              <h3 className="font-bold text-white text-sm">Reset Campus Knowledge Base?</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              This will restore the 12 seeded course questions, answer threads, peer votes, accepted solutions, and reset your student reputation back to 1,420 points.
            </p>
            <div className="flex justify-end space-x-2 text-xs">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded text-slate-400 hover:text-white hover:bg-[#2b2d37]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded bg-[#f48225] hover:bg-[#d86e17] text-slate-950 font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
