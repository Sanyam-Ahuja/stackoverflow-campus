import React from 'react';

export const Face: React.FC<{ src?: string; name: string; size?: number }> = ({ src, name, size = 32 }) => (
  <span className="relative inline-grid place-items-center rounded-full overflow-hidden shrink-0 border-2 border-chalk/50 bg-board-light text-[11px] hand" style={{ width: size, height: size }}>
    <span aria-hidden>{name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>
    {src && src.startsWith('http') && <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-90" onError={(e) => (e.currentTarget.style.display = 'none')} />}
  </span>
);

/** Votes written as a number with chalk arrows either side. */
export const Votes: React.FC<{ n: number; up: () => void; down: () => void; label: string }> = ({ n, up, down, label }) => (
  <div className="flex flex-col items-center w-12 shrink-0" aria-label={`${n} votes`}>
    <button onClick={up} aria-label={`Upvote ${label}`} className="p-1 text-dust hover:text-ychalk">
      <svg width="22" height="14" viewBox="0 0 22 14"><path d="M2 12 L11 3 L20 12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    <span className={`hand font-extrabold text-[24px] leading-none ${n < 0 ? 'text-pchalk' : ''}`}>{n}</span>
    <button onClick={down} aria-label={`Downvote ${label}`} className="p-1 text-dust hover:text-pchalk">
      <svg width="22" height="14" viewBox="0 0 22 14"><path d="M2 2 L11 11 L20 2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  </div>
);

export const Tag: React.FC<{ t: string; onClick?: (e: React.MouseEvent) => void }> = ({ t, onClick }) => (
  <button onClick={onClick} className="text-bchalk text-[14px] hover:underline decoration-wavy underline-offset-4">#{t}</button>
);

/** Renders the two bits of markdown people actually type here: `code` and **bold**. */
export const Rich: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith('`') && part.endsWith('`') && part.length > 2 ? <code key={i} className="font-mono text-[0.88em] bg-board-dark px-1.5 py-0.5 rounded text-bchalk">{part.slice(1, -1)}</code>
      : part.startsWith('**') && part.endsWith('**') && part.length > 4 ? <strong key={i} className="font-semibold text-ychalk/95">{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>)}
  </>
);
