import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import { ConfigModule } from '../../config/config.module';
import { DatabaseConnectionService } from './connection/database-connection.service';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    TypeOrm.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnectionService,
      inject: [ConfigService],
    }),
  ],
})
export class TypeOrmConfigModule {}
