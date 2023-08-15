import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import ActorSeeder from './actor.seeder';
import DirectorSeeder from './director.seeder';
import MovieSeeder from './movie.seeder';
import actorFactory from '../factories/actor.factory';
import directorFactory from '../factories/director.factory';
import movieFactory from '../factories/movie.factory';

// import postFactory from 'database/factories/post.factory';
// import userFactory from 'database/factories/user.factory';
// import PostSeeder from './post.seeder';
// import UserSeeder from './user.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ActorSeeder, DirectorSeeder, MovieSeeder],
      factories: [actorFactory, directorFactory, movieFactory],
    });
  }
}