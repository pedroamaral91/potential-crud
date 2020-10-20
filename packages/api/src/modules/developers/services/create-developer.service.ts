import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopersEntity } from '../models/developers.entity';
import { DeveloperDTO } from '../dto/developer.dto';

type CreateDeveloperServiceArgs = {
  developerDTO: DeveloperDTO;
};

@Injectable()
export class CreateDeveloperService {
  constructor(
    @InjectRepository(DevelopersEntity)
    private readonly developerRepository: Repository<DevelopersEntity>,
  ) {}

  public async execute({ developerDTO }: CreateDeveloperServiceArgs) {
    return this.developerRepository.save(developerDTO);
  }
}
