import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { COURSES } from '../../data/courses';
import { Search } from 'lucide-react';

type View = ReturnType<typeof useCampusOverflowStore.getState>['activeView'];

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, searchQuery, setSearchQuery, currentUser, resetDemoData, questions, selectedCourse, setSelectedCourse, setSelectedTag } = useCampusOverflowStore();
  const [confirm, setConfirm] = useState(false);
  const saved = questions.filter((q) => q.isBookmarked).length;
  const links: { id: View; label: string }[] = [
    { id: 'feed', label: 'Questions' },
    { id: 'tags', label: 'Topics' },
    { id: 'leaderboard', label: 'Solvers' },
    { id: 'bookmarks', label: `Saved${saved ? ` (${saved})` : ''}` },
  ];
  const isFeedish = activeView === 'feed' || activeView === 'question_detail';

  return (
    <header className="w-full max-w-[960px] mx-auto px-4 pt-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button onClick={() => { setSearchQuery(''); setSelectedCourse('all'); setSelectedTag('all'); setActiveView('feed'); }} className="hand font-extrabold text-[30px] leading-none -rotate-2">
          campus<span className="text-ychalk">overflow</span>
        </button>
        <label className="relative flex-1 min-w-[220px] order-3 sm:order-none w-full sm:w-auto">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-dust" />
          <input className="slate-in !pl-10" value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); if (activeView !== 'feed') setActiveView('feed'); }}
            placeholder="fork, deadlock, B-tree, CS 401…" aria-label="Search questions" />
        </label>
        <button className="chalkbtn ml-auto sm:ml-0" onClick={() => setActiveView('ask')}>Ask the board</button>
      </div>

      <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mt-6" aria-label="Sections">
        {links.map((l) => {
          const on = l.id === activeView || (l.id === 'feed' && activeView === 'question_detail');
          return (
            <button key={l.id} onClick={() => setActiveView(l.id)} aria-current={on ? 'page' : undefined}
              className={`hand font-bold text-[19px] ${on ? 'text-ychalk underline decoration-[3px] decoration-wavy underline-offset-[6px]' : 'text-dust hover:text-chalk'}`}>
              {l.label}
            </button>
          );
        })}
        <span className="ml-auto text-[13px] text-dust flex items-center gap-3">
          <span>{currentUser.name} · <b className="hand text-chalk text-[15px]">{currentUser.reputation.toLocaleString()}</b> karma</span>
          {confirm ? (
            <span className="flex gap-2"><button className="text-ychalk underline" onClick={() => { resetDemoData(); setConfirm(false); }}>wipe board</button><button className="underline" onClick={() => setConfirm(false)}>keep</button></span>
          ) : (
            <button className="underline underline-offset-4 hover:text-chalk" onClick={() => setConfirm(true)}>reset</button>
          )}
        </span>
      </nav>

      {isFeedish && (
        <div className="flex gap-2 overflow-x-auto mt-4 pb-1" aria-label="Courses">
          {[{ code: 'all', name: 'Every course' }, ...COURSES].map((c) => {
            const on = selectedCourse === c.code;
            return (
              <button key={c.code} onClick={() => { setSelectedCourse(c.code); setActiveView('feed'); }} title={c.name}
                className={`shrink-0 px-3 py-1 text-[14px] rounded-md whitespace-nowrap ${on ? 'bg-chalk text-board-dark font-medium' : 'text-dust border border-chalk/20 hover:border-chalk/60'}`}>
                {c.code === 'all' ? c.name : `${c.code} · ${c.name}`}
              </button>
            );
          })}
        </div>
      )}
      <div className="chalkline mt-5" />
    </header>
  );
};
