export interface QuizData {
  multiple: {
    [key: string]: QuestionData[];
  };
  single: {
    [key: string]: QuestionData[];
  };
}

export interface QuestionData {
  id: string;
  question: string;
  options: { [key: string]: string };
  answer: string | string[];
}
