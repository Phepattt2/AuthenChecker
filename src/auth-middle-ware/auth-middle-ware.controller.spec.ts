import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleWareController } from './auth-middle-ware.controller';

describe('AuthMiddleWareController', () => {
  let controller: AuthMiddleWareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthMiddleWareController],
    }).compile();

    controller = module.get<AuthMiddleWareController>(AuthMiddleWareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
