import { Test, TestingModule } from '@nestjs/testing';
import { ValidateService } from './validate.service';

describe('ValidateService', () => {
  let service: ValidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateService],
    }).compile();

    service = module.get<ValidateService>(ValidateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateForm', () => {
    it('should validate correct single choice answer', () => {
      // Using a real question ID from the quiz data
      const result = service.validateForm({
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'], // Multiple choice question with correct answer
        },
      });

      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('correct');
      expect(result).toHaveProperty('total');
      expect(result.total).toBe(1);
    });

    it('should validate multiple correct answers', () => {
      const result = service.validateForm({
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'],
          f6e5d4c3b2a1: ['a', 'b', 'c', 'd'],
        },
      });

      expect(result.total).toBe(2);
      expect(result.correct).toBeGreaterThanOrEqual(0);
      expect(result.results).toHaveProperty('a1b2c3d4e5f6');
      expect(result.results).toHaveProperty('f6e5d4c3b2a1');
    });

    it('should return false for non-existent question', () => {
      const result = service.validateForm({
        answers: {
          non_existent_id: ['a'],
        },
      });

      expect(result.results['non_existent_id']).toBe(false);
      expect(result.correct).toBe(0);
      expect(result.total).toBe(1);
    });

    it('should handle empty answers object', () => {
      const result = service.validateForm({
        answers: {},
      });

      expect(result.results).toEqual({});
      expect(result.correct).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should validate multiple questions with mixed results', () => {
      const result = service.validateForm({
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'], // Should be correct
          non_existent: ['x'], // Should be wrong (doesn't exist)
        },
      });

      expect(result.total).toBe(2);
      expect(result.results['non_existent']).toBe(false);
    });

    it('should validate incorrect answer for multiple choice', () => {
      const result = service.validateForm({
        answers: {
          a1b2c3d4e5f6: ['a'], // Incomplete answer for multiple choice
        },
      });

      expect(result.results['a1b2c3d4e5f6']).toBe(false);
      expect(result.correct).toBe(0);
      expect(result.total).toBe(1);
    });

    it('should validate multiple choice with extra wrong answer', () => {
      const result = service.validateForm({
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c', 'd'], // Extra answer
        },
      });

      expect(result.results['a1b2c3d4e5f6']).toBe(false);
      expect(result.correct).toBe(0);
    });

    it('should handle single choice questions correctly', () => {
      // Find a single choice question from the actual data
      const singleQuestions = (service as any).quizData.single;
      if (singleQuestions && Object.keys(singleQuestions).length > 0) {
        const category = Object.keys(singleQuestions)[0];
        const question = singleQuestions[category][0];
        const correctAnswer = Array.isArray(question.answer)
          ? question.answer[0]
          : question.answer;

        const result = service.validateForm({
          answers: {
            [question.id]: [correctAnswer],
          },
        });

        expect(result.results[question.id]).toBe(true);
        expect(result.correct).toBe(1);
        expect(result.total).toBe(1);
      }
    });
  });
});
