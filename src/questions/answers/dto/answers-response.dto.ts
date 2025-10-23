import { ApiProperty } from '@nestjs/swagger';

export class AnswerDetail {
  @ApiProperty({
    description: 'The question ID',
    example: 'q1',
  })
  questionId: string;

  @ApiProperty({
    description: 'The correct answer(s) for the question',
    example: ['a'],
    type: [String],
  })
  answer: string[];

  @ApiProperty({
    description: 'The type of question (single or multiple choice)',
    example: 'single',
    enum: ['single', 'multiple'],
  })
  type: 'single' | 'multiple';
}

export class AnswersResponseDto {
  @ApiProperty({
    description:
      'Object containing correct answers for each requested question',
    type: 'object',
    additionalProperties: {
      type: 'object',
      properties: {
        answer: {
          type: 'array',
          items: { type: 'string' },
        },
        type: {
          type: 'string',
          enum: ['single', 'multiple'],
        },
      },
    },
    example: {
      q1: {
        answer: ['a'],
        type: 'single',
      },
      q2: {
        answer: ['b', 'c'],
        type: 'multiple',
      },
    },
  })
  answers: {
    [questionId: string]: {
      answer: string[];
      type: 'single' | 'multiple';
    };
  };
}
