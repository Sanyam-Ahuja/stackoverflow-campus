import { describe, it, expect } from 'vitest';
import { createFuseSearchIndex, filterQuestions, computeUserReputation } from './search';
import { Question } from '../types';

describe('StackOverflow Campus Search & Reputation Engine', () => {
  const dummyQuestions: Question[] = [
    {
      id: 'q-test-1',
      title: 'Why does pipe() hang indefinitely on read() in C?',
      body: 'Child process exits but parent blocks on read descriptor',
      codeSnippet: 'pipe(fd);',
      tags: ['C', 'Linux', 'IPC'],
      courseCode: 'CS 401',
      courseName: 'Operating Systems',
      authorName: 'Alice',
      authorHandle: 'alice',
      authorAvatar: '',
      votes: 10,
      views: 100,
      hasAcceptedAnswer: true,
      createdAt: '2026-02-01',
      answers: [
        {
          id: 'ans-1',
          authorName: 'Bob',
          authorHandle: 'bob',
          authorAvatar: '',
          body: 'Close write end in parent',
          votes: 15,
          isAccepted: true,
          createdAt: '2026-02-01',
        },
      ],
    },
    {
      id: 'q-test-2',
      title: 'How to eliminate left recursion in LL(1) grammar?',
      body: 'Expression grammar produces infinite loop in recursive descent parser',
      tags: ['Compilers', 'Grammars'],
      courseCode: 'CS 405',
      courseName: 'Compiler Design',
      authorName: 'Charlie',
      authorHandle: 'charlie',
      authorAvatar: '',
      votes: 5,
      views: 50,
      hasAcceptedAnswer: false,
      createdAt: '2026-02-02',
      answers: [],
    },
  ];

  it('performs fuzzy search across titles and tags', () => {
    const results = filterQuestions(dummyQuestions, 'pipe hang', 'all', 'all', 'all');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('q-test-1');
  });

  it('filters questions by academic course code', () => {
    const cs405 = filterQuestions(dummyQuestions, '', 'CS 405', 'all', 'all');
    expect(cs405.length).toBe(1);
    expect(cs405[0].id).toBe('q-test-2');
  });

  it('filters questions by status (unanswered vs solved)', () => {
    const unanswered = filterQuestions(dummyQuestions, '', 'all', 'all', 'unanswered');
    expect(unanswered.length).toBe(1);
    expect(unanswered[0].id).toBe('q-test-2');

    const solved = filterQuestions(dummyQuestions, '', 'all', 'all', 'solved');
    expect(solved.length).toBe(1);
    expect(solved[0].id).toBe('q-test-1');
  });

  it('computes peer reputation accurately from votes and accepted solutions', () => {
    // Bob has 1 answer with 15 votes + accepted answer (15 pts) -> 100 base + 15*10 + 15 = 265
    const bobKarma = computeUserReputation(dummyQuestions, 'bob');
    expect(bobKarma).toBe(100 + 150 + 15);

    // Alice has 1 question with 10 votes -> 100 base + 10*5 = 150
    const aliceKarma = computeUserReputation(dummyQuestions, 'alice');
    expect(aliceKarma).toBe(100 + 50);
  });
});
