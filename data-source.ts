import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

console.log(process.cwd())

ConfigModule.forRoot({
    envFilePath: '.env',
  });

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${ process.cwd() }/src/**/*.entity{.js,.ts}`],
  seeds: [`${ process.cwd() }/src/database/seeds/**/*{.js,.ts}`],
  factories: [`${ process.cwd() }/src/database/factories/**/*{.js,.ts}`]
};

export const dataSource = new DataSource(options);