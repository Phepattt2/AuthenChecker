import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRunnerController } from './transaction_runner.controller';

describe('TransactionRunnerController', () => {
  let controller: TransactionRunnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionRunnerController],
    }).compile();

    controller = module.get<TransactionRunnerController>(TransactionRunnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
