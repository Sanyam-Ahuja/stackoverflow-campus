import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { PlusCircle, HelpCircle, Code2, Tag, BookOpen, Send, ArrowLeft } from 'lucide-react';

const COURSES = [
  { code: 'CS 401', name: 'Operating Systems' },
  { code: 'CS 405', name: 'Compiler Design' },
  { code: 'CS 350', name: 'Computer Networks' },
  { code: 'CS 301', name: 'Algorithms & Complexity' },
  { code: 'CS 210', name: 'Database Systems' },
  { code: 'CS 480', name: 'Machine Learning' },
];

export const AskQuestionView: React.FC = () => {
  const { createQuestion, setActiveView } = useCampusOverflowStore();

  const [title, setTitle] = useState('');
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [body, setBody] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [tagsStr, setTagsStr] = useState('Operating-Systems, C, Linux');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const course = COURSES[selectedCourseIndex];
    const tags = tagsStr.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean);

    createQuestion({
      title: title.trim(),
      body: body.trim(),
      codeSnippet: codeSnippet.trim() || undefined,
      tags: tags.length > 0 ? tags : ['General'],
      courseCode: course.code,
      courseName: course.name,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => setActiveView('feed')}
        className="px-3 py-1.5 rounded-lg bg-[#16181D] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium flex items-center space-x-1.5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Cancel & Return to Feed</span>
      </button>

      {/* Header */}
      <div className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase font-semibold">
            Technical Inquiry
          </span>
          <span className="text-xs text-slate-500 font-mono">Good questions receive answers within 2 hours</span>
        </div>
        <h2 className="text-xl font-bold text-white mt-2">Ask a Technical Question</h2>
        <p className="text-sm text-slate-400 mt-1">
          Be specific. Detail what you tried, the exact error messages or unexpected behaviour, and include minimal reproducible code snippets.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#14161D] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
        {/* Course Association */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">1. Associated Course</label>
          <select
            value={selectedCourseIndex}
            onChange={(e) => setSelectedCourseIndex(Number(e.target.value))}
            className="w-full px-3 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 font-medium"
          >
            {COURSES.map((c, idx) => (
              <option key={c.code} value={idx}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">2. Question Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Why does fork() duplicate open file table entries rather than individual descriptors?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">3. Problem Description & Attempts</label>
          <textarea
            rows={5}
            required
            placeholder="Explain the background, what algorithm or syscall you invoked, and the exact failing behavior..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-white focus:outline-none focus:border-orange-500 text-xs"
          />
        </div>

        {/* Code Snippet */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">4. Reproducible Code Snippet (Optional)</label>
          <textarea
            rows={5}
            placeholder="// Paste minimal C / C++ / Python / Rust snippet here..."
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            className="w-full px-3 py-2 bg-[#0B0C0E] border border-slate-800 rounded-xl text-amber-300 font-mono focus:outline-none focus:border-orange-500 text-xs"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">5. Tags (Comma separated)</label>
          <input
            type="text"
            placeholder="C, Linux, Operating-Systems, IPC"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setActiveView('feed')}
            className="px-4 py-2 text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !body.trim()}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-medium text-xs shadow-md shadow-orange-600/30 flex items-center space-x-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Question</span>
          </button>
        </div>
      </form>
    </div>
  );
};
