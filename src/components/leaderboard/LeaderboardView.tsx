import React from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { Award, Trophy, Star, CheckCircle2, MessageSquare, Flame } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { contributors } = useCampusOverflowStore();

  const sortedContributors = [...contributors].sort((a, b) => b.reputation - a.reputation);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase">
            Campus Recognition
          </span>
          <span className="text-xs text-slate-500 font-mono">Academic Karma & Peer Endorsements</span>
        </div>
        <h2 className="text-xl font-bold text-white mt-2">Technical Reputation Leaderboard</h2>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          Top engineering students contributing verified solutions, debugging memory leaks, and answering course inquiries.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedContributors.slice(0, 3).map((user, idx) => (
          <div
            key={user.id}
            className={`rounded-2xl p-5 border flex flex-col justify-between relative shadow-lg ${
              idx === 0
                ? 'bg-gradient-to-b from-amber-950/20 to-[#14161D] border-amber-500/60 ring-1 ring-amber-500/30'
                : idx === 1
                ? 'bg-slate-900 border-slate-700'
                : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#2D3540]"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{user.name}</h4>
                  <p className="text-xs font-mono text-orange-400">@{user.handle}</p>
                </div>
              </div>

              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                idx === 0
                  ? 'bg-amber-500 text-slate-950'
                  : idx === 1
                  ? 'bg-slate-300 text-slate-950'
                  : 'bg-amber-800 text-amber-200'
              }`}>
                #{idx + 1}
              </div>
            </div>

            <div className="my-4 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0F1115] border border-slate-800">
                <span className="text-slate-400">Reputation:</span>
                <span className="font-bold text-orange-400 text-sm">{user.reputation.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0F1115] border border-slate-800">
                <span className="text-slate-400">Accepted Answers:</span>
                <span className="font-bold text-emerald-400">{user.acceptedCount} solutions</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/80">
              {user.badges.map((b) => (
                <span
                  key={b.title}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center space-x-1 ${
                    b.tier === 'gold'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <span>★</span>
                  <span>{b.title}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono">
          All Ranked Campus Contributors
        </h3>

        <div className="divide-y divide-slate-800 text-xs font-mono">
          {sortedContributors.map((user, idx) => (
            <div key={user.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <span className="text-slate-500 font-bold w-6 text-center">#{idx + 1}</span>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <h5 className="font-bold text-white text-sm font-sans">{user.name}</h5>
                  <span className="text-slate-500 text-[11px]">{user.department}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-500 block">ACCEPTED</span>
                  <span className="text-emerald-400 font-bold">{user.acceptedCount}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">REPUTATION</span>
                  <span className="text-orange-400 font-bold text-sm">{user.reputation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
