import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ValidateService } from './validate.service';
import { ValidateFormDto } from './dto/validate-form.dto';
import { ValidateResponseDto } from './dto/validate-response.dto';

@ApiTags('validate')
@Controller('validate')
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Post()
  @ApiOperation({
    summary: 'Validate quiz answers',
    description:
      'Validates submitted quiz answers against the correct answers. ' +
      'For each question, returns whether the answer was correct or incorrect. ' +
      'Also provides summary statistics including the total number of questions and how many were answered correctly. ' +
      'For single-choice questions, provide a single answer in the array. ' +
      'For multiple-choice questions, provide all selected answers in the array.',
  })
  @ApiBody({
    type: ValidateFormDto,
    description:
      'Object containing answers for each question. The key is the question ID and the value is an array of selected answer options.',
    examples: {
      'Single-choice answers': {
        value: {
          answers: {
            q1: ['a'],
            q2: ['b'],
            q3: ['c'],
          },
        },
      },
      'Multiple-choice answers': {
        value: {
          answers: {
            q1: ['a', 'c'],
            q2: ['b'],
            q3: ['a', 'b', 'd'],
          },
        },
      },
      'Mixed answers': {
        value: {
          answers: {
            q1: ['a'],
            q2: ['a', 'c'],
            q3: ['b'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully validated answers. Returns validation results for each question, along with the number of correct answers and total questions.',
    type: ValidateResponseDto,
    schema: {
      example: {
        results: {
          q1: true,
          q2: false,
          q3: true,
        },
        correct: 2,
        total: 3,
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
  validateForm(@Body() form: ValidateFormDto): ValidateResponseDto {
    return this.validateService.validateForm(form);
  }
}
