import { fakerEN as Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Director } from '../../common/entities/director.entity';

export default setSeederFactory(Director, (faker: typeof Faker) => {
  const director = new Director();
  director.name = faker.person.firstName();
  director.lastName = faker.person.lastName();
  return director;
});