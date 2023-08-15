import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// import { Post } from 'src/post/entities/post.entity';
// import { User } from 'src/user/entities/user.entity';
import { Actor } from '../../common/entities/actor.entity';

export default class ActorSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // const repository = dataSource.getRepository(Actor);

    // const user = await repository.findOneBy({
    //   userName: 'admin',
    // });

    const actorFactory = await factoryManager.get(Actor);

    await actorFactory.saveMany(6);
  }
}