import React from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { Face } from '../Chalk';

export const LeaderboardView: React.FC = () => {
  const { contributors } = useCampusOverflowStore();
  const list = [...contributors].sort((a, b) => b.reputation - a.reputation);
  const max = list[0]?.reputation || 1;

  return (
    <div>
      <h1 className="hand font-extrabold text-[34px] md:text-[42px] leading-none">Who’s been helping</h1>
      <p className="text-dust mt-3 mb-10 max-w-[60ch]">Karma comes from upvotes and accepted answers. The bar is each person’s karma against the top solver.</p>
      <ol className="space-y-5">
        {list.map((u, i) => (
          <li key={u.id} className="grid grid-cols-[36px_auto_1fr] md:grid-cols-[36px_auto_1fr_1.2fr] items-center gap-x-4 gap-y-2">
            <span className={`hand font-extrabold text-[26px] ${i === 0 ? 'text-ychalk' : 'text-dust'}`}>{i + 1}</span>
            <Face src={u.avatar} name={u.name} size={44} />
            <div className="min-w-0">
              <div className="hand font-bold text-[19px] truncate">{u.name}</div>
              <div className="text-[13px] text-dust truncate">{u.department} · {u.answersCount} answers, {u.acceptedCount} accepted</div>
              {u.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {u.badges.map((b) => (
                    <span key={b.title} className={`text-[12px] inline-flex items-center gap-1 before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-current ${b.tier === 'gold' ? 'text-ychalk' : b.tier === 'silver' ? 'text-chalk' : 'text-pchalk'}`}>{b.title}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-3 md:col-span-1 flex items-center gap-3">
              <span className="h-3 rounded-full bg-chalk/80" style={{ width: `${(u.reputation / max) * 100}%`, opacity: 0.35 + (u.reputation / max) * 0.6 }} />
              <span className="hand font-bold text-[17px] shrink-0">{u.reputation.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
