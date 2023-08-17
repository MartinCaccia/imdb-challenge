import { fakerEN as Faker } from '@faker-js/faker';
import { setSeederFactory, useSeederFactory } from 'typeorm-extension';
import { Movie } from "../../movies/entities/movie.entity";
import { Actor } from '../../common/entities/actor.entity';
import { Director } from '../../common/entities/director.entity';

export default setSeederFactory(Movie, async (faker: typeof Faker) => {
  const user = new Movie();
  user.title = faker.lorem.words({min:3, max:10});
  user.genre = [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
  user.year = faker.number.int({min:1960, max:2023});
  const director = await useSeederFactory(Director).make();
  console.log('director: ', director);
  user.director = director;
  const actors = await useSeederFactory(Actor).make();
  // console.log('actors: ', actors[0]);
  user.actors = actors[0];
  // user.director = new Director(); // faker.number.int({min:1, max:3});
  // user.actors = new Actor(); // [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
  user.description = faker.lorem.paragraphs(3);
  return user;
});