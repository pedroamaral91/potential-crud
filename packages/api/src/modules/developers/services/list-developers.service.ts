import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopersEntity } from '../models/developers.entity';

type ListDevelopersServiceArgs = {
  name?: string;
  age?: string;
  birthday?: string;
  hobby?: string;
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
    birthday,
    hobby,
    page = 1,
    limit = this.LIMIT,
  }: ListDevelopersServiceArgs) {
    const offset = (page - page) * limit;
    const developerQuery = this.developerRepository.createQueryBuilder();

    if (name) developerQuery.where('name = :name', { name });
    if (age) developerQuery.andWhere('age = :age', { age });
    if (birthday) developerQuery.andWhere('birthday = :birthday', { birthday });
    if (hobby) developerQuery.andWhere('hobby = :hobby', { hobby });

    const [developers, total] = await developerQuery
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { page, total, developers };
  }
}
