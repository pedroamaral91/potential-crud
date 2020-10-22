import { Injectable } from '@nestjs/common';

import { DeveloperSeederService } from './developer/developer-seeder.service';

@Injectable()
export class SeedService {
  private seeders = new Map();
  constructor(private readonly DeveloperSeeder: DeveloperSeederService) {
    this.seeders.set('DeveloperSeeder', DeveloperSeeder);
  }

  public async run({ seed = '' }) {
    if (seed === '') {
      const seeders = this.seeders.keys();
      for (const seeder of seeders) {
        return this[seeder].execute();
      }
    }
    if (this[seed] === undefined) throw Error('Seeder não foi encontrada');
    return this[seed].execute();
  }
}
