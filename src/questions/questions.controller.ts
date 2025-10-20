import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { QUIZ_DATA_TOKEN } from '../data/constants';
import { Difficulties, type QuizData } from '../data/quiz_data.model';
import { QuestionsService } from './questions.service';
import { GetQuestionsDto } from './dto/get-questions.dto';

@ApiTags('questions')
@Controller('/questions')
export class QuestionsController {
  constructor(
    @Inject(QUIZ_DATA_TOKEN) private readonly quizData: QuizData,
    private readonly questionsService: QuestionsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get quiz questions',
    description:
      'Retrieves a set of quiz questions based on the specified category and difficulty. ' +
      'If no category is provided, a random category will be selected. ' +
      'If multiple is not specified, the difficulty will be randomly determined. ' +
      'Use the amount parameter to limit the number of questions returned.',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description:
      'Quiz category. If not provided, a random category will be selected.',
    example: 'angular',
  })
  @ApiQuery({
    name: 'multiple',
    required: false,
    type: Boolean,
    description:
      'Whether to get multiple-choice questions (true) or single-choice questions (false). If not provided, randomly selected.',
    example: false,
  })
  @ApiQuery({
    name: 'amount',
    required: false,
    type: Number,
    description:
      'Number of questions to return. Must be a positive number. If not provided or if greater than available questions, all questions in the category will be returned.',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of questions with their IDs, text, and options.',
    type: GetQuestionsDto,
    schema: {
      example: {
        questions: [
          {
            id: 'q1',
            question: 'What is the capital of France?',
            options: {
              a: 'Paris',
              b: 'London',
              c: 'Berlin',
              d: 'Madrid',
            },
          },
        ],
        category: 'Geography',
        difficulty: 'single',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request - The specified category was not found or the amount parameter is invalid (must be a positive number).',
    schema: {
      example: {
        statusCode: 400,
        message: 'Category not found',
        error: 'Bad Request',
      },
    },
  })
  getQuestions(
    @Query('category') category: string,
    @Query('multiple') multiple: boolean = false,
    @Query('amount') amount?: number,
  ): GetQuestionsDto {
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
