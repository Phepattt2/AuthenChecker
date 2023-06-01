import { Test, TestingModule } from '@nestjs/testing';
import { AppServiceMapService } from './app_service_map.service';

describe('AppServiceMapService', () => {
  let service: AppServiceMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppServiceMapService],
    }).compile();

    service = module.get<AppServiceMapService>(AppServiceMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
