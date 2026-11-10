import { create } from 'zustand';
import { Question, Answer, ContributorProfile } from '../types';
import { SEED_QUESTIONS, SEED_CONTRIBUTORS } from '../data/seedQuestions';

const STORAGE_KEY = 'campusoverflow_state_v1';

interface CampusOverflowState {
  activeView: 'feed' | 'question_detail' | 'ask' | 'tags' | 'leaderboard' | 'bookmarks';
  setActiveView: (view: CampusOverflowState['activeView']) => void;

  questions: Question[];
  contributors: ContributorProfile[];
  selectedQuestionId: string | null;

  searchQuery: string;
  selectedCourse: string;
  selectedTag: string;
  feedStatus: 'all' | 'unanswered' | 'solved' | 'trending';

  currentUser: {
    name: string;
    handle: string;
    avatar: string;
    reputation: number;
  };

  // Actions
  setSelectedQuestionId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCourse: (course: string) => void;
  setSelectedTag: (tag: string) => void;
  setFeedStatus: (status: CampusOverflowState['feedStatus']) => void;

  upvoteQuestion: (id: string) => void;
  downvoteQuestion: (id: string) => void;
  upvoteAnswer: (questionId: string, answerId: string) => void;
  downvoteAnswer: (questionId: string, answerId: string) => void;
  acceptAnswer: (questionId: string, answerId: string) => void;

  addAnswer: (questionId: string, body: string, codeSnippet?: string) => void;
  createQuestion: (newQ: {
    title: string;
    body: string;
    codeSnippet?: string;
    tags: string[];
    courseCode: string;
    courseName: string;
  }) => void;
  toggleBookmark: (questionId: string) => void;

  resetDemoData: () => void;
}

function loadPersistedState(): { questions: Question[]; contributors: ContributorProfile[] } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load CampusOverflow state', e);
  }
  return null;
}

function saveState(state: { questions: Question[]; contributors: ContributorProfile[] }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save CampusOverflow state', e);
  }
}

const initialLoaded = loadPersistedState() || {
  questions: SEED_QUESTIONS,
  contributors: SEED_CONTRIBUTORS,
};

export const useCampusOverflowStore = create<CampusOverflowState>((set, get) => ({
  activeView: 'feed',
  setActiveView: (view) => set({ activeView: view }),

  questions: initialLoaded.questions,
  contributors: initialLoaded.contributors,
  selectedQuestionId: initialLoaded.questions[0]?.id || null,

  searchQuery: '',
  selectedCourse: 'all',
  selectedTag: 'all',
  feedStatus: 'trending',

  currentUser: {
    name: 'Devansh Verma',
    handle: 'devansh_v',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    reputation: 680,
  },

  setSelectedQuestionId: (id) => set({ selectedQuestionId: id, activeView: 'question_detail' }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setFeedStatus: (status) => set({ feedStatus: status }),

  upvoteQuestion: (id) => {
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id === id) return { ...q, votes: q.votes + 1 };
        return q;
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  downvoteQuestion: (id) => {
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id === id) return { ...q, votes: Math.max(0, q.votes - 1) };
        return q;
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  upvoteAnswer: (questionId, answerId) => {
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id !== questionId) return q;
        const answers = q.answers.map((a) => {
          if (a.id === answerId) return { ...a, votes: a.votes + 1 };
          return a;
        });
        return { ...q, answers };
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  downvoteAnswer: (questionId, answerId) => {
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id !== questionId) return q;
        const answers = q.answers.map((a) => {
          if (a.id === answerId) return { ...a, votes: Math.max(0, a.votes - 1) };
          return a;
        });
        return { ...q, answers };
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  acceptAnswer: (questionId, answerId) => {
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id !== questionId) return q;
        const answers = q.answers.map((a) => ({
          ...a,
          isAccepted: a.id === answerId,
        }));
        return {
          ...q,
          answers,
          hasAcceptedAnswer: true,
        };
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  addAnswer: (questionId, body, codeSnippet) => {
    const { currentUser } = get();
    const newAns: Answer = {
      id: `ans-${Date.now()}`,
      authorName: currentUser.name,
      authorHandle: currentUser.handle,
      authorAvatar: currentUser.avatar,
      body,
      codeSnippet,
      votes: 1,
      isAccepted: false,
      createdAt: 'Just now',
    };

    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answers: [...q.answers, newAns],
        };
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  createQuestion: (newQ) => {
    const { currentUser } = get();
    const question: Question = {
      ...newQ,
      id: `q-${Date.now()}`,
      authorName: currentUser.name,
      authorHandle: currentUser.handle,
      authorAvatar: currentUser.avatar,
      votes: 1,
      views: 12,
      answers: [],
      hasAcceptedAnswer: false,
      createdAt: 'Just now',
    };

    set((state) => {
      const questions = [question, ...state.questions];
      saveState({ questions, contributors: state.contributors });
      return {
        questions,
        selectedQuestionId: question.id,
        activeView: 'question_detail',
      };
    });
  },

  toggleBookmark: (questionId) => {
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, isBookmarked: !q.isBookmarked };
        }
        return q;
      });
      saveState({ questions, contributors: state.contributors });
      return { questions };
    });
  },

  resetDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      questions: SEED_QUESTIONS,
      contributors: SEED_CONTRIBUTORS,
      selectedQuestionId: SEED_QUESTIONS[0].id,
      searchQuery: '',
      selectedCourse: 'all',
      selectedTag: 'all',
      feedStatus: 'trending',
      activeView: 'feed',
    });
  },
}));
