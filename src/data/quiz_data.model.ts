export interface QuizData {
  multiple: {
    [key: string]: Question[];
  };
  single: {
    [key: string]: Question[];
  };
}

export interface Question {
  question: string;
  options: { [key: string]: string };
  answer: string[];
}
