import { Test, TestingModule } from '@nestjs/testing';
import { TestEntityService } from './test-entity.service';

describe('TestEntityService', () => {
  let service: TestEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestEntityService],
    }).compile();

    service = module.get<TestEntityService>(TestEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
