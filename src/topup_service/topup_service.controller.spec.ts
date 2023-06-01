import { Test, TestingModule } from '@nestjs/testing';
import { TopupServiceController } from './topup_service.controller';

describe('TopupServiceController', () => {
  let controller: TopupServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopupServiceController],
    }).compile();

    controller = module.get<TopupServiceController>(TopupServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
