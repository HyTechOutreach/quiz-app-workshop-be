import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { QUIZ_DATA_TOKEN } from './data/constants';
import quizData from './data/tech_outreach_quiz_final.json';

@Module({
  imports: [QuestionsModule],
  controllers: [AppController],
  providers: [AppService, { provide: QUIZ_DATA_TOKEN, useValue: quizData }],
  exports: [QUIZ_DATA_TOKEN],
})
export class AppModule {}
