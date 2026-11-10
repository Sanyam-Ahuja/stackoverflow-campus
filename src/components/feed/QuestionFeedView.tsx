import React from 'react';
import { useCampusOverflowStore } from '../../store/useCampusOverflowStore';
import { filterQuestions } from '../../engine/search';
import { Face, Tag, Votes } from '../Chalk';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';

const SORTS = [['trending', 'Hot'], ['all', 'Newest'], ['unanswered', 'Needs an answer'], ['solved', 'Solved']] as const;

export const QuestionFeedView: React.FC = () => {
  const { activeView, questions, searchQuery, selectedCourse, selectedTag, feedStatus, setSearchQuery, setSelectedTag, setFeedStatus, setSelectedQuestionId, setActiveView, upvoteQuestion, downvoteQuestion, toggleBookmark } = useCampusOverflowStore();
  const saved = activeView === 'bookmarks';
  const list = filterQuestions(questions, searchQuery, selectedCourse, selectedTag, feedStatus).filter((q) => !saved || q.isBookmarked);
  const open = (id: string) => { setSelectedQuestionId(id); setActiveView('question_detail'); };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <h1 className="hand font-extrabold text-[32px] md:text-[40px] leading-none">
          {saved ? 'Saved for later' : searchQuery ? <>Looking for “{searchQuery}”</> : selectedTag !== 'all' ? <>#{selectedTag}</> : 'On the board'}
        </h1>
        <div className="flex gap-1" role="tablist">
          {SORTS.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={feedStatus === k} onClick={() => setFeedStatus(k)}
              className={`px-2.5 py-1 text-[14px] ${feedStatus === k ? 'chalkbox text-chalk' : 'text-dust hover:text-chalk'}`}>{l}</button>
          ))}
        </div>
      </div>

      {(searchQuery || selectedTag !== 'all') && (
        <button className="ghostbtn !py-1 text-[14px] mb-6" onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}><X size={14} /> rub out filters</button>
      )}

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <p className="hand text-[26px]">{saved ? 'Nothing saved yet.' : 'The board is blank here.'}</p>
          <p className="text-dust mt-2">{saved ? 'Tap the bookmark on any question to keep it.' : 'Nobody has asked this yet. You could be first.'}</p>
          {!saved && <button className="chalkbtn mt-6" onClick={() => setActiveView('ask')}>Ask it</button>}
        </div>
      ) : (
        <ol>
          {list.map((q, i) => (
            <li key={q.id}>
              <article className="flex gap-4 py-6">
                <Votes n={q.votes} up={() => upvoteQuestion(q.id)} down={() => downvoteQuestion(q.id)} label={q.title} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-[13px] text-dust mb-1">
                    <span>{q.courseCode} · {q.courseName}</span>
                    <span>{q.views} views</span>
                  </div>
                  <h2>
                    <button onClick={() => open(q.id)} className="hand font-bold text-[21px] leading-snug text-left hover:text-ychalk">{q.title}</button>
                  </h2>
                  <p className="text-dust mt-1.5 line-clamp-2">{q.body.replace(/[`*]/g, "")}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                    {q.tags.map((t) => <Tag key={t} t={t} onClick={(e) => { e.stopPropagation(); setSelectedTag(t); setActiveView('feed'); }} />)}
                    <span className="ml-auto flex items-center gap-2 text-[13px] text-dust"><Face src={q.authorAvatar} name={q.authorName} size={24} />{q.authorName} · {q.createdAt}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 w-16 shrink-0">
                  <span className={`w-14 h-14 grid place-items-center text-center leading-none ${q.hasAcceptedAnswer ? 'ring-chalk text-ychalk' : q.answers.length === 0 ? 'text-pchalk' : ''}`}>
                    <span><span className="hand font-extrabold text-[22px] block">{q.answers.length}</span><span className="text-[11px]">{q.hasAcceptedAnswer ? 'solved' : q.answers.length === 1 ? 'answer' : 'answers'}</span></span>
                  </span>
                  <button onClick={() => toggleBookmark(q.id)} aria-label={q.isBookmarked ? 'Remove from saved' : 'Save'} className={q.isBookmarked ? 'text-ychalk' : 'text-dust hover:text-chalk'}>
                    {q.isBookmarked ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
                  </button>
                </div>
              </article>
              {i < list.length - 1 && <div className="chalkline opacity-50" />}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
