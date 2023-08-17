import { fakerEN as Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Actor } from '../../common/entities/actor.entity';

export default setSeederFactory(Actor, (faker: typeof Faker) => {
  const actor = new Actor();
  actor.name = faker.person.firstName();
  actor.lastName = faker.person.lastName();
  return actor;
});