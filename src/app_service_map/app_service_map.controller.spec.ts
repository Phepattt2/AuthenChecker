import { Test, TestingModule } from '@nestjs/testing';
import { AppServiceMapController } from './app_service_map.controller';

describe('AppServiceMapController', () => {
  let controller: AppServiceMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppServiceMapController],
    }).compile();

    controller = module.get<AppServiceMapController>(AppServiceMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
