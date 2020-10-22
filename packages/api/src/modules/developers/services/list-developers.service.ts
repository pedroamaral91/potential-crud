import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopersEntity } from '../models/developers.entity';

type ListDevelopersServiceArgs = {
  name?: string;
  age?: string;
  page?: number;
  limit?: number;
};

@Injectable()
export class ListDevelopersService {
  private LIMIT = 10;
  constructor(
    @InjectRepository(DevelopersEntity)
    private readonly developerRepository: Repository<DevelopersEntity>,
  ) {}

  public async execute({
    name,
    age,
    page = 1,
    limit = this.LIMIT,
  }: ListDevelopersServiceArgs) {
    const offset = (page - 1) * limit;
    const developerQuery = this.developerRepository.createQueryBuilder();

    if (name) developerQuery.where('name like :name', { name: `%${name}%` });
    if (age) developerQuery.andWhere('age = :age', { age });

    const [developers, total] = await developerQuery
      .skip(offset)
      .take(limit)
      .orderBy('name', 'ASC')
      .getManyAndCount();

    if (!developers.length) throw new NotFoundException();

    return { page, total, developers };
  }
}
