import Fuse from 'fuse.js';
import { Question } from '../types';

/**
 * Builds a Fuse.js fuzzy search index across campus questions
 */
export function createFuseSearchIndex(questions: Question[]): Fuse<Question> {
  const options = {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'tags', weight: 0.25 },
      { name: 'courseCode', weight: 0.15 },
      { name: 'body', weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  };

  return new Fuse(questions, options);
}

/**
 * Filter questions based on search query, tag, course, and tab status
 */
export function filterQuestions(
  questions: Question[],
  query: string,
  selectedCourse: string,
  selectedTag: string,
  status: 'all' | 'unanswered' | 'solved' | 'trending'
): Question[] {
  let result = [...questions];

  // 1. Text Search
  if (query.trim().length > 0) {
    const fuse = createFuseSearchIndex(questions);
    result = fuse.search(query).map((res) => res.item);
  }

  // 2. Course Filter
  if (selectedCourse !== 'all') {
    result = result.filter((q) => q.courseCode.toLowerCase() === selectedCourse.toLowerCase());
  }

  // 3. Tag Filter
  if (selectedTag !== 'all') {
    result = result.filter((q) => q.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));
  }

  // 4. Status Filter
  if (status === 'unanswered') {
    result = result.filter((q) => q.answers.length === 0);
  } else if (status === 'solved') {
    result = result.filter((q) => q.hasAcceptedAnswer);
  } else if (status === 'trending') {
    result = result.sort((a, b) => b.votes + b.views - (a.votes + a.views));
  } else {
    // default: newest
    result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return result;
}

/**
 * Computes contributor reputation score based on Q&A performance
 */
export function computeUserReputation(
  questions: Question[],
  userHandle: string
): number {
  let score = 100; // Base starting karma

  for (const q of questions) {
    if (q.authorHandle === userHandle) {
      score += Math.max(0, q.votes * 5);
    }
    for (const a of q.answers) {
      if (a.authorHandle === userHandle) {
        score += Math.max(0, a.votes * 10);
        if (a.isAccepted) {
          score += 15;
        }
      }
    }
  }

  return score;
}
