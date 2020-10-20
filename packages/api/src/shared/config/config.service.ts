import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
  private readonly envConfig;

  constructor() {
    const filePath = '.env';
    const envFile = resolve(__dirname, '..', '..', '..', filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
