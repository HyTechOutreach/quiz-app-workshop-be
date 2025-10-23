import { Injectable } from '@nestjs/common';
import { ValidateFormDto } from './dto/validate-form.dto';
import { BaseQuizService, Question } from '../base-quiz.service';

export interface ValidateFormResult {
  results: { [key: string]: boolean };
  correct: number;
  total: number;
}

@Injectable()
export class ValidateService extends BaseQuizService {
  validateForm(form: ValidateFormDto): ValidateFormResult {
    const results: { [key: string]: boolean } = {};
    let correctCount = 0;
    let totalCount = 0;

    for (const [questionId, answer] of Object.entries(form.answers)) {
      const isCorrect = this.validateQuestion(questionId, answer);
      results[questionId] = isCorrect;
      totalCount++;
      if (isCorrect) {
        correctCount++;
      }
    }

    return {
      results,
      correct: correctCount,
      total: totalCount,
    };
  }

  private validateQuestion(questionId: string, answer: string[]): boolean {
    const question = this.getQuestion(questionId);
    if (!question) {
      return false;
    }

    if (question.type === 'multiple') {
      // Check if all correct answers are included and no extra answers
      const correctAnswers = question.answer;
      return (
        correctAnswers.length === answer.length &&
        correctAnswers.every((a) => answer.includes(a))
      );
    } else {
      return question.answer === answer[0];
    }
  }
}
