import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopersEntity } from '../models/developers.entity';
import { DeveloperDTO } from '../dto/developer.dto';

type UpdateDevelopersServiceArgs = {
  developerID: number;
  developerDTO: DeveloperDTO;
};

@Injectable()
export class UpdateDevelopersService {
  constructor(
    @InjectRepository(DevelopersEntity)
    private readonly developerRepository: Repository<DevelopersEntity>,
  ) {}

  public async execute({
    developerID,
    developerDTO,
  }: UpdateDevelopersServiceArgs) {
    const developer = await this.developerRepository.findOneOrFail(developerID);

    return this.developerRepository.merge(developer, developerDTO).save();
  }
}
