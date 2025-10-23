import { Injectable } from '@nestjs/common';
import * as quizDataRaw from '../data/tech_outreach_quiz_final.json';
import { QuizData, QuestionData } from '../data/quiz_data.model';

export interface MultipleQuestion extends QuestionData {
  type: 'multiple';
  answer: string[];
}

export interface SingleQuestion extends QuestionData {
  type: 'single';
  answer: string;
}

export type Question = MultipleQuestion | SingleQuestion;

@Injectable()
export class BaseQuizService {
  protected readonly quizData: QuizData = quizDataRaw as QuizData;

  protected getQuestion(questionId: string): Question | null {
    for (const category in this.quizData.multiple) {
      const question = this.quizData.multiple[category].find(
        (q) => q.id === questionId,
      );
      if (question) {
        return { ...question, type: 'multiple' } as MultipleQuestion;
      }
    }

    for (const category in this.quizData.single) {
      const question = this.quizData.single[category].find(
        (q) => q.id === questionId,
      );
      if (question) {
        return { ...question, type: 'single' } as SingleQuestion;
      }
    }

    return null;
  }
}
