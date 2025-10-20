import { ApiProperty } from '@nestjs/swagger';

export class QuestionDataDto {
  @ApiProperty({
    description: 'Unique identifier for the question',
    example: 'q1',
  })
  id: string;

  @ApiProperty({
    description: 'The question text',
    example: 'What is the capital of France?',
  })
  question: string;

  @ApiProperty({
    description: 'Object containing answer options',
    example: {
      a: 'Paris',
      b: 'London',
      c: 'Berlin',
      d: 'Madrid',
    },
    type: 'object',
    additionalProperties: {
      type: 'string',
    },
  })
  options: { [key: string]: string };

  @ApiProperty({
    description:
      'The correct answer(s). Can be a single string for single-choice questions or an array of strings for multiple-choice questions',
    example: 'a',
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  answer: string | string[];
}
