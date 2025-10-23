import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QUIZ_DATA_TOKEN } from '../data/constants';
import { QuizData, Difficulties } from '../data/quiz_data.model';
import { BadRequestException } from '@nestjs/common';

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  const mockQuizData: QuizData = {
    multiple: {
      angular: [
        {
          id: 'test-multiple-1',
          question: 'Test multiple question?',
          options: { a: 'Option A', b: 'Option B' },
          answer: ['a', 'b'],
        },
        {
          id: 'test-multiple-2',
          question: 'Another multiple question?',
          options: { a: 'Option A', b: 'Option B', c: 'Option C' },
          answer: ['a', 'c'],
        },
      ],
      react: [
        {
          id: 'test-multiple-3',
          question: 'React multiple question?',
          options: { a: 'Option A', b: 'Option B' },
          answer: ['b'],
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
        {
          id: 'test-single-2',
          question: 'Another single question?',
          options: { a: 'Option A', b: 'Option B', c: 'Option C' },
          answer: 'c',
        },
      ],
      vue: [
        {
          id: 'test-single-3',
          question: 'Vue single question?',
          options: { a: 'Option A', b: 'Option B' },
          answer: 'b',
        },
      ],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        QuestionsService,
        {
          provide: QUIZ_DATA_TOKEN,
          useValue: mockQuizData,
        },
      ],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getQuestions', () => {
    it('should return single questions for a specific category', () => {
      const result = controller.getQuestions('angular', false);

      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('category', 'angular');
      expect(result).toHaveProperty('difficulty', Difficulties.SINGLE);
      expect(result.questions).toHaveLength(2);
      expect(result.questions[0]).not.toHaveProperty('answer');
    });

    it('should return multiple questions for a specific category', () => {
      const result = controller.getQuestions('angular', true);

      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('category', 'angular');
      expect(result).toHaveProperty('difficulty', Difficulties.MULTIPLE);
      expect(result.questions).toHaveLength(2);
      expect(result.questions[0]).not.toHaveProperty('answer');
    });

    it('should select random category when category is not provided', () => {
      const result = controller.getQuestions(undefined, false);

      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('category');
      expect(['angular', 'vue']).toContain(result.category);
      expect(result).toHaveProperty('difficulty', Difficulties.SINGLE);
    });

    it('should throw BadRequestException for non-existent category', () => {
      expect(() => {
        controller.getQuestions('nonexistent', false);
      }).toThrow(BadRequestException);
    });

    it('should limit questions when amount is specified', () => {
      const result = controller.getQuestions('angular', false, 1);

      expect(result.questions).toHaveLength(1);
      expect(result.category).toBe('angular');
      expect(result.difficulty).toBe(Difficulties.SINGLE);
    });

    it('should return all questions when amount exceeds available', () => {
      const result = controller.getQuestions('angular', false, 10);

      expect(result.questions).toHaveLength(2);
      expect(result.category).toBe('angular');
    });

    it('should handle different categories correctly', () => {
      const result = controller.getQuestions('vue', false);

      expect(result.questions).toHaveLength(1);
      expect(result.category).toBe('vue');
      expect(result.questions[0].id).toBe('test-single-3');
    });

    it('should handle multiple difficulty for different categories', () => {
      const result = controller.getQuestions('react', true);

      expect(result.questions).toHaveLength(1);
      expect(result.category).toBe('react');
      expect(result.difficulty).toBe(Difficulties.MULTIPLE);
      expect(result.questions[0].id).toBe('test-multiple-3');
    });

    it('should throw error when amount is invalid', () => {
      expect(() => {
        controller.getQuestions('angular', false, -1);
      }).toThrow(BadRequestException);
    });

    it('should default to single difficulty when multiple is false', () => {
      const result = controller.getQuestions('angular', false);

      expect(result.difficulty).toBe(Difficulties.SINGLE);
    });

    it('should use multiple difficulty when multiple is true', () => {
      const result = controller.getQuestions('angular', true);

      expect(result.difficulty).toBe(Difficulties.MULTIPLE);
    });

    it('should not include answers in returned questions', () => {
      const result = controller.getQuestions('angular', false);

      result.questions.forEach((question) => {
        expect(question).not.toHaveProperty('answer');
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('options');
      });
    });

    it('should handle undefined category with default multiple parameter', () => {
      const result = controller.getQuestions(undefined as any, false);

      expect(result).toHaveProperty('questions');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('difficulty');
    });

    it('should handle category with undefined amount', () => {
      const result = controller.getQuestions('angular', false, undefined);

      expect(result.questions.length).toBeGreaterThan(0);
    });

    it('should handle all parameters as undefined except multiple', () => {
      const result = controller.getQuestions(undefined as any, true, undefined);

      expect(result).toHaveProperty('questions');
      expect(result.difficulty).toBe(Difficulties.MULTIPLE);
    });

    it('should select random category for multiple difficulty when not specified', () => {
      const result = controller.getQuestions(undefined as any, true);

      expect(['angular', 'react']).toContain(result.category);
      expect(result.difficulty).toBe(Difficulties.MULTIPLE);
    });
  });
});
