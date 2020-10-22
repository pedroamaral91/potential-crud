import { NestFactory } from '@nestjs/core';
import { SeedersModule } from './seeders.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedersModule);
  const seedClassName = process.argv.slice(2)[0];
  const seedService = app.get(SeedService);
  try {
    await seedService.run({ seed: seedClassName });
    console.log('Seeder executado com sucesso!');
  } catch (err) {
    console.log(err);
    console.log('Erro ao executaar seed!');
  } finally {
    app.close();
  }
}
bootstrap();
