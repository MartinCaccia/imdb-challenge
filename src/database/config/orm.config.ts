import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
// import { Actor } from 'src/common/entities/actor.entity';
// import { Director } from 'src/common/entities/director.entity';
// import { Movie } from 'src/movies/entities/movie.entity';
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
  // host: process.env.DB_HOST,
  // port: +process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // autoLoadEntities: true,
  entities: [Actor, Director, Movie],
//   entities: [__dirname + '/../../src/**/*.entity.ts'],
//   migrationsTableName: 'migrations',
//   migrations: [__dirname + '/../migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);