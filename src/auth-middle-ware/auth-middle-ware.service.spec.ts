import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleWareService } from './auth-middle-ware.service';

describe('AuthMiddleWareService', () => {
  let service: AuthMiddleWareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMiddleWareService],
    }).compile();

    service = module.get<AuthMiddleWareService>(AuthMiddleWareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
