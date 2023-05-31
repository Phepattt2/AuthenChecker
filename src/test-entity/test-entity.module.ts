import { Module } from '@nestjs/common';
import { TestEntityController } from './test-entity.controller';

@Module({
  controllers: [TestEntityController]
})
export class TestEntityModule {}
