import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ListDevelopersService } from './list-developers.service';

import { DevelopersEntity } from '../models/developers.entity';
import { DevelopersFactory } from '../../../shared/db/fakes/developer-factory/developer.factory';

describe('Unit tests for List Developer Service', () => {
  let listDeveloperService: ListDevelopersService;
  const developersDTO = DevelopersFactory.createMany(3);

  const developerRepositoryMock = {
    createQueryBuilder: jest.fn(() => ({
      skip: jest.fn(() => ({
        take: jest.fn(() => ({
          orderBy: jest.fn(() => ({
            getManyAndCount: jest.fn(() => [
              developersDTO,
              developersDTO.length,
            ]),
          })),
        })),
      })),
    })),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ListDevelopersService,
        {
          provide: getRepositoryToken(DevelopersEntity),
          useValue: developerRepositoryMock,
        },
      ],
    }).compile();

    listDeveloperService = module.get<ListDevelopersService>(
      ListDevelopersService,
    );
  });

  it('should list developers', async () => {
    const page = 3;
    const service = await listDeveloperService.execute({ page });
    expect(service).toMatchObject({
      developers: developersDTO,
      total: developersDTO.length,
      page,
    });
    expect(developerRepositoryMock.createQueryBuilder).toBeCalled();
  });
});
