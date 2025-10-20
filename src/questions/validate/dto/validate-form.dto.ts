import { ApiProperty } from '@nestjs/swagger';

export class ValidateFormDto {
  @ApiProperty({
    description: 'Object containing answers for each question ID',
    example: {
      q1: ['answer1'],
      q2: ['answer2', 'answer3'],
    },
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  answers: {
    [key: string]: string[];
  };
}
