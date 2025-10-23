import { forwardRef, Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { AppModule } from '../app.module';
import { ValidateController } from './validate/validate.controller';
import { ValidateService } from './validate/validate.service';
import { QuestionsService } from './questions.service';
import { AnswersController } from './answers/answers.controller';
import { AnswersService } from './answers/answers.service';
import { BaseQuizService } from './base-quiz.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [QuestionsController, ValidateController, AnswersController],
  providers: [
    ValidateService,
    QuestionsService,
    AnswersService,
    BaseQuizService,
  ],
})
export class QuestionsModule {}
