import { fakerEN as Faker } from '@faker-js/faker';
// import { define } from "typeorm-seeding";
import { setSeederFactory } from 'typeorm-extension';
// import { Movie } from "src/movies/entities/movie.entity";
import { Movie } from "../../movies/entities/movie.entity";
// import { Director } from 'src/common/entities/director.entity';
// import { Actor } from 'src/common/entities/actor.entity';

export default setSeederFactory(Movie, (faker: typeof Faker) => {
  const user = new Movie();
  user.title = faker.lorem.words({min:3, max:10});
  user.genre = [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
  user.year = faker.number.int({min:1960, max:2023});
  // user.director = new Director(); // faker.number.int({min:1, max:3});
  // user.actors = new Actor(); // [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
  user.description = faker.lorem.paragraphs(3);
  return user;
});

// define(Movie, (faker: typeof Faker) => {
//   const user = new Movie();
//   user.title = faker.lorem.words({min:3, max:10});
//   user.genre = [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
//   user.year = faker.number.int({min:1960, max:2023});
//   // user.director = new Director(); // faker.number.int({min:1, max:3});
//   // user.actors = new Actor(); // [faker.number.int({min:1, max:3}),faker.number.int({min:4, max:6})];
//   user.description = faker.lorem.paragraphs(3);
//   return user;
// });