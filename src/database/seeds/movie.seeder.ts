import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager, useSeederFactory } from 'typeorm-extension';
import { Movie } from '../../movies/entities/movie.entity';

export default class MovieSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const connection = dataSource.initialize;
    const movie = await useSeederFactory(Movie).make();
    movie.director = { id: 1, name: 'Oliver', lastName: 'Ernser', 
    movies: [movie] };
    movie.actors = [{ id: 1, name: 'Jhon', lastName: 'Nothing',
    movies: [movie] },
    { id: 2, name: 'Rowan', lastName: 'Doyle',
    movies: [movie] }];
    await dataSource.manager.save(movie);
  }
}