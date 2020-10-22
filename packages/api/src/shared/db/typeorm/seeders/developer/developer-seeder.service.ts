import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import { DevelopersEntity } from '../../../../../modules/developers/models/developers.entity';
import { DevelopersFactory } from '../../../fakes/developer-factory/developer.factory';

@Injectable()
export class DeveloperSeederService {
  constructor(
    @InjectRepository(DevelopersEntity)
    private readonly developerRepository: Repository<DevelopersEntity>,
  ) {}

  public async execute() {
    try {
      const developers = DevelopersFactory.createMany(25);
      await this.developerRepository.save(developers);
    } catch (eerr) {
      console.log(eerr);
    }
  }
}
