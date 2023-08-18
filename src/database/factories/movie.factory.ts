import { fakerEN as Faker } from '@faker-js/faker';
import { setSeederFactory, useSeederFactory } from 'typeorm-extension';
import { Movie } from "../../movies/entities/movie.entity";

export default setSeederFactory(Movie, async (faker: typeof Faker) => {
  const movie = new Movie();
  movie.title = faker.lorem.words({min:2, max:3});
  movie.genre = [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
  movie.year = faker.number.int({min:1960, max:2023});
  movie.description = faker.lorem.paragraphs(3);
  return movie;
});