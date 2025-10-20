import { Inject, Injectable } from '@nestjs/common';
import { QUIZ_DATA_TOKEN } from 'src/data/constants';
import type { DifficultyData, QuizData } from 'src/data/quiz_data.model';

@Injectable()
export class QuestionsService {
  constructor(@Inject(QUIZ_DATA_TOKEN) private readonly quizData: QuizData) {}
  getRandomCategory(difficultyData: DifficultyData): string {
    const categories = Object.keys(difficultyData);
    return categories[Math.floor(Math.random() * categories.length)];
  }
}
