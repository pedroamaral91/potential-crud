import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../../config/config.service';

const DATABASE = new Map([['test', 'gazin_test']]);

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('DB_DIALECT') as 'postgres',
      host:
        process.env.NODE_ENV === 'test'
          ? 'localhost'
          : this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database:
        DATABASE.get(process.env.NODE_ENV) ||
        this.configService.get('DB_DATABASE'),
      autoLoadEntities: true,
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: `${__dirname}/src/shared/db/migrations`,
      },
    };
  }
}
