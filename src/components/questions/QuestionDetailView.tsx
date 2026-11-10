import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  Check, 
  Eye, 
  Clock, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Send,
  Code2,
  Award,
  Sparkles
} from 'lucide-react';

export const QuestionDetailView: React.FC = () => {
  const { 
    questions, 
    selectedQuestionId, 
    setActiveView, 
    upvoteQuestion, 
    downvoteQuestion, 
    upvoteAnswer, 
    downvoteAnswer, 
    acceptAnswer, 
    addAnswer, 
    toggleBookmark 
  } = useCampusOverflowStore();

  const [newAnswerText, setNewAnswerText] = useState('');
  const [newAnswerCode, setNewAnswerCode] = useState('');

  const question = questions.find((q) => q.id === selectedQuestionId) || questions[0];

  if (!question) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Question not found.</p>
        <button onClick={() => setActiveView('feed')} className="mt-3 text-orange-400 underline">
          Return to Feed
        </button>
      </div>
    );
  }

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;

    addAnswer(question.id, newAnswerText.trim(), newAnswerCode.trim() || undefined);
    setNewAnswerText('');
    setNewAnswerCode('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => setActiveView('feed')}
        className="px-3 py-1.5 rounded-lg bg-[#16181D] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium flex items-center space-x-1.5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Questions</span>
      </button>

      {/* Main Question Post */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase font-bold">
              {question.courseCode} • {question.courseName}
            </span>
            <h1 className="text-xl font-bold text-white mt-2 leading-snug">
              {question.title}
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 flex-shrink-0">
            <div className="flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{question.views} views</span>
            </div>
            <button
              onClick={() => toggleBookmark(question.id)}
              className="p-1 hover:text-purple-400 text-slate-400"
            >
              {question.isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-purple-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Voting & Body Grid */}
        <div className="flex gap-4">
          {/* Vote Controls */}
          <div className="flex flex-col items-center space-y-1 w-10 text-center flex-shrink-0 text-slate-400">
            <button
              onClick={() => upvoteQuestion(question.id)}
              className="p-1 hover:text-orange-400"
              title="This question shows research effort"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <span className="font-bold text-lg font-mono text-white">{question.votes}</span>
            <button
              onClick={() => downvoteQuestion(question.id)}
              className="p-1 hover:text-rose-400"
              title="This question does not show research effort"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* Question Text & Code */}
          <div className="flex-1 space-y-4 text-xs">
            <p className="text-slate-200 leading-relaxed text-sm whitespace-pre-line">
              {question.body}
            </p>

            {question.codeSnippet && (
              <div className="bg-[#0B0C0E] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto text-amber-300">
                <pre>{question.codeSnippet}</pre>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C1F26] border border-slate-800 text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Footer */}
            <div className="flex justify-end pt-4 border-t border-slate-800/80">
              <div className="p-2.5 rounded-xl bg-[#16181D] border border-slate-800 flex items-center space-x-3 text-xs font-mono">
                <img
                  src={question.authorAvatar}
                  alt={question.authorName}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div>
                  <span className="text-[10px] text-slate-500 block">Asked {question.createdAt}</span>
                  <span className="text-white font-bold">{question.authorName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <span>{question.answers.length} Community Answers</span>
          {question.hasAcceptedAnswer && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Solution</span>
            </span>
          )}
        </h3>

        {question.answers.map((ans) => (
          <div
            key={ans.id}
            className={`rounded-2xl p-6 transition-all border ${
              ans.isAccepted
                ? 'bg-gradient-to-br from-emerald-950/20 to-[#14161D] border-emerald-500/80 ring-1 ring-emerald-500/30 shadow-xl'
                : 'bg-[#14161D] border-slate-800'
            }`}
          >
            <div className="flex gap-4">
              {/* Vote Controls & Accept Button */}
              <div className="flex flex-col items-center space-y-1 w-10 text-center flex-shrink-0 text-slate-400">
                <button
                  onClick={() => upvoteAnswer(question.id, ans.id)}
                  className="p-1 hover:text-orange-400"
                  title="Answer is clear and helpful"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
                <span className="font-bold text-lg font-mono text-white">{ans.votes}</span>
                <button
                  onClick={() => downvoteAnswer(question.id, ans.id)}
                  className="p-1 hover:text-rose-400"
                  title="Answer is unclear or inaccurate"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>

                {ans.isAccepted ? (
                  <div className="p-1 text-emerald-400 mt-2" title="Accepted Solution">
                    <CheckCircle2 className="w-6 h-6 fill-emerald-500/20" />
                  </div>
                ) : (
                  <button
                    onClick={() => acceptAnswer(question.id, ans.id)}
                    className="p-1 text-slate-600 hover:text-emerald-400 mt-2"
                    title="Mark this answer as accepted"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Answer Content */}
              <div className="flex-1 space-y-4 text-xs">
                {ans.isAccepted && (
                  <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accepted Solution by Question Author</span>
                  </div>
                )}

                <p className="text-slate-200 leading-relaxed text-sm whitespace-pre-line">
                  {ans.body}
                </p>

                {ans.codeSnippet && (
                  <div className="bg-[#0B0C0E] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto text-emerald-300">
                    <pre>{ans.codeSnippet}</pre>
                  </div>
                )}

                {/* Author Info */}
                <div className="flex justify-end pt-3 border-t border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-[#16181D] border border-slate-800 flex items-center space-x-3 text-xs font-mono">
                    <img
                      src={ans.authorAvatar}
                      alt={ans.authorName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Answered {ans.createdAt}</span>
                      <span className="text-white font-bold">{ans.authorName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Editor Form */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-orange-400" />
          <span>Contribute an Answer</span>
        </h3>

        <form onSubmit={handlePostAnswer} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Explanation & Architectural Rationale</label>
            <textarea
              rows={4}
              required
              placeholder="Detail the technical reason for the issue and explain the correct solution..."
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              className="w-full px-3 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Code Solution (Optional)</label>
            <textarea
              rows={4}
              placeholder="// Paste working code snippet here..."
              value={newAnswerCode}
              onChange={(e) => setNewAnswerCode(e.target.value)}
              className="w-full px-3 py-2 bg-[#0B0C0E] border border-slate-800 rounded-xl text-emerald-300 font-mono focus:outline-none focus:border-orange-500 text-xs"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newAnswerText.trim()}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-medium text-xs shadow-md shadow-orange-600/30 flex items-center space-x-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Your Answer (+10 Karma)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
