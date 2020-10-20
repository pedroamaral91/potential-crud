import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeveloperDTO } from '../dto/developer.dto';
import { CreateDeveloperService } from '../services/create-developer.service';
import { ListDevelopersService } from '../services/list-developers.service';
import { ShowDeveloperService } from '../services/show-developer.service';
import { UpdateDevelopersService } from '../services/update-developer.service';
import { DeleteDeveloperService } from '../services/delete-developer.service';

@Controller('developers')
export class DevelopersController {
  constructor(
    private readonly listDevelopersService: ListDevelopersService,
    private readonly showDeveloperService: ShowDeveloperService,
    private readonly createDeveloperService: CreateDeveloperService,
    private readonly updateDeveloperService: UpdateDevelopersService,
    private readonly removeDeveloperService: DeleteDeveloperService,
  ) {}

  @Get()
  public async index(
    @Query('page') page = 1,
    @Query('limit') limit,
    @Query('name') name,
    @Query('age') age,
    @Query('birthday') birthday,
    @Query('hobby') hobby,
  ) {
    return this.listDevelopersService.execute({
      age,
      birthday,
      hobby,
      limit,
      name,
      page,
    });
  }

  @Get(':id')
  public async show(@Query('id') id) {
    return this.showDeveloperService.execute({ developerID: id });
  }

  @Post()
  public async store(@Body() developerDTO: DeveloperDTO) {
    return this.createDeveloperService.execute({ developerDTO });
  }

  @Put(':id')
  public async update(
    @Param('id') developerID: number,
    @Body() developerDTO: DeveloperDTO,
  ) {
    return this.updateDeveloperService.execute({ developerID, developerDTO });
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(@Param('id') developerID: number) {
    return this.removeDeveloperService.execute({ developerID });
  }
}
