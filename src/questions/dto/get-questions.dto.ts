import { ApiProperty } from '@nestjs/swagger';
import { Difficulties, QuestionData } from 'src/data/quiz_data.model';
import { QuestionDataDto } from './question-data.dto';

export class GetQuestionsDto {
  @ApiProperty({
    description:
      'List of quiz questions for the specified category and difficulty',
    type: [QuestionDataDto],
    example: [
      {
        id: 'q1',
        question: 'What is the capital of France?',
        options: {
          a: 'Paris',
          b: 'London',
          c: 'Berlin',
          d: 'Madrid',
        },
        answer: 'a',
      },
      {
        id: 'q2',
        question: 'Select all programming languages',
        options: {
          a: 'JavaScript',
          b: 'HTML',
          c: 'Python',
          d: 'CSS',
        },
        answer: ['a', 'c'],
      },
    ],
  })
  questions: QuestionData[];

  @ApiProperty({
    description: 'The category of the quiz questions',
    example: 'angular',
  })
  category: string;

  @ApiProperty({
    description:
      'Quiz difficulty level. "single" for single-choice questions, "multiple" for multiple-choice questions',
    enum: [Difficulties.SINGLE, Difficulties.MULTIPLE],
    example: Difficulties.SINGLE,
  })
  difficulty: string;
}
