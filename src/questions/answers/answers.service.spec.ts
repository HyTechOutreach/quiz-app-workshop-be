import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { BaseQuizService } from '../base-quiz.service';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersService],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAnswers', () => {
    it('should return correct answers for valid question IDs from real data', () => {
      const result = service.getAnswers({
        questionIds: ['a1b2c3d4e5f6'],
      });

      expect(result.answers).toBeDefined();
      expect(result.answers['a1b2c3d4e5f6']).toBeDefined();
      expect(result.answers['a1b2c3d4e5f6'].answer).toBeDefined();
      expect(result.answers['a1b2c3d4e5f6'].type).toBe('multiple');
      expect(Array.isArray(result.answers['a1b2c3d4e5f6'].answer)).toBe(true);
    });

    it('should return empty object for non-existent question IDs', () => {
      const result = service.getAnswers({
        questionIds: ['non_existent_id'],
      });

      expect(result.answers).toBeDefined();
      expect(Object.keys(result.answers).length).toBe(0);
    });

    it('should handle multiple question IDs', () => {
      const result = service.getAnswers({
        questionIds: ['a1b2c3d4e5f6', 'f6e5d4c3b2a1'],
      });

      expect(result.answers).toBeDefined();
      expect(Object.keys(result.answers).length).toBe(2);
      expect(result.answers['a1b2c3d4e5f6']).toBeDefined();
      expect(result.answers['f6e5d4c3b2a1']).toBeDefined();
    });

    it('should handle mixed valid and invalid question IDs', () => {
      const result = service.getAnswers({
        questionIds: ['a1b2c3d4e5f6', 'invalid_id', 'f6e5d4c3b2a1'],
      });

      expect(result.answers).toBeDefined();
      expect(Object.keys(result.answers).length).toBe(2);
      expect(result.answers['a1b2c3d4e5f6']).toBeDefined();
      expect(result.answers['f6e5d4c3b2a1']).toBeDefined();
      expect(result.answers['invalid_id']).toBeUndefined();
    });

    it('should return answers as array for single choice questions', () => {
      // Find a single choice question ID from the actual data
      const singleQuestions = (service as any).quizData.single;
      if (singleQuestions && Object.keys(singleQuestions).length > 0) {
        const category = Object.keys(singleQuestions)[0];
        const questionId = singleQuestions[category][0].id;

        const result = service.getAnswers({
          questionIds: [questionId],
        });

        expect(result.answers[questionId]).toBeDefined();
        expect(result.answers[questionId].type).toBe('single');
        expect(Array.isArray(result.answers[questionId].answer)).toBe(true);
      }
    });
  });
});
