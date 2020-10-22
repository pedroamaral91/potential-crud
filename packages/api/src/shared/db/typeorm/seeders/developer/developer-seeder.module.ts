import { Module } from '@nestjs/common';
import { DeveloperSeederService } from './developer-seeder.service';
import { DevelopersModule } from '../../../../../modules/developers/developers.module';

@Module({
  imports: [DevelopersModule],
  providers: [DeveloperSeederService],
  exports: [DeveloperSeederService],
})
export class DeveloperSeederModule {}
