export const Difficulties = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
} as const;

export type QuizData = {
  [Difficulties.SINGLE]: DifficultyData;
  [Difficulties.MULTIPLE]: DifficultyData;
};

export type DifficultyData = Record<string, QuestionData[]>;

export interface QuestionData {
  id: string;
  question: string;
  options: { [key: string]: string };
  answer: string | string[];
}
