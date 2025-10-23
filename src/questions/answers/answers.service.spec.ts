import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';

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
    it('should return correct answers for valid question IDs', () => {
      const result = service.getAnswers({
        questionIds: ['q1'],
      });

      expect(result.answers).toBeDefined();
      expect(result.answers['q1']).toBeDefined();
      expect(result.answers['q1'].answer).toBeDefined();
      expect(result.answers['q1'].type).toBeDefined();
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
        questionIds: ['q1', 'q2'],
      });

      expect(result.answers).toBeDefined();
      expect(Object.keys(result.answers).length).toBeGreaterThan(0);
    });
  });
});
