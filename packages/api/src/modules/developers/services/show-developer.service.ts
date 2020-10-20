import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopersEntity } from '../models/developers.entity';

type ShowDeveloperServiceArgs = {
  developerID: string;
};

@Injectable()
export class ShowDeveloperService {
  constructor(
    @InjectRepository(DevelopersEntity)
    private readonly developerRepository: Repository<DevelopersEntity>,
  ) {}

  public async execute({ developerID }: ShowDeveloperServiceArgs) {
    return this.developerRepository.findOneOrFail(developerID);
  }
}
