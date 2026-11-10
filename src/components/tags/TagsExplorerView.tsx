import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { Tag, Search, ArrowRight } from 'lucide-react';

export const TagsExplorerView: React.FC = () => {
  const { questions, setSelectedTag, setActiveView } = useCampusOverflowStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique tags and count frequencies
  const tagCounts: Record<string, number> = {};
  questions.forEach((q) => {
    q.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  const filteredTags = sortedTags.filter((t) =>
    t.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setActiveView('feed');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase font-semibold">
              Taxonomy Index
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {sortedTags.length} Technical Tags Indexed
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-2">Course Topic Tags</h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Explore programming topics, system libraries, algorithms, and course problem sets by keyword tags.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredTags.map(({ tag, count }) => (
          <div
            key={tag}
            onClick={() => handleSelectTag(tag)}
            className="p-3.5 rounded-xl bg-[#14161D] border border-slate-800 hover:border-orange-500/60 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-orange-400 transition-colors">
                #{tag}
              </span>
              <p className="text-[10px] text-slate-500 mt-1">
                {count} question{count === 1 ? '' : 's'}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-end text-slate-500 group-hover:text-orange-400">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
