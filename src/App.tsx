import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { QuestionFeedView } from './components/feed/QuestionFeedView';
import { QuestionDetailView } from './components/questions/QuestionDetailView';
import { AskQuestionView } from './components/questions/AskQuestionView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { TagsExplorerView } from './components/tags/TagsExplorerView';
import { useCampusOverflowStore } from './store/useCampusOverflowStore';

export const App: React.FC = () => {
  const { activeView } = useCampusOverflowStore();

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'feed' && <QuestionFeedView />}
        {activeView === 'question_detail' && <QuestionDetailView />}
        {activeView === 'ask' && <AskQuestionView />}
        {activeView === 'tags' && <TagsExplorerView />}
        {activeView === 'leaderboard' && <LeaderboardView />}
        {activeView === 'bookmarks' && <QuestionFeedView />}
      </main>

      <footer className="border-t border-slate-800 bg-[#0A0C0E] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 StackOverflow Campus — University Technical Knowledge Network</p>
          <p className="font-mono text-[11px] text-slate-400">
            Fuzzy In-Browser Search • Peer Reputation System • Local Storage Persistence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
