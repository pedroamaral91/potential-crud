import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopersEntity } from '../models/developers.entity';

type DeleteDeveloperServiceArgs = {
  developerID: number;
};

@Injectable()
export class DeleteDeveloperService {
  constructor(
    @InjectRepository(DevelopersEntity)
    private readonly developerRepository: Repository<DevelopersEntity>,
  ) {}

  public async execute({ developerID }: DeleteDeveloperServiceArgs) {
    const developer = await this.developerRepository.findOneOrFail(developerID);
    await developer.remove();
  }
}
