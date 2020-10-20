import { Module } from '@nestjs/common';
import { DbModule } from './shared/db/db.module';
import { ConfigModule } from './shared/config/config.module';
import { DevelopersModule } from './modules/developers/developers.module';

@Module({
  imports: [ConfigModule.register(), DbModule, DevelopersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
