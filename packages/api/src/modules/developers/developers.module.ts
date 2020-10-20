import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopersEntity } from './models/developers.entity';
import { DevelopersController } from './controllers/developers.controller';
import { CreateDeveloperService } from './services/create-developer.service';
import { ListDevelopersService } from './services/list-developers.service';
import { ShowDeveloperService } from './services/show-developer.service';
import { UpdateDevelopersService } from './services/update-developer.service';
import { DeleteDeveloperService } from './services/delete-developer.service';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopersEntity])],
  controllers: [DevelopersController],
  providers: [
    ListDevelopersService,
    ShowDeveloperService,
    CreateDeveloperService,
    UpdateDevelopersService,
    DeleteDeveloperService,
  ],
  exports: [TypeOrmModule],
})
export class DevelopersModule {}
