import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRunnerService } from './transaction_runner.service';

describe('TransactionRunnerService', () => {
  let service: TransactionRunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionRunnerService],
    }).compile();

    service = module.get<TransactionRunnerService>(TransactionRunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
