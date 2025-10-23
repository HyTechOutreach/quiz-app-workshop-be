import { ApiProperty } from '@nestjs/swagger';

export class AnswersResponseDto {
  @ApiProperty({
    description:
      'Object containing correct answers for each requested question',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { type: 'string' },
    },
    example: {
      q1: ['a', 'b'],
      q2: ['d'],
    },
  })
  answers: {
    [questionId: string]: string[];
  };
}
