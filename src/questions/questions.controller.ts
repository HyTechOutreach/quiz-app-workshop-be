import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { QUIZ_DATA_TOKEN } from '../data/constants';
import { type QuizData } from '../data/quiz_data.model';

@Controller('/questions')
export class QuestionsController {
  constructor(@Inject(QUIZ_DATA_TOKEN) private readonly quizData: QuizData) {}

  @Get()
  getQuestions(
    @Query('category') category: string = 'angular',
    @Query('multiple') multiple: boolean = false,
  ) {
    if (!(category in this.quizData)) {
      throw new BadRequestException('Category not found');
    }

    if (multiple) {
      return this.quizData.multiple[category];
    }
    return this.quizData.single[category];
  }
}
