import { Test, TestingModule } from '@nestjs/testing';
import { ValidateController } from './validate.controller';
import { ValidateService } from './validate.service';
import { ValidateFormDto } from './dto/validate-form.dto';

describe('ValidateController', () => {
  let controller: ValidateController;
  let service: ValidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidateController],
      providers: [ValidateService],
    }).compile();

    controller = module.get<ValidateController>(ValidateController);
    service = module.get<ValidateService>(ValidateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validateForm', () => {
    it('should call validateService.validateForm with the provided form data', () => {
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'],
        },
      };

      const validateFormSpy = jest.spyOn(service, 'validateForm');
      controller.validateForm(form);

      expect(validateFormSpy).toHaveBeenCalledWith(form);
      expect(validateFormSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple choice questions with correct answers', () => {
      // Multiple choice Angular question: "a1b2c3d4e5f6" - answer: ["a", "b", "c"]
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'],
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle single choice questions with correct answers', () => {
      // Single choice Angular question: "g1h2i3j4k5l6" - answer: "b" (TypeScript)
      const form: ValidateFormDto = {
        answers: {
          g1h2i3j4k5l6: ['b'],
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle multiple questions at once', () => {
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'], // Multiple choice Angular
          g1h2i3j4k5l6: ['b'], // Single choice Angular
          e1f2a3b4c5d6: ['a', 'c', 'd'], // Multiple choice Polska
          f4a5b6c7d8e9: ['d'], // Single choice Polska
          h1i2j3k4l5m6: ['a', 'd'], // Multiple choice Zwierzeta
          a1b2c3d4e5f1: ['c'], // Single choice Zwierzeta
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle empty form', () => {
      const form: ValidateFormDto = {
        answers: {},
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle form with non-existent question IDs', () => {
      const form: ValidateFormDto = {
        answers: {
          'invalid-id-123': ['a', 'b'],
          'non-existent-456': ['c'],
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle mixed valid and invalid question IDs', () => {
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'], // Valid
          'invalid-id': ['x', 'y'], // Invalid
          g1h2i3j4k5l6: ['b'], // Valid
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle questions from different categories', () => {
      const form: ValidateFormDto = {
        answers: {
          // Angular questions
          a1b2c3d4e5f6: ['a', 'b', 'c'],
          g1h2i3j4k5l6: ['b'],
          // Polska questions
          e1f2a3b4c5d6: ['a', 'c', 'd'],
          f4a5b6c7d8e9: ['d'],
          // Zwierzeta questions
          h1i2j3k4l5m6: ['a', 'd'],
          a1b2c3d4e5f1: ['c'],
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle incorrect answers for multiple choice questions', () => {
      // Correct answer for "a1b2c3d4e5f6" is ["a", "b", "c"]
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b'], // Missing 'c'
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle incorrect answers for single choice questions', () => {
      // Correct answer for "g1h2i3j4k5l6" is "b"
      const form: ValidateFormDto = {
        answers: {
          g1h2i3j4k5l6: ['a'], // Wrong answer
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle empty answer arrays', () => {
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: [],
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should handle extra answers in multiple choice questions', () => {
      // Correct answer for "a1b2c3d4e5f6" is ["a", "b", "c"]
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c', 'd'], // Extra 'd'
        },
      };

      const result = controller.validateForm(form);
      expect(result).toBeDefined();
    });

    it('should return the result from validateService', () => {
      const form: ValidateFormDto = {
        answers: {
          a1b2c3d4e5f6: ['a', 'b', 'c'],
        },
      };

      const mockResult = {
        results: { a1b2c3d4e5f6: true },
        correct: 1,
        total: 1,
      };
      jest.spyOn(service, 'validateForm').mockReturnValue(mockResult);

      const result = controller.validateForm(form);
      expect(result).toEqual(mockResult);
    });
  });
});
