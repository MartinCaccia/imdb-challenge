import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Director } from '../../common/entities/director.entity';

export default class DirectorSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const directorFactory = await factoryManager.get(Director);
    await directorFactory.saveMany(6);
  }
}