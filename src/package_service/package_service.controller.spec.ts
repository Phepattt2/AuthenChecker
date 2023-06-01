import { Test, TestingModule } from '@nestjs/testing';
import { PackageServiceController } from './package_service.controller';

describe('PackageServiceController', () => {
  let controller: PackageServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageServiceController],
    }).compile();

    controller = module.get<PackageServiceController>(PackageServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
