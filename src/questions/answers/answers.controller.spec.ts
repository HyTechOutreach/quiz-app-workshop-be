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
          a1b2c3d4e5f6: ['a', 'b', 'c'],
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
          q1: ['a'],
          q2: ['b', 'c'],
          q3: ['d'],
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
