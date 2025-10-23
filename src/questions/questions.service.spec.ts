import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { BadRequestException } from '@nestjs/common';
import type { DifficultyData, QuestionData } from '../data/quiz_data.model';

describe('QuestionsService', () => {
  let service: QuestionsService;

  const mockDifficultyData: DifficultyData = {
    angular: [
      {
        id: 'q1',
        question: 'What is Angular?',
        options: { a: 'Framework', b: 'Library', c: 'Language' },
        answer: 'a',
      },
      {
        id: 'q2',
        question: 'What is a component?',
        options: { a: 'Service', b: 'UI Element', c: 'Module' },
        answer: 'b',
      },
      {
        id: 'q3',
        question: 'What is a directive?',
        options: { a: 'Component', b: 'Behavior', c: 'Service' },
        answer: 'b',
      },
    ],
    react: [
      {
        id: 'q4',
        question: 'What is React?',
        options: { a: 'Framework', b: 'Library', c: 'Language' },
        answer: 'b',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRandomCategory', () => {
    it('should return a category from difficulty data', () => {
      const category = service.getRandomCategory(mockDifficultyData);
      expect(['angular', 'react']).toContain(category);
    });

    it('should return one of the available categories', () => {
      const categories = new Set<string>();
      // Run multiple times to check randomness
      for (let i = 0; i < 20; i++) {
        categories.add(service.getRandomCategory(mockDifficultyData));
      }
      expect(categories.size).toBeGreaterThan(0);
    });
  });

  describe('getQuestions', () => {
    it('should return all questions for a category when no amount specified', () => {
      const result = service.getQuestions(mockDifficultyData, 'angular');

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('question');
      expect(result[0]).toHaveProperty('options');
      expect(result[0]).not.toHaveProperty('answer');
    });

    it('should strip answer field from all questions', () => {
      const result = service.getQuestions(mockDifficultyData, 'angular');

      result.forEach((question) => {
        expect(question).not.toHaveProperty('answer');
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('options');
      });
    });

    it('should return correct number of questions when amount is specified', () => {
      const result = service.getQuestions(mockDifficultyData, 'angular', 2);

      expect(result).toHaveLength(2);
    });

    it('should return all questions if amount exceeds available questions', () => {
      const result = service.getQuestions(mockDifficultyData, 'angular', 10);

      expect(result).toHaveLength(3);
    });

    it('should throw BadRequestException for invalid amount', () => {
      expect(() => {
        service.getQuestions(mockDifficultyData, 'angular', -1);
      }).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for zero amount', () => {
      expect(() => {
        service.getQuestions(mockDifficultyData, 'angular', 0);
      }).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for NaN amount', () => {
      expect(() => {
        service.getQuestions(mockDifficultyData, 'angular', NaN);
      }).toThrow(BadRequestException);
    });

    it('should handle single question category', () => {
      const result = service.getQuestions(mockDifficultyData, 'react');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('q4');
    });

    it('should return random subset when amount is less than total', () => {
      const result1 = service.getQuestions(mockDifficultyData, 'angular', 1);
      const result2 = service.getQuestions(mockDifficultyData, 'angular', 1);

      expect(result1).toHaveLength(1);
      expect(result2).toHaveLength(1);
      // Verify the questions are from the valid set
      const validIds = ['q1', 'q2', 'q3'];
      expect(validIds).toContain(result1[0].id);
      expect(validIds).toContain(result2[0].id);
    });
  });
});
