import * as faker from 'faker';
import { DeveloperDTO } from '../../../../modules/developers/dto/developer.dto';

export const DevelopersFactory = {
  create(): DeveloperDTO {
    return {
      name: faker.name.findName(),
      age: faker.random.number(30),
      sex: 'M',
      hobby: 'whatever',
      date_of_birth: new Date().toISOString(),
    };
  },
  createMany(howMany = 3): DeveloperDTO[] {
    return Array(howMany)
      .fill(true)
      .map(this.create);
  },
};
