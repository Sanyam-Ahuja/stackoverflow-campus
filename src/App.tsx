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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8">
        {(activeView === 'feed' || activeView === 'bookmarks') && <QuestionFeedView />}
        {activeView === 'question_detail' && <QuestionDetailView />}
        {activeView === 'ask' && <AskQuestionView />}
        {activeView === 'tags' && <TagsExplorerView />}
        {activeView === 'leaderboard' && <LeaderboardView />}
      </main>
      {/* chalk tray */}
      <footer className="border-t-[10px] border-frame bg-board-dark">
        <div className="max-w-[960px] mx-auto px-4 py-4 text-[13px] text-dust flex flex-col sm:flex-row justify-between gap-1">
          <span>Campus Overflow · course Q&amp;A written by students, for students</span>
          <span>Search, votes and answers run in your browser</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
