import React, { useState } from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { Face, Rich, Tag, Votes } from '../Chalk';
import { ArrowLeft, Bookmark, BookmarkCheck, Check } from 'lucide-react';

export const QuestionDetailView: React.FC = () => {
  const { questions, selectedQuestionId, setActiveView, setSelectedTag, upvoteQuestion, downvoteQuestion, upvoteAnswer, downvoteAnswer, acceptAnswer, addAnswer, toggleBookmark } = useCampusOverflowStore();
  const [text, setText] = useState('');
  const [code, setCode] = useState('');
  const q = questions.find((x) => x.id === selectedQuestionId) || questions[0];

  if (!q) return (
    <div className="py-20 text-center">
      <p className="hand text-[26px]">That question was rubbed off the board.</p>
      <button className="ghostbtn mt-4" onClick={() => setActiveView('feed')}>Back to questions</button>
    </div>
  );

  const answers = [...q.answers].sort((a, b) => Number(b.isAccepted) - Number(a.isAccepted) || b.votes - a.votes);
  const post = (e: React.FormEvent) => { e.preventDefault(); if (!text.trim()) return; addAnswer(q.id, text.trim(), code.trim() || undefined); setText(''); setCode(''); };

  return (
    <div>
      <button onClick={() => setActiveView('feed')} className="flex items-center gap-1.5 text-dust hover:text-chalk text-[14px] mb-6"><ArrowLeft size={16} /> all questions</button>

      <div className="text-[13px] text-dust mb-2">{q.courseCode} · {q.courseName} · {q.views} views · asked {q.createdAt}</div>
      <h1 className="hand font-extrabold text-[30px] md:text-[38px] leading-[1.15]">{q.title}</h1>

      <article className="flex gap-4 mt-6">
        <div className="flex flex-col items-center gap-3">
          <Votes n={q.votes} up={() => upvoteQuestion(q.id)} down={() => downvoteQuestion(q.id)} label="question" />
          <button onClick={() => toggleBookmark(q.id)} aria-label={q.isBookmarked ? 'Remove from saved' : 'Save'} className={q.isBookmarked ? 'text-ychalk' : 'text-dust hover:text-chalk'}>
            {q.isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] leading-[1.7] whitespace-pre-wrap max-w-[70ch]"><Rich text={q.body} /></p>
          {q.codeSnippet && <pre className="code mt-4">{q.codeSnippet}</pre>}
          <div className="flex flex-wrap items-center gap-4 mt-5">
            {q.tags.map((t) => <Tag key={t} t={t} onClick={() => { setSelectedTag(t); setActiveView('feed'); }} />)}
            <span className="ml-auto flex items-center gap-2 text-[14px]"><Face src={q.authorAvatar} name={q.authorName} />{q.authorName}</span>
          </div>
        </div>
      </article>

      <div className="chalkline my-10" />
      <h2 className="hand font-bold text-[24px] mb-2">{q.answers.length === 0 ? 'No answers yet' : `${q.answers.length} answer${q.answers.length === 1 ? '' : 's'}`}</h2>
      {q.answers.length === 0 && <p className="text-pchalk">Still open. If you know it, write it up below.</p>}

      <ol className="space-y-6 mt-4">
        {answers.map((a) => (
          <li key={a.id} className={`flex gap-4 p-4 md:p-5 ${a.isAccepted ? 'chalkbox-y' : ''}`}>
            <div className="flex flex-col items-center gap-2">
              <Votes n={a.votes} up={() => upvoteAnswer(q.id, a.id)} down={() => downvoteAnswer(q.id, a.id)} label="answer" />
              {a.isAccepted ? (
                <span className="text-ychalk" title="Accepted"><Check size={26} strokeWidth={3} /></span>
              ) : (
                <button onClick={() => acceptAnswer(q.id, a.id)} title="Accept this answer" aria-label="Accept this answer" className="text-dust/60 hover:text-ychalk"><Check size={24} strokeWidth={2.5} /></button>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {a.isAccepted && <p className="hand font-bold text-ychalk text-[15px] mb-1">accepted by the asker</p>}
              <p className="text-[16.5px] leading-[1.7] whitespace-pre-wrap max-w-[70ch]"><Rich text={a.body} /></p>
              {a.codeSnippet && <pre className="code mt-4">{a.codeSnippet}</pre>}
              <div className="flex items-center gap-2 mt-4 text-[14px] text-dust"><Face src={a.authorAvatar} name={a.authorName} size={26} />{a.authorName} · {a.createdAt}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="chalkline my-10" />
      <form onSubmit={post} className="space-y-4">
        <h2 className="hand font-bold text-[24px]">Your answer</h2>
        <textarea rows={5} className="slate-in" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why does it happen, and what fixes it?" aria-label="Answer" />
        <textarea rows={4} className="slate-in font-mono text-[14px]" value={code} onChange={(e) => setCode(e.target.value)} placeholder="// code that works (optional)" aria-label="Code" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-[13px] text-dust">Answering earns you 10 karma.</span>
          <button className="chalkbtn" disabled={!text.trim()}>Post answer</button>
        </div>
      </form>
    </div>
  );
};
