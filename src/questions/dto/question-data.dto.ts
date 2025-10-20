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
}
