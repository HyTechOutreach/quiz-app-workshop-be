import { forwardRef, Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { AppModule } from '../app.module';
import { ValidateController } from './validate/validate.controller';
import { ValidateService } from './validate/validate.service';
import { QuestionsService } from './questions.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [QuestionsController, ValidateController],
  providers: [ValidateService, QuestionsService],
})
export class QuestionsModule {}
