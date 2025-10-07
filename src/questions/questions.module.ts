import { forwardRef, Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
