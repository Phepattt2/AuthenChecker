import { Test, TestingModule } from '@nestjs/testing';
import { TestEntityController } from './test-entity.controller';

describe('TestEntityController', () => {
  let controller: TestEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestEntityController],
    }).compile();

    controller = module.get<TestEntityController>(TestEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
