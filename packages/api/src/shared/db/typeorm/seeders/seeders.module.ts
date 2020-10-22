import { Module } from '@nestjs/common';
import { DbModule } from '../../db.module';
import { ConfigModule } from '../../../config/config.module';
import { SeedService } from './seed.service';
import { DeveloperSeederModule } from './developer/developer-seeder.module';

@Module({
  imports: [DbModule, ConfigModule.register(), DeveloperSeederModule],
  providers: [SeedService],
})
export class SeedersModule {}
