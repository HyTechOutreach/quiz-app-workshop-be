import { ApiProperty } from '@nestjs/swagger';

export class GetAnswersDto {
  @ApiProperty({
    description: 'Array of question IDs to get correct answers for',
    example: ['q1', 'q2', 'q3'],
    type: [String],
  })
  questionIds: string[];
}
