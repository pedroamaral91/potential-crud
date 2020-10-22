import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeOrmConfigModule],
})
export class DbModule {}
