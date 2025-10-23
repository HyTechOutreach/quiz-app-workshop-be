import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

describe('AnswersController', () => {
  let controller: AnswersController;
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [AnswersService],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAnswers', () => {
    it('should return answers from service', () => {
      const mockDto = { questionIds: ['a1b2c3d4e5f6'] };
      const mockResponse = {
        answers: {
          a1b2c3d4e5f6: {
            answer: ['a', 'b', 'c'],
            type: 'multiple',
          },
        },
      };

      jest.spyOn(service, 'getAnswers').mockReturnValue(mockResponse as any);

      const result = controller.getAnswers(mockDto);

      expect(result).toEqual(mockResponse);
      expect(service.getAnswers).toHaveBeenCalledWith(mockDto);
    });

    it('should handle empty question list', () => {
      const mockDto = { questionIds: [] };
      const mockResponse = { answers: {} };

      jest.spyOn(service, 'getAnswers').mockReturnValue(mockResponse as any);

      const result = controller.getAnswers(mockDto);

      expect(result).toEqual(mockResponse);
      expect(service.getAnswers).toHaveBeenCalledWith(mockDto);
    });

    it('should handle multiple question IDs', () => {
      const mockDto = { questionIds: ['q1', 'q2', 'q3'] };
      const mockResponse = {
        answers: {
          q1: { answer: ['a'], type: 'single' },
          q2: { answer: ['b', 'c'], type: 'multiple' },
          q3: { answer: ['d'], type: 'single' },
        },
      };

      jest.spyOn(service, 'getAnswers').mockReturnValue(mockResponse as any);

      const result = controller.getAnswers(mockDto);

      expect(result).toEqual(mockResponse);
      expect(service.getAnswers).toHaveBeenCalledWith(mockDto);
    });

    it('should delegate to service without modification', () => {
      const mockDto = { questionIds: ['test-id'] };
      const spy = jest.spyOn(service, 'getAnswers');

      controller.getAnswers(mockDto);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockDto);
    });
  });
});
