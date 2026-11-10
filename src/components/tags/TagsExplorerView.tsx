import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';

/** Topics written across the board, sized by how often they come up. */
export const TagsExplorerView: React.FC = () => {
  const { questions, setSelectedTag, setActiveView } = useCampusOverflowStore();
  const [q, setQ] = useState('');
  const counts: Record<string, number> = {};
  questions.forEach((x) => x.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  const all = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = all[0]?.[1] || 1;
  const shown = all.filter(([t]) => t.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <h1 className="hand font-extrabold text-[34px] md:text-[42px] leading-none">Topics</h1>
        <input className="slate-in max-w-[280px]" value={q} onChange={(e) => setQ(e.target.value)} placeholder="filter topics" aria-label="Filter topics" />
      </div>
      {shown.length === 0 && <p className="text-dust py-10">No topic like “{q}”.</p>}
      <div className="flex flex-wrap items-baseline gap-x-7 gap-y-4">
        {shown.map(([t, n], i) => (
          <button key={t} onClick={() => { setSelectedTag(t); setActiveView('feed'); }}
            className={`hand font-bold leading-none hover:text-ychalk ${i % 3 === 0 ? 'text-bchalk' : i % 3 === 1 ? 'text-chalk' : 'text-dust'}`}
            style={{ fontSize: `${16 + (n / max) * 26}px`, transform: `rotate(${((i * 37) % 7) - 3}deg)` }}
            title={`${n} question${n === 1 ? '' : 's'}`}>
            #{t}<sup className="text-[12px] ml-0.5 text-dust">{n}</sup>
          </button>
        ))}
      </div>
    </div>
  );
};
