import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { DevelopersModule } from '../developers.module';
import {
  createIntegrationTestContext,
  cleanEntities,
} from '../../../shared/utils/util-tests';
import { DevelopersEntity } from '../models/developers.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DevelopersFactory } from '../../../shared/db/fakes/developer-factory/developer.factory';

describe('Developers integration tests', () => {
  let app: INestApplication;
  let developerRepository: Repository<DevelopersEntity>;
  beforeAll(async () => {
    app = await createIntegrationTestContext({
      imports: [DevelopersModule],
    });

    await app.init();

    developerRepository = app.get(getRepositoryToken(DevelopersEntity));
  });

  it('should list developers', async () => {
    const developers = DevelopersFactory.createMany(5);
    await developerRepository.save(developers, { reload: false });
    const response = await request(app.getHttpServer()).get('/developers');
    expect(response.body).toMatchObject({ developers });
  });

  it('should return data from one developer', async () => {
    const developer = await developerRepository.findOne();
    const response = await request(app.getHttpServer()).get(
      `/developers/${developer.id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: developer.id,
      hobby: developer.hobby,
    });
  });

  it('should fail when pass wrong data to create a developer', async () => {
    const response = await request(app.getHttpServer())
      .post('/developers')
      .send({ wrongDATA: true });

    expect(response.status).toBe(400);
  });

  it('should create a developer', async () => {
    const fakeDeveloper = DevelopersFactory.create();
    const response = await request(app.getHttpServer())
      .post('/developers')
      .send(fakeDeveloper);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(fakeDeveloper);
  });

  it('should fail when developer was not found in put method', async () => {
    const fake = DevelopersFactory.create();
    const response = await request(app.getHttpServer())
      .put('/developers/0323')
      .send(fake);

    expect(response.status).toBe(404);
  });

  it('should fail when pass wrong developer DTO in put method', async () => {
    const response = await request(app.getHttpServer())
      .put('/developers/0')
      .send({});

    expect(response.status).toBe(400);
  });

  it('should update a developer', async () => {
    const fakeDeveloper = DevelopersFactory.create();
    const developer = await developerRepository.save(fakeDeveloper);
    const response = await request(app.getHttpServer())
      .put(`/developers/${developer.id}`)
      .send({
        ...developer,
        name: 'PEDRO',
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: developer.id, name: 'PEDRO' });
  });

  it('should return 404 when developer was not found in DELETE method', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/developers/042',
    );
    expect(response.status).toBe(404);
  });

  it('should DELETE a developer', async () => {
    const fakeDeveloper = DevelopersFactory.create();
    const developer = await developerRepository.save(fakeDeveloper);
    const response = await request(app.getHttpServer()).delete(
      `/developers/${developer.id}`,
    );
    expect(response.status).toBe(204);
    expect(response.body).toMatchObject({});

    const checkIfWasDeleted = await request(app.getHttpServer()).get(
      `/developers/${developer.id}`,
    );
    expect(checkIfWasDeleted.status).toBe(404);
  });

  afterAll(async done => {
    await cleanEntities([DevelopersEntity]);
    await app.close();
    done();
  });
});
