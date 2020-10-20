import * as faker from 'faker';

let id = 1;

export const create = () => ({
  id: id++,
  name: faker.name.findName(),
  age: faker.random.number(30),
  sex: 'M',
  hobby: 'whatever',
  birthday: new Date().toDateString(),
});

export const createMany = (howMany = 3) =>
  Array(howMany)
    .fill(true)
    .map(create);
