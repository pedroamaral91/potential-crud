import { Test } from '@nestjs/testing';

import { CreateDeveloperService } from './create-developer.service';
import { create } from '../../../shared/db/fakes/developer-factory/developer.factory';
import { DevelopersEntity } from '../models/developers.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Unit tests for Create Developer Service', () => {
  let createDeveloperService: CreateDeveloperService;
  const developerDTO = create();
  const developerRepositoryMock = {
    save: jest.fn(() => developerDTO),
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateDeveloperService,
        {
          provide: getRepositoryToken(DevelopersEntity),
          useValue: developerRepositoryMock,
        },
      ],
    }).compile();

    createDeveloperService = module.get<CreateDeveloperService>(
      CreateDeveloperService,
    );
  });

  it('should create a developer', async () => {
    const developer = await createDeveloperService.execute({ developerDTO });
    expect(developer).toMatchObject(developerDTO);
    expect(developerRepositoryMock.save).toBeCalled();
    expect(developerRepositoryMock.save).toBeCalledTimes(1);
    jest.clearAllMocks();
  });
});
