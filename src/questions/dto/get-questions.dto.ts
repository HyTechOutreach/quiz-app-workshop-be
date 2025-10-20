import { Difficulties, QuestionData } from 'src/data/quiz_data.model';

export class GetQuestionsDto {
  questions: QuestionData[];
  category: string;
  difficulty: string;
}
