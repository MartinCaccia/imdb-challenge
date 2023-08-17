import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DatabaseBaseContext, createDatabase, dropDatabase, SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import { Movie } from "../../movies/entities/movie.entity";
import { Actor } from '../../common/entities/actor.entity';
import { Director } from '../../common/entities/director.entity';

import InitSeeder from '../seeds/init.seeder';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const options = {
  type: 'postgres',
  database: "src/postgres",
  entities: [Actor, Director, Movie],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);

// (async () => {
//   await dropDatabase({ ifExist: true });
//   await createDatabase({ ifNotExist: true });
// })();