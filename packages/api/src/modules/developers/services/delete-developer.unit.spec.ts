import { DeleteDeveloperService } from './delete-developer.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DevelopersEntity } from '../models/developers.entity';
import { Repository } from 'typeorm';

describe('Unit tests for Delete Developer Service', () => {
  let deleteDeveloperService: DeleteDeveloperService;
  let developerRepository: Repository<DevelopersEntity>;
  const developerRepositoryMock = () =>
    jest.fn(() => ({
      findOneOrFail: jest.fn((id: number) => {
        if (id === 0) throw Error();
        return { remove: jest.fn() };
      }),
    }));

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteDeveloperService,
        {
          provide: getRepositoryToken(DevelopersEntity),
          useFactory: developerRepositoryMock(),
        },
      ],
    }).compile();

    deleteDeveloperService = module.get<DeleteDeveloperService>(
      DeleteDeveloperService,
    );
    developerRepository = module.get(getRepositoryToken(DevelopersEntity));
  });

  it('should throw error if developerID not exists', () => {
    expect(
      deleteDeveloperService.execute({ developerID: 0 }),
    ).rejects.toThrowError();
    jest.clearAllMocks();
  });

  it('should remove a developer', async () => {
    const service = await deleteDeveloperService.execute({ developerID: 1 });
    expect(service).toBeUndefined();
    expect(developerRepository.findOneOrFail).toBeCalled();
    jest.clearAllMocks();
  });
});
