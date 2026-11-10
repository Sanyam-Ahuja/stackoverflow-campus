export type CourseCategory = 
  | 'OS' 
  | 'Compilers' 
  | 'Networks' 
  | 'DBMS' 
  | 'DSA' 
  | 'AI_ML' 
  | 'Web3_Crypto';

export interface Answer {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  body: string;
  codeSnippet?: string;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  body: string;
  codeSnippet?: string;
  tags: string[];
  courseCode: string; // e.g. "CS 401"
  courseName: string; // e.g. "Operating Systems"
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  votes: number;
  views: number;
  answers: Answer[];
  hasAcceptedAnswer: boolean;
  createdAt: string;
  isBookmarked?: boolean;
}

export interface ContributorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  department: string;
  reputation: number;
  badges: {
    title: string;
    tier: 'gold' | 'silver' | 'bronze';
  }[];
  questionsCount: number;
  answersCount: number;
  acceptedCount: number;
}
