import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Actor } from '../../common/entities/actor.entity';

export default class ActorSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const actorFactory = await factoryManager.get(Actor);
    await actorFactory.saveMany(6);
  }
}