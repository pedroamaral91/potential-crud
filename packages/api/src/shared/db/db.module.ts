import { Module } from '@nestjs/common';
import OrmDriver from './config/orm-driver';

const ormModule = OrmDriver.get('typeorm');
@Module({
  imports: [ormModule()],
})
export class DbModule {}
