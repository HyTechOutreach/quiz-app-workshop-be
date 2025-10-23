import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { GetAnswersDto } from './dto/get-answers.dto';
import { AnswersResponseDto } from './dto/answers-response.dto';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiOperation({
    summary: 'Get correct answers for questions',
    description:
      'Returns the correct answers for the specified question IDs. ' +
      'This endpoint can be used to retrieve answer keys for quiz questions. ' +
      'For each question, returns the correct answer(s) and the question type (single or multiple choice).',
  })
  @ApiBody({
    type: GetAnswersDto,
    description:
      'Object containing an array of question IDs to retrieve answers for.',
    examples: {
      'Request for multiple questions': {
        value: {
          questionIds: ['q1', 'q2', 'q3'],
        },
      },
      'Request for single question': {
        value: {
          questionIds: ['q1'],
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved answers. Returns an object with correct answers for each requested question ID.',
    type: AnswersResponseDto,
    schema: {
      example: {
        answers: {
          q1: {
            answer: ['a'],
            type: 'single',
          },
          q2: {
            answer: ['b', 'c'],
            type: 'multiple',
          },
          q3: {
            answer: ['d'],
            type: 'single',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid request body format.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        error: 'Bad Request',
      },
    },
  })
  getAnswers(@Body() dto: GetAnswersDto): AnswersResponseDto {
    return this.answersService.getAnswers(dto);
  }
}
