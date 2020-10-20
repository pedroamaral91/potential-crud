import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ShowDeveloperService } from './show-developer.service';
import { DevelopersEntity } from '../models/developers.entity';
import { DevelopersFactory } from '../../../shared/db/fakes/developer-factory/developer.factory';

describe('Unit tests for Show Developer Service', () => {
  let showDeveloperService: ShowDeveloperService;
  let developerRepository: Repository<DevelopersEntity>;
  const fakeDeveloper = DevelopersFactory.create();

  const developerRepositoryMock = () =>
    jest.fn(() => ({
      findOneOrFail: jest.fn((id: string) => {
        if (id === '0') throw Error();
        return fakeDeveloper;
      }),
    }));
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ShowDeveloperService,
        {
          provide: getRepositoryToken(DevelopersEntity),
          useFactory: developerRepositoryMock(),
        },
      ],
    }).compile();

    showDeveloperService = module.get<ShowDeveloperService>(
      ShowDeveloperService,
    );
    developerRepository = module.get(getRepositoryToken(DevelopersEntity));
  });

  it('should throw error if developerID not exists', () => {
    expect(
      showDeveloperService.execute({ developerID: '0' }),
    ).rejects.toThrowError();
  });

  it('should return a developer', async () => {
    const service = await showDeveloperService.execute({ developerID: '' });
    expect(service).toMatchObject(fakeDeveloper);
    expect(developerRepository.findOneOrFail).toBeCalled();
  });
});
