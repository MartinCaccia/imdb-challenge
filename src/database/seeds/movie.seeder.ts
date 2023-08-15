import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Actor } from '../../common/entities/actor.entity';
import { Director } from '../../common/entities/director.entity';
import { Movie } from '../../movies/entities/movie.entity';
// import { User, UserRole } from 'src/user/entities/user.entity';

export default class MovieSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const actorRepository = dataSource.getRepository(Actor);
    const directorRepository = dataSource.getRepository(Director);

    const actor = await actorRepository.findOneBy({ id: (Math.floor(Math.random() * 6)+1) });
    const director = await directorRepository.findOneBy({ id: (Math.floor(Math.random() * 6)+1) });

    // Insert only one record with this username.
    // if (!user) {
    //   await repository.insert([data]);
    // }

    // ---------------------------------------------------

    const movieFactory = await factoryManager.get(Movie);

    // Insert only one record.
    await movieFactory.save();

    // Insert many records in database.
    await movieFactory.saveMany(10);
  }
}