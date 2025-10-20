import { Injectable } from '@nestjs/common';
import * as quizDataRaw from '../../data/tech_outreach_quiz_final.json';
import { ValidateFormDto } from './dto/validate-form.dto';
import { QuizData, QuestionData } from '../../data/quiz_data.model';

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
export class ValidateService {
  private readonly quizData: QuizData = quizDataRaw as QuizData;

  validateForm(form: ValidateFormDto) {}
  private validateQuestion(questionId: string, answer: string[]) {
    const question = this.getQuestion(questionId);
    if (!question) {
      return false;
    }

    if (question.type === 'multiple') {
      question.answer.every((a) => answer.includes(a));
    } else {
      return question.answer === answer[0];
    }
  }
  private getQuestion(questionId: string): Question | null {
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
