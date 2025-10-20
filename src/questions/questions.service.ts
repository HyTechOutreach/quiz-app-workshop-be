import { BadRequestException, Injectable } from '@nestjs/common';
import type { DifficultyData, QuestionData } from 'src/data/quiz_data.model';

@Injectable()
export class QuestionsService {
  getRandomCategory(difficultyData: DifficultyData): string {
    const categories = Object.keys(difficultyData);
    return categories[Math.floor(Math.random() * categories.length)];
  }

  getQuestions(
    difficultyData: DifficultyData,
    category: string,
    amount?: number,
  ): QuestionData[] {
    let questions = difficultyData[category];

    // If amount is specified, return random subset of questions
    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new BadRequestException('Amount must be a positive number');
      }
      questions = this.getRandomQuestions(questions, parsedAmount);
    }

    return questions;
  }

  private getRandomQuestions(
    questions: QuestionData[],
    amount: number,
  ): QuestionData[] {
    if (amount >= questions.length) {
      return questions;
    }

    // Fisher-Yates shuffle algorithm to randomly pick questions
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, amount);
  }
}
