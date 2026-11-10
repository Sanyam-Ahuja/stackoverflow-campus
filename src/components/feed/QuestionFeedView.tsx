import React from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { filterQuestions } from '../../engine/search';
import { 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  MessageSquare, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  PlusCircle,
  Filter,
  Flame,
  Clock,
  Check
} from 'lucide-react';

const COURSES = [
  'all',
  'CS 401',
  'CS 405',
  'CS 350',
  'CS 301',
  'CS 210',
  'CS 480',
];

export const QuestionFeedView: React.FC = () => {
  const { 
    questions, 
    searchQuery, 
    selectedCourse, 
    selectedTag, 
    feedStatus,
    setSearchQuery,
    setSelectedCourse,
    setSelectedTag,
    setFeedStatus,
    setSelectedQuestionId,
    upvoteQuestion,
    downvoteQuestion,
    toggleBookmark,
    setActiveView 
  } = useCampusOverflowStore();

  const filteredQuestions = filterQuestions(
    questions,
    searchQuery,
    selectedCourse,
    selectedTag,
    feedStatus
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase font-semibold">
              University Knowledge Repository
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {questions.length} Course-Specific Technical Q&As
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-2">Campus Engineering Q&A Feed</h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Browse verified solutions to recurring laboratory assignments, compiler edge-cases, Linux kernel traps, and algorithm proofs.
          </p>
        </div>

        <button
          onClick={() => setActiveView('ask')}
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs shadow-lg shadow-orange-600/20 flex items-center space-x-1.5 self-start md:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Filter and Tab Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Course Filter Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-1">
          {COURSES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCourse(c)}
              className={`px-3 py-1.5 rounded-xl uppercase font-mono font-medium whitespace-nowrap transition-all ${
                selectedCourse === c
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : 'bg-[#16181D] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {c === 'all' ? 'All Courses' : c}
            </button>
          ))}
        </div>

        {/* Status Switcher Tabs */}
        <div className="flex items-center space-x-1 bg-[#16181D] p-1 rounded-xl border border-slate-800 self-end md:self-auto">
          {(['trending', 'all', 'solved', 'unanswered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFeedStatus(st)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors font-medium ${
                feedStatus === st
                  ? 'bg-slate-800 text-orange-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'Newest' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Active Search / Tag Badge */}
      {(searchQuery || selectedTag !== 'all') && (
        <div className="flex items-center space-x-2 text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-400">Filtering by:</span>
          {searchQuery && (
            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono">
              Search: "{searchQuery}"
            </span>
          )}
          {selectedTag !== 'all' && (
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
              Tag: #{selectedTag}
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('all');
            }}
            className="text-slate-500 hover:text-white underline ml-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Question Cards Feed */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-[#14161D] border border-slate-800 rounded-2xl">
            <MessageSquare className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No Matching Questions Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No technical questions matched your current course or search filter. Try clearing filters or submit a new inquiry.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-[#14161D] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all shadow-md flex gap-4"
            >
              {/* Vote & Answers Stats Column */}
              <div className="flex flex-col items-center justify-start space-y-3 w-16 sm:w-20 text-center flex-shrink-0 text-xs font-mono">
                {/* Votes */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => upvoteQuestion(q.id)}
                    className="p-1 hover:text-orange-400 text-slate-500"
                    title="Upvote Question"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-white text-sm">{q.votes}</span>
                  <button
                    onClick={() => downvoteQuestion(q.id)}
                    className="p-1 hover:text-rose-400 text-slate-500"
                    title="Downvote Question"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Answers Badge */}
                <div
                  className={`w-full py-1.5 px-1 rounded-lg border text-center ${
                    q.hasAcceptedAnswer
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-bold'
                      : q.answers.length > 0
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                      : 'border-dashed border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="block font-bold">{q.answers.length}</span>
                  <span className="text-[9px] uppercase block">
                    {q.hasAcceptedAnswer ? 'Solved' : 'Ans'}
                  </span>
                </div>

                {/* Views */}
                <div className="flex items-center space-x-1 text-slate-500 text-[10px]">
                  <Eye className="w-3 h-3" />
                  <span>{q.views}</span>
                </div>
              </div>

              {/* Main Content Column */}
              <div className="flex-1 space-y-2">
                {/* Course badge & Bookmark */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase font-bold">
                    {q.courseCode} • {q.courseName}
                  </span>

                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1 text-slate-500 hover:text-purple-400"
                    title={q.isBookmarked ? 'Remove Bookmark' : 'Save Question'}
                  >
                    {q.isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedQuestionId(q.id)}
                  className="text-base font-bold text-white hover:text-orange-400 cursor-pointer transition-colors leading-snug"
                >
                  {q.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {q.body}
                </p>

                {/* Tags and Author */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {q.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1F26] border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author meta */}
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 flex-shrink-0">
                    <img
                      src={q.authorAvatar}
                      alt={q.authorName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-slate-300 font-sans">{q.authorName}</span>
                    <span className="text-slate-600">•</span>
                    <span>{q.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
