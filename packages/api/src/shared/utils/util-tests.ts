import {
  DynamicModule,
  ForwardReference,
  Provider,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { getConnection, getRepository } from 'typeorm';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '../config/config.module';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { GlobalExceptionFilters } from '../http/filters/global-exception.filters';

interface Type<T> extends Function {
  new (...args: any[]): T;
}

interface ICreateApplicationContext {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>
  >;
  controllers?: Array<Type<any>>;
  providers?: Provider[];
}

export const createApplicationContext = ({
  controllers = [],
  imports = [],
  providers = [],
}: ICreateApplicationContext): TestingModuleBuilder => {
  const applicationContext = Test.createTestingModule({
    imports: [DbModule, ConfigModule.register(), ...imports],
    controllers: [...controllers],
    providers: [...providers],
  });
  return applicationContext;
};

export const createIntegrationTestContext = async (
  arg: ICreateApplicationContext,
): Promise<INestApplication> => {
  const module = await createApplicationContext(arg).compile();
  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilters());
  return app;
};

export const cleanAllEntities = async () => {
  const metadatas = getConnection().entityMetadatas;
  const entities = metadatas.map(metadata => ({
    name: metadata.name,
    tableName: metadata.tableName,
  }));

  for (const entity of entities) {
    const repository = await getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName};`);
  }
};

export const cleanEntities = async (entities: EntityClassOrSchema[]) => {
  for (const entity of entities) {
    const repository = getRepository(entity);
    await repository.query(`DELETE FROM ${repository.metadata.tableName}`);
  }
};
