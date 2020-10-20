import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
