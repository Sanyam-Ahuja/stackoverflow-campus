import React from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { 
  Flame, 
  MessageSquare, 
  Sparkles, 
  Award, 
  HelpCircle, 
  ExternalLink,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

export const ForumRightSidebar: React.FC = () => {
  const { contributors, setSelectedQuestionId, setActiveView, questions } = useCampusOverflowStore();

  const topContributors = [...contributors].sort((a, b) => b.reputation - a.reputation).slice(0, 4);
  const trendingQuestions = [...questions].sort((a, b) => b.votes - a.votes).slice(0, 3);

  return (
    <aside className="w-80 flex-shrink-0 hidden xl:block space-y-4 select-none text-xs">
      {/* Campus Overflow Notice Widget (Yellow/Orange Sticky Style like Real StackOverflow) */}
      <div className="bg-[#24221c] border border-[#4d3d24] rounded-lg overflow-hidden shadow-sm">
        <div className="bg-[#2e291f] px-3.5 py-2 border-b border-[#4d3d24] font-semibold text-amber-200 text-[11px] flex items-center justify-between">
          <span>The Campus Overflow Blog</span>
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="p-3.5 space-y-2.5 text-stone-300">
          <div className="flex items-start space-x-2 cursor-pointer hover:text-white transition-colors">
            <span className="text-[#f48225] font-bold mt-0.5">•</span>
            <p className="leading-snug">
              Midterm Exam Prep: Common pitfalls in Red-Black Tree memory leaks.
            </p>
          </div>
          <div className="flex items-start space-x-2 cursor-pointer hover:text-white transition-colors">
            <span className="text-[#f48225] font-bold mt-0.5">•</span>
            <p className="leading-snug">
              Department GPU cluster (RTX 4090s) is now open for CS 480 deep learning projects.
            </p>
          </div>
        </div>

        <div className="bg-[#2a251b] px-3.5 py-1.5 border-t border-[#4d3d24] text-[10px] font-bold text-amber-400 uppercase tracking-wider">
          Featured on Meta
        </div>
        <div className="p-3.5 space-y-2 text-stone-300">
          <div className="flex items-start space-x-2 cursor-pointer hover:text-white transition-colors">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="leading-snug">
              Community Review: Grading rubric for helpful laboratory debugging answers.
            </p>
          </div>
        </div>
      </div>

      {/* Hot Network Questions Widget */}
      <div className="bg-[#1f2026] border border-[#2e303a] rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center space-x-1.5 text-white font-semibold text-xs pb-1 border-b border-[#2e303a]">
          <Flame className="w-3.5 h-3.5 text-[#f48225]" />
          <span>Hot Campus Questions</span>
        </div>
        <div className="space-y-2.5 pt-1">
          {trendingQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => {
                setSelectedQuestionId(q.id);
                setActiveView('question_detail');
              }}
              className="group cursor-pointer"
            >
              <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-mono">
                <span className="text-[#f48225] font-bold">+{q.votes} votes</span>
                <span>•</span>
                <span>{q.courseCode}</span>
              </div>
              <h5 className="text-slate-300 group-hover:text-[#f48225] transition-colors leading-tight line-clamp-2 mt-0.5">
                {q.title}
              </h5>
            </div>
          ))}
        </div>
      </div>

      {/* Top Solvers Leaderboard Preview */}
      <div className="bg-[#1f2026] border border-[#2e303a] rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-white font-semibold text-xs pb-1 border-b border-[#2e303a]">
          <div className="flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Top Solvers</span>
          </div>
          <button
            onClick={() => setActiveView('leaderboard')}
            className="text-[10px] text-slate-400 hover:text-[#f48225] transition-colors"
          >
            View All →
          </button>
        </div>
        <div className="space-y-2 pt-1">
          {topContributors.map((c, idx) => (
            <div key={c.id} className="flex items-center justify-between text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-4 text-center font-mono text-[10px] text-slate-500">{idx + 1}</span>
                <span className="text-sm">{c.avatar}</span>
                <div>
                  <p className="font-semibold text-xs text-white leading-none">{c.name}</p>
                  <p className="text-[10px] text-slate-500">{c.department}</p>
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#f48225]">
                {c.reputation.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
