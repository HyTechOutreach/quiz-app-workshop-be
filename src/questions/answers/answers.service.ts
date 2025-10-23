import { Injectable } from '@nestjs/common';
import { BaseQuizService } from '../base-quiz.service';
import { GetAnswersDto } from './dto/get-answers.dto';
import { AnswersResponseDto } from './dto/answers-response.dto';

@Injectable()
export class AnswersService extends BaseQuizService {
  getAnswers(dto: GetAnswersDto): AnswersResponseDto {
    const answers: AnswersResponseDto['answers'] = {};

    for (const questionId of dto.questionIds) {
      const question = this.getQuestion(questionId);
      if (question) {
        answers[questionId] = {
          answer: Array.isArray(question.answer)
            ? question.answer
            : [question.answer],
          type: question.type,
        };
      }
    }

    return { answers };
  }
}
