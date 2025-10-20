import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QUIZ_DATA_TOKEN } from '../data/constants';
import { QuizData } from '../data/quiz_data.model';

describe('QuestionsController', () => {
  let controller: QuestionsController;

  const mockQuizData: QuizData = {
    multiple: {
      angular: [
        {
          id: 'test-multiple-1',
          question: 'Test multiple question?',
          options: { a: 'Option A', b: 'Option B' },
          answer: ['a', 'b'],
        },
      ],
    },
    single: {
      angular: [
        {
          id: 'test-single-1',
          question: 'Test single question?',
          options: { a: 'Option A', b: 'Option B' },
          answer: 'a',
        },
      ],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        {
          provide: QUIZ_DATA_TOKEN,
          useValue: mockQuizData,
        },
      ],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
