import { ApiProperty } from '@nestjs/swagger';

export class ValidateResponseDto {
  @ApiProperty({
    description: 'Object containing validation results for each question',
    example: {
      q1: true,
      q2: false,
      q3: true,
    },
    type: 'object',
    additionalProperties: {
      type: 'boolean',
    },
  })
  results: { [key: string]: boolean };

  @ApiProperty({
    description: 'Number of correct answers',
    example: 2,
    type: 'number',
  })
  correct: number;

  @ApiProperty({
    description: 'Total number of questions submitted',
    example: 3,
    type: 'number',
  })
  total: number;
}
