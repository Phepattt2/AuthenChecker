import { Test, TestingModule } from '@nestjs/testing';
import { PackageServiceService } from './package_service.service';

describe('PackageServiceService', () => {
  let service: PackageServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageServiceService],
    }).compile();

    service = module.get<PackageServiceService>(PackageServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
