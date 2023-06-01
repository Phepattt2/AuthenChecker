import { Test, TestingModule } from '@nestjs/testing';
import { TopupServiceService } from './topup_service.service';

describe('TopupServiceService', () => {
  let service: TopupServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopupServiceService],
    }).compile();

    service = module.get<TopupServiceService>(TopupServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
