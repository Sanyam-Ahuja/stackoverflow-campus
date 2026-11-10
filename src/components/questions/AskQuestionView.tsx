import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { COURSES } from '../../data/courses';

export const AskQuestionView: React.FC = () => {
  const { createQuestion, setActiveView } = useCampusOverflowStore();
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState(0);
  const [body, setBody] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('C, Linux');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const c = COURSES[course];
    const t = tags.split(',').map((x) => x.trim().replace(/^#/, '')).filter(Boolean);
    createQuestion({ title: title.trim(), body: body.trim(), codeSnippet: code.trim() || undefined, tags: t.length ? t : ['General'], courseCode: c.code, courseName: c.name });
  };

  return (
    <form onSubmit={submit} className="max-w-[720px]">
      <h1 className="hand font-extrabold text-[34px] md:text-[42px] leading-none">Ask the board</h1>
      <p className="text-dust mt-3 mb-8">Say what you tried and what happened instead. Paste the smallest bit of code that shows it.</p>

      <fieldset className="mb-6">
        <legend className="hand font-bold text-[18px] mb-2">Which course?</legend>
        <div className="flex flex-wrap gap-2">
          {COURSES.map((c, i) => (
            <button type="button" key={c.code} onClick={() => setCourse(i)} aria-pressed={course === i}
              className={`px-3 py-1.5 text-[14px] rounded-md ${course === i ? 'bg-chalk text-board-dark font-medium' : 'border border-chalk/25 text-dust hover:border-chalk/60'}`}>
              {c.code} · {c.name}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block mb-6"><span className="hand font-bold text-[18px] block mb-2">Your question in one line</span>
        <input className="slate-in" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Why does fork() share the open file table entry?" />
      </label>
      <label className="block mb-6"><span className="hand font-bold text-[18px] block mb-2">Details</span>
        <textarea rows={6} className="slate-in" value={body} onChange={(e) => setBody(e.target.value)} placeholder="What you ran, what you expected, what you got" />
      </label>
      <label className="block mb-6"><span className="hand font-bold text-[18px] block mb-2">Code <span className="text-dust font-normal text-[14px]">(optional)</span></span>
        <textarea rows={5} className="slate-in font-mono text-[14px]" value={code} onChange={(e) => setCode(e.target.value)} placeholder="// minimal example" />
      </label>
      <label className="block mb-8"><span className="hand font-bold text-[18px] block mb-2">Topics <span className="text-dust font-normal text-[14px]">comma separated</span></span>
        <input className="slate-in" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <div className="flex items-center justify-end gap-3">
        {(!title.trim() || !body.trim()) && <span className="text-[13px] text-dust mr-auto">Needs a one-liner and details.</span>}
        <button type="button" className="ghostbtn" onClick={() => setActiveView('feed')}>Never mind</button>
        <button className="chalkbtn" disabled={!title.trim() || !body.trim()}>Put it on the board</button>
      </div>
    </form>
  );
};
