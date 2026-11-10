import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { ForumLeftSidebar } from './components/layout/ForumLeftSidebar';
import { ForumRightSidebar } from './components/layout/ForumRightSidebar';
import { QuestionFeedView } from './components/feed/QuestionFeedView';
import { QuestionDetailView } from './components/questions/QuestionDetailView';
import { AskQuestionView } from './components/questions/AskQuestionView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { TagsExplorerView } from './components/tags/TagsExplorerView';
import { useCampusOverflowStore } from './store/useCampusOverflowStore';

export const App: React.FC = () => {
  const { activeView } = useCampusOverflowStore();

  return (
    <div className="min-h-screen bg-[#17181c] text-slate-100 flex flex-col font-sans selection:bg-[#f48225]/30 selection:text-[#f48225]">
      {/* Top StackOverflow Navigation Header */}
      <Navbar />

      {/* 3-Column Community Developer Forum Layout */}
      <div className="flex-1 max-w-[1340px] w-full mx-auto px-4 sm:px-6 flex gap-6 py-6">
        {/* Left Column: Navigation Sidebar */}
        <ForumLeftSidebar />

        {/* Center Column: Questions & Dynamic Views */}
        <main className="flex-1 min-w-0">
          {activeView === 'feed' && <QuestionFeedView />}
          {activeView === 'question_detail' && <QuestionDetailView />}
          {activeView === 'ask' && <AskQuestionView />}
          {activeView === 'tags' && <TagsExplorerView />}
          {activeView === 'leaderboard' && <LeaderboardView />}
          {activeView === 'bookmarks' && <QuestionFeedView />}
        </main>

        {/* Right Column: Hot Meta & Blog Widgets (shown on feeds/questions) */}
        {(activeView === 'feed' || activeView === 'question_detail' || activeView === 'bookmarks') && (
          <ForumRightSidebar />
        )}
      </div>

      {/* Forum Footer */}
      <footer className="border-t border-[#272932] bg-[#121316] py-6 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 StackOverflow Campus — Academic Technical Q&A and Knowledge Exchange</p>
          <p className="font-mono text-[11px] text-slate-500">
            Client-Side Fuzzy Indexing • Course Collectives • Peer Reputation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
