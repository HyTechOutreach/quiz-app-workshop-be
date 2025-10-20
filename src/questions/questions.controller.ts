import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { QUIZ_DATA_TOKEN } from '../data/constants';
import { Difficulties, type QuizData } from '../data/quiz_data.model';
import { QuestionsService } from './questions.service';
import { GetQuestionsDto } from './dto/get-questions.dto';

@Controller('/questions')
export class QuestionsController {
  constructor(
    @Inject(QUIZ_DATA_TOKEN) private readonly quizData: QuizData,
    private readonly questionsService: QuestionsService,
  ) {}

  @Get()
  getQuestions(
    @Query('category') category: string,
    @Query('multiple') multiple: boolean,
    @Query('amount') amount?: number,
  ): GetQuestionsDto {
    if (multiple === undefined) {
      multiple = Math.random() < 0.5;
    }

    const difficulty = multiple ? Difficulties.MULTIPLE : Difficulties.SINGLE;
    const difficultyData = this.quizData[difficulty];

    if (!category) {
      category = this.questionsService.getRandomCategory(difficultyData);
    } else if (!(category in difficultyData)) {
      throw new BadRequestException('Category not found');
    }

    const questions = this.questionsService.getQuestions(
      difficultyData,
      category,
      amount,
    );

    return {
      category,
      difficulty,
      questions,
    };
  }
}
