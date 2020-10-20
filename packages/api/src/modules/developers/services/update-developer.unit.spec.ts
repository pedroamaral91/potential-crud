import { Test } from '@nestjs/testing';

import { DevelopersFactory } from '../../../shared/db/fakes/developer-factory/developer.factory';
import { DevelopersEntity } from '../models/developers.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateDevelopersService } from './update-developer.service';

describe('Unit tests for Update Developer Service', () => {
  let updateDeveloperService: UpdateDevelopersService;
  const developersDTO = DevelopersFactory.create();
  const developerRepositoryMock = {
    findOneOrFail: jest.fn((id: number) => {
      if (id === 0) throw Error();
    }),
    merge: jest.fn((_, developerDTO) => ({
      save: jest.fn(() => developerDTO),
    })),
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateDevelopersService,
        {
          provide: getRepositoryToken(DevelopersEntity),
          useValue: developerRepositoryMock,
        },
      ],
    }).compile();

    updateDeveloperService = module.get<UpdateDevelopersService>(
      UpdateDevelopersService,
    );
  });

  it('should throw error if developer id not exist', () => {
    expect(
      updateDeveloperService.execute({
        developerDTO: developersDTO,
        developerID: 0,
      }),
    ).rejects.toThrow();
  });

  it('should update a developer', async () => {
    const developerDTO = {
      ...developersDTO,
      name: 'frubis',
    };
    const service = await updateDeveloperService.execute({
      developerDTO,
      developerID: 1,
    });
    expect(service).toMatchObject(developerDTO);
    expect(developerRepositoryMock.merge).toBeCalled();
    expect(developerRepositoryMock.merge).toBeCalledTimes(1);
    jest.clearAllMocks();
  });
});
